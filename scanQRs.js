//for scanning QR codes..
function startScanning() {
  let attendees = [];
  var resultContainer = document.getElementById('qr-reader-results');
  var lastResult, countResults = 0;
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
      ++countResults;
      lastResult = decodedText;

      if (attendees.indexOf(decodedText) == -1) {
        attendees.push(decodedText);
        attendees.forEach(id => {
          console.log(id);
        })
      }
    }
  }

  var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess);

}

