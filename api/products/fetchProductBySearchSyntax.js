import { gqlQuery } from "../client";

export async function fetchProductsBySearchSyntax(query) {
  console.log("query", query);
    try {
        const queryString = `query searchProd{
            products(first:250, query:"${query}"){
              nodes{
                id
                title
               priceRange{
                maxVariantPrice{
                  amount
                  currencyCode
                }
                minVariantPrice{
                  amount
                  currencyCode
                }
              }
                compareAtPriceRange{
                  maxVariantPrice{
                    amount
                    currencyCode
                  }
                  minVariantPrice{
                    amount
                    currencyCode
                  }
                }
                featuredImage{
                  url
                }
                images (first: 1){
                  nodes {
                    url(transform: {maxHeight: 80, maxWidth: 80})
                  }
                }

              }
              pageInfo{
                hasNextPage
                endCursor
              }
            }
          }`

         

          let data = await gqlQuery(queryString);
      
          return data?.data?.products?.nodes;
    } catch (error) {
      console.log(error)
          return [];
    }
}