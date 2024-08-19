/*

Retrieves product data from `productsArray` based on the provided product ID from Stripe API.
Logs a message to the console if no product with the given ID is found.

*/

const productsArray = [
    {
        id: "price_1Pp9XdIkCPYs1ETpDoJERKvo",
        title: "Cappuccino",
        price: 4.00
    },
    {
        id: "price_1Pp9WxIkCPYs1ETpn1y7slCE",
        title: "Macchiato",
        price: 5.00
    },
    {
        id: "price_1Pp9XqIkCPYs1ETpkqbDZIoj",
        title: "Americano",
        price: 4.00
    },
    {
        id: "price_1Pp9Y7IkCPYs1ETpCwdTbJL7",
        title: "Latte",
        price: 5.00
    },
    {
        id: "price_1Pp9YJIkCPYs1ETp76w9Ulsd",
        title: "Mocha",
        price: 6.00
    },
    {
        id: "price_1Pp9YTIkCPYs1ETpbdBDYqoz",
        title: "Flat White",
        price: 5.00
    },
    {
        id: "price_1Pp9YdIkCPYs1ETpRu3MEzz3",
        title: "Cortado",
        price: 5.00
    },
    {
        id: "price_1Pp9YpIkCPYs1ETpu2usAvNl",
        title: "Matcha Latte",
        price: 6.00
    },
    {
        id: "price_1Pp9YyIkCPYs1ETpKw0ifHJP",
        title: "Hot Chocolate",
        price: 4.00
    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
    }

    return productData;
}

export { productsArray, getProductData };