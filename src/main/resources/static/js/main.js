$('#display-div').hide();
$("#display-editor-div").addClass("hidden");
$('#doc-btn').attr("disabled", true);
$('#pdf-btn').attr("disabled", true);
/*var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};*/

function CreatePDFfromHTML(e) {
    $('#display-div').show();
    /*var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    alert(HTML_Height);
    var top_left_margin = 30;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".html-content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save("Report.pdf");
        //$(".html-content").hide();
    });*/

    // ---------------Print via window.print ---------------------------------
    //alert( $("#display-table").children("thead").children("tr").children("th"));
    //$("#display-table").css({"position":"relative", "top":"40px"});
    $("#display-table").children("thead").children("tr").children("th").css({"line-height": "0px","border-bottom":"15px solid blue","border-top":"15px solid blue", "color":"white", "font-weight":"bolder", "position":"relative","top":"10px"});
    //$("#display-table").children("tbody").css({"position":"relative", "top":"15px"});
    //alert($("#display-table").children("tbody").children("tr").first().children("td").html());
    $("#display-table").children("tbody").children("tr").first().css({"position":"relative","top":"10px"});
    $("#display-table").children("tbody").children("tr").first().children("td").last().children("span").css({"position":"relative","top":"10px"});
    $("#display-table").children("tbody").first().children("tr").children("td").children("span").css({"position":"relative","top":"10px"});
    $("#cpCsHead-1").css({"position":"relative", "bottom":"8px"});
    $("#cpCsHead-2").css({"position":"relative", "top":"8px"});
    //$("#display-table").children("thead").children("tr").children("th:last-child").children("img").css({"height":"30","width":"65"});
    //var printContents = document.getElementById('display-div').innerHTML;
    //var originalContents = document.body.innerHTML;
    var newWin = window.frames["printf"];
    newWin.document.write(document.getElementById('display-div').innerHTML);
    newWin.document.close();
    window.frames["printf"].focus();
    window.frames["printf"].print();
    $("#display-table").children("thead").children("tr").children("th").css({"line-height": "","border-bottom":"","border-top":"", "color":"", "font-weight":"","position":"","top":""});
    $("#display-table").children("tbody").children("tr").first().css({"position":"","top":""});
    $("#display-table").children("tbody").children("tr").first().children("td").last().children("span").css({"position":"","top":""});
    $("#display-table").children("tbody").first().children("tr").children("td").children("span").css({"position":"","top":""});
    $("#cpCsHead-1").css({"position":"", "bottom":""});
    $("#cpCsHead-2").css({"position":"", "top":""});
    $('#display-div').hide();
    //e.preventDefault();
}

$('#pdf-btn').click(function (e) {
    e.preventDefault();
    CreatePDFfromHTML();
});


$('#doc-btn').click(function (e) {
    e.preventDefault();
    $("#display-div").wordExport('Report');
});

