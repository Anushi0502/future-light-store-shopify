import{t as e}from"./client-CTYVcYE_.js";var t=!0;function n(e){let t=e.variants?.edges?.map(e=>e.node).filter(Boolean)??[];return e.availableForSale===!0||t.some(e=>e.availableForSale===!0)?!0:t.length>0&&t.every(e=>e.availableForSale===!1)?!1:e.availableForSale!==!1}var r,i;function a(){if(typeof window>`u`)return;if(window.SALT_THEME_ASSETS)return window.SALT_THEME_ASSETS;if(r)return r;if(typeof document>`u`)return;let e=Array.from(document.scripts).find(e=>e.textContent?.includes(`window.SALT_THEME_ASSETS`))?.textContent?.match(/window\.SALT_THEME_ASSETS\s*=\s*(\{[\s\S]*?\})\s*;/);if(e?.[1]){try{r=JSON.parse(e[1])}catch{return}return r}}function o(e){return typeof window>`u`?e:a()?.[e]??e}async function s(e){let t=o(e);if(t===e&&typeof window<`u`&&typeof document<`u`)for(let n=0;n<40&&t===e;n+=1)await new Promise(e=>setTimeout(e,50)),t=o(e);let n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Theme catalog request failed (${n.status})`);return await n.json()}async function c(){try{let e=await s(`/data/product-seo.json`),t=new Map;for(let n of e.products??[]){let e=String(n.handle??``).trim();e&&t.set(e,n)}return t}catch(e){return console.warn(`Product SEO artifact unavailable; using Shopify catalog copy`,e),new Map}}function l(){return i??=c(),i}function u(e,t){let n=t.get(e.handle);if(!n)return e;let r=String(n.seoTitle||n.title||``).trim(),i=String(n.seoDescription||``).trim(),a=String(n.descriptionHtml||``).trim();return{...e,...r?{title:r}:{},...i?{description:i}:{},...a?{descriptionHtml:a}:{},...n.productType?{productType:n.productType}:{}}}async function d(e){let t=await l();return t.size?e.map(e=>({...e,node:u(e.node,t)})):e}function f(e,t){let n=String(t??``).match(/\d+$/)?.[0];return n?`gid://shopify/${e}/${n}`:``}function p(e,t=`USD`){return{amount:String(e??`0`),currencyCode:t}}function m(e){let t=f(`Product`,e.id),n=String(e.handle??``).trim(),r=String(e.title??``).trim();if(!t||!n||!r)return null;let i=(Array.isArray(e.variants)?e.variants:[]).map(e=>{let t=f(`ProductVariant`,e.id);if(!t)return null;let n=p(e.price),r=e.compare_at_price==null?null:p(e.compare_at_price);return{id:t,title:String(e.title??`Default Title`),price:n,compareAtPrice:r,availableForSale:!!e.available,selectedOptions:[]}}).filter(e=>!!e),a=e.image??e.images?.[0]??null,o=a?.src?[{node:{url:a.src,altText:a.alt??null}}]:[],s=i[0],c=s?.price??p(0),l=s?.compareAtPrice??null,u=Array.isArray(e.tags)?e.tags:String(e.tags??``).split(`,`).map(e=>e.trim()).filter(Boolean);return{node:{id:t,title:r,description:String(e.body_html??``),handle:n,vendor:String(e.vendor??``),productType:String(e.product_type??``),tags:u,updatedAt:e.updated_at,availableForSale:i.some(e=>e.availableForSale),priceRange:{minVariantPrice:c},...l?{compareAtPriceRange:{minVariantPrice:l}}:{},images:{edges:o},variants:{edges:i.map(e=>({node:e}))},variantsCount:{count:Math.max(Number(e.variant_count)||0,i.length)},options:[]}}}function h(e){let t=f(`Product`,e.legacyResourceId??e.id),n=String(e.handle??``).trim(),r=String(e.title??``).trim();if(!t||!n||!r)return null;let i=(e.variants??[]).map(e=>{let t=f(`ProductVariant`,e.legacyResourceId??e.id);if(!t)return null;let n=p(e.price),r=e.compare_at_price==null?null:p(e.compare_at_price);return{id:t,title:String(e.title??`Default Title`),price:n,compareAtPrice:r,availableForSale:!!e.available,quantityAvailable:e.inventory_quantity==null?null:Number(e.inventory_quantity),selectedOptions:[]}}).filter(e=>!!e);if(i.length===0)return null;let a=e.image??e.images?.[0]??null,o=(e.images??(a?[a]:[])).filter(e=>e?.src).slice(0,6).map(e=>({node:{url:e.src,altText:e.alt??null}})),s=i.map(e=>Number(e.price.amount)).filter(e=>Number.isFinite(e)),c=i.map(e=>Number(e.compareAtPrice?.amount)).filter(e=>Number.isFinite(e)&&e>0),l=String(e.productType??e.product_type??``),u=(e.options??[]).map(e=>({name:String(e.name??``),values:e.values??[]})).filter(e=>e.name&&e.values.length>0);return{node:{id:t,title:r,description:String(e.descriptionHtml??e.body_html??``),descriptionHtml:e.descriptionHtml,handle:n,vendor:String(e.vendor??``),productType:l,tags:Array.isArray(e.tags)?e.tags:String(e.tags??``).split(`,`).map(e=>e.trim()).filter(Boolean),updatedAt:e.updated_at,availableForSale:i.some(e=>e.availableForSale),variantsCount:{count:i.length},priceRange:{minVariantPrice:p(s.length?Math.min(...s):0)},...c.length>0?{compareAtPriceRange:{minVariantPrice:p(Math.min(...c))}}:{},images:{edges:o},variants:{edges:i.map(e=>({node:e}))},options:u}}}async function g(){let e=await s(`/data/product-search.json`),t=(e.shards??[]).map(e=>e.path).filter(Boolean);if(t.length===0)throw Error(`Theme search catalog has no shards`);let n=(await Promise.all(t.map(e=>s(e)))).flatMap(e=>e.products??[]).map(m).filter(e=>!!e);if(Number.isFinite(e.total)&&n.length<Number(e.total))throw Error(`Theme search catalog is incomplete`);return d(n)}async function _(){let e=await s(`/data/product-browse.json`),t=(e.shards??[]).map(e=>e.path).filter(Boolean);if(t.length===0)throw Error(`Theme product catalog has no shards`);let n=(await Promise.all(t.map(e=>s(e)))).flatMap(e=>e.products??[]).map(h).filter(e=>!!e);if(Number.isFinite(e.total)&&n.length<Number(e.total))throw Error(`Theme product catalog is incomplete`);return d(n)}var v=`
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
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 6) { edges { node { url altText } } }
  variants(first: 25) {
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
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`,b=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${v} }
  }
`,x=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,S=`
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      updatedAt
      image { url altText }
      products(first: $first) { edges { node { ${v} } } }
    }
  }
`;async function C(n,r={}){if(!t)return null;let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:n,variables:r}});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function w(e=50,t){return d((await C(y,{first:e,after:null,query:t??null}))?.data?.products?.edges??[])}async function T(){try{let e=await g();if(e.length>0)return e}catch(e){console.warn(`Static search catalog unavailable; using Shopify search fallback`,e)}return w(99)}async function E(e){if(!e)try{let e=await _();if(e.length>0)return e}catch(e){console.warn(`Static product catalog unavailable; using Shopify catalog fallback`,e)}let t=[],n=null,r=!0;for(;r;){let i=(await C(y,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return d(t)}async function D(e){let t=(await C(b,{handle:e}))?.data?.product??null;return t?u(t,await l()):null}async function O(e=20){return((await C(x,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function k(e){let t=(await C(S,{handle:e,first:100}))?.data?.collection;if(!t)return null;let n=await d(t.products?.edges??[]);return{...t,products:n}}function A(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function j(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{D as a,A as c,C as d,O as i,n as l,E as n,w as o,k as r,T as s,j as t,t as u};