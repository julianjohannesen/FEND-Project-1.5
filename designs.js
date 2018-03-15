// DOM objects
// Size picker form
const sizePickerForm = $("#sizePicker");
// Height and width inputs
const inputHeight = $("#inputHeight");
const inputWidth = $("#inputWidth");
// Size picker submit button
const sizePickerSubmit = $('#sizePicker input[type="submit"]');
// Canvas, aka the html table grid
const pixelCanvas = $("#pixelCanvas");
// Color picker input
const colorPicker = $("#colorPicker");
// Select color input
let color = "#000000";
// Declare and assign table array & row & col elements
let table = [];
const row = "<tr></tr>";
const col = "<td></td>";

function makeTable() {
  // Get height and width
  const height = inputHeight.val();
  const width = inputWidth.val();

  /*
    [
        { 'row0': ['<tr></tr>', '<td></td', '<td></td>', ...] },  
        { 'row1': ['<tr></tr>', '<td></td', '<td></td>', ...] },
        ...
    ]
    */

  // Create table
  for (let i = 0; i < height; i++) {
    let rowName = "row" + i;
    table[i] = {
      [rowName]: [row]
    };
    for (let j = 0; j < width; j++) {
      table[i][rowName].push(col);
    }
  }
  return table;
}

function insertTableHtml() {
  // 2 problems
  // First, I need to reset the table object and DOM when someone hits submit
  // Second, the last TR is not getting its td's

  // Read off the table object to create the table html

  // For each row object in the table array, add a tr to the DOM
  for (let k = 0; k < table.length; k++) {
    // Identify the current table row
    let currentRowArray = table[k]["row" + k];
    // Identify the current row's tr element
    let theTR = currentRowArray[0];
    // Add the tr element to the DOM
    pixelCanvas.append(theTR);

    // For each tr added, now add the correct number of td's
    // Start "l" at 1 to skip over the tr element,
    // which is the 1st member of the row array
    for (let l = 1; l <= currentRowArray.length; l++) {
      // Identify the tr element that was just added to the DOM
      let theCurrentTr = `#pixelCanvas tr:eq(${k})`;
      // Add the table data element to the tr element
      $(theCurrentTr).append(currentRowArray[l]);
    }
  }
}

// Clicking on the submit button will call makeGrid. makeGrid calls makeTable
// and instertTableHtml to create and insert the html table grid.
function makeGrid(event) {
  // Prevent form submit
  event.preventDefault();
  // Populate the table object
  makeTable();
  // Create and insert the table html
  insertTableHtml();
}

// Clicking "okay" in the color picker will call watchColorPicker. watchColorPicker
// sets a color
function watchColorPicker(event) {
  return (color = event.target.value);
}

function draw(event) {
  $(this).css("background-color", color);
}

// Set size picker submit button listener. Call makeGrid on submit.
sizePickerSubmit.on("click", makeGrid);

// Set the color picker event listener. Call watchColorPicker on change.
colorPicker.on("change", watchColorPicker);

// Set the table listener
pixelCanvas.on("click", "td", draw);

// Each cell should have an event listener that sets the background color of the cell to the selected color.
