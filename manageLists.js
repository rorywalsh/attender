function uploadZip(input) {
    let names = "";
    var zip = new JSZip();
    zip.loadAsync(input.files[0] /* = file blob */).then(
        function (zip) {
            let className = input.files[0].name.split(".")[0];
            // process ZIP file content here
            for (let [filename, file] of Object.entries(zip.files)) {
                // TODO Your code goes here
                console.log(filename.split(".")[0]);
                names +=
                    filename.split(".")[0] + ",0,0,0,0,0,0,0,0,0,0,0,0,0\n";
            }
            let classData = {};
            if (localStorage.classes){
                alert('found data');
                classData = JSON.parse(localStorage.classes);
            }
            let entry = {
                name: className,
                data: "Name, W-1, W-2, W-3, W-4, W-5, W-6, W-7, W-8, W-9, W-10, W-11, W-12, W-13\n",
            };
            entry.data += names;
            classData[className] = entry;
            // alert(JSON.stringify(classData));
            localStorage.classes = JSON.stringify(classData);
        },
        function () {
            alert("Not a valid zip file");
        }
    );
    setTimeout(function () {
        updateDropdown("classListsManagePage");
    }, 200);
}

//dropdown list onchange
function showClassList(evt) {
    // Display CSV as a table
    var e = document.getElementById("classListsManagePage");
    var value = e.value;
    // var text = e.options[e.selectedIndex].text;
    let lists = JSON.parse(localStorage.classes);
    if (lists) {
        displayCSVAsTable(lists[value].data);
    }
}

function parseCSV(csvString) {
    // Split the CSV string into rows
    var rows = csvString.split("\n");

    // Create an array to store the parsed data
    var data = [];

    // Loop through each row
    for (var i = 0; i < rows.length; i++) {
        // Split the row into columns
        var columns = rows[i].split(",");

        // Add the columns to the data array
        data.push(columns);
    }

    return data;
}

function displayCSVAsTable(csvString) {
    // Parse the CSV string
    var csvData = parseCSV(csvString);

    // Create a table element
    var table = document.createElement("table");
    table.setAttribute("id", "tableData");

    // Loop through each row of the CSV data
    for (var i = 0; i < csvData.length; i++) {
        // Create a table row
        var row = document.createElement("tr");

        // Loop through each column in the current row
        for (var j = 0; j < csvData[i].length; j++) {
            // Create a table cell
            var cell = document.createElement("td");

            // Set the content of the cell to the current CSV value
            cell.textContent = csvData[i][j];

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    let el = document.getElementById("tableData");
    if (el) {
        console.log(el);
        el.remove();
    }

    document.getElementById("studentListBlock").append(table);
}

function resetAll() {
    localStorage.clear();
}

function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });
    var a = document.createElement("a");
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}

function downloadTableForClass() {
    var e = document.getElementById("classListsManagePage");
    var value = e.value;
    let lists = JSON.parse(localStorage.classes);
    let data = lists[value].data;
    console.log(data);
    downloadString(data, ".txt", "data");
}

function downloadAllData() {
    downloadString(localStorage.classes, ".txt", "data");
}
