function uploadZip(input) {
   
    var zip = new JSZip();
    zip.loadAsync(input.files[0]/* = file blob */).then(
        function (zip) {
            // process ZIP file content here
            alert("OK");
        },
        function () {
            alert("Not a valid zip file");
        }
    );
}

// function uploadZip(input) {
//   let file = input.files[0];

//   alert(`File name: ${file.name}`); // e.g my.png
//   alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
// }