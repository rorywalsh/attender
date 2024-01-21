
function uploadZip(input) {
    let names = "";
    var zip = new JSZip();
    zip.loadAsync(input.files[0]/* = file blob */).then(

        function (zip) {
            let className = input.files[0].name.split('.')[0];
            // process ZIP file content here
            for (let [filename, file] of Object.entries(zip.files)) {
                // TODO Your code goes here
                console.log(filename.split('.')[0]);
                names += filename.split('.')[0] + ',0,0,0,0,0,0,0,0,0,0,0,0,0\n';
            }
            let classData = {};
            if (localStorage.classes)
                classData = JSON.parse(localStorage.classes);
            let entry = { name: className, data: 'Name, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13\n' };
            entry.data += names;
            classData[className] = entry;
            // alert(JSON.stringify(classData));
            localStorage.classes = JSON.stringify(classData);
        },
        function () {
            alert("Not a valid zip file");
        }
    );
}

//dropdown list onchange 
function showClassList(evt) {
    // Display CSV as a table
    var e = document.getElementById("classListsManagePage");
    var value = e.value;
    // var text = e.options[e.selectedIndex].text;
    let lists = JSON.parse(localStorage.classes);
    console.log(lists[value])
    displayCSVAsTable(lists[value].data);
}

function parseCSV(csvString) {
    // Split the CSV string into rows
    var rows = csvString.split('\n');

    // Create an array to store the parsed data
    var data = [];

    // Loop through each row
    for (var i = 0; i < rows.length; i++) {
        // Split the row into columns
        var columns = rows[i].split(',');

        // Add the columns to the data array
        data.push(columns);
    }

    return data;
}

function displayCSVAsTable(csvString) {
    // Parse the CSV string
    var csvData = parseCSV(csvString);

    // Create a table element
    var table = document.createElement('table');
    table.setAttribute("id", "tableData");

    // Loop through each row of the CSV data
    for (var i = 0; i < csvData.length; i++) {
        // Create a table row
        var row = document.createElement('tr');
        


        // Loop through each column in the current row
        for (var j = 0; j < csvData[i].length; j++) {
            // Create a table cell
            var cell = document.createElement('td');

            // Set the content of the cell to the current CSV value
            cell.textContent = csvData[i][j];

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    //document.getElementById("studentListBlock").removeChild(document.getElementById("studentListBlock").lastElementChild);

    // Append the table to the body of the document
    // if(document.getElementById("studentListBlock").children[0])
    //     document.getElementById("studentListBlock").children[0].replaceChild(table);
    // else
    let el = document.getElementById("tableData");
    if (el){
        console.log(el);
        el.remove();
    }
        

    document.getElementById("studentListBlock").append(table);
}