$('#input-form').submit(function(e){
    var sno_val = $('#sno').val().replace(/[^a-zA-Z0-9]/g, '');
    var base_elem_id = new Date().getTime() +"_"+sno_val;
    var cpCsTable = "<table style='border:1px solid black;border-spacing:0;margin:10px;border-collapse: collapse;padding:0;font-family:\"Calibri\" !important;font-size:14.5px;margin-bottom:10px;'>";
    var cpCsCheckBoxes = "";

    $('input:checkbox.cp-cs').each(function () {
        //alert($(this)+" is checked "+this.checked+" value is :"+$(this).val())
        var tickMark = "";
        var isChecked = "";
        if(this.checked) {
            tickMark = "&#10003;";
            isChecked = "checked";
        }
        cpCsTable = cpCsTable + "<tr style='border:1px solid black;line-height:0.70;'><td style='border:1px solid black;'>"+ tickMark + "</td><td style='border:1px solid black;'>" + $(this).val() + "</td></tr>"
        cpCsCheckBoxes = cpCsCheckBoxes + "<input class='editor-input "+base_elem_id+"' type='checkbox' "+isChecked+" value='"+$(this).val()+"'>"+$(this).val();
    });

    cpCsTable = cpCsTable + "</table>"

    //alert(cpCsCheckBoxes);

    var significanceVal = $('input[name="significance"]:checked').val();
    var significanceImg = setSignificanceImgBySignificanceVal(significanceVal);


    //This is for display div , which is being used for creating doc and Pdf
    var tableHeader = "<tr id='"+base_elem_id+"-row-final-1' class='data-row' style='border-bottom:1px solid black;'>"+
                      "<td style='border:1px solid black;text-align:center;border-bottom:1px solid black;vertical-align: top;' rowspan='2'><span id='"+base_elem_id+"-sno-final1'>"+$('#sno').val()+"</span></td>"+
                      "<td style='border:1px solid black; border-top:1px solid black;padding: 0 0 8px 5px;' colspan='5'><span style='font-style: italic;font-weight: bold;' id='"+base_elem_id+"-heading-final1'>"+$('#heading').val()+"</span></td></tr>";
    var dataInTable = "<td style='border:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-issue-final1'>"+$('#issue').val()+"</span></td>"+
                      "<td style='border:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-risk-final1'>"+$('#risk').val()+"</span></td>"+
                      "<td style='border:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-action-final1'>"+$('#action').val()+"</span></td>"+
                      "<td style='border:1px solid black;vertical-align: top;padding-top:10px;padding-bottom:10px; width:10%;'><div id='"+base_elem_id+"-cpcs-final1'>"+cpCsTable+"</div></td>"+
                      "<td style='border:1px solid black;text-align:center;vertical-align: top; width:10%;padding-top:10px;'><div id='"+base_elem_id+"-significance-final1'>"+significanceImg+"</div></td>"
    $('#display-table-data').append(tableHeader);
    $('#display-table-data').append("<tr style='border-bottom:1px solid black;' id='"+base_elem_id+"-row-final-2' class='data-row'>"+dataInTable+"</tr>");

    //This is on page display div and editor
    tableHeader = "<tr id='"+base_elem_id+"-row-disp-1' style='border-bottom:1px solid black;' class='"+base_elem_id+"-report-data-row editor-row'>"+
                  "<td style='border-right:1px solid black;text-align:center;border-bottom:1px solid black;vertical-align: top;' rowspan='2'><span id='"+base_elem_id+"-sno-display1'>"+$('#sno').val()+"</span><input id='"+base_elem_id+"-sno' type='text' class='editor-input hidden' value='"+$('#sno').val()+"'/></td>"+
                  "<td style='border-bottom:1px solid black; border-top:1px solid black;padding: 0 0 0 5px;' colspan='5' ><span style='font-style: italic;font-weight: bold;' id='"+base_elem_id+"-heading-display1'>"+$('#heading').val()+" </span><input type='text' id='"+base_elem_id+"-heading' class='editor-input hidden' value='"+$('#heading').val()+"'/> </td></tr>";
    dataInTable = "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-issue-display1'>"+$('#issue').val()+"</span><textarea id='"+base_elem_id+"-issue' type='text' class='editor-input hidden' >"+$('#issue').val()+"</textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-risk-display1'>"+$('#risk').val()+"</span><textarea id='"+base_elem_id+"-risk' type='text' class='editor-input hidden'>"+$('#risk').val()+"</textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;white-space: pre-wrap; width:25%;padding: 0 0 0 5px;'><span id='"+base_elem_id+"-action-display1'>"+$('#action').val()+"</span><textarea id='"+base_elem_id+"-action' type='text' class='editor-input hidden'>"+$('#action').val()+"</textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;  width:10%;'><div id='"+base_elem_id+"-cpcs-display1'>"+cpCsTable+"</div><div class='hidden' id='"+base_elem_id+"-cpcs'>"+cpCsCheckBoxes+"</div></td>"+
                  "<td style='text-align:center; border-bottom:1px solid black;width:10%;'><div id='"+base_elem_id+"-significance-display1'>"+significanceImg+"</div><div class='hidden' id='"+base_elem_id+"-significance'>"+createSignificanceCheckedInput(base_elem_id,significanceVal)+"</div></td>"
    dataInTable = dataInTable + "<td style='border-left:1px solid #000;border-top:1px solid #000;'><button id='"+base_elem_id+"-edit' style='margin:10px;' class='btn btn-sm btn-outline-success' onclick = 'editSection(\""+base_elem_id+"\")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Edit</button>"+
                                "<button id='"+base_elem_id+"-delete' style='margin:10px;' class='btn btn-sm btn-outline-danger' onclick = 'deleteRow(\""+base_elem_id+"-row-disp-2\")'><i class='fa fa-trash-o' aria-hidden='true'></i> Delete</button>"+
                                "<button id='"+base_elem_id+"-save' style='margin:10px;' class='btn btn-sm btn-outline-info hidden' onclick = 'saveEditedSection(\""+base_elem_id+"\")' ><i class='fa fa-trash-o' aria-hidden='true'></i> Save</button>"+
                                "<button id='"+base_elem_id+"-AddAnotherRow' style='margin:10px;' class='btn btn-sm btn-outline-info' onclick = 'addAnotherDataRow(\""+base_elem_id+"-row-disp-2\")' ><i class='fa fa-plus' aria-hidden='true'></i> Add Row</button>"+
                                "</td>";
    $('#display-editor-table-data').append(tableHeader);
    $('#display-editor-table-data').append("<tr style='border-bottom:1px solid black;' id='"+base_elem_id+"-row-disp-2' class='"+base_elem_id+"-report-data-row editor-row'>"+dataInTable+"</tr>");
    e.preventDefault();
    $('#sno').val("");$('#issue').val("");$('#risk').val("");$('#action').val("");$('#cpcs').val("");$('#heading').val("");
    $('input:checkbox.cp-cs').each(function(){
        this.checked = false;
    });
    $('html, body').animate({
            scrollTop: $("#"+base_elem_id+"-row-disp-2").offset().top
    }, 2000);

    checkDataRowCountAndEnableFeature();
});

