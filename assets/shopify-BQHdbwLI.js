import{t as e}from"./client-CTYVcYE_.js";var t=!0,n=`
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
`,r=`
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges { node { ${n} } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,i=`
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${n} }
  }
`,a=`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description updatedAt image { url altText } } }
    }
  }
`,o=`
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      updatedAt
      image { url altText }
      products(first: $first) { edges { node { ${n} } } }
    }
  }
`;async function s(n,r={}){if(!t)return null;let{data:i,error:a}=await e.functions.invoke(`shopify-storefront`,{body:{query:n,variables:r}});if(a)throw Error(a.message||`Catalog service is unavailable`);let o=i.data&&Object.values(i.data).some(e=>e!=null);if(i.errors&&!o)throw Error(`Error calling Shopify: ${i.errors.map(e=>e.message).join(`, `)}`);return i}async function c(e=50,t){return(await s(r,{first:e,after:null,query:t??null}))?.data?.products?.edges??[]}async function l(e){let t=[],n=null,i=!0;for(;i;){let a=(await s(r,{first:250,after:n,query:e??null}))?.data?.products;t.push(...a?.edges??[]),i=!!(a?.pageInfo?.hasNextPage&&a?.pageInfo?.endCursor),n=a?.pageInfo?.endCursor??null}return t}async function u(e){return(await s(i,{handle:e}))?.data?.product??null}async function d(e=20){return((await s(a,{first:e}))?.data?.collections?.edges??[]).map(e=>e.node)}async function f(e){let t=(await s(o,{handle:e,first:100}))?.data?.collection;return t?{...t,products:t.products?.edges??[]}:null}function p(e,t=`USD`){let n=typeof e==`string`?parseFloat(e):e;return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t||`USD`,maximumFractionDigits:2}).format(Number.isFinite(n)?n:0)}function m(e,t){if(!t)return 0;let n=parseFloat(e),r=parseFloat(t);return!r||r<=n?0:Math.round((r-n)/r*100)}export{u as a,t as c,d as i,s as l,l as n,c as o,f as r,p as s,m as t};