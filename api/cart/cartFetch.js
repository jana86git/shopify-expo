// api.js
import React, { useState, useEffect } from 'react';
import { gqlQuery } from '../client';


export async function cartFetch(id) {
    try {
        let query = `query {
            cart(id:"${id}") {
              id
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
          }`

        let cartResponse = await gqlQuery(query);
        return cartResponse
    } catch (error) {
        console.log("error: ", error)
        return error
    }
}