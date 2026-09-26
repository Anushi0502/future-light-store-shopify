import{t as e}from"./client-CTYVcYE_.js";var t=!0,n=12e3,r=4e3;function i(e){let t=e.variants?.edges?.map(e=>e.node).filter(Boolean)??[];return e.availableForSale===!0||t.some(e=>e.availableForSale===!0)?!0:t.length>0&&t.every(e=>e.availableForSale===!1)?!1:e.availableForSale!==!1}async function a(e=0){let t=0,n=null;for(;t<=e;){let r=(await f(s,{first:250,after:n,query:null}))?.data?.products;if(!r)throw Error(`Shopify live catalog returned no product connection`);if(t===e)return r.edges??[];if(!r.pageInfo?.hasNextPage||!r.pageInfo?.endCursor)return[];n=r.pageInfo.endCursor,t+=1}return[]}var o=`
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
  images(first: 250) { edges { node { url altText } } }
  variants(first: 25) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        quantityAvailable
        image { url altText }
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;`${o}`;var s=`
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
`,c=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${o.replace(`        quantityAvailable
`,``)} }
  }
`,l=`
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
`,u=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,d=`
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
`;async function f(r,i={},a={}){if(!t)throw Error(`Live Shopify catalog is not configured`);let{data:o,error:s}=await e.functions.invoke(`shopify-storefront`,{body:{query:r,variables:i},timeout:a.timeout??n});if(s)throw Error(s.message||`Catalog service is unavailable`);let c=o.data&&Object.values(o.data).some(e=>e!=null);if(o.errors&&!c)throw Error(`Error calling Shopify: ${o.errors.map(e=>e.message).join(`, `)}`);return o}async function p(e=50,t){return(await f(s,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function m(e){let t=e?.trim();return p(99,t||void 0)}async function h(e){return g(e)}async function g(e){let t=[],n=null,r=!0;for(;r;){let i=(await f(s,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return t}async function _(e){return(await f(c,{handle:e},{timeout:n}))?.data?.product??null}async function v(e){try{return(await f(l,{handle:e},{timeout:r}))?.data?.product??null}catch{return null}}async function y(e=20){return((await f(u,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function b(e,t=24,n=null){let r=(await f(d,{handle:e,first:t,after:n}))?.data?.collection;if(!r)return null;let i=(r.products?.edges??[]).map(e=>({node:{...e.node,description:e.node.description??``}}));return{...r,products:i,hasNextPage:!!r.products?.pageInfo?.hasNextPage,nextCursor:r.products?.pageInfo?.endCursor??null}}function x(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function S(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{_ as a,p as c,i as d,t as f,y as i,m as l,h as n,a as o,f as p,b as r,v as s,S as t,x as u};