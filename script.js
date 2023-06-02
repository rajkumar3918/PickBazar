// dropdown :

document.getElementById("grocery-dropdown").addEventListener('click',function(){
    
   var x =  document.getElementById("dropdown-list");
   if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

})

// carousel //

var slide = document.getElementById("carousel-items")
var imgs = document.querySelectorAll('#img')
var maxslide = imgs.length;
count = 0;
count1 = 0;

document.getElementById("prev").addEventListener('click', ()=>{
    count++
    
    if(count >= 3){
        var slider = (slide.style.transform += "translateX(0)" )
        document.getElementById("prev").style.display = "none"
        document.getElementById("next").style.display = "block"

    }else{
        var slider = (slide.style.transform += "translateX(-400px )" )
    slide.style.transition = "0.7s"
   
    }

})
document.getElementById("next").addEventListener('click', ()=>{
    count--

if(count <=0){
    var slider = slide.style.transform += "translateX(0)" 
    document.getElementById("next").style.display = "none"
    document.getElementById("prev").style.display = "block"
    
}else{
    var slider = slide.style.transform += "translateX(400px)" 
    slide.style.transition = "0.7s"

}
   
})

// // products //

    var apikey = `https://mock.redq.io/api/products?searchJoin=and&with=type%3Bauthor&limit=30&language=en&search=type.slug:grocery%3Bstatus:publish`;
fetch(apikey).then(responce => responce.json().then(result => {
    console.log(result);

    var html = "";
    result.data.forEach(data => {
        html += `<div id="products">
        <img id="product-img" src="${data.image.thumbnail}" alt="">
       <div style = "padding-left : 30px"><span style = " font-size: 20px;">$</span><span id="price">${data.price}</span></div>
        <p id="productname">${data.name}</p>
      <div id="add-to-cart-btn">
        <input class = "add-btn" id="add" type="text" value="Add to cart" readonly>
      </div>
       </div>`
       

       document.getElementById("products-container").innerHTML = html;
    });

}))

// camvas //

var canvas = document.getElementById("cartCanvas");

document.getElementById("cart").addEventListener('click',()=>{
    canvas.style.transform = "translateX(-320px)"
    canvas.style.boxShadow = "1px 1px 10px black"
    canvas.style.transition = "0.6s"
})

document.getElementById("close").addEventListener('click',()=>{
    canvas.style.transform = "translateX(0)"
    canvas.style.boxShadow = "1px 1px 10px black"
    canvas.style.transition = "0.6s"
})


// add to cart //

var disply = document.getElementById("add");

var productList = document.getElementById("products-container");
let cartItemId = 0;
var cartList = document.querySelector(".cart-container");
var totalItems =  document.getElementById("items");
var totalPrice = document.getElementById("totalprice");
let total = "";

productList.addEventListener('click',(e)=>{

    if(e.target.classList.contains("add-btn")){
        let product = e.target.parentElement.parentElement;
        getproductinfo(product);
    }
})
  function getproductinfo(product){
    var productinfo = {
        itemId : cartItemId,
        imgSrc : product.querySelector('#product-img').src,
        name : product.querySelector('#productname').textContent,
        price : product.querySelector('#price').textContent
    }
    cartItemId++;
   totalItems.innerHTML = cartItemId; 
  
    total += "+"+productinfo.price;
    var total1 = eval(total)
    totalPrice.innerHTML = total1.toFixed(2);
    console.log(total1)
    console.log(total)

    console.log(productinfo);
    addToCart(productinfo);
   }

   function addToCart(product){
    let cartItem = document.createElement("div");
    cartItem.classList.add('cart-items');
    cartItem.setAttribute('data-id', `${product.itemId}`);
    cartItem.innerHTML += 
    `<div> 
    <div><img class="cart-img" src="${product.imgSrc}" alt="sd"></div>
    <div>
        <p class="name">${product.name}</p>
        <p class="price"><b>${product.price}</b></p>

    </div>
    <button class="delete"> <i class="fa-solid fa-trash"> </i></button>
    </div>`;

    cartList.appendChild(cartItem);
  
   }

   cartList.addEventListener('click', (e)=>{
  
    if(e.target.classList.contains("fa-solid")){
        cartItemId--;
        totalItems.innerHTML = cartItemId; 
        if(cartItemId == 0){
            totalPrice.innerHTML = 0;
        }
        let removee = e.target.parentElement.parentElement.parentElement;
        removee.remove();
        console.log(removee)

        var removeProduct = {
            itemId : cartItemId,
            imgSrc : removee.querySelector('.cart-img').src,
            name : removee.querySelector('.name').textContent,
            price : removee.querySelector('.price').textContent
        }
    
        total += "-"+removeProduct.price;
        var total1 = eval(total)
        totalPrice.innerHTML = total1.toFixed(2);
        console.log(total1)
        console.log(total)
    }
})

// model //

let modal = document.getElementById("modal")
let modalBtn = document.getElementById("join")
let closee = document.getElementById("form-close")

modalBtn.addEventListener('click', ()=>{
    modal.classList.add("modal-toggle");
})

closee.addEventListener('click', ()=>{
    modal.classList.remove("modal-toggle");

})

// form //

let username = document.getElementById("username");
let password = document.getElementById("passw");
let password2 = document.getElementById("pass2");
let button = document.getElementById("login");
let email = document.getElementById("mail");


button.addEventListener('click',(e)=>{
    e.preventDefault();
    
 
    Validated();
});


let seterror = (element, message) =>{
    let inputControl = element.parentElement;
    let errordisplay = inputControl.querySelector('.error');

    errordisplay.innerHTML = message;
    errordisplay.style.color = "red"
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

let setSuccess = (element) =>{
    let inputControl = element.parentElement;
    let errordisplay = inputControl.querySelector('.error');

    errordisplay.innerHTML = 'valid';
    errordisplay.style.color = "green"
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
};

 function Validated() {
    let usernamevalue = username.value.trim();
    let passwordvalue = password.value.trim();
    let password2value = password2.value.trim();
    let emailvalue = email.value.trim();

    let credentials = {
        userId : "codingschool",
        pass : "123456789",
    }
    

    if(usernamevalue === ''){
        seterror(username, 'user name is invalid');
    }else if(usernamevalue !== credentials.userId){
        seterror(username, 'user name is invalid');
    }
    else{
        setSuccess(username);
    }
    if(emailvalue === ''){
        seterror(email, 'email is invalid');
    }
    else{
        setSuccess(email);
    }
    if(passwordvalue === ''){
        seterror(password, 'password is invalid');
    }else if(passwordvalue !== credentials.pass){
        seterror(password, 'password is invalid');
    }
    else{
        setSuccess(password);
    }
    if(password2value === ''){
        seterror(password2, 'invalid password');
    }else if(password2value !== passwordvalue){
        seterror(password2, 'Recheck the password');
    }else{
        setSuccess(password2);
    }

}
