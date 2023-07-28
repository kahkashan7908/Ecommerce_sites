  // $(document).on('click','.add',function(){
    //     var item_id=this.id.toString()
    //     //var item_id=$(this).attr('id')
    //     console.log(item_id)
    // })

// code for saving cart item in local storage
var cart;
if (localStorage.getItem("cart") == null) {
    cart = {};
  } 

  else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  
  //code for handling button
  $(".add").on("click", function() {
    var item_id = this.id.toString();
    //increment count of item by 1 if already once
    if(cart[item_id]!=undefined){
      var quantity = cart[item_id][0] + 1;
      cart[item_id][0] = quantity;
      cart[item_id][2] = cart[item_id][2] + parseFloat(document.getElementById("price"+item_id).innerHTML);
      //cart[item_id][0]  item quantity
      //cart[item_id][1] item name
      //cart[item_id][2] item price


  }
  //add item
  else{
      quantity = 1;
      price = parseFloat(document.getElementById("price"+item_id).innerHTML);
      var name = document.getElementById("nm"+item_id).innerHTML;
      cart[item_id]=[quantity,name,price];

      
  }
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
    
  // Update cart count and icon
  var cartCount = Object.keys(cart).length;
  var cartIcon = '<i class="bi bi-cart4"></i>';
  var cartText = cartIcon + " " + cartCount;
  document.getElementById("cart").innerHTML = cartText;
  });
  

  displayCart(cart)
  function displayCart(cart){
    var cartString ="";
    cartString += "<h5>This is your cart</h5>";
    let cartObject=JSON.parse(localStorage.getItem('cart'))
    for(var item in cartObject){
        cartString +=cartObject[item][1]+ " Qty: " + cartObject[item][0] + "</br>";
    }

    cartString += "<a href='checkout'><button class='btn btn-warning mt-2' id='checkout'>Checkout</button></a>";
    document.getElementById("cart").setAttribute('data-content',cartString);
    $('[data-toggle="popover"]').popover();
}