function createSignificanceCheckedInput(id, significanceValue){
    if(significanceValue === 'High'){
        return "<input class='editor-input' type='radio' name='"+id+"' checked value='High'> High <input class='editor-input' type='radio' name='"+id+"' value='Medium'> Medium <input class='editor-input' type='radio' name='"+id+"' value='Low'> Low "
    }
    if(significanceValue === 'Medium'){
        return "<input class='editor-input' type='radio' name='"+id+"' value='High'> High <input class='editor-input' type='radio' name='"+id+"' checked value='Medium'> Medium <input class='editor-input' type='radio' name='"+id+"' value='Low'> Low "
    }
    if(significanceValue === 'Low'){
        return "<input class='editor-input' type='radio' name='"+id+"' value='High'> High <input class='editor-input' type='radio' name='"+id+"' value='Medium'> Medium <input class='editor-input' type='radio' name='"+id+"' checked value='Low'> Low "
    }
}

function editSection(id){
    $("#"+id+"-edit").addClass("hidden");
    $("#"+id+"-delete").addClass("hidden");
    $("#"+id+"-save").removeClass("hidden");

    //S.No
    $("#"+id+"-sno-display1").addClass("hidden");
    $("#"+id+"-sno").removeClass("hidden");

    //Heading
    $("#"+id+"-heading-display1").addClass("hidden");
    $("#"+id+"-heading").removeClass("hidden");

    //Issue
    $("#"+id+"-issue-display1").addClass("hidden");
    $("#"+id+"-issue").removeClass("hidden");

    //Risk
    $("#"+id+"-risk-display1").addClass("hidden");
    $("#"+id+"-risk").removeClass("hidden");

    //Action
    $("#"+id+"-action-display1").addClass("hidden");
    $("#"+id+"-action").removeClass("hidden");

    //CPCS
    $("#"+id+"-cpcs-display1").addClass("hidden");
    $("#"+id+"-cpcs").removeClass("hidden");

    //Significance
    $("#"+id+"-significance-display1").addClass("hidden");
    $("#"+id+"-significance").removeClass("hidden");
}

