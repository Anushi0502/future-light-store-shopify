import{a as e,n as t}from"./jsx-runtime-KJkY8l8U.js";import{t as n}from"./createLucideIcon-Dga03Aop.js";import{p as r}from"./shopify-0cCKz0ul.js";import{i,r as a,t as o,u as s}from"./marketingAnalytics-DHvMfhy7.js";var c=n(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),l=n(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),u=e(t(),1),d=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},f=(e=>e?d(e):d),p=e=>e;function m(e,t=p){let n=u.useSyncExternalStore(e.subscribe,u.useCallback(()=>t(e.getState()),[e,t]),u.useCallback(()=>t(e.getInitialState()),[e,t]));return u.useDebugValue(n),n}var h=e=>{let t=f(e),n=e=>m(t,e);return Object.assign(n,t),n},g=(e=>e?h(e):h);function _(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var v=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return v(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return v(t)(e)}}}},y=(e,t)=>(n,r,i)=>{let a={storage:_(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize({...r()});return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let p=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>p;let m,h=()=>{if(!u)return;let e=++s;o=!1,c.forEach(e=>e(r()??p));let t=a.onRehydrateStorage?.call(a,r()??p)||void 0;return v(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(m=a.merge(o,r()??p),n(m,!0),i)return d()}).then(()=>{e===s&&(t?.(r(),void 0),m=r(),o=!0,l.forEach(e=>e(m)))}).catch(n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(u=e.storage)},clearStorage:()=>{++s,u?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>h(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||h(),m||p};function b(e,t){let n=String(t??``);return n.startsWith(`gid://shopify/`)?n:`gid://shopify/${e}/${n}`}function x(){class e extends Event{constructor(e,t={}){super(e,{bubbles:!0,cancelable:!0}),Object.assign(this,t)}}class t extends e{constructor(e){let t=e.product;super(`shopify:product:view`,{...e,product:{...t,id:b(`Product`,t.id),selectedVariant:t.selectedVariant?{...t.selectedVariant,id:b(`ProductVariant`,t.selectedVariant.id)}:null}})}}class n extends e{static createPromise(){let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}constructor(e){let t=e.action===`add`?`merchandiseId`:`id`,n=e.action===`add`?`ProductVariant`:`CartLine`;super(`shopify:cart:lines-update`,{...e,lines:e.lines.map(e=>({...e,[t]:b(n,e[t])}))})}}class r extends e{constructor(e){super(`shopify:cart:error`,e)}}return{ProductViewEvent:t,CartLinesUpdateEvent:n,CartErrorEvent:r}}function S(){if(typeof window>`u`||typeof Event>`u`)return null;let e=window.StandardEvents??{};if(e.ProductViewEvent&&e.CartLinesUpdateEvent)return e;let t=x();return window.StandardEvents={...t,...e},window.StandardEvents}function C(e,t,n,r=null){let i=S()?.ProductViewEvent;if(!i)return!1;e.dispatchEvent(new i({context:n,selectedOptions:r?.selectedOptions??[],product:{id:t.id,title:t.title,handle:t.handle,selectedVariant:r?{id:r.id,title:r.title,availableForSale:r.availableForSale,price:r.price,selectedOptions:r.selectedOptions??[]}:null}}));let o=r??t.variants.edges[0]?.node??null;return s({item_id:a(o?.id||t.id),item_name:t.title,price:Number(o?.price.amount??t.priceRange.minVariantPrice.amount),item_variant:o?.title,item_brand:t.vendor||void 0,item_category:t.productType||void 0},n),!0}function w({target:e,product:t,context:n,selectedVariant:r}){if(typeof window>`u`||C(e,t,n,r))return()=>void 0;let i=()=>C(e,t,n,r);return window.addEventListener(`future-light:standard-events-ready`,i,{once:!0}),()=>window.removeEventListener(`future-light:standard-events-ready`,i)}function T(e,t=`USD`){if(!e||typeof e!=`object`)return null;let n=e,r=n.id;if(typeof r!=`string`||!r)return null;let i=n.cost?.totalAmount,a=n.lines,o=(Array.isArray(a?.edges)?a.edges:[]).map(e=>e&&typeof e==`object`?e.node:null).filter(e=>!!(e&&typeof e==`object`)),s=Number(n.totalQuantity??o.reduce((e,t)=>e+Number(t.quantity??0),0));return{id:r,totalQuantity:Number.isFinite(s)?s:0,cost:{totalAmount:{amount:String(i?.amount??`0`),currencyCode:String(i?.currencyCode??t)}},lines:o,discountCodes:Array.isArray(n.discountCodes)?n.discountCodes:[]}}function E({variantId:e,quantity:t,productId:n,productTitle:r,price:i,target:a=typeof document>`u`?null:document}){let o=S()?.CartLinesUpdateEvent;if(!o||!a||!e||t<=0)return null;let s=o.createPromise(),c={action:`add`,context:`product`,lines:[{merchandiseId:e,quantity:t}],promise:s.promise};return n&&r&&i&&(c.meta={productId:n,productTitle:r,unitPrice:i.amount,currencyCode:i.currencyCode}),a.dispatchEvent(new o(c)),{resolve:(e,t=[])=>{s.resolve({cart:e,userErrors:t,warnings:[]})},reject:e=>{let t=S()?.CartErrorEvent;t&&a.dispatchEvent(new t({error:e instanceof Error?e.message:String(e),code:`SERVICE_UNAVAILABLE`})),s.reject(e)}}}function D(e,t=typeof window>`u`?null:window){if(!(!t||typeof CustomEvent>`u`)&&(i({item:{item_id:a(e.variantId),item_name:e.productTitle,price:Number(e.price.amount),item_variant:e.variantId},quantity:e.quantity,currency:e.price.currencyCode}),t.dispatchEvent(new CustomEvent(`future-light:cart-add-success`,{detail:e})),typeof window<`u`&&window.Shopify?.analytics?.publish))try{let t=window.Shopify.analytics.publish(`future_light_store:cart_add`,e);Promise.resolve(t).catch(()=>void 0)}catch{}}var O=`vs:cart-open`;function k(){typeof window<`u`&&window.dispatchEvent(new Event(O))}var A=`
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`,j=`
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
`,M=`
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
`,N=`
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
`,P=`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
      warnings { code message }
    }
  }
`;function F(e){try{let t=new URL(e);return t.searchParams.set(`channel`,`online_store`),t.toString()}catch{return e}}function I(e=[],t=[]){return e[0]?.message??t[0]?.message??`This item is currently unavailable.`}function L(e=[]){return e.some(e=>e.code===`MERCHANDISE_OUT_OF_STOCK`)}function R(e,t,n){let r=e?.lines?.edges?.find(e=>e.node?.merchandise?.id===t);return!!(r?.node&&Number(r.node.quantity)>=n&&Number(e?.totalQuantity)>=n)}function z(e){return e.some(e=>e.message.toLowerCase().includes(`cart not found`)||e.message.toLowerCase().includes(`does not exist`))}async function B(e){let t=o(),n=(await r(j,{input:{lines:[{quantity:e.quantity,merchandiseId:e.variantId}],...t.length?{attributes:t}:{}}}))?.data?.cartCreate,i=n?.userErrors??[],a=n?.warnings??[],s=n?.cart,c=s?.lines?.edges?.find(t=>t.node?.merchandise?.id===e.variantId)?.node?.id;return i.length>0||!s?.checkoutUrl||!c||!R(s,e.variantId,e.quantity)?(console.warn(`Cart creation did not accept the requested item`,{userErrors:i,warnings:a}),{success:!1,message:I(a,i),unavailable:L(a)}):{success:!0,cartId:s.id,checkoutUrl:F(s.checkoutUrl),lineId:c,cart:s}}async function V(e,t){let n=(await r(M,{cartId:e,lines:[{quantity:t.quantity,merchandiseId:t.variantId}]}))?.data?.cartLinesAdd,i=n?.userErrors??[],a=n?.warnings??[];if(z(i))return{success:!1,cartNotFound:!0,message:I(a,i),unavailable:L(a)};if(i.length>0)return console.error(`Add line failed:`,i),{success:!1,message:I(a,i),unavailable:L(a)};let o=n?.cart,s=(o?.lines?.edges??[]).find(e=>e.node.merchandise.id===t.variantId);return R(o,t.variantId,t.quantity)?{success:!0,lineId:s?.node?.id,cart:o}:(console.warn(`Shopify did not accept the requested cart line`,{warnings:a}),{success:!1,message:I(a),unavailable:L(a)})}async function H(e,t,n){let i=(await r(N,{cartId:e,lines:[{id:t,quantity:n}]}))?.data?.cartLinesUpdate,a=i?.userErrors??[],o=i?.warnings??[];if(z(a))return{success:!1,cartNotFound:!0,message:I(o,a),unavailable:L(o)};if(a.length>0)return{success:!1,message:I(o,a),unavailable:L(o)};let s=i?.cart,c=s?.lines?.edges?.find(e=>e.node?.id===t);return!c?.node||Number(c.node.quantity)<n?{success:!1,message:I(o),unavailable:L(o)}:{success:!0,cart:s}}async function U(e,t){let n=(await r(P,{cartId:e,lineIds:[t]}))?.data?.cartLinesRemove,i=n?.userErrors??[],a=n?.warnings??[];return z(i)?{success:!1,cartNotFound:!0}:i.length>0?{success:!1,message:I(a,i)}:{success:!0}}var W=g()(y((e,t)=>({items:[],cartId:null,checkoutUrl:null,isLoading:!1,isSyncing:!1,addItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n.variantId),s=null;e({isLoading:!0});try{if(!i){s=E({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let t=await B({...n,lineId:null});return t.success?(e({cartId:t.cartId,checkoutUrl:t.checkoutUrl,items:[{...n,lineId:t.lineId}]}),s?.resolve(T(t.cart,n.price.currencyCode)),D({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}):(s?.resolve(null,[{field:[],message:t.message}]),t)}else if(o){let r=o.quantity+n.quantity;if(!o.lineId)return{success:!1,message:`This item is currently unavailable.`};s=E({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let c=await H(i,o.lineId,r);if(c.success){let i=t().items;return e({items:i.map(e=>e.variantId===n.variantId?{...e,quantity:r}:e)}),s?.resolve(T(c.cart,n.price.currencyCode)),D({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else c.cartNotFound&&a();let l=c.message??`Cart line update failed`;return s?.resolve(null,[{field:[],message:l}]),{success:!1,message:l,unavailable:c.unavailable}}else{s=E({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let r=await V(i,{...n,lineId:null});if(r.success){let i=t().items;return e({items:[...i,{...n,lineId:r.lineId??null}]}),s?.resolve(T(r.cart,n.price.currencyCode)),D({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else r.cartNotFound&&a();let o=r.message??`Cart line add failed`;return s?.resolve(null,[{field:[],message:o}]),{success:!1,message:o,unavailable:r.unavailable}}}catch(e){return console.error(`Failed to add item:`,e),s?.reject(e),{success:!1,message:`Couldn’t add this item right now.`}}finally{e({isLoading:!1})}},updateQuantity:async(n,r)=>{if(r<=0){await t().removeItem(n);return}let{items:i,cartId:a,clearCart:o}=t(),s=i.find(e=>e.variantId===n);if(!(!s?.lineId||!a)){e({isLoading:!0});try{let i=await H(a,s.lineId,r);if(i.success){let i=t().items;e({items:i.map(e=>e.variantId===n?{...e,quantity:r}:e)})}else i.cartNotFound&&o()}catch(e){console.error(`Failed to update quantity:`,e)}finally{e({isLoading:!1})}}},removeItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n);if(!(!o?.lineId||!i)){e({isLoading:!0});try{let r=await U(i,o.lineId);if(r.success){let r=t().items.filter(e=>e.variantId!==n);r.length===0?a():e({items:r})}else r.cartNotFound&&a()}catch(e){console.error(`Failed to remove item:`,e)}finally{e({isLoading:!1})}}},clearCart:()=>e({items:[],cartId:null,checkoutUrl:null}),getCheckoutUrl:()=>t().checkoutUrl,syncCart:async()=>{let{cartId:n,isSyncing:i,clearCart:a}=t();if(!(!n||i)){e({isSyncing:!0});try{let e=await r(A,{id:n});if(!e?.data||!Object.prototype.hasOwnProperty.call(e.data,`cart`))return;let t=e.data.cart;t?.id===n&&t.totalQuantity===0&&a()}catch(e){console.error(`Failed to sync cart:`,e)}finally{e({isSyncing:!1})}}}}),{name:`vs-cart`,storage:_(()=>localStorage),partialize:e=>({items:e.items,cartId:e.cartId,checkoutUrl:e.checkoutUrl})}));export{_ as a,l as c,w as i,c as l,k as n,y as o,W as r,g as s,O as t};