//for generating QR codes..
function generateQRs() {
  document.getElementById("studentList").innerHTML = document.getElementById("students").value;
  var studentIds = document.getElementById("students").value.split(/\r?\n|\r|\n/g);
  var zip = new JSZip();

  studentIds.forEach(id => {
    console.log(id);
    let qr = qrcode(0, 'L');
    const url = 'http://' + id.replaceAll(/ /g, "_");;
    qr.addData(url);
    qr.make();
    let qrImg = qr.createImgTag(5, 20, "qr code");
    document.getElementById("studentList").innerHTML = qrImg;
    var myImg = document.getElementById("studentList").getElementsByTagName('img')[0];

    if (myImg && myImg.alt === "qr code") {
      // alert(myImg.src.split("base64,")[1])
      const pngImg = myImg.src.split("base64,")[1];
      zip.file(id.replaceAll(/ /g, "_") + '.png', pngImg, { base64: true })
    }
  })

  setTimeout(function () {
    zip.generateAsync({ type: "blob" }).then(function (blob) { // 1) generate the zip file
      saveAs(blob, "studentList.zip");                          // 2) trigger the download
    }, function (err) {
      alert(err);
    });
  }, 500);
}