function saveEditedSection(id){
    $("#"+id+"-edit").removeClass("hidden");
    $("#"+id+"-delete").removeClass("hidden");
    $("#"+id+"-save").addClass("hidden");

    //S.No
    $("#"+id+"-sno-display1").html($("#"+id+"-sno").val());
    $("#"+id+"-sno-final1").html($("#"+id+"-sno").val());
    $("#"+id+"-sno-display1").removeClass("hidden");
    $("#"+id+"-sno").addClass("hidden");

    //Heading
    $("#"+id+"-heading-display1").html($("#"+id+"-heading").val());
    $("#"+id+"-heading-final1").html($("#"+id+"-heading").val());
    $("#"+id+"-heading-display1").removeClass("hidden");
    $("#"+id+"-heading").addClass("hidden");

    //Issue
    $("#"+id+"-issue-display1").html($("#"+id+"-issue").val());
    $("#"+id+"-issue-final1").html($("#"+id+"-issue").val());
    $("#"+id+"-issue-display1").removeClass("hidden");
    $("#"+id+"-issue").addClass("hidden");

    //Risk
    $("#"+id+"-risk-display1").html($("#"+id+"-risk").val());
    $("#"+id+"-risk-final1").html($("#"+id+"-risk").val());
    $("#"+id+"-risk-display1").removeClass("hidden");
    $("#"+id+"-risk").addClass("hidden");

    //Action
    $("#"+id+"-action-display1").html($("#"+id+"-action").val());
    $("#"+id+"-action-final1").html($("#"+id+"-action").val());
    $("#"+id+"-action-display1").removeClass("hidden");
    $("#"+id+"-action").addClass("hidden");

    //CPCS
    $("#"+id+"-cpcs-display1").html(createCpCsTableFromCheckBoxes(id));
    $("#"+id+"-cpcs-final1").html(createCpCsTableFromCheckBoxes(id));
    $("#"+id+"-cpcs-display1").removeClass("hidden");
    $("#"+id+"-cpcs").addClass("hidden");

    //Significance
    $("#"+id+"-significance-display1").html(setSignificanceImgBySignificanceVal($('input[name='+id+']:checked').val()));
    $("#"+id+"-significance-final1").html(setSignificanceImgBySignificanceVal($('input[name='+id+']:checked').val()));
    $("#"+id+"-significance-display1").removeClass("hidden");
    $("#"+id+"-significance").addClass("hidden");
}

function createCpCsTableFromCheckBoxes(className){
    var cpCsTable = "<table style='1px solid black;border-spacing:0;margin:10px;border-collapse: collapse;padding:0;'>";
    $('input:checkbox.'+className).each(function () {
        //alert($(this)+" is checked "+this.checked+" value is :"+$(this).val())
        var tickMark = "";
        var isChecked = "";
        if(this.checked) {
            tickMark = "&#10003;";
            isChecked = "checked";
        }
        cpCsTable = cpCsTable + "<tr style='border:1px solid black;line-height:1'><td style='border:1px solid black;'>"+ tickMark + "</td><td style='border:1px solid black;'>" + $(this).val() + "</td></tr>"
    });
    cpCsTable = cpCsTable + "</table>";
    return cpCsTable;
}

function setSignificanceImgBySignificanceVal(significanceVal){
    if(significanceVal === 'High'){
        return "<img src='./img/high.png' height=30 width=65/>";
    }
    if(significanceVal === 'Medium'){
        return "<img src='./img/medium.png' height=30 width=65/>";
    }
    if(significanceVal === 'Low'){
        return "<img src='./img/low.png' height=30 width=65/>";
    }
}

