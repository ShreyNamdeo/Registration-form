$('#category').change(function() {
    $.getJSON("/open/api/admin/getSubCategories/category/"+$('#category').val(), {
        cityId : $(this).val(),
        ajax : 'true'
    }, function(data) {
        var html = '<option disabled="disabled" selected="selected" > Select Sub Category </option>';
        var len = data.length;
        for ( var i = 0; i < len; i++) {
            html += '<option value="' + data[i] + '">'
                    + data[i] + '</option>';
        }
        html += '</option>';
        $('#sub-category').html(html);
    });
});


var urlParams = new URLSearchParams(window.location.search);

$('#barcode').change(function(){
    if(!urlParams.has('id')){
        $.getJSON("/admin/api/check/item/barcode/"+$('#barcode').val(), {
            //cityId : $(this).val(),
            ajax : 'true'
        }, function(data) {
            if(data.toString() === 'true'){
                $('#barcodeError').html(" <strong> X </strong> This barcode already exist ");
                $('#barcode').focus();
            }else{
                $('#barcodeError').html("");
            }
        });
    }else{
        $.getJSON("/admin/api/check/item/"+urlParams.get('id')+"/barcode/"+$('#barcode').val(), {
            //cityId : $(this).val(),
            ajax : 'true'
        }, function(data) {
            if(data.toString() === 'true'){
                $('#barcodeError').html(" <strong> X </strong> This barcode already exist ");
                $('#barcode').focus();
            }else{
                $('#barcodeError').html("");
            }
        });
    }
});

$('#addUpdateItemForm').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});
