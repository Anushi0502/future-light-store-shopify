import{a as e,n as t}from"./jsx-runtime-KJkY8l8U.js";import{t as n}from"./createLucideIcon-Dga03Aop.js";import{l as r}from"./shopify-BQHdbwLI.js";var i=n(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),a=n(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),o=e(t(),1),s=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},c=(e=>e?s(e):s),l=e=>e;function u(e,t=l){let n=o.useSyncExternalStore(e.subscribe,o.useCallback(()=>t(e.getState()),[e,t]),o.useCallback(()=>t(e.getInitialState()),[e,t]));return o.useDebugValue(n),n}var d=e=>{let t=c(e),n=e=>u(t,e);return Object.assign(n,t),n},f=(e=>e?d(e):d);function p(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var m=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return m(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return m(t)(e)}}}},h=(e,t)=>(n,r,i)=>{let a={storage:p(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let d=()=>{let e=a.partialize({...r()});return u.setItem(a.name,{state:e,version:a.version})},f=i.setState;i.setState=(e,t)=>(f(e,t),d());let h=e((...e)=>(n(...e),d()),r,i);i.getInitialState=()=>h;let g,_=()=>{if(!u)return;let e=++s;o=!1,c.forEach(e=>e(r()??h));let t=a.onRehydrateStorage?.call(a,r()??h)||void 0;return m(u.getItem.bind(u))(a.name).then(e=>{if(e)if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state];return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(g=a.merge(o,r()??h),n(g,!0),i)return d()}).then(()=>{e===s&&(t?.(r(),void 0),g=r(),o=!0,l.forEach(e=>e(g)))}).catch(n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(u=e.storage)},clearStorage:()=>{++s,u?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>_(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||_(),g||h},g=`
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`,_=`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`,v=`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`,y=`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`,b=`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;function x(e){try{let t=new URL(e);return t.searchParams.set(`channel`,`online_store`),t.toString()}catch{return e}}function S(e){return e.some(e=>e.message.toLowerCase().includes(`cart not found`)||e.message.toLowerCase().includes(`does not exist`))}async function C(e){let t=await r(_,{input:{lines:[{quantity:e.quantity,merchandiseId:e.variantId}]}}),n=t?.data?.cartCreate?.userErrors??[];if(n.length>0)return console.error(`Cart creation failed:`,n),null;let i=t?.data?.cartCreate?.cart;if(!i?.checkoutUrl)return null;let a=i.lines.edges[0]?.node?.id;return a?{cartId:i.id,checkoutUrl:x(i.checkoutUrl),lineId:a}:null}async function w(e,t){let n=await r(v,{cartId:e,lines:[{quantity:t.quantity,merchandiseId:t.variantId}]}),i=n?.data?.cartLinesAdd?.userErrors??[];return S(i)?{success:!1,cartNotFound:!0}:i.length>0?(console.error(`Add line failed:`,i),{success:!1}):{success:!0,lineId:(n?.data?.cartLinesAdd?.cart?.lines?.edges??[]).find(e=>e.node.merchandise.id===t.variantId)?.node?.id}}async function T(e,t,n){let i=(await r(y,{cartId:e,lines:[{id:t,quantity:n}]}))?.data?.cartLinesUpdate?.userErrors??[];return S(i)?{success:!1,cartNotFound:!0}:i.length>0?{success:!1}:{success:!0}}async function E(e,t){let n=(await r(b,{cartId:e,lineIds:[t]}))?.data?.cartLinesRemove?.userErrors??[];return S(n)?{success:!1,cartNotFound:!0}:n.length>0?{success:!1}:{success:!0}}var D=f()(h((e,t)=>({items:[],cartId:null,checkoutUrl:null,isLoading:!1,isSyncing:!1,addItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n.variantId);e({isLoading:!0});try{if(!i){let t=await C({...n,lineId:null});t&&e({cartId:t.cartId,checkoutUrl:t.checkoutUrl,items:[{...n,lineId:t.lineId}]})}else if(o){let r=o.quantity+n.quantity;if(!o.lineId)return;let s=await T(i,o.lineId,r);if(s.success){let i=t().items;e({items:i.map(e=>e.variantId===n.variantId?{...e,quantity:r}:e)})}else s.cartNotFound&&a()}else{let r=await w(i,{...n,lineId:null});if(r.success){let i=t().items;e({items:[...i,{...n,lineId:r.lineId??null}]})}else r.cartNotFound&&a()}}catch(e){console.error(`Failed to add item:`,e)}finally{e({isLoading:!1})}},updateQuantity:async(n,r)=>{if(r<=0){await t().removeItem(n);return}let{items:i,cartId:a,clearCart:o}=t(),s=i.find(e=>e.variantId===n);if(!(!s?.lineId||!a)){e({isLoading:!0});try{let i=await T(a,s.lineId,r);if(i.success){let i=t().items;e({items:i.map(e=>e.variantId===n?{...e,quantity:r}:e)})}else i.cartNotFound&&o()}catch(e){console.error(`Failed to update quantity:`,e)}finally{e({isLoading:!1})}}},removeItem:async n=>{let{items:r,cartId:i,clearCart:a}=t(),o=r.find(e=>e.variantId===n);if(!(!o?.lineId||!i)){e({isLoading:!0});try{let r=await E(i,o.lineId);if(r.success){let r=t().items.filter(e=>e.variantId!==n);r.length===0?a():e({items:r})}else r.cartNotFound&&a()}catch(e){console.error(`Failed to remove item:`,e)}finally{e({isLoading:!1})}}},clearCart:()=>e({items:[],cartId:null,checkoutUrl:null}),getCheckoutUrl:()=>t().checkoutUrl,syncCart:async()=>{let{cartId:n,isSyncing:i,clearCart:a}=t();if(!(!n||i)){e({isSyncing:!0});try{let e=await r(g,{id:n});if(!e)return;let t=e?.data?.cart;(!t||t.totalQuantity===0)&&a()}catch(e){console.error(`Failed to sync cart:`,e)}finally{e({isSyncing:!1})}}}}),{name:`vs-cart`,storage:p(()=>localStorage),partialize:e=>({items:e.items,cartId:e.cartId,checkoutUrl:e.checkoutUrl})}));export{a,f as i,p as n,i as o,h as r,D as t};