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
  //convert to createElement, set innerText, and append (instead of set innerHTML and append for performance optimization)
  let overlay_black = 'position:fixed;top:0%;left:0%;width:100%;height:100%;background:black;z-index:1001;opacity:0.5;-webkit-opacity:0.5;';
  $('body').append(`<div class="modal" style="${overlay_black}"></div>`);
  let overlay_white = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background-color:white;z-index:1002;overflow:auto;';
  let btn_close = 'float:right;font-size:36px;color:gray;padding:5px;padding-right:10px;';
  let btn_cart = 'float:right;color:gray;padding-top:15px;font-weight:bold;';
  let title_style = 'float:left;font-size:36px;padding-right:300px;';
  let img_div = 'justify-content:space-between;float:left;padding-top:0;padding-left:50px;padding-right:50px;padding-bottom:50px;width:50%;';
  let cart_table = 'float:right;width:50%;border-left:1px solid #cbcbcb;padding-left:10%'
  let hr_style = 'color:#cbcbcb;width:100%;opacity:.5;';
  let contents_style = 'padding:50px;'
  let align_right = 'text-align:right;'
  let btn_checkout = 'background-color:#dd0000;color:white;text-align:center;font-weight:bold;padding-right:50px;padding-left:50px;padding-top:15px;padding-bottom:15px;margin-left:65%'
  $('body').append(`<div class="modal" style="${overlay_white}">
    <button style="${btn_close}" onclick="closeModal()">✕</button>
      <div style="${contents_style}">
        <span style="${title_style}">Items Added to Cart</span>
        <a href="https://www.marmot.com/cart"><button style="${btn_cart}">Edit Cart</button></a>
        <br></br><br></br>
        <hr style=${hr_style}>
        <br></br>
        <div style=${img_div}><img src="${ImagesArray[0]}"><img src="${ImagesArray[1]}"></div>

        <table style="${cart_table}">
          <tr></tr><tr></tr><tr></tr><tr></tr>
          <tr><td>${numberOfItems} items</td></tr>
          <tr></tr><tr></tr><tr></tr><tr></tr>
          <tr><td>Subtotal</td> <td style="${align_right}">${cartTotal.toFixed(2)}</td></tr>
          <tr><td>Estimated Shipping</td> <td style="${align_right}">-</td></tr>
          <tr><td>Sales Tax</td> <td style="${align_right}">-</td></tr>
          <tr><td>Estimated Total</td> <td style="${align_right}">${cartTotal.toFixed(2)}</td></tr>
        </table>

        <a href="https://www.marmot.com/checkoutlogin"><button style="${btn_checkout}">CHECKOUT</button></a>

      </div>

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
//<span style="display: inline-block; width:2px; height:100%; background:#000;"></span>

let bottomTenPercentPageHeight = document.documentElement.scrollHeight*.9

// The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons. One button should close the overlay and the other should take the user to the cart page. It should have a style consistent with the website. Design matters.

// Behind the overlay add a semi­transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.

// BONUS

// 1. Explain potential problems that could arise if this snippet had more or less than the 2 items in the cart. How would you address those problems?
