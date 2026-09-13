import{t as e}from"./client-CTYVcYE_.js";var t=!0,n;function r(){if(typeof window>`u`)return;if(window.SALT_THEME_ASSETS)return window.SALT_THEME_ASSETS;if(n)return n;if(typeof document>`u`)return;let e=Array.from(document.scripts).find(e=>e.textContent?.includes(`window.SALT_THEME_ASSETS`))?.textContent?.match(/window\.SALT_THEME_ASSETS\s*=\s*(\{[\s\S]*?\})\s*;/);if(e?.[1]){try{n=JSON.parse(e[1])}catch{return}return n}}function i(e){return typeof window>`u`?e:r()?.[e]??e}async function a(e){let t=i(e);if(t===e&&typeof window<`u`&&typeof document<`u`)for(let n=0;n<40&&t===e;n+=1)await new Promise(e=>setTimeout(e,50)),t=i(e);let n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Theme catalog request failed (${n.status})`);return await n.json()}function o(e,t){let n=String(t??``).match(/\d+$/)?.[0];return n?`gid://shopify/${e}/${n}`:``}function s(e,t=`USD`){return{amount:String(e??`0`),currencyCode:t}}function c(e){let t=o(`Product`,e.id),n=String(e.handle??``).trim(),r=String(e.title??``).trim();if(!t||!n||!r)return null;let i=(Array.isArray(e.variants)?e.variants:[]).map(e=>{let t=o(`ProductVariant`,e.id);if(!t)return null;let n=s(e.price),r=e.compare_at_price==null?null:s(e.compare_at_price);return{id:t,title:String(e.title??`Default Title`),price:n,compareAtPrice:r,availableForSale:!!e.available,selectedOptions:[]}}).filter(e=>!!e),a=e.image??e.images?.[0]??null,c=a?.src?[{node:{url:a.src,altText:a.alt??null}}]:[],l=i[0],u=l?.price??s(0),d=l?.compareAtPrice??null,f=Array.isArray(e.tags)?e.tags:String(e.tags??``).split(`,`).map(e=>e.trim()).filter(Boolean);return{node:{id:t,title:r,description:String(e.body_html??``),handle:n,vendor:String(e.vendor??``),productType:String(e.product_type??``),tags:f,updatedAt:e.updated_at,availableForSale:i.some(e=>e.availableForSale),priceRange:{minVariantPrice:u},...d?{compareAtPriceRange:{minVariantPrice:d}}:{},images:{edges:c},variants:{edges:i.map(e=>({node:e}))},variantsCount:{count:Math.max(Number(e.variant_count)||0,i.length)},options:[]}}}function l(e){let t=o(`Product`,e.legacyResourceId??e.id),n=String(e.handle??``).trim(),r=String(e.title??``).trim();if(!t||!n||!r)return null;let i=(e.variants??[]).map(e=>{let t=o(`ProductVariant`,e.legacyResourceId??e.id);if(!t)return null;let n=s(e.price),r=e.compare_at_price==null?null:s(e.compare_at_price);return{id:t,title:String(e.title??`Default Title`),price:n,compareAtPrice:r,availableForSale:!!e.available,quantityAvailable:e.inventory_quantity==null?null:Number(e.inventory_quantity),selectedOptions:[]}}).filter(e=>!!e);if(i.length===0)return null;let a=e.image??e.images?.[0]??null,c=(e.images??(a?[a]:[])).filter(e=>e?.src).slice(0,6).map(e=>({node:{url:e.src,altText:e.alt??null}})),l=i.map(e=>Number(e.price.amount)).filter(e=>Number.isFinite(e)),u=i.map(e=>Number(e.compareAtPrice?.amount)).filter(e=>Number.isFinite(e)&&e>0),d=String(e.productType??e.product_type??``),f=(e.options??[]).map(e=>({name:String(e.name??``),values:e.values??[]})).filter(e=>e.name&&e.values.length>0);return{node:{id:t,title:r,description:String(e.descriptionHtml??e.body_html??``),descriptionHtml:e.descriptionHtml,handle:n,vendor:String(e.vendor??``),productType:d,tags:Array.isArray(e.tags)?e.tags:String(e.tags??``).split(`,`).map(e=>e.trim()).filter(Boolean),updatedAt:e.updated_at,availableForSale:i.some(e=>e.availableForSale),variantsCount:{count:i.length},priceRange:{minVariantPrice:s(l.length?Math.min(...l):0)},...u.length>0?{compareAtPriceRange:{minVariantPrice:s(Math.min(...u))}}:{},images:{edges:c},variants:{edges:i.map(e=>({node:e}))},options:f}}}async function u(){let e=await a(`/data/product-search.json`),t=(e.shards??[]).map(e=>e.path).filter(Boolean);if(t.length===0)throw Error(`Theme search catalog has no shards`);let n=(await Promise.all(t.map(e=>a(e)))).flatMap(e=>e.products??[]).map(c).filter(e=>!!e);if(Number.isFinite(e.total)&&n.length<Number(e.total))throw Error(`Theme search catalog is incomplete`);return n}async function d(){let e=await a(`/data/product-browse.json`),t=(e.shards??[]).map(e=>e.path).filter(Boolean);if(t.length===0)throw Error(`Theme product catalog has no shards`);let n=(await Promise.all(t.map(e=>a(e)))).flatMap(e=>e.products??[]).map(l).filter(e=>!!e);if(Number.isFinite(e.total)&&n.length<Number(e.total))throw Error(`Theme product catalog is incomplete`);return n}var f=`
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
`;`${f}`;var p=`
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
`,m=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${f} }
  }
`,h=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,g=`
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      updatedAt
      image { url altText }
      products(first: $first) { edges { node { ${f} } } }
    }
  }
`;async function _(n,r={}){if(!t)return null;let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:n,variables:r}});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function v(e=50,t){return(await _(p,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function y(){try{let e=await u();if(e.length>0)return e}catch(e){console.warn(`Static search catalog unavailable; using Shopify search fallback`,e)}return v(99)}async function b(e){if(!e)try{let e=await d();if(e.length>0)return e}catch(e){console.warn(`Static product catalog unavailable; using Shopify catalog fallback`,e)}let t=[],n=null,r=!0;for(;r;){let i=(await _(p,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return t}async function x(e){return(await _(m,{handle:e}))?.data?.product??null}async function S(e=20){return((await _(h,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function C(e){let t=(await _(g,{handle:e,first:100}))?.data?.collection;return t?{...t,products:t.products?.edges??[]}:null}function w(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function T(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{x as a,w as c,S as i,t as l,b as n,v as o,C as r,y as s,T as t,_ as u};