function addAnotherDataRow(rowId){
    var id = rowId.split("-")[0];
    var numberOfRows = parseInt($("#"+id+"-sno-display1").parent().attr("rowspan"));
    $("#"+id+"-sno-display1").parent().attr("rowspan",numberOfRows+1);
    $("#"+id+"-sno-final1").parent().attr("rowspan",numberOfRows+1);
    var incrementedRowValue = numberOfRows+1;
    var cpCsCheckBoxes = "";
    $('input:checkbox.cp-cs').each(function () {
        cpCsCheckBoxes = cpCsCheckBoxes + "<input class='editor-input "+id+"-checkbox-"+incrementedRowValue+"' type='checkbox' value='"+$(this).val()+"'/>"+$(this).val()+"<br>";
    });

    var significanceRadio = "";
    $('input:radio.significance').each(function () {
        significanceRadio = significanceRadio + "<input class='editor-input "+id+"-radio-"+incrementedRowValue+"' name='"+id+"-significance-"+incrementedRowValue+"' type='radio' value='"+$(this).val()+"'/>"+$(this).val()+"<br>";
    });

    //Add Another Row to editor table
    var dataInTable = "<td style='border:1px solid black;vertical-align: top;white-space: pre;'><span id='"+id+"-issue-final"+incrementedRowValue+"'></span></td>"+
                "<td style='border:1px solid black;vertical-align: top;white-space: pre;'><span id='"+id+"-risk-final"+incrementedRowValue+"'></span></td>"+
                "<td style='border:1px solid black;vertical-align: top;white-space: pre;'><span id='"+id+"-action-final"+incrementedRowValue+"'></span></td>"+
                "<td style='border:1px solid black;vertical-align: top;padding-top:10px;padding-bottom:10px;'><div id='"+id+"-cpcs-final"+incrementedRowValue+"'></div></td>"+
                "<td style='border:1px solid black; text-align:center;vertical-align: top;'><div id='"+id+"-significance-final"+incrementedRowValue+"'></div></td>"
    //$('#display-table-data').append("<tr style='border-bottom:1px solid black;' id='"+id+"-row-final-"+incrementedRowValue+"'>"+dataInTable+"</tr>");
    $("<tr style='border-bottom:1px solid black;' id='"+id+"-row-final-"+incrementedRowValue+"'>"+dataInTable+"</tr>").insertAfter("#"+id+"-row-final-"+rowId.split("-")[3]);

    //Add Another Row to display table
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;white-space: pre;'><span id='"+id+"-risk-display"+incrementedRowValue+"'></span><textarea placeholder='Risk' id='"+id+"-risk-disp"+incrementedRowValue+"' type='text' class='editor-input'></textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;white-space: pre;'><span id='"+id+"-action-display"+incrementedRowValue+"'></span><textarea placeholder='Action' id='"+id+"-action-disp"+incrementedRowValue+"' type='text' class='editor-input'></textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;'><div id='"+id+"-cpcs-display"+incrementedRowValue+"'></div><div class='' id='"+id+"-cpcs-disp"+incrementedRowValue+"'>"+cpCsCheckBoxes+"</div></td>"+
                  "<td style='text-align:center; border-bottom:1px solid black;'><div id='"+id+"-significance-display"+incrementedRowValue+"'></div><div class='' id='"+id+"-significance-disp"+incrementedRowValue+"'>"+significanceRadio+"</div></td>"
    dataInTable = dataInTable + "<td style='border-left:1px solid #000;border-top:1px solid #000;'><button id='"+id+"-edit-display"+incrementedRowValue+"' style='margin:10px;' class='btn btn-sm btn-outline-success hidden' onclick = 'editRow(\""+id+"-row-disp-"+incrementedRowValue+"\")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Edit</button>"+
                                "<button id='"+id+"-delete-display"+incrementedRowValue+"' style='margin:10px;' class='btn btn-sm btn-outline-danger' onclick = 'deleteRow(\""+id+"-row-disp-"+incrementedRowValue+"\")'><i class='fa fa-trash-o' aria-hidden='true'></i> Delete</button>"+
                                "<button id='"+id+"-save-display"+incrementedRowValue+"' style='margin:10px;' class='btn btn-sm btn-outline-info' onclick = 'saveEditedRow(\""+id+"-row-disp-"+incrementedRowValue+"\")' ><i class='fa fa-trash-o' aria-hidden='true'></i> Save</button>"+
                                "<button id='"+id+"-AddAnotherRow-display"+incrementedRowValue+"' style='margin:10px;' class='btn btn-sm btn-outline-info hidden' onclick = 'addAnotherDataRow(\""+id+"-row-disp-"+incrementedRowValue+"\")' ><i class='fa fa-plus' aria-hidden='true'></i> Add Row</button>"+
                                "</td>";
    //$('#display-editor-table-data').append("<tr style='border-bottom:1px solid black;' id='"+id+"-row-disp-"+incrementedRowValue+"' class='"+id+"-report-data-row'>"+dataInTable+"</tr>");
    $("<tr style='border-bottom:1px solid black;' id='"+id+"-row-disp-"+incrementedRowValue+"' class='"+id+"-report-data-row'>"+dataInTable+"</tr>").insertAfter("#"+rowId);
}

