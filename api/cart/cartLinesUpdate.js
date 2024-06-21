// api.js
import React, { useState, useEffect } from 'react';
import { gqlQuery } from '../client';


export async function cartLinesUpdate(lines) {
  try {
    let query = `
        mutation cartLinesUpdate($id: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $id, lines: $lines) {
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
          }
            `

    let variables = lines

    const queryResponse = await gqlQuery(query, variables);

    return queryResponse
  } catch (error) {
    console.log("error: ", error)
    return error
  }
}