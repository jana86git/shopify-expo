import React, { useState, useEffect } from 'react';

import { gqlQuery } from '../client';

export async function cartCreate(lineItems) {
  

        try {
            let query = `
            mutation cartCreate($input: CartInput) {
                cartCreate(input: $input) {
                  cart {
                   id
                    checkoutUrl
                    totalQuantity
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `

            let variables = {
                "input": {
                    "lines": lineItems
                }
            }

            const queryResponse = await gqlQuery(query, variables);

            return queryResponse


        } catch (error) {
            console.log(error)
            return error
        }
    



}