function editRow(rowId){
    var id = rowId.split("-")[0];
    var incrementedRowValue = parseInt(rowId.split("-")[3]);

    $("#"+id+"-issue-disp"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-issue-display"+incrementedRowValue).addClass("hidden");

    $("#"+id+"-risk-disp"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-risk-display"+incrementedRowValue).addClass("hidden");

    $("#"+id+"-action-disp"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-action-display"+incrementedRowValue).addClass("hidden");

    $("#"+id+"-cpcs-disp"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-cpcs-display"+incrementedRowValue).addClass("hidden");

    $("#"+id+"-significance-disp"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-significance-final"+incrementedRowValue).addClass("hidden");

    $("#"+id+"-save-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-edit-display"+incrementedRowValue).addClass("hidden");
}

function saveEditedRow(rowId){
    var id = rowId.split("-")[0];
    var incrementedRowValue = parseInt(rowId.split("-")[3]);

    $("#"+id+"-issue-disp"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-issue-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-issue-display"+incrementedRowValue).html($("#"+id+"-issue-disp"+incrementedRowValue).val());
    $("#"+id+"-issue-final"+incrementedRowValue).html($("#"+id+"-issue-disp"+incrementedRowValue).val());

    $("#"+id+"-risk-disp"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-risk-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-risk-display"+incrementedRowValue).html($("#"+id+"-risk-disp"+incrementedRowValue).val());
    $("#"+id+"-risk-final"+incrementedRowValue).html($("#"+id+"-risk-disp"+incrementedRowValue).val());

    $("#"+id+"-action-disp"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-action-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-action-display"+incrementedRowValue).html($("#"+id+"-action-disp"+incrementedRowValue).val());
    $("#"+id+"-action-final"+incrementedRowValue).html($("#"+id+"-action-disp"+incrementedRowValue).val());

    var cpCsTable = createCpCsTableFromCheckBoxes(id+"-checkbox-"+incrementedRowValue);
    $("#"+id+"-cpcs-disp"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-cpcs-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-cpcs-display"+incrementedRowValue).html(cpCsTable);
    $("#"+id+"-cpcs-final"+incrementedRowValue).html(cpCsTable);

    var significanceImg = setSignificanceImgBySignificanceVal($('input[name="'+id+"-significance-"+incrementedRowValue+'"]:checked').val());
    $("#"+id+"-significance-disp"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-significance-final"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-significance-final"+incrementedRowValue).html(significanceImg);
    $("#"+id+"-significance-display"+incrementedRowValue).html(significanceImg);

    $("#"+id+"-save-display"+incrementedRowValue).addClass("hidden");
    $("#"+id+"-edit-display"+incrementedRowValue).removeClass("hidden");
    $("#"+id+"-AddAnotherRow-display"+incrementedRowValue).removeClass("hidden");
}

function deleteRow(id){
    var base_elem_id = id.split("-")[0];
    var numberOfRows = parseInt($("."+base_elem_id+"-report-data-row").length);
    if(numberOfRows == 2){
        $("#"+base_elem_id+"-row-disp-1").remove();
        $("#"+base_elem_id+"-row-final-1").remove();
    }
    if(numberOfRows > 2){
        $("#"+base_elem_id+"-sno-display1").parent().attr("rowspan",numberOfRows-1);
        $("#"+base_elem_id+"-sno-final1").parent().attr("rowspan",numberOfRows-1);
    }
    $("#"+id).remove();
    $("#"+base_elem_id+"-row-final-"+id.split("-")[3]).remove();
    checkDataRowCountAndEnableFeature();
}

$("a[href='#input-form']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

function checkDataRowCountAndEnableFeature(e){
    alert($('.editor-row').length);
    if($('.editor-row').length < 1){
        $("#display-editor-div").addClass("hidden");
        $("#no-data").removeClass("hidden");
        $('#doc-btn').attr("disabled", true);
        $('#pdf-btn').attr("disabled", true);
    }else{
        $('#doc-btn').removeAttr("disabled");
        $('#pdf-btn').removeAttr("disabled");
        $("#display-editor-div").removeClass("hidden");
        $("#no-data").addClass("hidden");
    }
    e.preventDefault();
}

// 1733.08 size of div which stores perfectly on a single pdf page
