$(document).on("click","a.addToCart",function(){
    //alert(JSON.stringify({ itemId : $(this).attr('id'), itemCountToAdd : 1 }));
    $.ajax({
        type: 'PUT',
        url: "/open/api/customer/update/cart/items",
        contentType: 'application/json',
        data: JSON.stringify({ itemId : $(this).attr('id'), itemCountToAdd : 1 }),
        processData: false,
        crossDomain: true,
        headers: { 'Access-Control-Allow-Headers': 'x-requested-with' ,'Access-Control-Allow-Origin' : '*'}
    })
    .done(function(result) {
        //alert(result);
        $('#cartItemCount').html(result.toString());
    })
    .fail(function() {
        alert('Cart update failed');
        console.log( arguments);
    });
});

$('.cartItemQuantity').change(function(){
    //alert("value changed to : "+$(this).attr('id'));
    $.ajax({
        type: 'PUT',
        url: "/open/api/customer/update/cart",
        contentType: 'application/json',
        data: JSON.stringify({ itemId : $(this).attr('name'), finalItemCount : $(this).val() }),
        processData: false,
        crossDomain: true,
        headers: { 'Access-Control-Allow-Headers': 'x-requested-with' ,'Access-Control-Allow-Origin' : '*'}
    })
    .done(function(result) {
        //alert(JSON.stringify(result));
        //console.log(JSON.stringify(result));
        $('#cartItemCount').html(result.cartItemCount);
        $.each(result.cartItemDtoList , function(index, cartItem) {
            $('#'+cartItem.itemId).children('.totalPrice').html('₹'+cartItem.totalPrice);
        });
        //$('#'+result.cartItemCount).children('.totalPrice').html(result.);
        $('#itemTotalPrice').html('₹'+result.itemTotalPrice);
        $('#itemTotalPriceSummary').html('₹'+result.itemTotalPrice);
        $('#shippingPriceSummary').html('₹'+result.shippingCharge);
        $('#additionalTaxSummary').html('₹'+result.additionalTax);
        $('#discountViaCoupOnSummary').html('₹'+result.discountViaCoupon);
        $('#orderTotalSummary').html('₹'+result.orderTotalPrice);

    })
    .fail(function() {
        alert('Cart update failed');
        console.log( arguments);
    });
})

var orderItemIdToBeDeleted;
function deleteOrderItem(orderItemId){
    orderItemIdToBeDeleted = orderItemId;
    $('#deleteOrderItemModel').modal('show');
}
function deleteOrderItemCall(){
    //alert(orderItemIdToBeDeleted);
    $.ajax({
        type: 'DELETE',
        url: "/admin/api/orderItem/"+orderItemIdToBeDeleted,
        contentType: 'application/json',
        processData: false,
        crossDomain: true,
        headers: { 'Access-Control-Allow-Headers': 'x-requested-with' ,'Access-Control-Allow-Origin' : '*'}
    })
    .done(function(result) {
        //alert(result);
        //$('#cartItemCount').html(result.toString());
        $("#orderUpdatedItem").show();
        $("#orderUpdatedItemLabel").show();
        $("#orderUpdatedItem").html(result.orderTotalPrice);
        $("#"+orderItemIdToBeDeleted).parent().parent().remove();
        orderItemIdToBeDeleted = null;
        $('#deleteOrderItemModel').modal('hide');
    })
    .fail(function() {
        alert('Order Item delete failed');
        console.log( arguments);
    });
}

$(document).ready(function(){
    $("#orderUpdatedItem").hide();
    $("#orderUpdatedItemLabel").hide();
    $(".cancel-btn").click(function(){
        location.reload();
    });
});

$('.itemIdQuantityUpdateInput').change(function(){
    //alert("Id :"+$(this).attr("id")+" value : "+$(this).val());
    $.ajax({
        type: 'PUT',
        url: "/admin/api/update/orderItem/"+$(this).attr("id")+"/quantity/"+$(this).val(),
        contentType: 'application/json',
        processData: false,
        crossDomain: true,
        headers: { 'Access-Control-Allow-Headers': 'x-requested-with' ,'Access-Control-Allow-Origin' : '*'}
    })
    .done(function(result) {
        //alert(result);
        //$('#cartItemCount').html(result.toString());
        $("#orderUpdatedItem").show();
        $("#orderUpdatedItemLabel").show();
        $("#orderUpdatedItem").html(result.orderTotalPrice);
    })
    .fail(function() {
        alert('Order Item update failed');
        console.log( arguments);
    });
});