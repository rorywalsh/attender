//for scanning QR codes..
function startScanning() {
  var classListName = document.getElementById('classListsScanPage');
  var value = classListName.value;
  // var text = e.options[e.selectedIndex].text;
  let lists = JSON.parse(localStorage.classes);

  let students = lists[value].data.split('\n');
  // console.log(students);


  let weekIndex = document.getElementById('classListsWeek');

  let attendees = [];

  var lastResult, countResults = 0;
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
      ++countResults;
      lastResult = decodedText;

      if (attendees.indexOf(decodedText) == -1) {
        attendees.push(decodedText);
        attendees.forEach(id => {
          students.forEach(s =>{
            if(s === id){
              alert("I'm in here")
              let attendance = s.data.split(',');
              attendance[weekIndex] = 1;
            }
          });
          console.log(id);
          localStorage.classes = JSON.stringify(lists);
        })
      }
    }
  }

  var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess);

}

