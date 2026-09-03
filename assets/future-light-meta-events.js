(function () {
  "use strict";

  // The Shopify Meta app already owns page-view and checkout/purchase tracking.
  // This small bridge only covers AddToCart for the custom Storefront API cart,
  // which Shopify's automatic pixel cannot observe by itself.
  var PIXEL_ID = "921792280984136";
  var pendingEvents = [];
  var metaPixelPromise = null;

  function metaId(value) {
    var raw = String(value == null ? "" : value);
    var parts = raw.split("/");
    return parts[parts.length - 1] || raw;
  }

  function trackingDecision() {
    var privacy = window.Shopify && window.Shopify.customerPrivacy;
    if (!privacy) return { ready: false, allowed: false };

    try {
      if (typeof privacy.marketingAllowed === "function") {
        return { ready: true, allowed: Boolean(privacy.marketingAllowed()) };
      }

      var consent =
        typeof privacy.currentVisitorConsent === "function"
          ? privacy.currentVisitorConsent()
          : privacy.visitorConsent;
      if (!consent || typeof consent.marketing !== "boolean") {
        return { ready: false, allowed: false };
      }
      return { ready: true, allowed: consent.marketing === true };
    } catch (error) {
      return { ready: false, allowed: false };
    }
  }

  function ensureMetaPixel() {
    if (typeof window.fbq === "function") return Promise.resolve(window.fbq);
    if (metaPixelPromise) return metaPixelPromise;

    metaPixelPromise = new Promise(function (resolve) {
      var queue = [];
      var fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = queue;
      window.fbq = fbq;
      fbq("init", PIXEL_ID);

      var script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.onload = function () {
        resolve(fbq);
      };
      script.onerror = function () {
        resolve(null);
      };
      (document.head || document.documentElement).appendChild(script);
    });

    return metaPixelPromise;
  }

  function buildPayload(event) {
    var meta = event && event.meta;
    var lines = Array.isArray(event && event.lines) ? event.lines : [];
    var productId = meta && meta.productId ? metaId(meta.productId) : "";
    var variantId = lines[0] && lines[0].merchandiseId ? metaId(lines[0].merchandiseId) : "";
    var contentId = productId || variantId;
    if (!contentId) return null;

    var quantity = lines.reduce(function (total, line) {
      return total + Math.max(1, Number(line && line.quantity) || 1);
    }, 0);
    var unitPrice = Number(meta && meta.unitPrice);
    var value = Number.isFinite(unitPrice) && unitPrice > 0 ? unitPrice * quantity : undefined;
    var payload = {
      content_ids: [contentId],
      content_type: "product",
      contents: [{ id: contentId, quantity: quantity }],
    };

    if (meta && meta.productTitle) payload.content_name = meta.productTitle;
    if (value !== undefined) payload.value = Number(value.toFixed(2));
    if (meta && meta.currencyCode) payload.currency = meta.currencyCode;
    return payload;
  }

  function send(event) {
    var payload = buildPayload(event);
    var decision = trackingDecision();
    if (!payload || !decision.ready || !decision.allowed) return;

    ensureMetaPixel().then(function (fbq) {
      if (typeof fbq !== "function") return;
      fbq("track", "AddToCart", payload);
    });
  }

  function flush() {
    var events = pendingEvents.splice(0);
    var decision = trackingDecision();
    if (!decision.ready) {
      pendingEvents = events.concat(pendingEvents);
      return;
    }
    if (decision.allowed) events.forEach(send);
  }

  function pollPrivacy() {
    if (!pendingEvents.length) return;
    flush();
    window.setTimeout(pollPrivacy, 1000);
  }

  document.addEventListener("shopify:cart:lines-update", function (event) {
    if (!event || event.action !== "add") return;
    if (event.__futureLightMetaTracked) return;
    event.__futureLightMetaTracked = true;

    var result = event.promise;
    if (result && typeof result.then === "function") {
      result.then(function (response) {
        if (
          response &&
          (!response.userErrors || response.userErrors.length === 0) &&
          response.cart
        ) {
          var decision = trackingDecision();
          if (decision.ready && decision.allowed) send(event);
          else if (!decision.ready) {
            pendingEvents.push(event);
            pollPrivacy();
          }
        }
      });
      return;
    }

    var decision = trackingDecision();
    if (decision.ready && decision.allowed) send(event);
    else if (!decision.ready) {
      pendingEvents.push(event);
      pollPrivacy();
    }
  });

  document.addEventListener("visitorConsentCollected", function () {
    flush();
    pollPrivacy();
  });
  document.addEventListener("shopifyCustomerPrivacyApiLoaded", function () {
    flush();
    pollPrivacy();
  });
})();
