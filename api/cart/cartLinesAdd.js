import { gqlQuery } from '../client';

export async function cartLinesAdd(cartId, lines){
    let query = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            lines(first: 250) {
              
              nodes {
                          id
                quantity
                discountAllocations{
                  discountedAmount{
                    currencyCode
                    amount
                  }
                }
                cost{
                  totalAmount{
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
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
                  
                    
                    product{
                      title
                      featuredImage{
                        url
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                }
              }
            
          },
          totalQuantity,
          cost{
            totalAmount{
              amount
              currencyCode
            }
            subtotalAmount{
              amount
              currencyCode
            }
            totalTaxAmount{
              amount
              currencyCode
            }
            
          },
          checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }`

    let variables = {
        "cartId":cartId,
        "lines": lines
      }

      console.log("varianles for new line add cart :::; ", variables)

    let resp = await gqlQuery(query, variables);
    return resp;
}