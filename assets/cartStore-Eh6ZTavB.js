import{a as e,n as t}from"./jsx-runtime-KJkY8l8U.js";import{t as n}from"./createLucideIcon-Dga03Aop.js";import{u as r}from"./shopify-HdfPCLef.js";var i=n(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),a=n(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),o=e(t(),1),s=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},c=(e=>e?s(e):s),l=e=>e;function u(e,t=l){let n=o.useSyncExternalStore(e.subscribe,o.useCallback(()=>t(e.getState()),[e,t]),o.useCallback(()=>t(e.getInitialState()),[e,t]));return o.useDebugValue(n),n}var d=e=>{let t=c(e),n=e=>u(t,e);return Object.assign(n,t),n},f=(e=>e?d(e):d);function p(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var m=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return m(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return m(t)(e)}}}},h=(e,t)=>(n,r,i)=>{let a={storage:p(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize({...r()});return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let h=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>h;let g,_=()=>{if(!u)return;let e=++s;o=!1,c.forEach(e=>e(r()??h));let t=a.onRehydrateStorage?.call(a,r()??h)||void 0;return m(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(g=a.merge(o,r()??h),n(g,!0),i)return d()}).then(()=>{e===s&&(t?.(r(),void 0),g=r(),o=!0,l.forEach(e=>e(g)))}).catch(n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(u=e.storage)},clearStorage:()=>{++s,u?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>_(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||_(),g||h};function g(e,t){let n=String(t??``);return n.startsWith(`gid://shopify/`)?n:`gid://shopify/${e}/${n}`}function _(){class e extends Event{constructor(e,t={}){super(e,{bubbles:!0,cancelable:!0}),Object.assign(this,t)}}class t extends e{constructor(e){let t=e.product;super(`shopify:product:view`,{...e,product:{...t,id:g(`Product`,t.id),selectedVariant:t.selectedVariant?{...t.selectedVariant,id:g(`ProductVariant`,t.selectedVariant.id)}:null}})}}class n extends e{static createPromise(){let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}constructor(e){let t=e.action===`add`?`merchandiseId`:`id`,n=e.action===`add`?`ProductVariant`:`CartLine`;super(`shopify:cart:lines-update`,{...e,lines:e.lines.map(e=>({...e,[t]:g(n,e[t])}))})}}class r extends e{constructor(e){super(`shopify:cart:error`,e)}}return{ProductViewEvent:t,CartLinesUpdateEvent:n,CartErrorEvent:r}}function v(){if(typeof window>`u`||typeof Event>`u`)return null;let e=window.StandardEvents??{};if(e.ProductViewEvent&&e.CartLinesUpdateEvent)return e;let t=_();return window.StandardEvents={...t,...e},window.StandardEvents}function y(e,t,n,r=null){let i=v()?.ProductViewEvent;return i?(e.dispatchEvent(new i({context:n,selectedOptions:r?.selectedOptions??[],product:{id:t.id,title:t.title,handle:t.handle,selectedVariant:r?{id:r.id,title:r.title,availableForSale:r.availableForSale,price:r.price,selectedOptions:r.selectedOptions??[]}:null}})),!0):!1}function b({target:e,product:t,context:n,selectedVariant:r}){if(typeof window>`u`||y(e,t,n,r))return()=>void 0;let i=()=>y(e,t,n,r);return window.addEventListener(`future-light:standard-events-ready`,i,{once:!0}),()=>window.removeEventListener(`future-light:standard-events-ready`,i)}function x(e,t=`USD`){if(!e||typeof e!=`object`)return null;let n=e,r=n.id;if(typeof r!=`string`||!r)return null;let i=n.cost?.totalAmount,a=n.lines,o=(Array.isArray(a?.edges)?a.edges:[]).map(e=>e&&typeof e==`object`?e.node:null).filter(e=>!!(e&&typeof e==`object`)),s=Number(n.totalQuantity??o.reduce((e,t)=>e+Number(t.quantity??0),0));return{id:r,totalQuantity:Number.isFinite(s)?s:0,cost:{totalAmount:{amount:String(i?.amount??`0`),currencyCode:String(i?.currencyCode??t)}},lines:o,discountCodes:Array.isArray(n.discountCodes)?n.discountCodes:[]}}function S({variantId:e,quantity:t,productId:n,productTitle:r,price:i,target:a=typeof document>`u`?null:document}){let o=v()?.CartLinesUpdateEvent;if(!o||!a||!e||t<=0)return null;let s=o.createPromise(),c={action:`add`,context:`product`,lines:[{merchandiseId:e,quantity:t}],promise:s.promise};return n&&r&&i&&(c.meta={productId:n,productTitle:r,unitPrice:i.amount,currencyCode:i.currencyCode}),a.dispatchEvent(new o(c)),{resolve:(e,t=[])=>{s.resolve({cart:e,userErrors:t,warnings:[]})},reject:e=>{let t=v()?.CartErrorEvent;t&&a.dispatchEvent(new t({error:e instanceof Error?e.message:String(e),code:`SERVICE_UNAVAILABLE`})),s.reject(e)}}}function C(e,t=typeof window>`u`?null:window){if(!(!t||typeof CustomEvent>`u`)&&(t.dispatchEvent(new CustomEvent(`future-light:cart-add-success`,{detail:e})),typeof window<`u`&&window.Shopify?.analytics?.publish))try{let t=window.Shopify.analytics.publish(`future_light_store:cart_add`,e);Promise.resolve(t).catch(()=>void 0)}catch{}}var w=`vs:cart-open`;function T(){typeof window<`u`&&window.dispatchEvent(new Event(w))}var E=`
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`,D=`
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
`,O=`
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
`,k=`
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
`,A=`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
      warnings { code message }
    }
  }
`;function j(e){try{let t=new URL(e);return t.searchParams.set(`channel`,`online_store`),t.toString()}catch{return e}}function M(e=[],t=[]){return e[0]?.message??t[0]?.message??`This item is currently unavailable.`}function N(e=[]){return e.some(e=>e.code===`MERCHANDISE_OUT_OF_STOCK`)}function P(e,t,n){let r=e?.lines?.edges?.find(e=>e.node?.merchandise?.id===t);return!!(r?.node&&Number(r.node.quantity)>=n&&Number(e?.totalQuantity)>=n)}function F(e){return e.some(e=>e.message.toLowerCase().includes(`cart not found`)||e.message.toLowerCase().includes(`does not exist`))}async function I(e){let t=(await r(D,{input:{lines:[{quantity:e.quantity,merchandiseId:e.variantId}]}}))?.data?.cartCreate,n=t?.userErrors??[],i=t?.warnings??[],a=t?.cart,o=a?.lines?.edges?.find(t=>t.node?.merchandise?.id===e.variantId)?.node?.id;return n.length>0||!a?.checkoutUrl||!o||!P(a,e.variantId,e.quantity)?(console.warn(`Cart creation did not accept the requested item`,{userErrors:n,warnings:i}),{success:!1,message:M(i,n),unavailable:N(i)}):{success:!0,cartId:a.id,checkoutUrl:j(a.checkoutUrl),lineId:o,cart:a}}async function L(e,t){let n=(await r(O,{cartId:e,lines:[{quantity:t.quantity,merchandiseId:t.variantId}]}))?.data?.cartLinesAdd,i=n?.userErrors??[],a=n?.warnings??[];if(F(i))return{success:!1,cartNotFound:!0,message:M(a,i),unavailable:N(a)};if(i.length>0)return console.error(`Add line failed:`,i),{success:!1,message:M(a,i),unavailable:N(a)};let o=n?.cart,s=(o?.lines?.edges??[]).find(e=>e.node.merchandise.id===t.variantId);return P(o,t.variantId,t.quantity)?{success:!0,lineId:s?.node?.id,cart:o}:(console.warn(`Shopify did not accept the requested cart line`,{warnings:a}),{success:!1,message:M(a),unavailable:N(a)})}async function R(e,t,n){let i=(await r(k,{cartId:e,lines:[{id:t,quantity:n}]}))?.data?.cartLinesUpdate,a=i?.userErrors??[],o=i?.warnings??[];if(F(a))return{success:!1,cartNotFound:!0,message:M(o,a),unavailable:N(o)};if(a.length>0)return{success:!1,message:M(o,a),unavailable:N(o)};let s=i?.cart,c=s?.lines?.edges?.find(e=>e.node?.id===t);return!c?.node||Number(c.node.quantity)<n?{success:!1,message:M(o),unavailable:N(o)}:{success:!0,cart:s}}async function z(e,t){let n=(await r(A,{cartId:e,lineIds:[t]}))?.data?.cartLinesRemove,i=n?.userErrors??[],a=n?.warnings??[];return F(i)?{success:!1,cartNotFound:!0}:i.length>0?{success:!1,message:M(a,i)}:{success:!0}}var B=f()(h((e,t)=>({items:[],cartId:null,checkoutUrl:null,isLoading:!1,isSyncing:!1,addItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n.variantId),s=null;e({isLoading:!0});try{if(!i){s=S({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let t=await I({...n,lineId:null});return t.success?(e({cartId:t.cartId,checkoutUrl:t.checkoutUrl,items:[{...n,lineId:t.lineId}]}),s?.resolve(x(t.cart,n.price.currencyCode)),C({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}):(s?.resolve(null,[{field:[],message:t.message}]),t)}else if(o){let r=o.quantity+n.quantity;if(!o.lineId)return{success:!1,message:`This item is currently unavailable.`};s=S({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let c=await R(i,o.lineId,r);if(c.success){let i=t().items;return e({items:i.map(e=>e.variantId===n.variantId?{...e,quantity:r}:e)}),s?.resolve(x(c.cart,n.price.currencyCode)),C({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else c.cartNotFound&&a();let l=c.message??`Cart line update failed`;return s?.resolve(null,[{field:[],message:l}]),{success:!1,message:l,unavailable:c.unavailable}}else{s=S({variantId:n.variantId,quantity:n.quantity,productId:n.product.node.id,productTitle:n.product.node.title,price:n.price});let r=await L(i,{...n,lineId:null});if(r.success){let i=t().items;return e({items:[...i,{...n,lineId:r.lineId??null}]}),s?.resolve(x(r.cart,n.price.currencyCode)),C({productId:n.product.node.id,productTitle:n.product.node.title,variantId:n.variantId,quantity:n.quantity,price:n.price}),{success:!0}}else r.cartNotFound&&a();let o=r.message??`Cart line add failed`;return s?.resolve(null,[{field:[],message:o}]),{success:!1,message:o,unavailable:r.unavailable}}}catch(e){return console.error(`Failed to add item:`,e),s?.reject(e),{success:!1,message:`Couldn’t add this item right now.`}}finally{e({isLoading:!1})}},updateQuantity:async(n,r)=>{if(r<=0){await t().removeItem(n);return}let{items:i,cartId:a,clearCart:o}=t(),s=i.find(e=>e.variantId===n);if(!(!s?.lineId||!a)){e({isLoading:!0});try{let i=await R(a,s.lineId,r);if(i.success){let i=t().items;e({items:i.map(e=>e.variantId===n?{...e,quantity:r}:e)})}else i.cartNotFound&&o()}catch(e){console.error(`Failed to update quantity:`,e)}finally{e({isLoading:!1})}}},removeItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n);if(!(!o?.lineId||!i)){e({isLoading:!0});try{let r=await z(i,o.lineId);if(r.success){let r=t().items.filter(e=>e.variantId!==n);r.length===0?a():e({items:r})}else r.cartNotFound&&a()}catch(e){console.error(`Failed to remove item:`,e)}finally{e({isLoading:!1})}}},clearCart:()=>e({items:[],cartId:null,checkoutUrl:null}),getCheckoutUrl:()=>t().checkoutUrl,syncCart:async()=>{let{cartId:n,isSyncing:i,clearCart:a}=t();if(!(!n||i)){e({isSyncing:!0});try{let e=await r(E,{id:n});if(!e?.data||!Object.prototype.hasOwnProperty.call(e.data,`cart`))return;let t=e.data.cart;t?.id===n&&t.totalQuantity===0&&a()}catch(e){console.error(`Failed to sync cart:`,e)}finally{e({isSyncing:!1})}}}}),{name:`vs-cart`,storage:p(()=>localStorage),partialize:e=>({items:e.items,cartId:e.cartId,checkoutUrl:e.checkoutUrl})}));export{p as a,a as c,b as i,i as l,T as n,h as o,B as r,f as s,w as t};