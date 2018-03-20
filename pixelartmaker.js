// DOM objects
const sizePickerForm = document.getElementById("sizePicker");
const inputHeight = document.getElementById("inputHeight");
const inputWidth = document.getElementById("inputWidth");
const sizePickerSubmit = document.getElementById("sizePickerSubmit");
const colorPicker = document.getElementById("colorPicker");
let color = "#000000";
const paint = document.getElementById("paintBttn");
const erase = document.getElementById("eraseBttn");
const clearCanvas = document.getElementById("clearCanvas");
const pixelCanvas = document.getElementById("pixelCanvas");

// User a nested loop to create a long string storing the table html
let tableHtml = "";

function makeTable() {
  // Reset the grid
  pixelCanvas.innerHTML = "&nbsp";
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

// tableListener will call insertTable after calling makeTable.
// insertTable uses the canvas's innerHTML property to insert
// the table html
function insertTable() {
  // Set the canvas's innerHTML property to the table html
  pixelCanvas.innerHTML = tableHtml;
}

// Clicking the size picker form's submit button will call
// tableListener, which calls makeTable and insertTable
function tableListener() {
  tableHtml = "";
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
  if (event.buttons === 1 && paint.checked === true) {
    event.target.style.backgroundColor = color;
  } else if (event.buttons === 1) {
    event.target.style.backgroundColor = "transparent";
  }
}

// This function clears the grid of color while leaving the grid in place
function clearGrid(event) {
  event.preventDefault();
  const cells = pixelCanvas.getElementsByTagName("td");
  for (let k = 0; k < cells.length; k++) {
    cells[k].style.backgroundColor = "transparent";
  }
}

// Set size picker submit button listener. Call makeTable on submit.
sizePickerSubmit.addEventListener("click", tableListener, false);

// Set the color picker event listener. Call watchColorPicker on change.
colorPicker.addEventListener("change", watchColorPicker, false);

// Set the clear button listener
clearCanvas.addEventListener("click", clearGrid, false);

// Set the draw listener. Call
pixelCanvas.addEventListener("mouseover", draw, false);
pixelCanvas.addEventListener("mousedown", draw, false);
