
var urlParams = new URLSearchParams(window.location.search);

$('#clearFilter').click(function(){
    var redirectLinkUrl = '/items?';
    if(urlParams.has('q')){
        redirectLinkUrl = redirectLinkUrl + "q="+urlParams.get('q');
    }
    if(urlParams.has('c')){
        redirectLinkUrl = redirectLinkUrl + "&c="+urlParams.get('c');
    }
    if(urlParams.has('sc')){
        redirectLinkUrl = redirectLinkUrl + "&sc="+urlParams.get('sc');
    }

    window.location.href = redirectLinkUrl;
});

$('#clearCategoryFilter').click(function(){
    var redirectLinkUrl = '/items?';
    if(urlParams.has('q')){
        redirectLinkUrl = redirectLinkUrl + "q="+urlParams.get('q');
    }
    if(urlParams.has('igt')){
        redirectLinkUrl = redirectLinkUrl + "&igt="+urlParams.get('igt');
    }
    if(urlParams.has('ibt')){
        redirectLinkUrl = redirectLinkUrl + "&ibt="+urlParams.get('ibt');
    }
    if(urlParams.has('ig')){
        redirectLinkUrl = redirectLinkUrl + "&ig="+urlParams.get('ig');
    }
    if(urlParams.has('minm')){
        redirectLinkUrl = redirectLinkUrl + "&minm="+urlParams.get('minm');
    }
    if(urlParams.has('maxm')){
        redirectLinkUrl = redirectLinkUrl + "&maxm="+urlParams.get('maxm');
    }
    window.location.href = redirectLinkUrl;
});

$('#showMore').click(function(){
    var itemUrl = '/open/api/items?';
    var itemCountUrl = '/open/api/count/items?';
    var redirectLinkUrl = '';
    if(urlParams.has('q')){
        redirectLinkUrl = redirectLinkUrl + "q="+urlParams.get('q');
    }
    if(urlParams.has('igt')){
        redirectLinkUrl = redirectLinkUrl + "&igt="+urlParams.get('igt');
    }
    if(urlParams.has('ibt')){
        redirectLinkUrl = redirectLinkUrl + "&ibt="+urlParams.get('ibt');
    }
    if(urlParams.has('ig')){
        redirectLinkUrl = redirectLinkUrl + "&ig="+urlParams.get('ig');
    }
    if(urlParams.has('minm')){
        redirectLinkUrl = redirectLinkUrl + "&minm="+urlParams.get('minm');
    }
    if(urlParams.has('maxm')){
        redirectLinkUrl = redirectLinkUrl + "&maxm="+urlParams.get('maxm');
    }

    redirectLinkUrl = redirectLinkUrl + "&limit=20&page=";
    //window.location.href = redirectLinkUrl;
    //alert("redirectUrl : "+redirectLinkUrl);
    $.getJSON(itemUrl+redirectLinkUrl+$('#pageCount').val(), {
        ajax : 'true'
    }, function(data) {
        //alert(data);
        jQuery.each(data, function(k, item){
            $('#searchedItems').append('<div class="col-md-3 col-sm-6">'+
                '<div class="product same-height">'+
                    '<div class="flip-container">'+
                        '<div class="flipper">'+
                            '<div class="front"><a href="/item?id='+item.itemId+'"><img src="'+item.mediaDtoList[0].url+'" alt="" class="img-fluid"></a></div>'+
                        '</div>'+
                    '</div>'+
                    '<a href="/item?id='+item.itemId+'" class="invisible"><img src="/img/product2.jpg" alt="" class="img-fluid"></a>'+
                    '<div class="text">'+
                        '<h3>'+item.name+'</h3>'+
                        '<p class="price">'+
                            addPriceTag(item)+
                            '<a id="'+item.itemId+'" class="btn btn-sm btn-primary addToCart">Add <i class="fa fa-shopping-cart"></i></a>'+
                        '</p>'+
                    '</div>'+
                    setOnDiscountLabel(item)+
                '</div>'+
            '</div>');
        });
        if(data.length > 0){
            $('#pageCount').val(parseInt($('#pageCount').val()) + 1);
            $.getJSON(itemCountUrl+redirectLinkUrl+$('#pageCount').val(), {
                ajax : 'true'
            }, function(data) {
                //alert(data);
                if(!(data > 0)){
                    $('#showMore').hide();
                }
            });
        }else{
            $('#showMore').hide();
        }
    });

});

function addPriceTag(item){
    if(item.onDiscount) {
        return '<del>₹'+item.mrp+'</del>&nbsp;<span>₹'+item.price+'</span><br>'
    }else{
        return '<span>₹'+item.price+'</span><br>'
    }
}
function setOnDiscountLabel(item){
    var returnStr = "";
    if(item.onDiscount){
        returnStr = '<div class="ribbon sale">'+
                        '<div class="theribbon">'+item.discountPercentageDisplay+'% OFF</div>'+
                        '<div class="ribbon-background"></div>'+
                    '</div>';
    }
    return returnStr;
}
