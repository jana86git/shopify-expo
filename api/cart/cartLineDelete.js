import { gqlQuery } from '../client';
export async function cartLineDelete(deleteInfo) {
    const query = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

      const variables = deleteInfo;

      let resp = await gqlQuery(query, variables);
      return resp;
}