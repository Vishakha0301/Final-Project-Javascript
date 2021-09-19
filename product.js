$(document).ready(function(){
    var productId = window.location.search.split('=')[1];
    var currentObj = null;

    function createProductImage(url,pos){
        var image = document.createElement('img');
        image.src = url;

        if(pos === 0) {
            image.classList.add("active-image");
        }

        image.onclick = function(){
            $('#product-images img').removeClass("active-image")
            image.classList.add("active-image");
            $('#product-preview').attr('src',url);
        }
        return image;

    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, function(data,status){
        currentObj = data;
        $('#product-preview').attr('src',data.preview);
        $('#product-title').html(data.name);
        $('#product-brand').html(data.brand);
        $('#productDescrip').html(data.description);
        $('#prod-price').html(data.price);

        for(var i=0; i<data.photos.length; i++){
            $('#product-images').append(createProductImage(data.photos[i],i));
        }
    })
    $("#cart-button").click(function(){
        $('#cart-button').addClass('bigger');
        setTimeout(function(){
            $('#cart-button').removeClass('bigger');
        },200)

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList===''?[]:productList;
        productList = productList.length>0?JSON.parse(productList) : [];
        console.log(productList);

        var foundAtPos = -1;
        for(var i=0; i<productList.length; i++){
            if(parseInt(productList[i].id == parseInt(currentObj.id))){
                foundAtPos = -1;
            }
        }
        if(foundAtPos > -1){
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
            console.log(productList[foundAtPos].count);
            window.localStorage.setItem('product-list',JSON.stringify(productList));
        }else{
            currentObj.count = 1;
            productList.push(currentObj);
            console.log(productList);
            window.localStorage.setItem('product-list',JSON.stringify(productList));
        }
        var totalCount = 0;
        for(var i=0; i<productList.length; i++){
            totalCount = totalCount + productList[i].count;
        }
        $('#cart-count').html(totalCount);
    })
})