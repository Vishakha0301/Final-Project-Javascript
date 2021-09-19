$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data, status){
    var res = data;
    for(var i=0; i<res.length; i++) {
      if(res[i].isAccessory) {
        $('#accessory-card').append(ProductCard(res[i]))
      } else {
        $('#clothing-card').append(ProductCard(res[i]))
      }
    }
  })


function ProductCard(obj) {
  // <div class="product-card">
  //     <a href='/details.html'>
  //     <img class="product-image" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" />
      
  //     <div class="product-meta">
  //         <h4>Men Navy Solid Sweatshirt</h4>
  //         <h5>United Colors of Benetton</h5>
  //         <p>Rs 2599</p>
  //     </div>
  //     </a>
  // </div>

    var productCard = document.createElement('div');
    productCard.className="product-card";

    var productLink = document.createElement('a');
    productLink.href = 'product.html?id='+ obj.id;

    var productImage = document.createElement('img');
    productImage.className = "product-image";
    productImage.src = obj.preview;
    productImage.alt = obj.name + ' Pic';

    productLink.appendChild(productImage);
    productCard.appendChild(productLink);

    var productData = document.createElement('div');
    productData.className = "product-meta";

    var productName = document.createElement('h4');
    var productNameText = document.createTextNode(obj.name);
    productName.appendChild(productNameText);
    productData.appendChild(productName);

    var productBrand = document.createElement('h5');
    var productBrandText = document.createTextNode(obj.brand);
    productBrand.appendChild(productBrandText);
    productData.appendChild(productBrand);

    var productPrice = document.createElement('p');
    var productPriceText = document.createTextNode("Rs. " + obj.price);
    productPrice.appendChild(productPriceText);
    productData.appendChild(productPrice);
    
    
    
    productCard.appendChild(productData);

    return productCard;
}