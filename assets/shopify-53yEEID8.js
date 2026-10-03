import{t as e}from"./client-CTYVcYE_.js";async function t(e,t,n){let r=Array.isArray(e?.edges)?[...e.edges]:null;if(!r)throw Error(`Shopify product returned no variant connection`);let i=Number.isInteger(n)&&n>=0?n:null;if(i!==null&&r.length>i)throw Error(`Shopify returned more variants than its verified count`);let a=new Set;for(let e of r){let t=e?.node?.id;if(!t||a.has(t))throw Error(`Shopify returned an invalid or duplicate variant`);a.add(t)}let o=e?.pageInfo,s=new Set;for(;o?.hasNextPage===!0;){let e=o.endCursor;if(!e||s.has(e))throw Error(`Shopify variant pagination did not advance`);s.add(e);let n=await t(e),c=n?.edges;if(!Array.isArray(c)||c.length===0)throw Error(`Shopify returned an incomplete variant page`);for(let e of c){let t=e?.node?.id;if(!t||a.has(t))throw Error(`Shopify returned an invalid or duplicate variant`);a.add(t),r.push(e)}if(i!==null&&r.length>i)throw Error(`Shopify variant pages exceed the verified variant count`);if(o=n.pageInfo,!o||typeof o.hasNextPage!=`boolean`)throw Error(`Shopify returned incomplete variant pagination metadata`)}if(!o||o.hasNextPage!==!1)throw Error(`Shopify variant pagination is incomplete`);if(i!==null&&r.length!==i)throw Error(`Shopify variant pages do not match the verified variant count`);return r}var n=5e6,r=`https://vs-store-us.myshopify.com`,i=new Set([`cdn.shopify.com`]);function a(e){let t=String(e??``).split(`/`).pop()??``;return/^\d+$/.test(t)?t:``}function o(e){if(typeof e!=`string`||!e.trim())return``;try{let t=new URL(e.startsWith(`//`)?`https:${e}`:e);return t.protocol!==`https:`||!i.has(t.hostname.toLowerCase())?``:t.toString()}catch{return``}}function s(e){let t=new Map,n=(e,n=[])=>{let r=o(e?.url??e?.src);if(!r)return;let i=t.get(r)??{id:a(e?.id)||null,url:r,altText:typeof e?.altText==`string`?e.altText.slice(0,500):null,variantIds:[]};i.variantIds=[...new Set([...i.variantIds,...n.map(a).filter(Boolean)])],i.id||=a(e?.id)||null,!i.altText&&typeof e?.alt==`string`&&(i.altText=e.alt.slice(0,500)),t.set(r,i)};for(let t of Array.isArray(e?.images)?e.images.slice(0,250):[])n(t,Array.isArray(t?.variant_ids)?t.variant_ids:[]);for(let t of Array.isArray(e?.variants)?e.variants.slice(0,1e4):[])t?.featured_image&&n(t.featured_image,[t.id]);return[...t.values()]}function c(e,{handle:t,productId:n,requireVariantCount:r=!1}){if(!e||e.handle!==t||!Array.isArray(e.variants))return null;let i=Number(e.variant_count);if(r&&!Number.isSafeInteger(i)||Number.isSafeInteger(i)&&i!==e.variants.length)return null;let o=a(e.productId??e.id),c=a(n);return!o||c&&o!==c?null:{productId:o,handle:t,images:s(e)}}function l(e,t,r=globalThis.document){if(!r?.getElementById||!e)return null;let i=r.getElementById(`vs-shopify-product-media`)?.textContent;if(typeof i!=`string`||!i||i.length>n)return null;try{return c(JSON.parse(i),{handle:e,productId:t,requireVariantCount:!0})}catch{return null}}async function u({handle:e,productId:t,documentRef:n=globalThis.document,windowRef:r=globalThis.window,fetcher:i=globalThis.fetch}){let a=(n?.getElementById?.(`root`))?.dataset?.shopBaseUrl,o=r?.location?.origin;if(!e||!t||!a||!o||typeof i!=`function`)return null;let s;try{s=new URL(a)}catch{return null}if(s.origin!==o||s.protocol!==`https:`)return null;let l=new AbortController,u=setTimeout(()=>l.abort(),3e3);try{let n=await i(new URL(`/products/${encodeURIComponent(e)}.js`,o).toString(),{headers:{Accept:`application/json`},credentials:`same-origin`,signal:l.signal});return n.ok?c(await n.json(),{handle:e,productId:t}):null}catch{return null}finally{clearTimeout(u)}}async function d({handle:e,productId:t,shopBaseUrl:n=r,fetcher:i=globalThis.fetch}){let o=a(t);if(!o||typeof e!=`string`||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e)||typeof i!=`function`)return null;let s;try{s=new URL(n)}catch{return null}if(s.protocol!==`https:`||s.username||s.password||s.port||!s.hostname.toLowerCase().endsWith(`.myshopify.com`))return null;let l=new AbortController,u=setTimeout(()=>l.abort(),3e3);try{let t=await i(new URL(`/products/${encodeURIComponent(e)}.js`,s.origin).toString(),{headers:{Accept:`application/json`},credentials:`omit`,signal:l.signal});return t.ok?c(await t.json(),{handle:e,productId:o}):null}catch{return null}finally{clearTimeout(u)}}var f=!0,p=12e3,m=4e3,h=4e3;async function g(e=0){let t=0,n=null;for(;t<=e;){let r=(await T(v,{first:250,after:n,query:null}))?.data?.products;if(!r)throw Error(`Shopify live catalog returned no product connection`);if(t===e)return r.edges??[];if(!r.pageInfo?.hasNextPage||!r.pageInfo?.endCursor)return[];n=r.pageInfo.endCursor,t+=1}return[]}var _=`
  id
  title
  seo { title description }
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
  images(first: 250) { edges { node { id url altText } } }
  media(first: 250) {
    edges {
      node {
        mediaContentType
        ... on MediaImage {
          id
          image { id url altText }
        }
      }
    }
  }
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
`;`${_}`;var v=`
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
          images(first: 4) { edges { node { url altText } } }
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
`,y=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${_.replace(`        quantityAvailable
`,``)} }
  }
