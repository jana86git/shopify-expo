import { gqlQuery } from "../client";

export async function fetchCollectionData(id) {
    try {
        const queryString = `query collection{
            collection(id: "${id}") {
                id
                handle
                title
                description
                      products(first: 250){
                  nodes{
                    id
                    title
                    featuredImage{
                      url
                    }
                    images(first: 250){
                      nodes{
                        url
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
                    priceRange{
                          maxVariantPrice{
                        currencyCode
                        amount
                      }   
                      minVariantPrice{
                        currencyCode
                        amount
                      }
                    }
                  }
                  pageInfo{
                    hasNextPage
                    hasPreviousPage
                    endCursor
                    startCursor
                  }
                }
                image{
                  url
                }
              
              }
          }`

        

          let data = await gqlQuery(queryString);
      
          return data?.data?.collection;
    } catch (error) {
          return [];
    }
}