//for scanning QR codes..
function startScanning() {
    var classListName = document.getElementById("classListsScanPage");
    var value = classListName.value;
    // var text = e.options[e.selectedIndex].text;
    let lists = JSON.parse(localStorage.classes);
    let students = lists[value].data.split(";");
    // console.log(students);
    let weekIndex = document.getElementById("classListsWeek").value;
    var lastResult,
        countResults = 0;

    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");

    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.hidden = false;
            outputContainer.hidden = false;

            canvasElement.height = video.videoHeight / 2;
            canvasElement.width = video.videoWidth / 2;
            canvas.drawImage(
                video,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            var imageData = canvas.getImageData(
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                lastResult = code.data.replace("http://", "");
                alert(weekIndex);
                //iterate over students in class
                students.forEach((s) => {
                    //grab attendance record
                    let attendance = s.split(",");
                    //console.log(attendance.join(','));
                    if (attendance[0] === lastResult) {
                        //alert(weekIndex);
                        attendance[weekIndex] = (1).toString();
                        // console.log(attendance.join(','));
                        students[students.indexOf(s)] = attendance.join(',');
                        console.log(s);
                    }
                });
                lists[value].data = students.join('\n');

                console.log(students.join('\n'));
                //add update attendance to localStorage
                localStorage.classes = JSON.stringify(lists);
                console.log(localStorage.classes.toString());
                drawLine(
                    code.location.topLeftCorner,
                    code.location.topRightCorner,
                    "#FF3B58"
                );
                drawLine(
                    code.location.topRightCorner,
                    code.location.bottomRightCorner,
                    "#FF3B58"
                );
                drawLine(
                    code.location.bottomRightCorner,
                    code.location.bottomLeftCorner,
                    "#FF3B58"
                );
                drawLine(
                    code.location.bottomLeftCorner,
                    code.location.topLeftCorner,
                    "#FF3B58"
                );
                outputMessage.hidden = true;
                outputData.parentElement.hidden = false;
                outputData.innerText = code.data;
            } else {
                outputMessage.hidden = false;
                outputData.parentElement.hidden = true;
            }
        }
        requestAnimationFrame(tick);
    }
}
function showClassListForScans() {}
