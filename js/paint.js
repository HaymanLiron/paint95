
var red = 255;
var green = 255;
var blue = 255;


//these three should REALLY all be one function :(
//I'm embarrassed... :(
var changeBlue = function () {
    blue = document.getElementById("slideBlue").value;
    document.getElementById("outputBlueSlide").textContent = blue;
    document.getElementById("sampleCustomColor").style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
};

var changeGreen = function () {
    green = document.getElementById("slideGreen").value;
    document.getElementById("outputGreenSlide").textContent = green + "";
    document.getElementById("sampleCustomColor").style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
};

var changeRed = function () {
    red = document.getElementById("slideRed").value;
    document.getElementById("outputRedSlide").textContent = red + "";
    document.getElementById("sampleCustomColor").style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
};


var currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
var colors = ["white", "purple", "red", "green", "blue", "black"];
var mouseUp = true;


var changeCurrentColor = function (clickEvent) {
    currentColor = window.getComputedStyle(clickEvent.target).backgroundColor;

};

var setMouseDown = function () {
    mouseUp = false;
};

var setMouseUp = function () {
    mouseUp = true;
};

var changeColor = function (event) {
    if (!(mouseUp)) {
        event.target.style.backgroundColor = currentColor;
    }
};

var erase = function (event) {
    event.preventDefault();
    event.target.style.backgroundColor = "white";
};

var resetCanvas = function () {
    var pixels = document.getElementsByClassName("pixel");
    for (var i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = "white";

    }
};

var rotateCounterClockwise = function () {
    var canvasColumns = document.getElementsByClassName("canvasColumn");
    for (var i = canvasColumns.length - 1; i >= 0; i--) {
        canvasColumns[i].style.display = "block";
        var pixelsInColumn = canvasColumns[i].getElementsByClassName("pixel");
        for (var j = 0; j < pixelsInColumn.length; j++) {
            pixelsInColumn[j].style.display = "inline-block";

        }
    }
};

var createPallets = function () {
    for (var i = 0; i < colors.length; i++) {
        var palletSquare = document.createElement("button");
        palletSquare.classList.add("colorPallet");
        palletSquare.classList.add(colors[i]);
        palletSquare.addEventListener("click", changeCurrentColor);
        document.body.appendChild(palletSquare);
    }
    //set reset button and functionality
    var resetButton = document.createElement("button");
    resetButton.textContent = "RESET";
    resetButton.classList.add("resetButton");
    resetButton.addEventListener("click", resetCanvas);
    document.body.appendChild(resetButton);

    //set rotate button and functionality
    var rotateButton = document.createElement("button");
    rotateButton.textContent = "ROTATE";
    rotateButton.classList.add("rotateButton");
    rotateButton.addEventListener("click", rotateCounterClockwise);
    document.body.appendChild(rotateButton);

    document.body.appendChild(document.createElement("br"));
};

createPallets();

var canvas = document.createElement("div");
canvas.id = "canvas";
document.body.appendChild(canvas);
var createCanvas = function () {
    //first we have to remove the previous canvas
    //in case this is not the first one the user is making
    canvas.innerHTML = "";
    var canvasSize = parseInt(document.getElementById("canvasSizeUserInput").value);

    for (var i = 0; i < canvasSize; i++) {
        var canvasColumn = document.createElement("div");
        canvasColumn.classList.add("canvasColumn");
        for (var j = 0; j < canvasSize; j++) {
            var pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.classList.add("white");
            pixel.addEventListener("contextmenu", erase);
            pixel.addEventListener("mousedown", setMouseDown);
            pixel.addEventListener("mouseup", setMouseUp);
            pixel.addEventListener("mousemove", changeColor);
            canvasColumn.appendChild(pixel);
        }
        canvas.appendChild(canvasColumn);
    }
    document.body.appendChild(canvas);
};

var customCanvas = function () {
    //get user input to generate custom-sized canvas
    var canvasSizeLabel = document.createElement("label");
    canvasSizeLabel.textContent = "Please select a custom grid size";
    var canvasSizeUserInput = document.createElement("input");
    canvasSizeUserInput.type = "number";
    canvasSizeUserInput.min="0";
    canvasSizeUserInput.max="500";
    canvasSizeUserInput.step="10";
    canvasSizeUserInput.value="50";
    canvasSizeUserInput.id = "canvasSizeUserInput";
    canvasSizeUserInput.placeholder = "500";
    var canvasSizeSubmit = document.createElement("button");
    canvasSizeSubmit.textContent = "Generate Canvas";
    canvasSizeSubmit.addEventListener("click", createCanvas);

    document.body.appendChild(canvasSizeLabel);
    document.body.appendChild(canvasSizeUserInput);
    document.body.appendChild(canvasSizeSubmit);

};

customCanvas();

var customColorDiv = document.createElement("div");
var customColorsPrimary = ["Red", "Green", "Blue"];
for (var i = 0; i < customColorsPrimary.length; i++) {
    var labelForColors = document.createElement("label");
    labelForColors.htmlFor = "slide" + customColorsPrimary[i];
    labelForColors.textContent = customColorsPrimary[i];
    var slideInputForColors = document.createElement("input");
    slideInputForColors.addEventListener("change", eval("change" + customColorsPrimary[i]));
    slideInputForColors.id = "slide" + customColorsPrimary[i];
    slideInputForColors.type = "range";
    slideInputForColors.min = "0";
    slideInputForColors.max = "255";
    var outputFromSlide = document.createElement("p");
    outputFromSlide.classList.add("textForCustomColors");
    outputFromSlide.id = "output" + customColorsPrimary[i] + "Slide";
    outputFromSlide.textContent = "0";
    customColorDiv.appendChild(labelForColors);
    customColorDiv.appendChild(slideInputForColors);
    customColorDiv.appendChild(outputFromSlide);
}

var sampleCustomColorDiv = document.createElement("div");
sampleCustomColorDiv.id = "sampleCustomColor";
sampleCustomColorDiv.classList.add("sampleCustomColorDiv");
customColorDiv.appendChild(sampleCustomColorDiv);

document.body.appendChild(customColorDiv);




