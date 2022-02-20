const cartQuantity = document.getElementById("cartQuantity");
const totalCost = document.getElementById("totalCost");


export default function updateCart(shoppingCart) {

    cartQuantity.innerHTML = shoppingCart.reduce((acc, el) => acc + el.quantity, 0);
    totalCost.innerText = shoppingCart.reduce((acc, el) => acc + (el.price * el.quantity), 0).toFixed(2);

}