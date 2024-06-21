export async function gqlQuery(query, variables) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "X-Shopify-Storefront-Access-Token": "25605f06be3592377e9b20bc07521839",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "query": query
    });

    if (variables) {
        bodyContent = JSON.stringify({
            "query": query,
            "variables": variables
        });
    }

    let response = await fetch("https://dengon.myshopify.com/api/2023-10/graphql.json", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    if (response.ok) {
        let data = await response.json();
        return data
    } else {
        let error = await response.json();
        console.log(JSON.stringify(error))
        return null
    }


}