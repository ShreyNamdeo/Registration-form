//http://jsfiddle.net/Paithankar/qhc1kdyd/22/
//https://app.docraptor.com/signup

DownloadSchedulePDF = function () {
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("Calibri");
    doc.setFontStyle('bold');
    //doc.text('Col and row span', 40, 50);
    //debugger;
    var data = getData(4);
    data.sort(function (a, b) {
        return parseFloat(b.expenses) - parseFloat(a.expenses);
    });
    doc.autoTable(getColumns(), data, {
        theme: 'grid',
        startY: 60,
        drawRow: function (row, data) {
            // Colspan
            //alert("Row : "+JSON.stringify(row));
            doc.setFontStyle('bold');
            doc.setFontSize(10);
            if (row.index === 0) {
                doc.setTextColor(200, 0, 0);
                doc.rect(data.settings.margin.left, row.y, data.table.width, 20, 'S');
                doc.autoTableText("Priority Group", data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
                    halign: 'center',
                    valign: 'middle'
                });
                data.cursor.y += 20;
            }

            //adding page
            if (row.index % 5 === 0) {
                var posY = row.y + row.height * 6 + data.settings.margin.bottom;
                if (posY > doc.internal.pageSize.height) {
                    data.addPage();
                }
            }
        },
        drawCell: function (cell, data) {
            // Rowspan
            if (data.column.dataKey === 'id') {
                if (data.row.index % 5 === 0) {
                    doc.rect(cell.x, cell.y, data.table.width, cell.height * 5, 'S');
                    doc.autoTableText(data.row.index / 5 + 1 + '', cell.x + cell.width / 2, cell.y + cell.height * 5 / 2, {
                        halign: 'center',
                        valign: 'middle'
                    });
                }
                return false;
            }
            if(data.column.dataKey === 'practioner'){
                var img = new Image();
                img.src = cell.raw;
                doc.addImage(img, 'JPEG', cell.x + cell.width / 2, cell.y + cell.height * 5 / 2);
                alert("Cell : "+JSON.stringify(cell));
            }
        }
    });
     doc.save('demo.pdf');
};

function getData(rowCount) {
    rowCount = rowCount || 4;
    var data = [];
    for (var j = 1; j <= rowCount; j++) {
        data.push({
            id: j,
            tatics: "Tatics",
            vopa: "Vopa",
            specialists: "Specialists",
            hospital: "Hospital",
            retailpharm: "Retailpharm",
            expenses: "Expenses",
            practioner: "./img/high.png"
        });
    }
    console.log(JSON.stringify(data));
    return data;
}


// Returns a new array each time to avoid pointer issues
var getColumns = function () {
    return [
        {title: "Strategic Activities", dataKey: "id"},
        {title: "Tatics", dataKey: "tatics"},
        {title: "Value of performing activity to Pfizer", dataKey: "vopa"},
        {title: "Specialists General", dataKey: "specialists"},
        {title: "Public Hosp. Dec. Makers", dataKey: "hospital"},
        {title: "Retail Pharm. Independent", dataKey: "retailpharm"},
        {title: "Retail Pharm. chains", dataKey: "expenses"},
        {title: "General Practioner", dataKey: "practioner"}
    ];
};