`,b=`
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
`,x=`
  query GetProductVariantMedia($handle: String!) {
    productVariantMedia(handle: $handle) {
      productId
      handle
      images { id url altText variantIds }
    }
  }
`,S=`
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
`,C=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,w=`
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
  images(first: 4) { edges { node { url altText } } }
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
 } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;async function T(t,n={},r={}){if(!f)throw Error(`Live Shopify catalog is not configured`);let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:t,variables:n},timeout:r.timeout??p});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function E(e=50,t){return(await T(v,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function D(e){let t=e?.trim();return E(99,t||void 0)}async function O(e){return k(e)}async function k(e){let t=[],n=null,r=!0;for(;r;){let i=(await T(v,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return t}async function A(e){let n=(await T(y,{handle:e},{timeout:p}))?.data?.product;if(!n)return null;let r=n.variants;if(!r?.pageInfo)throw Error(`Shopify product returned incomplete variant pagination metadata`);let i=await t(r,async t=>{let r=(await T(b,{handle:e,after:t},{timeout:p}))?.data?.product;if(!r||r.id!==n.id)throw Error(`Shopify returned a variant page for a different product`);return r.variants},n.variantsCount?.count);return{...n,variants:{...n.variants,edges:i}}}async function j(e,t){let n=l(e,t);if(n)return n;let r=await u({handle:e,productId:t??``});if(r)return r;let i=await d({handle:e,productId:t??``});if(i)return i;try{return(await T(x,{handle:e},{timeout:h}))?.data?.productVariantMedia??null}catch{return null}}async function M(e){try{return(await T(S,{handle:e},{timeout:m}))?.data?.product??null}catch{return null}}async function N(e=20){return((await T(C,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function P(e,t=24,n=null){let r=(await T(w,{handle:e,first:t,after:n}))?.data?.collection;if(!r)return null;let i=(r.products?.edges??[]).map(e=>({node:{...e.node,description:e.node.description??``}}));return{...r,products:i,hasNextPage:!!r.products?.pageInfo?.hasNextPage,nextCursor:r.products?.pageInfo?.endCursor??null}}function F(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function I(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{A as a,j as c,F as d,f,N as i,E as l,l as m,O as n,g as o,T as p,P as r,M as s,I as t,D as u};