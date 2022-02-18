function ReturnToAddress(){
    $('<form action="/item/checkout/address"></form>').appendTo('body').submit();
}

function ReturnToDelivery(){
    $('<form action="/item/checkout/delivery" method="post"></form>').appendTo('body').submit();
}

function ReturnToPaymentType(){
    $('<form action="/item/checkout/paymentType" method="post"></form>').appendTo('body').submit();
}

$("#place-order-btn").click(function(){
    $("#place-order-btn").addClass("hidden");
    $("#checkout-processing-btn").removeClass("hidden");
});

$("#orderDate").val(new Date());