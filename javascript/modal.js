const openCart = document.getElementById("btnShoppingCart");
const closeCart = document.getElementById("btnCloseCart");

const modalContainer = document.getElementsByClassName("modalBox")[0];
const modalCart = document.getElementsByClassName("modalShoppingCart")[0];

openCart.addEventListener("click", () => {

    modalContainer.classList.toggle("modal-visible")
});

closeCart.addEventListener("click", () => {

    modalContainer.classList.toggle("modal-visible")
});

modalCart.addEventListener('click',(e)=>{
    e.stopPropagation()
})
modalContainer.addEventListener('click', ()=>{
    carritoCerrar.click()
})
