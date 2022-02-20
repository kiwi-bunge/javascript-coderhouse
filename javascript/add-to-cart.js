import updateCart from "./update-cart.js";
import { PRODUCTS } from "./stock.js";

let shoppingCart = [];

const cartContainer = document.getElementById("cart-container");

// shoppingCart = JSON.parse(localStorage.getItem('carrito')) || [];

export default function addToCart(id) {
    
    let repeated = shoppingCart.find(repeatedProduct => repeatedProduct.id == id);

    if(repeated) {

        repeated.quantity = repeated.quantity + 1;

        document.getElementById(`quantity${repeated.id}`).innerHTML = `<p id=quantity${repeated.id}>Quantity:${repeated.quantity}</p>`;

        updateCart(shoppingCart);
        syncLocalStorage();

    } else {

        let product = PRODUCTS.find(product => product.id == id);

        shoppingCart.push(product);

        product.quantity = 1;

        let div = document.createElement("div");

        div.className = "productInCart";
        div.innerHTML = `
                        <p>${product.name}</p>
                        <p>Price: $${product.price}</p>
                        <p id=quantity${product.id}>Quantity: ${product.quantity}</p>
                        <button id=eliminate${product.id} class="eliminateButton"> Delete </button>
        `;

        cartContainer.appendChild(div);
        
        updateCart(shoppingCart);
        syncLocalStorage();

        let eliminateButton = document.getElementById(`eliminate${product.id}`);

        eliminateButton.addEventListener("click", () => {

            eliminateButton.parentElement.remove();
            shoppingCart = shoppingCart.filter(el => el.id != product.id);
            updateCart(shoppingCart);
            syncLocalStorage();
        });
        
    };
}

function syncLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    console.log(shoppingCart)
}

// function loadLocalStorage() {
//     shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
// }



