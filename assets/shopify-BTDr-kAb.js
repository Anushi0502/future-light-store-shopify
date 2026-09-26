import{t as e}from"./client-CTYVcYE_.js";async function t(e,t,n){let r=Array.isArray(e?.edges)?[...e.edges]:null;if(!r)throw Error(`Shopify product returned no variant connection`);let i=Number.isInteger(n)&&n>=0?n:null;if(i!==null&&r.length>i)throw Error(`Shopify returned more variants than its verified count`);let a=new Set;for(let e of r){let t=e?.node?.id;if(!t||a.has(t))throw Error(`Shopify returned an invalid or duplicate variant`);a.add(t)}let o=e?.pageInfo,s=new Set;for(;o?.hasNextPage===!0;){let e=o.endCursor;if(!e||s.has(e))throw Error(`Shopify variant pagination did not advance`);s.add(e);let n=await t(e),c=n?.edges;if(!Array.isArray(c)||c.length===0)throw Error(`Shopify returned an incomplete variant page`);for(let e of c){let t=e?.node?.id;if(!t||a.has(t))throw Error(`Shopify returned an invalid or duplicate variant`);a.add(t),r.push(e)}if(i!==null&&r.length>i)throw Error(`Shopify variant pages exceed the verified variant count`);if(o=n.pageInfo,!o||typeof o.hasNextPage!=`boolean`)throw Error(`Shopify returned incomplete variant pagination metadata`)}if(!o||o.hasNextPage!==!1)throw Error(`Shopify variant pagination is incomplete`);if(i!==null&&r.length!==i)throw Error(`Shopify variant pages do not match the verified variant count`);return r}function n(e,t){if(!Array.isArray(e))return 0;let n=r(t),i=n?e.findIndex(e=>r(e)===n):-1;return i>=0?i:0}function r(e){return typeof e!=`string`||!e.trim()?``:e.trim().split(/[?#]/,1)[0]}function i(e){let t=e?.image;return t?.url?t:null}function a(e,t=[]){let n=[...(e?.images?.edges??[]).map(e=>e?.node),...(e?.media?.edges??[]).filter(e=>e?.node?.mediaContentType===`IMAGE`).map(e=>{let t=e.node,n=t.image;return n?.url?{...n,altText:n.altText||t.alt||null}:null}),...t.map(i)],a=new Map;for(let e of n){if(!e?.url)continue;let t=r(e.url);a.has(t)||a.set(t,e)}return[...a.values()]}function o(e,t,n){return e&&t?.some(t=>t.id===e)?e:n&&t?.some(e=>e.id===n)?n:t?.[0]?.id??null}function s(e,t){if(!e||!t||t.handle!==e.handle||l(t.productId)!==l(e.id))return e;let n=(t.images??[]).filter(e=>f(e?.url));if(n.length===0)return e;let o=a(e,e.variants?.edges?.map(e=>e.node)??[]),s=new Map(o.map(e=>[r(e.url),e]));for(let e of n){let t=r(e.url);s.has(t)||s.set(t,{url:e.url,altText:e.altText??null})}let u=[...s.values()],d=r(u[0]?.url),p=new Map;for(let e of n)for(let t of e.variantIds??[]){let n=l(t);n&&!p.has(n)&&p.set(n,e)}let m=(e.variants?.edges??[]).map(e=>{let t=e.node,a=l(t.id),o=a?p.get(a):null,s=i(t),u=s&&r(s.url)!==d,f=c(t,n),m=o??(u?s:f);return{...t,image:m?{id:m.id??null,url:m.url,altText:m.altText??null}:null}});return{...e,images:{edges:u.map(e=>({node:e}))},variants:{...e.variants,edges:m.map(e=>({node:e}))}}}function c(e,t){let n=(e?.selectedOptions??[]).filter(e=>/^(color|colour|pattern|finish|style|design)$/i.test(String(e?.name??``).trim()));for(let e of n){let n=u(e?.value);if(!n||/^(default title|one size|standard|regular)$/i.test(n))continue;let r=t.filter(e=>{let t=d(e.url);return u(`${e.altText??``} ${t}`).includes(n)});if(r.length===1)return r[0]}return null}function l(e){let t=String(e??``).split(`/`).pop()??``;return/^\d+$/.test(t)?t:``}function u(e){return String(e??``).normalize(`NFKD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,` `).trim().replace(/\s+/g,` `)}function d(e){try{return decodeURIComponent(new URL(e).pathname.split(`/`).pop()??``).replace(/\.[^.]+$/,``)}catch{return``}}function f(e){try{return new URL(e.startsWith(`//`)?`https:${e}`:e).protocol===`https:`}catch{return!1}}var p=!0,m=12e3,h=4e3,g=7e3;async function _(e=0){let t=0,n=null;for(;t<=e;){let r=(await E(y,{first:250,after:n,query:null}))?.data?.products;if(!r)throw Error(`Shopify live catalog returned no product connection`);if(t===e)return r.edges??[];if(!r.pageInfo?.hasNextPage||!r.pageInfo?.endCursor)return[];n=r.pageInfo.endCursor,t+=1}return[]}var v=`
  id
  title
  description
  descriptionHtml
  handle
  vendor
  productType
  tags
  updatedAt
  availableForSale
  variantsCount { count }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 250) { edges { node { url altText } } }
  variants(first: 250) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        quantityAvailable
        image { id url altText }
        selectedOptions { name value }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
  options { name values }
`;`${v}`;var y=`
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          id
          title
          handle
          vendor
          productType
          tags
          updatedAt
          availableForSale
          variantsCount { count }
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                availableForSale
                image { url altText }
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`,b=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${v.replace(`        quantityAvailable
`,``)} }
  }
`,x=`
  query GetProductVariantPage($handle: String!, $after: String!) {
    product(handle: $handle) {
      id
      variants(first: 250, after: $after) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            availableForSale
            image { url altText }
            selectedOptions { name value }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`,S=`
  query GetProductVariantMedia($handle: String!) {
    productVariantMedia(handle: $handle) {
      productId
      handle
      images { id url altText variantIds }
    }
  }
`,C=`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      variants(first: 25) {
        edges {
          node {
            id
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  }
`,w=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,T=`
  query GetCollection($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      updatedAt
      image { url altText }
      products(first: $first, after: $after) {
        edges { node {
  id
  title
  handle
  vendor
  productType
  tags
  updatedAt
  availableForSale
  variantsCount { count }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 1) { edges { node { url altText } } }
  variants(first: 1) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
 } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;async function E(t,n={},r={}){if(!p)throw Error(`Live Shopify catalog is not configured`);let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:t,variables:n},timeout:r.timeout??m});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function D(e=50,t){return(await E(y,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function O(e){let t=e?.trim();return D(99,t||void 0)}async function k(e){return A(e)}async function A(e){let t=[],n=null,r=!0;for(;r;){let i=(await E(y,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return t}async function j(e){let n=(await E(b,{handle:e},{timeout:m}))?.data?.product;if(!n)return null;let r=E(S,{handle:e},{timeout:g}).then(e=>e?.data?.productVariantMedia??null).catch(()=>null),i=n.variants;if(!i?.pageInfo)throw Error(`Shopify product returned incomplete variant pagination metadata`);let a=await t(i,async t=>{let r=(await E(x,{handle:e,after:t},{timeout:m}))?.data?.product;if(!r||r.id!==n.id)throw Error(`Shopify returned a variant page for a different product`);return r.variants},n.variantsCount?.count);return s({...n,variants:{...n.variants,edges:a}},await r)}async function M(e){try{return(await E(C,{handle:e},{timeout:h}))?.data?.product??null}catch{return null}}async function N(e=20){return((await E(w,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function P(e,t=24,n=null){let r=(await E(T,{handle:e,first:t,after:n}))?.data?.collection;if(!r)return null;let i=(r.products?.edges??[]).map(e=>({node:{...e.node,description:e.node.description??``}}));return{...r,products:i,hasNextPage:!!r.products?.pageInfo?.hasNextPage,nextCursor:r.products?.pageInfo?.endCursor??null}}function F(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function I(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{j as a,D as c,p as d,E as f,n as g,o as h,N as i,O as l,i as m,k as n,_ as o,a as p,P as r,M as s,I as t,F as u};