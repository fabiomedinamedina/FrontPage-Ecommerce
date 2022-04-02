let priceProduct = document.getElementById("price_product");
let priceTotal = document.getElementById("price_total");
const btnAddtoCart = document.getElementById("submit_add_to_cart");
const closePopUp = document.getElementById("close_pop_up");
const popUp = document.getElementById("popup_product");
const minusQty = document.getElementById("qtyMinus");
const plusQty = document.getElementById("qtyPlus");
const qtyInput = document.getElementById("qty_product_item");
const attrColor = document.getElementsByName('color');
const attrsize = document.getElementsByName('size');


// CARROUSEL WITH THUMBS
const slide_thumbs = new Swiper(".thumbs_slide", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const slide_full = new Swiper(".full_slide", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
    1000: {
      slidesPerView: 1,
      spaceBetween: 10,
    }
  },
  thumbs: {
    swiper: slide_thumbs,
  },
});

btnAddtoCart.addEventListener( "click", (e) => {
  e.preventDefault();
  popUp.classList.remove("hidden_popup");
  attrColor.forEach((radio) =>{
    if(radio.checked){
      console.log(radio.value);
    }
  })
  attrsize.forEach((size) =>{
    if(size.checked){
      console.log(size.value);
    }
  })

});

closePopUp.addEventListener("click", () => {
  popUp.classList.add("hidden_popup");  
});

plusQty.addEventListener("click", () => {
  qtyInput.value = ++qtyInput.value;
  priceTotal.innerHTML = `$ ${priceProduct.innerHTML*qtyInput.value}`;
});

minusQty.addEventListener("click", () => {
  if( qtyInput.value != "1" ){
    qtyInput.value = --qtyInput.value;
    priceTotal.innerHTML = `$ ${priceProduct.innerHTML*qtyInput.value}`;
  }
});