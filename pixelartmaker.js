/**
 * @fileoverview Pixel Art Maker is a simple drawing application. It enables users to draw in a color of their choosing on a canvass with dimensions of their choosing. Please refer to the GitHub repository's issues tab for more information on  forthcoming enhancements.
 * @see <a href="https://github.com/julianjohannesen/pixel-art-maker">Pixel Art Maker Repo</a>
 * @author Julian Johannesen
 * @version 1.0.0
 */
/** DOM object constants */
/** @const {string} sizePickerForm - This variable holds the size picker form element */
/** @const {number} inputHeight - This variable holds the height input element */
/** @const {number} inputWidth - This variable holds the width input element */
/** @const {string} sizePickerSubmit - This variable holds the size picker form's submit button element */
/** @const {string} colorPicker - This variable holds the color input element */
/** @const {string} color - This variable holds the color value chosen by the user in the color picker. */
/** @const {string} paint - This variable holds the paint radio input element */
/** @const {string} erase - This variable holds the erase radio input element */
/** @const {string} clearCanvas - This variable holds the clear canvas button element */
/** @const {string} pixelCanvas - This variable holds the canvas table element */

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

/** Other variables */
/** @const {string} tableHtml - This variable holds the  holder for makeTable's output */
let tableHtml = "";

/**
 * @description makeTable generates the table HTML that is stored in the tableHtml variable.
 * @callback makeTable()
 * @param {null} " " Does not have any parameters
 * @returns {string}
 */
function makeTable() {
  // Reset the table grid
  pixelCanvas.innerHTML = "&nbsp";
  // Get height and width from the size picker form
  const height = parseInt(inputHeight.value, 10);
  const width = parseInt(inputWidth.value, 10);
  // For each table row, as indicated by "height"
  for (var i = 0; i < height; i++) {
    // Append a table row to tableHtml holding variable
    tableHtml += "<tr>";
    // for each table cell, as indicated by "width"
    for (var j = 0; j < width; j++) {
      // If we've reached the end of the table row
      if (j === width - 1) {
        // ...then append the final table cell and table row closing tag
        tableHtml += "<td></td></tr>";
      } else {
        // Otherwise, append a table cell
        tableHtml += "<td></td>";
      }
    }
  }
  // Return the tableHtml. This isn't strictly necessary, but is useful.
  return tableHtml;
}

/**
 * @description insertTable inserts the table HTML into the DOM
 * @callback insertTable()
 * @param {null} " " Does not have any parameters.
 * @returns {undefined}
 */
function insertTable() {
  // Set the canvas's innerHTML property to the table html
  pixelCanvas.innerHTML = tableHtml;
}

/**
 * @description sizePickerHandler() resets the table HTML, and fire makeTable() and insertTable()
 * @callback sizePickerHandler
 * @fires makeTable
 * @fires insertTable
 * @param {null} " " Does not have any parameters
 * @returns {undefined}
 */
function sizePickerHandler() {
  // Reset the tableHtml to an empty string
  tableHtml = "";
  // Generate the table HTML
  makeTable();
  // Insert the table HTML into the DOM
  insertTable();
}

/**
 * @description watchColorPicker sets the color variable's value to the color selected in the color picker
 * @callback watchColorPicker
 * @param {any} event The event object passed by the colorPicker listener
 * @returns {undefined}
 */
function watchColorPicker(event) {
  // Set the color variable to the color selected in the color picker
  color = event.target.value;
}

/**
 * @description draw changes the target table cell's background color to 'color'
 * @callback draw
 * @param {any} event The event object passed by the colorPicker listener
 * @returns {undefined}
 */
function draw(event) {
  // If the primary mouse button is held down and the app is in paint mode
  if (event.buttons === 1 && paint.checked === true) {
    // ...then set the target table cell's background color to 'color'
    event.target.style.backgroundColor = color;
  } else if (event.buttons === 1) {
    // Otherwise, the app is in erase mode, so set the target table cell's background color to transparent
    event.target.style.backgroundColor = "transparent";
  }
}

/**
 * @description clearGrid re-inserts the table html, overwriting the current grid with the same tableHtml but with all table cells returned to their default background color of transparent.
 * @callback clearGrid
 * @param {any} event The event object passed by the clearCanvas listener
 * @returns {undefined}
 */
function clearGrid(event) {
  // Prevent the button click's default behavior
  event.preventDefault();
  // Fire insert table.
  insertTable();
}

/**
 * @description init initializes event listeners after the DOM content has loaded.
 * @callback init
 * @param {null} " " Does not have any parameters.
 * @returns {undefined}
 *
 */
function init() {
  // Set size picker submit button listener. On click call the sizePickerHandler().
  sizePickerSubmit.addEventListener("click", sizePickerHandler, false);

  // Set the color picker listener. On a change, call watchColorPicker().
  colorPicker.addEventListener("change", watchColorPicker, false);

  // Set the clear button listener. On a click call clearGrid().
  clearCanvas.addEventListener("click", clearGrid, false);

  // Set the canvas listeners. On a mouse over, call draw(). On a mousedown call draw().
  pixelCanvas.addEventListener("mouseover", draw, false);
  pixelCanvas.addEventListener("mousedown", draw, false);
}

// Set the document listener for DOM content loaded. On DCL call init().
document.addEventListener("DOMContentLoaded", init);
