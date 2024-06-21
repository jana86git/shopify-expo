import { collectionsByIds } from "../collections/collectionsByIds";
import { fetchProductsByIds } from "../products/fetchProductsByIds";
export async function contentFiller(obj) {
    try {
        let promises = [];
        let keys = [];

        Object.keys(obj).forEach((key) => {
            switch (key) {
                case "collections":
                    promises.push(collectionsByIds(obj["collections"]));
                    keys.push(key);
                    break;
                case "onSale":
                    promises.push(fetchProductsByIds(obj["onSale"]));
                    keys.push(key);
                    break;
                case "popularProducts":
                    promises.push(fetchProductsByIds(obj["popularProducts"]));
                    keys.push(key);
                    break;
                default:
                    break;
            }
        });

        let results = await Promise.all(promises);

        let resultObj = {};
        keys.forEach((key, index) => {
            resultObj[key] = results[index];
        });

      

        return resultObj;
    } catch (error) {
        console.error(error);
        return {};
    }
}
