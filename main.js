// Context: We often execute complex problems using entirely front-end JavaScript. For this challenge your solution should work if it is pasted directly into the JavaScript console of the browser after the page has fully loaded. Feel free to use jQuery. Also, our products must work across all browsers, but we will be testing your challenge in Chrome.

// Go to www.marmot.com and add at least 2 products to your cart. Then return to the home page.

// Write a JavaScript snippet that can be run in the console of the browser that does the following:

// Extracts cart info & Stores them in variables:
// ✓ number of items in the cart
// ✓ the cart total
// ✓ the item images from the page

function extractCartData() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseCartData(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.marmot.com/cart", true);
  xhttp.send();
}

function parseCartData(xml) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml,"text/html")
  let cartItems = xmlDoc.getElementsByClassName("cart-row");
  let itemsImagesInCart = []
  let pricesInCart = []
  let cartItemCount = cartItems.length
  for (let i = 0; i < cartItems.length; i++) {
    let itemImage = cartItems[i].getElementsByClassName('item-image')
    let thumbnail = itemImage[0].children[0].children[0].src;
    itemsImagesInCart.push(thumbnail)

    let itemPrice = cartItems[i].getElementsByClassName('price-sales')
    let price = itemPrice[0].innerText.replace('unit standard price$', '');
    pricesInCart.push(Number(price));
  }
  let cartTotal = pricesInCart.reduce((acc, curr) => acc + curr);
  //call function to append overlay to document & feed it variables collected
  contentOverlay(cartItemCount, cartTotal, itemsImagesInCart)
}

function contentOverlay(numberOfItems, cartTotal, ImagesArray) {
  let overlay_black = 'position:fixed;top:0%;left:0%;width:100%;height:100%;background:black;z-index:1001;opacity:0.5;-webkit-opacity:0.5;';
  $('body').append(`<div class="modal" style="${overlay_black}"></div>`);
  let overlay_white = 'position:fixed;top:40%;left:45%;padding:50px;background-color:white;z-index:1002;overflow:auto;';
  let btn_close = 'float:right;font-size:36px;padding-left:5px;';
  let btn_cart = 'float:left;font-size:36px;padding-right:5px;';
  let imgDiv = 'justify-content:space-evenly;'
  $('body').append(`<div class="modal" style="${overlay_white}">
  <a href="https://www.marmot.com/cart"><button style="${btn_cart}">Go To Cart</button></a>
  <button style="${btn_close}" onclick="closeModal()">X</button>
  <br></br><br></br>
  <p>Number of Items in cart:${numberOfItems}</p>
  <p>Cart Total $ ${cartTotal}</p>
  <br></br>
  <div style=${imgDiv}><img src="${ImagesArray[0]}"><img src="${ImagesArray[1]}"></div>
  </div>`);
}

function closeModal() {
  let modalDivs = document.getElementsByClassName('modal')
  // console.log(modalDivs.length);
  for (let i = modalDivs.length-1; i >= 0; i--) {
    modalDivs[i].innerHTML = ""
    modalDivs[i].remove();
}
  fired = 0
}

var fired = 0
// Create a trigger that activates when the user scrolls into the bottom 10% of the page.
$(window).scroll(function() {
   if($(window).scrollTop() >= ($(document).height() * 0.9) - $(window).height()) {
    if(fired === 0){
      fired = 1
       extractCartData();
     }
   }
});

//----------

let bottomTenPercentPageHeight = document.documentElement.scrollHeight*.9

// The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons. One button should close the overlay and the other should take the user to the cart page. It should have a style consistent with the website. Design matters.

// Behind the overlay add a semi­transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.

// BONUS

// 1. Explain potential problems that could arise if this snippet had more or less than the 2 items in the cart. How would you address those problems?
