import{t as e}from"./client-CTYVcYE_.js";var t=!0;function n(e){let t=e.variants?.edges?.map(e=>e.node).filter(Boolean)??[];return e.availableForSale===!0||t.some(e=>e.availableForSale===!0)?!0:t.length>0&&t.every(e=>e.availableForSale===!1)?!1:e.availableForSale!==!1}async function r(e=0){let t=0,n=null;for(;t<=e;){let r=(await l(a,{first:250,after:n,query:null}))?.data?.products;if(!r)throw Error(`Shopify live catalog returned no product connection`);if(t===e)return r.edges??[];if(!r.pageInfo?.hasNextPage||!r.pageInfo?.endCursor)return[];n=r.pageInfo.endCursor,t+=1}return[]}var i=`
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
`;`${i}`;var a=`
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
`,o=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${i} }
  }
`,s=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,c=`
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      updatedAt
      image { url altText }
      products(first: $first) { edges { node {
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
 } } }
    }
  }
`;async function l(n,r={}){if(!t)throw Error(`Live Shopify catalog is not configured`);let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:n,variables:r}});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function u(e=50,t){return(await l(a,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function d(e){let t=e?.trim();return u(99,t||void 0)}async function f(e){return p(e)}async function p(e){let t=[],n=null,r=!0;for(;r;){let i=(await l(a,{first:250,after:n,query:e??null}))?.data?.products;t.push(...i?.edges??[]),r=!!(i?.pageInfo?.hasNextPage&&i?.pageInfo?.endCursor),n=i?.pageInfo?.endCursor??null}return t}async function m(e){return(await l(o,{handle:e}))?.data?.product??null}async function h(e=20){return((await l(s,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function g(e){let t=(await l(c,{handle:e,first:100}))?.data?.collection;if(!t)return null;let n=(t.products?.edges??[]).map(e=>({node:{...e.node,description:e.node.description??``}}));return{...t,products:n}}function _(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function v(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{m as a,d as c,t as d,l as f,h as i,_ as l,f as n,r as o,g as r,u as s,v as t,n as u};