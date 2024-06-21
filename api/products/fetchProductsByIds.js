import { gqlQuery } from "../client";

export async function fetchProductsByIds(ids) {
    try {
        const queryString = `query Products($ids: [ID!]!) {
            nodes(ids: $ids) {
              ... on Product {
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
            }
          }`

          const variable = {
            "ids": ids
          }

          let data = await gqlQuery(queryString, variable);
      
          return data?.data?.nodes;
    } catch (error) {
          return [];
    }
}