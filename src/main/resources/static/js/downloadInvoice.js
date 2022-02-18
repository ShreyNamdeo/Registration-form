function generateInvoicePdf(){
    $("#pdf-btn").addClass("hidden");
    $("#pdf-processing-btn").removeClass("hidden");
    $("#order-invoice").removeClass("hidden");

    var options = {
    };
    var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML($("#order-invoice"), 15, 15, options, function() {
        pdf.save('invoice.pdf');
    });
    //alert("PDF generated");
    $("#order-invoice").addClass("hidden");
    $("#pdf-btn").removeClass("hidden");
    $("#pdf-processing-btn").addClass("hidden");
}