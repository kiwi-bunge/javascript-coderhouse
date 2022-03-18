const openCart = document.getElementById("btnShoppingCart");
const closeCart = document.getElementById("btnCloseCart");
const modalContainer = document.getElementsByClassName("modalBox")[0];
const modalCart = document.getElementsByClassName("modalShoppingCart")[0];
const sendEmailPrompt = document.getElementById("emailConfirmButton");
const closeEmailPrompt = document.getElementById("btnCloseEmailPrompt");
const openSubscribe = document.getElementById("subscribeForm");
const closeSubscribe = document.getElementById("btnCloseSubscribe");
const modalSubscribe = document.getElementsByClassName("modalSubscribeBox")[0];

const recommendedProducts = document.getElementById("recommended");
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const cartQuantity = document.getElementById("cartQuantity");
const totalCost = document.getElementById("totalCost");


let shoppingCart = [];

// showProducts();

showRecommended();

loadEventListeners();



// Event Listeners

openCart.addEventListener("click", () => { modalContainer.classList.toggle("modal-visible") });

closeCart.addEventListener("click", () => { modalContainer.classList.toggle("modal-visible") });

modalCart.addEventListener('click',(e)=>{ e.stopPropagation() });

modalContainer.addEventListener('click', () => { cartClosing.click() });

sendEmailPrompt.addEventListener("click", () => {

    document.getElementById("emailBox").style.visibility = "hidden";
    localStorage.setItem("firstUser", false);
});

closeEmailPrompt.addEventListener("click", () => {

    document.getElementById("emailBox").style.visibility = "hidden"
    localStorage.setItem("firstUser", false);
});

openSubscribe.addEventListener("click", () => { modalSubscribe.classList.toggle("modal-visible") });

closeSubscribe.addEventListener("click", () => { 

    modalSubscribe.classList.toggle("modal-visible");
    location.reload();
});


// Check if it is first time in the web if not get email prompt

let checkFirstUser = () => {

    if (localStorage["firstUser"]) {

    } else {

        getEmail();
    }
    
};


// Get Email Prompt

function getEmail() {

    setTimeout( () => {

        document.getElementById("emailBox").style.visibility = "visible";
    }, 5000);

};
 

//Load event listeners

function loadEventListeners() {

    recommendedProducts.addEventListener("click", addToCart);
    
    modalCart.addEventListener("click", eliminateProduct);
    
    updateCart(shoppingCart);

    document.addEventListener('DOMContentLoaded', () => {

        shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
        cartHTML();
        updateCart(shoppingCart);
        checkFirstUser();       
    });

    updateCart(shoppingCart);
    
};

// Recommended products gallery

function showRecommended() {

    fetch("../products-stock-data.json")
        .then(response => response.json())
        .then(data => {

            data.forEach (product => {
                 
                let productRecommended = product.recommended

                if (productRecommended == "true") {

                const {id, img, name, price} = product;

                let div = document.createElement("div");
                div.classList.add("recommendedBox");
                div.innerHTML = `
                                <div class="product-card" data-id=${id}>
                                    <div class="card-image">
                                        <img src= ${img}>
                                    </div>
                                    <p class= "card-title">
                                        ${name}
                                    </p>
                                    <p class= "card-price">
                                        $<span>${price}</span>
                                    </p>
                                    <button class="btnAddToCart" id="addToCartButton${id}" data-id="${id}"> Add to Cart </button>
                                </div>
                `;
                
                recommendedProducts.appendChild(div);
            }
            })
        })
}


// Add products to cart

function addToCart(e) {

    e.preventDefault();
    if (e.target.classList.contains("btnAddToCart")) {
        const selectedProduct = e.target.parentElement.parentElement;
        productInCart(selectedProduct);
        Toastify({
            text: "🛒 Product Added",
            duration: 2000,
            stopOnFocus: true,

            style: {
                background: "#f5e4bb",
                color: "#83472C"
            },
        }).showToast();
    };
    updateCart(shoppingCart);
};


// Elminating product from cart

function eliminateProduct(e) {
    
    if (e.target.classList.contains("eliminateProductFromCart")) {
        // console.log(e.target.getAttribute("data-id"));
        const productId = e.target.getAttribute("data-id");

        shoppingCart = shoppingCart.filter(product => product.id !== productId);
        Toastify({
            text: "❌ Product Removed",
            duration: 2000,
            stopOnFocus: true,

            style: {
                background: "#83472C",
                color: "#f5e4bb"
            },
        }).showToast();

        cartHTML();
    };
    updateCart(shoppingCart);
};


// Cleaning HTML

function cleanHTML() {

    while(cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    };
};


//Update cart

function updateCart(shoppingCart) {

    cartQuantity.innerHTML = shoppingCart.reduce((acc, el) => acc + el.quantity, 0);
    totalCost.innerHTML = shoppingCart.reduce((acc, el) => acc + (el.price * el.quantity), 0).toFixed(2);

}


// Products in the shopping cart

function productInCart(product) {
    
    const productInfo = {

        id: product.querySelector("button").getAttribute("data-id"),
        name: product.querySelector(".card-title").textContent,
        price: product.querySelector(".card-price span").textContent,
        
        quantity: 1
    };

    const repeated = shoppingCart.some (product => product.id === productInfo.id);

    if (repeated) {

        const repeatedProducts = shoppingCart.map (product => {

            if (product.id === productInfo.id) {

                product.quantity ++;
                return product;
            } else {

                return product;
            }
        });
        shoppingCart = [...repeatedProducts];
    } else {

        shoppingCart = [...shoppingCart, productInfo];
    };

    cartHTML();
};


// Showing Shopping Cart

function cartHTML() {

    cleanHTML();

    shoppingCart.forEach (product => {

        const {name, price, quantity, id} = product;
        const div = document.createElement("div");

        div.className = "productInCart";
        div.innerHTML = `
                        <div class="productCartContainer" data-id="${id}">
                            <p>${name}</p>
                            <p>Price: <b>$ ${price}</b></p>
                            <p id=quantity${id}>Quantity: <b> ${quantity} </b></p>
                        </div>
                        <div>
                            <button  class="eliminateProductFromCart" id="deleteButton${id}" data-id="${id}"> X </button>
                        </div>
        `;

        cartContainer.appendChild(div);
        updateCart(shoppingCart)
    });

    syncLocalStorage();
};


//  Setting Local Storage for Shopping Cart

function syncLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
};
