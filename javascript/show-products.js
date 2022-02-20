import addToCart from "./add-to-cart.js";

const productsContainer = document.getElementById("products-container");

export default function showProducts(array) {
    
    array.forEach (product => {
        
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
                        <div class="product-card">
                            <div class="card-image">
                                <img src= ${product.img}>
                            </div>
                            <p class= "card-title">
                                ${product.name}
                            </p>
                            <p class= "card-price">
                                $${product.price}
                            </p>
                            <button class="btnAddToCart" id="addToCartButton${product.id}"> Add to Cart </button>
                        </div>
        `;
        
        productsContainer.appendChild(div);
        

        let addToCartButton = document.getElementById(`addToCartButton${product.id}`);

        addToCartButton.addEventListener("click", () => {

            addToCart(product.id);
            
        });

    });
    
    
};
