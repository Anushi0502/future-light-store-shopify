import{a as e,n as t}from"./jsx-runtime-KJkY8l8U.js";import{t as n}from"./createLucideIcon-Dga03Aop.js";import{p as r}from"./shopify-53yEEID8.js";import{c as i,i as a,m as o,t as s}from"./marketingAnalytics-BKsqVnIW.js";var c=n(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),l=n(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),u=e(t(),1),d=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},f=(e=>e?d(e):d),p=e=>e;function m(e,t=p){let n=u.useSyncExternalStore(e.subscribe,u.useCallback(()=>t(e.getState()),[e,t]),u.useCallback(()=>t(e.getInitialState()),[e,t]));return u.useDebugValue(n),n}var h=e=>{let t=f(e),n=e=>m(t,e);return Object.assign(n,t),n},g=(e=>e?h(e):h);function _(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var v=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return v(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return v(t)(e)}}}},y=(e,t)=>(n,r,i)=>{let a={storage:_(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize({...r()});return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let p=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>p;let m,h=()=>{if(!u)return;let e=++s;o=!1,c.forEach(e=>e(r()??p));let t=a.onRehydrateStorage?.call(a,r()??p)||void 0;return v(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(m=a.merge(o,r()??p),n(m,!0),i)return d()}).then(()=>{e===s&&(t?.(r(),void 0),m=r(),o=!0,l.forEach(e=>e(m)))}).catch(n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(u=e.storage)},clearStorage:()=>{++s,u?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>h(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||h(),m||p};function b(e,t){let n=String(t??``);return n.startsWith(`gid://shopify/`)?n:`gid://shopify/${e}/${n}`}function x(){class e extends Event{constructor(e,t={}){super(e,{bubbles:!0,cancelable:!0}),Object.assign(this,t)}}class t extends e{constructor(e){let t=e.product;super(`shopify:product:view`,{...e,product:{...t,id:b(`Product`,t.id),selectedVariant:t.selectedVariant?{...t.selectedVariant,id:b(`ProductVariant`,t.selectedVariant.id)}:null}})}}class n extends e{static createPromise(){let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}constructor(e){let t=e.action===`add`?`merchandiseId`:`id`,n=e.action===`add`?`ProductVariant`:`CartLine`;super(`shopify:cart:lines-update`,{...e,lines:e.lines.map(e=>({...e,[t]:b(n,e[t])}))})}}class r extends e{constructor(e){super(`shopify:cart:error`,e)}}return{ProductViewEvent:t,CartLinesUpdateEvent:n,CartErrorEvent:r}}function S(){if(typeof window>`u`||typeof Event>`u`)return null;let e=window.StandardEvents??{};if(e.ProductViewEvent&&e.CartLinesUpdateEvent)return e;let t=x();return window.StandardEvents={...t,...e},window.StandardEvents}function C(e,t,n,r=null){let i=S()?.ProductViewEvent;if(!i)return!1;e.dispatchEvent(new i({context:n,selectedOptions:r?.selectedOptions??[],product:{id:t.id,title:t.title,handle:t.handle,selectedVariant:r?{id:r.id,title:r.title,availableForSale:r.availableForSale,price:r.price,selectedOptions:r.selectedOptions??[]}:null}}));let s=r??t.variants.edges[0]?.node??null;return o({item_id:a(s?.id||t.id),item_name:t.title,price:Number(s?.price.amount??t.priceRange.minVariantPrice.amount),item_variant:s?.title,item_brand:t.vendor||void 0,item_category:t.productType||void 0},n),!0}function ee({target:e,product:t,context:n,selectedVariant:r}){if(typeof window>`u`||C(e,t,n,r))return()=>void 0;let i=()=>C(e,t,n,r);return window.addEventListener(`future-light:standard-events-ready`,i,{once:!0}),()=>window.removeEventListener(`future-light:standard-events-ready`,i)}function w(e,t=`USD`){if(!e||typeof e!=`object`)return null;let n=e,r=n.id;if(typeof r!=`string`||!r)return null;let i=n.cost?.totalAmount,a=n.lines,o=(Array.isArray(a?.edges)?a.edges:[]).map(e=>e&&typeof e==`object`?e.node:null).filter(e=>!!(e&&typeof e==`object`)),s=Number(n.totalQuantity??o.reduce((e,t)=>e+Number(t.quantity??0),0));return{id:r,totalQuantity:Number.isFinite(s)?s:0,cost:{totalAmount:{amount:String(i?.amount??`0`),currencyCode:String(i?.currencyCode??t)}},lines:o,discountCodes:Array.isArray(n.discountCodes)?n.discountCodes:[]}}function T({variantId:e,quantity:t,productId:n,productTitle:r,price:i,target:a=typeof document>`u`?null:document}){try{let o=S()?.CartLinesUpdateEvent;if(!o||!a||!e||t<=0)return null;let s=o.createPromise(),c={action:`add`,context:`product`,lines:[{merchandiseId:e,quantity:t}],promise:s.promise};return n&&r&&i&&(c.meta={productId:n,productTitle:r,unitPrice:i.amount,currencyCode:i.currencyCode}),a.dispatchEvent(new o(c)),{resolve:(e,t=[])=>{s.resolve({cart:e,userErrors:t,warnings:[]})},reject:e=>{try{let t=S()?.CartErrorEvent;t&&a.dispatchEvent(new t({error:e instanceof Error?e.message:String(e),code:`SERVICE_UNAVAILABLE`}))}catch{}s.reject(e)}}}catch{return null}}function E(e,t=typeof window>`u`?null:window){if(!(!t||typeof CustomEvent>`u`)){i({item:{item_id:a(e.variantId),item_name:e.productTitle,price:Number(e.price.amount),item_variant:e.variantId},quantity:e.quantity,currency:e.price.currencyCode});try{t.dispatchEvent(new CustomEvent(`future-light:cart-add-success`,{detail:e}))}catch{}if(typeof window<`u`&&window.Shopify?.analytics?.publish)try{let t=window.Shopify.analytics.publish(`future_light_store:cart_add`,e);Promise.resolve(t).catch(()=>void 0)}catch{}}}function D(e,t){if(t==null)return{status:`empty`};let n=t?.lines?.edges,r=t?.lines?.pageInfo?.hasNextPage,i=Number(t?.totalQuantity);if(!Array.isArray(e)||!Array.isArray(n)||r!==!1||!Number.isInteger(i)||i<0)return{status:`hold`};if(i===0&&n.length===0)return{status:`empty`};let a=new Map;for(let t of e){if(!t?.variantId||a.has(t.variantId))return{status:`hold`};a.set(t.variantId,t)}let o=new Set,s=[],c=0;for(let e of n){let t=e?.node,n=t?.merchandise,r=String(n?.id??``),i=Number(t?.quantity),l=String(n?.price?.amount??``),u=String(n?.price?.currencyCode??``),d=n?.selectedOptions;if(!t?.id||!r||o.has(r)||!a.has(r)||!Number.isInteger(i)||i<1||!l||!Number.isFinite(Number(l))||!u||!Array.isArray(d))return{status:`hold`};o.add(r),c+=i;let f=a.get(r);s.push({...f,lineId:t.id,quantity:i,variantTitle:String(n.title??f.variantTitle),price:{amount:l,currencyCode:u},selectedOptions:d.map(e=>({name:String(e?.name??``),value:String(e?.value??``)}))})}return c!==i||s.length!==n.length?{status:`hold`}:{status:`reconciled`,items:s}}function te({isLoading:e=!1}={}){return!!e}function O(e,t){return te(e)?!1:(t(),!0)}var ne=new Set([`checkout.shopify.com`]);function k(e,t=``){if(typeof e!=`string`||!e.trim())return null;try{let n=new URL(e),r=n.hostname.toLowerCase(),i=String(t).trim().toLowerCase(),a=r.endsWith(`.myshopify.com`),o=!!i&&r===i,s=ne.has(r);return n.protocol!==`https:`||n.username||n.password||!(a||o||s)?null:(n.searchParams.set(`channel`,`online_store`),n.toString())}catch{return null}}var A=`vs:cart-open`;function j(){typeof window<`u`&&window.dispatchEvent(new Event(A))}var M=`
  query cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
        }
        pageInfo { hasNextPage }
      }
    }
  }
`,N=`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        discountCodes { code applicable }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
      warnings { code message }
    }
  }
`,P=`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        discountCodes { code applicable }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
      warnings { code message }
    }
  }
`,F=`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        discountCodes { code applicable }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
      warnings { code message }
    }
  }
`,re=`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
      warnings { code message }
    }
  }
`;function I(e){return k(e,typeof window>`u`?``:window.location.hostname)}function L(e=[],t=[]){return e[0]?.message??t[0]?.message??`This item is currently unavailable.`}function R(e=[]){return e.some(e=>e.code===`MERCHANDISE_OUT_OF_STOCK`)}function z(e,t,n){let r=e?.lines?.edges?.find(e=>e.node?.merchandise?.id===t);return!!(r?.node&&Number(r.node.quantity)>=n&&Number(e?.totalQuantity)>=n)}function B(e){return e.some(e=>e.message.toLowerCase().includes(`cart not found`)||e.message.toLowerCase().includes(`does not exist`))}async function V(e){let t=s(),n=(await r(N,{input:{lines:[{quantity:e.quantity,merchandiseId:e.variantId}],...t.length?{attributes:t}:{}}}))?.data?.cartCreate,i=n?.userErrors??[],a=n?.warnings??[],o=n?.cart,c=o?.checkoutUrl?I(o.checkoutUrl):null,l=o?.lines?.edges?.find(t=>t.node?.merchandise?.id===e.variantId)?.node?.id;return i.length>0||!c||!l||!z(o,e.variantId,e.quantity)?(console.warn(`Cart creation did not accept the requested item`,{userErrors:i,warnings:a}),{success:!1,message:L(a,i),unavailable:R(a)}):{success:!0,cartId:o.id,checkoutUrl:c,lineId:l,cart:o}}async function H(e,t){let n=(await r(P,{cartId:e,lines:[{quantity:t.quantity,merchandiseId:t.variantId}]}))?.data?.cartLinesAdd,i=n?.userErrors??[],a=n?.warnings??[];if(B(i))return{success:!1,cartNotFound:!0,message:L(a,i),unavailable:R(a)};if(i.length>0)return console.error(`Add line failed:`,i),{success:!1,message:L(a,i),unavailable:R(a)};let o=n?.cart,s=(o?.lines?.edges??[]).find(e=>e.node.merchandise.id===t.variantId);return z(o,t.variantId,t.quantity)?{success:!0,lineId:s?.node?.id,cart:o}:(console.warn(`Shopify did not accept the requested cart line`,{warnings:a}),{success:!1,message:L(a),unavailable:R(a)})}async function U(e,t,n){let i=(await r(F,{cartId:e,lines:[{id:t,quantity:n}]}))?.data?.cartLinesUpdate,a=i?.userErrors??[],o=i?.warnings??[];if(B(a))return{success:!1,cartNotFound:!0,message:L(o,a),unavailable:R(o)};if(a.length>0)return{success:!1,message:L(o,a),unavailable:R(o)};let s=i?.cart,c=s?.lines?.edges?.find(e=>e.node?.id===t);return!c?.node||Number(c.node.quantity)<n?{success:!1,message:L(o),unavailable:R(o)}:{success:!0,cart:s}}async function W(e,t){let n=(await r(re,{cartId:e,lineIds:[t]}))?.data?.cartLinesRemove,i=n?.userErrors??[],a=n?.warnings??[];return B(i)?{success:!1,cartNotFound:!0}:i.length>0?{success:!1,message:L(a,i)}:{success:!0}}var G=g()(y((e,t)=>({items:[],cartId:null,checkoutUrl:null,isLoading:!1,isSyncing:!1,addItem:async n=>{if(!O(t(),()=>e({isLoading:!0})))return{success:!1,message:`Your bag is updating. Please try again in a moment.`};let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n.variantId),s=null;try{if(!i){s=T({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let t=await V({...n,lineId:null});return t.success?(e({cartId:t.cartId,checkoutUrl:t.checkoutUrl,items:[{...n,lineId:t.lineId}]}),s?.resolve(w(t.cart,n.price.currencyCode)),E({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}):(s?.resolve(null,[{field:[],message:t.message}]),t)}else if(o){let r=o.quantity+n.quantity;if(!o.lineId)return{success:!1,message:`This item is currently unavailable.`};s=T({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let c=await U(i,o.lineId,r);if(c.success){let i=t().items;return e({items:i.map(e=>e.variantId===n.variantId?{...e,quantity:r}:e)}),s?.resolve(w(c.cart,n.price.currencyCode)),E({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else c.cartNotFound&&a();let l=c.message??`Cart line update failed`;return s?.resolve(null,[{field:[],message:l}]),{success:!1,message:l,unavailable:c.unavailable}}else{s=T({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let r=await H(i,{...n,lineId:null});if(r.success){let i=t().items;return e({items:[...i,{...n,lineId:r.lineId??null}]}),s?.resolve(w(r.cart,n.price.currencyCode)),E({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else r.cartNotFound&&a();let o=r.message??`Cart line add failed`;return s?.resolve(null,[{field:[],message:o}]),{success:!1,message:o,unavailable:r.unavailable}}}catch(e){return console.error(`Failed to add item:`,e),s?.reject(e),{success:!1,message:`Couldn’t add this item right now.`}}finally{e({isLoading:!1})}},updateQuantity:async(n,r)=>{if(r<=0)return t().removeItem(n);let i=t(),a=i.items.find(e=>e.variantId===n),o=i.cartId;if(!a?.lineId||!o)return{success:!1,message:`Your bag is still syncing. Please try again.`};if(!O(t(),()=>e({isLoading:!0})))return{success:!1,message:`Your bag is updating. Please try again in a moment.`};let{clearCart:s}=t();try{let i=await U(o,a.lineId,r);if(i.success){let i=t().items;return e({items:i.map(e=>e.variantId===n?{...e,quantity:r}:e)}),{success:!0}}else if(i.cartNotFound)return s(),{success:!1,message:`Your bag session expired. Please add the item again.`};return{success:!1,message:i.message??`We couldn’t update that quantity. Please try again.`,unavailable:i.unavailable}}catch(e){return console.error(`Failed to update quantity:`,e),{success:!1,message:`We couldn’t reach checkout to update your bag. Please try again.`}}finally{e({isLoading:!1})}},removeItem:async n=>{let r=t(),i=r.items.find(e=>e.variantId===n),a=r.cartId;if(!i?.lineId||!a)return{success:!1,message:`Your bag is still syncing. Please try again.`};if(!O(t(),()=>e({isLoading:!0})))return{success:!1,message:`Your bag is updating. Please try again in a moment.`};let{clearCart:o}=t();try{let r=await W(a,i.lineId);if(r.success){let r=t().items.filter(e=>e.variantId!==n);return r.length===0?o():e({items:r}),{success:!0}}else if(r.cartNotFound)return o(),{success:!1,message:`Your bag session expired and was refreshed. Please check the bag again.`};return{success:!1,message:r.message??`We couldn’t remove that item. Please try again.`}}catch(e){return console.error(`Failed to remove item:`,e),{success:!1,message:`We couldn’t reach checkout to update your bag. Please try again.`}}finally{e({isLoading:!1})}},clearCart:()=>e({items:[],cartId:null,checkoutUrl:null}),getCheckoutUrl:()=>t().checkoutUrl,syncCart:async()=>{let{cartId:n,isSyncing:i,isLoading:a,clearCart:o}=t();if(!n||i||a)return;let s=t().items;e({isSyncing:!0});try{let i=await r(M,{id:n});if(!i?.data||i.errors?.length||!Object.prototype.hasOwnProperty.call(i.data,`cart`))return;let a=i.data.cart;if(a&&a.id!==n)return;let c=D(s,a);if(c.status===`empty`){if(t().items!==s||t().cartId!==n)return;o();return}c.status===`reconciled`&&!t().isLoading&&t().items===s&&t().cartId===n&&typeof a?.checkoutUrl==`string`&&a.checkoutUrl.length>0&&e({items:c.items,checkoutUrl:I(a.checkoutUrl)})}catch(e){console.error(`Failed to sync cart:`,e)}finally{e({isSyncing:!1})}}}),{name:`vs-cart`,storage:_(()=>localStorage),partialize:e=>({items:e.items,cartId:e.cartId,checkoutUrl:e.checkoutUrl})}));function K(e){return String(e??``).split(`/`).pop()??``}function q(e){return String(e??``).trim().toLocaleLowerCase()}function J(e,t){let n=q(t);return e?.selectedOptions?.find(e=>q(e?.name)===n)?.value??null}function Y(e,t){return!e?.availableForSale||t?.has?.(e.id)===!0}function X(e){return!!(e?.image?.url&&[`reviewed`,`assigned`].includes(e?.imageMappingStatus))}function ie(e,{isBusy:t=!1,unavailableVariantIds:n=new Set}={}){return!!(e?.id&&e.availableForSale&&!t&&!n?.has?.(e.id))}function Z(e,t=[],n=``){let r=t.length>0&&t.every(e=>/^[A-Z]{1,8}-\d{5,}$/i.test(String(e).trim())),i=/mouse\s*pad|mousepad|desk\s*mat|gaming\s*mat/i.test(n);return q(e)===`color`&&/square-screen smartwatch with band styles/i.test(n)?`Band style`:q(e)===`color`&&r&&i?`Design`:q(e)===`band color`&&/leather strap.*watch band.*butterfly clasp/i.test(n)?`Strap finish`:e}function Q(e,t,n=``){let r=/mouse\s*pad|mousepad|desk\s*mat|gaming\s*mat/i.test(n);return q(t)===`band color`&&/leather strap.*watch band.*butterfly clasp/i.test(n)?oe(e):q(t)===`color`&&r&&/^[A-Z]{1,8}-(\d{5,})$/i.test(String(e).trim())?`Design code ${(String(e).trim().match(/-(\d{5,})$/)?.[1]??String(e).trim()).replace(/^0+(?=\d)/,``)}`:e}function ae(e=[],t=``){if(!Array.isArray(e))return[];let n=e.filter(e=>e?.name&&e?.value!=null).map(e=>({name:String(e.name),value:String(e.value)}));return n.map(e=>{let r=n.filter(t=>q(t.name)===q(e.name)).map(e=>e.value);return{name:Z(e.name,r,t),value:String(Q(e.value,e.name,t))}})}function oe(e){let t=String(e??``).replace(/\s+/g,` `).trim(),n=t.match(/(rose\s*gold|silver|gold|black)$/i);if(!n)return e;let r=n[1].replace(/\s+/g,` `).toLowerCase(),i=t.slice(0,n.index).trim(),a=/white/i.test(i),o=i.replace(/white/gi,` `).replace(/\s+/g,` `).trim().replace(/^lightbrown$/i,`Light brown`).replace(/^brown$/i,`Brown`).replace(/^black$/i,`Black`);if(!o)return e;let s=/^rose\s*gold$/i.test(r)?`rose-gold`:r;return`${o} strap${a?` · white stitching`:``} · ${s} clasp`}function se({variants:e=[],currentVariantId:t,optionName:n,optionValue:r,unavailableVariantIds:i=new Set}){let a=e.find(e=>e.id===t)??null,o=e.filter(e=>J(e,n)===r);if(!o.length)return null;if(a&&J(a,n)===r&&!Y(a,i))return a;let s=a?.selectedOptions??[],c=e=>s.reduce((t,r)=>q(r?.name)===q(n)?t:t+ +(J(e,r?.name)===r?.value),0),l=o.filter(e=>!Y(e,i));return(l.length?l:o).reduce((e,t)=>!e||c(t)>c(e)?t:e,null)}function ce({options:e=[],variants:t=[],selectedVariantId:n,unavailableVariantIds:r=new Set,productTitle:i=``}){let a=le({options:e,variants:t,productTitle:i}),o=a?.variants??t,s=a?.options??e,c=o.find(e=>e.id===n)??null;return(s.length?s:(c?.selectedOptions??[]).map(e=>({name:e.name,values:[...new Set(o.map(t=>J(t,e.name)).filter(Boolean))]}))).filter(e=>(e?.values?.length??0)>1).map(e=>{let t=[...new Set(e.values.map(String))];return{name:e.name,label:Z(e.name,t,i),values:t.map(t=>{let a=o.filter(n=>J(n,e.name)===t),s=se({variants:o,currentVariantId:n,optionName:e.name,optionValue:t,unavailableVariantIds:r}),l=X(s)?s.image:null;return{value:t,displayValue:Q(t,e.name,i),selected:J(c,e.name)===t,available:a.some(e=>!Y(e,r)),variantId:s?.id??null,image:l}})}})}function le({options:e,variants:t,productTitle:n}){if(!/leather\s+strap.*watch\s+band.*butterfly\s+clasp/i.test(n))return null;let r=e.find(e=>q(e?.name)===`band color`),i=e.find(e=>q(e?.name)===`band width`);if(!r||!i)return null;let a=t.map(e=>{let t=$(J(e,`Band Color`));return t?{...e,selectedOptions:[...e.selectedOptions??[],{name:`Strap color`,value:t.strapColor},{name:`Stitching`,value:t.stitching},{name:`Clasp finish`,value:t.claspFinish}]}:null});if(!a.length||a.some(e=>!e))return null;let o=(e,t)=>{let n=new Set(a.map(t=>J(t,e)).filter(Boolean));return[...t.filter(e=>n.has(e)),...[...n].filter(e=>!t.includes(e)).sort()]};return{variants:a,options:[{name:`Strap color`,values:o(`Strap color`,[`Black`,`Brown`,`Light brown`])},{name:`Stitching`,values:o(`Stitching`,[`Black`,`White`])},{name:`Clasp finish`,values:o(`Clasp finish`,[`Silver`,`Gold`,`Rose gold`,`Black`])},{...i,values:[...i.values].sort((e,t)=>Number.parseFloat(e)-Number.parseFloat(t))}]}}function $(e){let t=String(e??``).replace(/\s+/g,` `).trim(),n=t.match(/(rose\s*gold|rosegold|silver|gold|black)$/i);if(!n)return null;let r=t.slice(0,n.index).trim(),i=/white/i.test(r),a=r.replace(/white/gi,``).replace(/\s+/g,` `).trim().replace(/\s+/g,``).toLowerCase(),o=a===`black`?`Black`:a===`brown`?`Brown`:a===`lightbrown`?`Light brown`:null;if(!o)return null;let s=n[1].replace(/\s+/g,` `).toLowerCase(),c=s.startsWith(`rose`)?`Rose gold`:`${s[0].toUpperCase()}${s.slice(1)}`;return{strapColor:o,stitching:i?`White`:`Black`,claspFinish:c}}function ue({variants:e,requestedVariant:t,currentId:n,userSelected:r=!1}){let i=K(t),a=i?e.find(e=>K(e.id)===i):null;if(a&&!r)return a.id;let o=e.find(e=>e.id===n);return o&&(r||o.availableForSale)?o.id:e.find(e=>e.availableForSale)?.id??e[0]?.id??null}export{X as a,G as c,_ as d,y as f,c as h,ae as i,k as l,l as m,ie as n,A as o,g as p,ue as r,j as s,ce as t,ee as u};