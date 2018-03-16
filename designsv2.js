// DOM objects
const sizePickerForm = document.getElementById("sizePicker");
const inputHeight = document.getElementById("inputHeight");
const inputWidth = document.getElementById("inputWidth");
const sizePickerSubmit = document.getElementById("sizePickerSubmit");
const clearCanvas = document.getElementById("clearCanvas");
const colorPicker = document.getElementById("colorPicker");
let color = "#000000";
const pixelCanvas = document.getElementById("pixelCanvas");

// User a nested loop to create a long string storing the table html
// and then insert it into the DOM
// Create table
let tableHtml = "";
function makeTable() {
  // Get height and width
  const height = parseInt(inputHeight.value, 10);
  const width = parseInt(inputWidth.value, 10);
  // for each table row
  for (var i = 0; i < height; i++) {
    tableHtml += "<tr>";
    // for each table td
    for (var j = 0; j < width; j++) {
      if (j === width.length - 1) {
        tableHtml += "<td></td></tr>";
      } else {
        tableHtml += "<td></td>";
      }
    }
  }
  return tableHtml;
}

function insertTable(tableHtml) {
  pixelCanvas.innerHTML = tableHtml;
}

// Clicking on the submit button will call tableListener.
function tableListener(event) {
  makeTable();
  insertTable();
}

// Clicking "okay" in the color picker will call watchColorPicker. watchColorPicker
// sets a color
function watchColorPicker(event) {
  return (color = event.target.value);
}

function draw(event) {
  event.target.style.backgroundColor = color;
}

// Set size picker submit button listener. Call makeTable on submit.
sizePickerSubmit.addEventListener("click", makeTable, false);

// Set the color picker event listener. Call watchColorPicker on change.
colorPicker.addEventListener("change", watchColorPicker, false);

// Set the table listener
pixelCanvas.addEventListener("click", draw, false);
