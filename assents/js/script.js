// const { id, title, vendor, variants, images, featured_image, options } = getProduct();


const priceProduct = document.getElementById("price_product");
const priceFullProduct = document.getElementById("full_price_product");
const priceTotal = document.getElementById("price_total");
const btnAddtoCart = document.getElementById("submit_add_to_cart");
const closePopUp = document.getElementById("close_pop_up");
const popUp = document.getElementById("popup_product");
const qtyInput = document.getElementById("qty_product_item");
const attrColor = document.getElementsByName('color');
const attrsize = document.getElementsByName('size');

getProduct().then( (data) => {
  const vendorName = document.getElementById("vendor_name");
  const { vendor, variants, images, options, description } = data;
  vendorName.innerHTML = vendor;
  fillInfoProduct(variants[0]);
  fillDescription(description)
  fillOptionsAttributes(options);
  fillSliderProduct(images);
});

const fillOptionsAttributes = (options) => {
  const containerAtributes = document.getElementById("container_product_atributtes");

  let htmlOptions = '';
  options.forEach(({name, values}) => {
    const option = name.toLowerCase();
    let htmlValues = '';
    values.forEach((value, i) =>{
      const valuelowecase = value.toLowerCase();
      let labelValue = '';
      if(!(option === 'color')){
        labelValue = value;
      }
      htmlValues +=
      `<div class="variant_input" data-value="${valuelowecase}">
        <input type="radio" onchange="getValue(this)" name="${option}" id="${option}-${valuelowecase}" value="${value}" ${i==0 && 'checked'}>
        <label for="${option}-${valuelowecase}" data-${option}="${valuelowecase}">${ labelValue }</label>
      </div>
      `;
    })
    htmlOptions +=
    `<div class="variant_inputs inputs_${option}">
      <label for="${option}-options" class="title_fieldset">${name}:</label>
      <fieldset class="variant_input_wrapper inputs_${option}" id="${option}-options">
       ${htmlValues}
      </fieldset>
    </div>
    `;
  });
  containerAtributes.innerHTML = htmlOptions
}

const fillSliderProduct = (images) => {
  const sliderWrapper = [...document.getElementsByClassName('swiper-wrapper')];
  console.log(sliderWrapper);
  
  let htmlSlider = '';
  console.log(images);
  
  images.forEach((img) => {

    htmlSlider +=
    `<div class="swiper-slide">
        <img src="${img}" />
      </div>
    `;
  });

  sliderWrapper.forEach((wrapper) => {
    wrapper.innerHTML = htmlSlider;
  });
}

const fillInfoProduct = ({name, price, compare_at_price}) => {
  const titleName = document.getElementById("title_product_name");

  titleName.innerHTML = name;
  titleName.setAttribute('data-title', name);
  priceProduct.innerHTML = price.toLocaleString('es');
  priceProduct.setAttribute('data-price', price);
  priceTotal.innerHTML = `$ ${(priceProduct.getAttribute('data-price')*qtyInput.value).toLocaleString('es')}`;
  priceFullProduct.innerHTML = `$${compare_at_price.toLocaleString('es')}`
}

const fillDescription = (description) => {
  document.getElementById('desc_product').innerHTML = description;
}


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

// CHANGE RADIO BOTTON OPTIONS
const getValue = ({name, value})  => {
  let obj = [];
  switch (name) {
    case "size":
      attrColor.forEach((color) =>{
        if(color.checked){
          obj = [color.value, value];
        }
      });
      break;
    case "color":
      attrsize.forEach((size) =>{
        if(size.checked){
          obj = [value, size.value];
        }
      });
    break;
  }
  getProduct().then( ({variants}) => {
    const variancion = variants.find(variacion => JSON.stringify(variacion.options)==JSON.stringify(obj) );
    fillInfoProduct(variancion);
  });
}

//EVENTS CLICKS
btnAddtoCart.addEventListener( "click", (e) => {
  e.preventDefault();
  let atributos = [];
  const tituloActual = document.getElementById("title_product_name").getAttribute("data-title");
  const contentPopUp = document.getElementById("content_popup");
  
  popUp.classList.remove("hidden_popup");
  attrColor.forEach((color) =>{
    if(color.checked){
      const colorObj = {
        name: color.name.charAt(0).toUpperCase()+color.name.substring(1),
        value: color.value
      }
      atributos = [...atributos, colorObj];
    }
  })
  attrsize.forEach((size) =>{
    if(size.checked){
      const sizeObj = {
        name: size.name.charAt(0).toUpperCase()+size.name.substring(1),
        value: size.value
      }
      atributos = [...atributos, sizeObj];
    }
  })
  console.log(atributos);
  
  let htmlOptions = '';
  atributos.forEach((atributo) => {
    htmlOptions +=
    `<li>${atributo.name}: ${atributo.value}</li>
    `;
  })
  const htmlPopUp =
  `<h2>${tituloActual}</h2>
  <ul>${htmlOptions}</ul>
  `;

  contentPopUp.innerHTML = htmlPopUp;
  
  

});

closePopUp.addEventListener("click", () => {
  popUp.classList.add("hidden_popup");  
});

const plusQty = document.getElementById("qtyPlus");
plusQty.addEventListener("click", () => {
  qtyInput.value = ++qtyInput.value;
  priceTotal.innerHTML = `$ ${(priceProduct.getAttribute('data-price')*qtyInput.value).toLocaleString('es')}`;
});

const minusQty = document.getElementById("qtyMinus");
minusQty.addEventListener("click", () => {
  if( qtyInput.value != "1" ){
    qtyInput.value = --qtyInput.value;
    priceTotal.innerHTML = `$ ${(priceProduct.getAttribute('data-price')*qtyInput.value).toLocaleString('es')}`;
  }
});

