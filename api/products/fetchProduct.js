import { gqlQuery } from "../client";
export const fetchProduct = async (id) => {
   
        try {
  
          const query = `
          query{
            product(id:"${id}"){
              id 
              title
               priceRange{
                minVariantPrice{
                  amount
                  currencyCode
                }
                maxVariantPrice{
                  amount
                  currencyCode
                }
                
              }
              
              compareAtPriceRange{
                 minVariantPrice{
                  amount
                  currencyCode
                }
                maxVariantPrice{
                  amount
                  currencyCode
                }
              }
              images(first:150){
                nodes{
                  url
                }
              }
              
              options{
                name
                values
              }
            
              variants(first: 250){
                nodes{
                  id
                  title
                  availableForSale
                  selectedOptions{
                    name
                    value
                  }
                  price{
                    amount
                    currencyCode
                  }
                  compareAtPrice{
                    amount
                    currencyCode
                  }
                  image{
                    url
                  }
                  
                }
              }
             
            }
          }
          `
  
  
          const queryResponse = await gqlQuery(query);

    
          return queryResponse?.data?.product;
         
        } catch (error) {
          console.error(error);
          return null
        }
     
  
   
  }