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
      if (j === width - 1) {
        tableHtml += "<td></td></tr>";
      } else {
        tableHtml += "<td></td>";
      }
    }
  }
  return tableHtml;
}

// insertTable inserts the table html
function insertTable() {
  // Set the canvas's innerHTML property to the table html
  pixelCanvas.innerHTML = tableHtml;
}

// Clicking the size picker form's submit button will call
// tableListener, which calls makeTable and insertTable
function tableListener() {
  makeTable();
  insertTable();
}

// Clicking "okay" in the color picker will call watchColorPicker, which
// sets color equal to the color chosen in the color picker
function watchColorPicker(event) {
  color = event.target.value;
}

// Clicking on the table will change the color of the td where the click
// took place
function draw(event) {
  event.target.style.backgroundColor = color;
}

// Set size picker submit button listener. Call makeTable on submit.
sizePickerSubmit.addEventListener("click", tableListener, true);

// Set the color picker event listener. Call watchColorPicker on change.
colorPicker.addEventListener("change", watchColorPicker, true);

// Set the table listener
pixelCanvas.addEventListener("click", draw, true);
