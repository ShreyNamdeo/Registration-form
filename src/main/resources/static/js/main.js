$('#display-div').hide();
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

function CreatePDFfromHTML() {
    $('#display-div').show();
    var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    var top_left_margin = 15;
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
        pdf.save("Sample_report.pdf");
        //$(".html-content").hide();
    });
    $('#display-div').hide();
}

$('#pdf-btn').click(function (e) {
    e.preventDefault();
    CreatePDFfromHTML();
});


$('#doc-btn').click(function (e) {
    e.preventDefault();
    $("#display-div").wordExport('Sample_report');
});

$('#input-form').submit(function(e){

    var base_elem_id = new Date().getTime() +"_"+$('#sno').val();
    var cpCsTable = "<table style='1px solid black;border-spacing:0;margin:10px;border-collapse: collapse;padding:0;'>";
    var cpCsCheckBoxes = "";

    $('input:checkbox.cp-cs').each(function () {
        //alert($(this)+" is checked "+this.checked+" value is :"+$(this).val())
        var tickMark = "";
        var isChecked = "";
        if(this.checked) {
            tickMark = "&#10003;";
            isChecked = "checked";
        }
        cpCsTable = cpCsTable + "<tr style='border:1px solid black;line-height:1'><td style='border:1px solid black;'>"+ tickMark + "</td><td style='border:1px solid black;'>" + $(this).val() + "</td></tr>"
        cpCsCheckBoxes = cpCsCheckBoxes + "<input class='editor-input "+base_elem_id+"' type='checkbox' "+isChecked+" value='"+$(this).val()+"'>"+$(this).val();
    });

    cpCsTable = cpCsTable + "</table>"

    //alert(cpCsCheckBoxes);

    var significanceVal = $('input[name="significance"]:checked').val();
    var significanceImg = setSignificanceImgBySignificanceVal(significanceVal);


    //This is for display div , which is being used for creating doc and Pdf
    var tableHeader = "<tr id='"+base_elem_id+"-row3' style='border-bottom:1px solid black;'>"+
                      "<td style='border-right:1px solid black;text-align:center;border-bottom:1px solid black;vertical-align: top;' rowspan='2'><span id='"+base_elem_id+"-sno-display2'>"+$('#sno').val()+"</span></td>"+
                      "<td style='border-bottom:1px solid black; border-top:1px solid black;' colspan='5'><span id='"+base_elem_id+"-heading-display2'>"+$('#heading').val()+"</span></td></tr>";
    var dataInTable = "<td style='border-right:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-issue-display2'>"+$('#issue').val()+"</span></pre></td>"+
                      "<td style='border-right:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-risk-display2'>"+$('#risk').val()+"</span></pre></td>"+
                      "<td style='border-right:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-action-display2'>"+$('#action').val()+"</span></pre></td>"+
                      "<td style='border-right:1px solid black;vertical-align: top;padding-top:10px;padding-bottom:10px;'><div id='"+base_elem_id+"-cpcs-display2'>"+cpCsTable+"</div></td>"+
                      "<td style='text-align:center;vertical-align: top;'><div id='"+base_elem_id+"-significance-display2'>"+significanceImg+"</div></td>"
    $('#display-table-data').append(tableHeader);
    $('#display-table-data').append("<tr style='border-bottom:1px solid black;' id='"+base_elem_id+"-row4'>"+dataInTable+"</tr>");

    //This is on page display div and editor
    tableHeader = "<tr id='"+base_elem_id+"-row1' style='border-bottom:1px solid black;'>"+
                  "<td style='border-right:1px solid black;text-align:center;border-bottom:1px solid black;vertical-align: top;' rowspan='2'><span id='"+base_elem_id+"-sno-display1'>"+$('#sno').val()+"</span><input id='"+base_elem_id+"-sno' type='text' class='editor-input hidden' value='"+$('#sno').val()+"'/></td>"+
                  "<td style='border-bottom:1px solid black; border-top:1px solid black;' colspan='5'><span id='"+base_elem_id+"-heading-display1'>"+$('#heading').val()+" </span><input type='text' id='"+base_elem_id+"-heading' class='editor-input hidden' value='"+$('#heading').val()+"'/> </td></tr>";
    dataInTable = "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-issue-display1'>"+$('#issue').val()+"</span></pre><input id='"+base_elem_id+"-issue' type='text' class='editor-input hidden' value='"+$('#issue').val()+"'/></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-risk-display1'>"+$('#risk').val()+"</span></pre><textarea id='"+base_elem_id+"-risk' type='text' class='editor-input hidden'>"+$('#risk').val()+"</textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;'><pre><span id='"+base_elem_id+"-action-display1'>"+$('#action').val()+"</span></pre><textarea id='"+base_elem_id+"-action' type='text' class='editor-input hidden'>"+$('#action').val()+"</textarea></td>"+
                  "<td style='border-right:1px solid black; border-bottom:1px solid black;vertical-align: top;'><div id='"+base_elem_id+"-cpcs-display1'>"+cpCsTable+"</div><div class='hidden' id='"+base_elem_id+"-cpcs'>"+cpCsCheckBoxes+"</div></td>"+
                  "<td style='text-align:center; border-bottom:1px solid black;'><div id='"+base_elem_id+"-significance-display1'>"+significanceImg+"</div><div class='hidden' id='"+base_elem_id+"-significance'>"+createSignificanceCheckedInput(base_elem_id,significanceVal)+"</div></td>"
    dataInTable = dataInTable + "<td style='border-left:1px solid #000;border-top:1px solid #000;'><button id='"+base_elem_id+"-edit' style='margin:10px;' class='btn btn-sm btn-outline-success' onclick = 'editSection(\""+base_elem_id+"\")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Edit</button>"+
                                "<button id='"+base_elem_id+"-delete' class='btn btn-sm btn-outline-danger' onclick = 'deleteSection(\""+base_elem_id+"\")'><i class='fa fa-trash-o' aria-hidden='true'></i> Delete</button>"+
                                "<button id='"+base_elem_id+"-save' class='btn btn-sm btn-outline-info hidden' onclick = 'saveEditedSection(\""+base_elem_id+"\")' ><i class='fa fa-trash-o' aria-hidden='true'></i> Save</button>"+
                                "</td>";
    $('#display-editor-table-data').append(tableHeader);
    $('#display-editor-table-data').append("<tr style='border-bottom:1px solid black;' id='"+base_elem_id+"-row2'>"+dataInTable+"</tr>");
    e.preventDefault();
    $('#sno').val("");$('#issue').val("");$('#risk').val("");$('#action').val("");$('#cpcs').val("");$('#heading').val("");
    $('input:checkbox.cp-cs').each(function(){
        this.checked = false;
    });
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
    $("#"+id+"-sno-display2").html($("#"+id+"-sno").val());
    $("#"+id+"-sno-display1").removeClass("hidden");
    $("#"+id+"-sno").addClass("hidden");

    //Heading
    $("#"+id+"-heading-display1").html($("#"+id+"-heading").val());
    $("#"+id+"-heading-display2").html($("#"+id+"-heading").val());
    $("#"+id+"-heading-display1").removeClass("hidden");
    $("#"+id+"-heading").addClass("hidden");

    //Issue
    $("#"+id+"-issue-display1").html($("#"+id+"-issue").val());
    $("#"+id+"-issue-display2").html($("#"+id+"-issue").val());
    $("#"+id+"-issue-display1").removeClass("hidden");
    $("#"+id+"-issue").addClass("hidden");

    //Risk
    $("#"+id+"-risk-display1").html($("#"+id+"-risk").val());
    $("#"+id+"-risk-display2").html($("#"+id+"-risk").val());
    $("#"+id+"-risk-display1").removeClass("hidden");
    $("#"+id+"-risk").addClass("hidden");

    //Action
    $("#"+id+"-action-display1").html($("#"+id+"-action").val());
    $("#"+id+"-action-display2").html($("#"+id+"-action").val());
    $("#"+id+"-action-display1").removeClass("hidden");
    $("#"+id+"-action").addClass("hidden");

    //CPCS
    $("#"+id+"-cpcs-display1").html(createCpCsTableFromCheckBoxes(id));
    $("#"+id+"-cpcs-display2").html(createCpCsTableFromCheckBoxes(id));
    $("#"+id+"-cpcs-display1").removeClass("hidden");
    $("#"+id+"-cpcs").addClass("hidden");

    //Significance
    $("#"+id+"-significance-display1").html(setSignificanceImgBySignificanceVal($('input[name='+id+']:checked').val()));
    $("#"+id+"-significance-display2").html(setSignificanceImgBySignificanceVal($('input[name='+id+']:checked').val()));
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
        return "<img src='./img/high.png' height=40 width=80/>";
    }
    if(significanceVal === 'Medium'){
        return "<img src='./img/medium.png' height=40 width=80/>";
    }
    if(significanceVal === 'Low'){
        return "<img src='./img/low.png' height=40 width=80/>";
    }
}

function deleteSection(id){
    $("#"+id+"-row1").remove();
    $("#"+id+"-row2").remove();
    $("#"+id+"-row3").remove();
    $("#"+id+"-row4").remove();
}