//for scanning QR codes..
function startScanning() {
    var classListName = document.getElementById("classListsScanPage");
    var value = classListName.value;
    // var text = e.options[e.selectedIndex].text;
    let lists = JSON.parse(localStorage.classes);

    let students = lists[value].data.split("\n");
    // console.log(students);

    let weekIndex = document.getElementById("classListsWeek");

    var lastResult,
        countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText.replace("http://", "");
            //alert(lastResult);
            students.forEach((s) => {
                let attendance = s.data.split(",");
                console.log(attendance[0]);
                if (attendance[0] === decodedText) {
                    alert(lastResult);
                    attendance[weekIndex] = 1;
                }
            });
            localStorage.classes = JSON.stringify(lists);
        }
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        //console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "QRreader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function showClassListForScans(){

}