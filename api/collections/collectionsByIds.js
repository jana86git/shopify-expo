import { gqlQuery } from "../client";

export async function collectionsByIds(ids) {
    try {
        const queryString = `query collectionsById($ids:[ID!]!) {
          nodes(ids:$ids){
        
            ...on Collection{
              id
              handle
              title
              description
             
              image{
                url
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