let tableHtml = "";
function makeTable() {
  // Get height and width
  const height = 50;
  const width = 50;
  // for each table row
  for (var i = 0; i < height.length; i++) {
    tableHtml += "<tr>";
    // for each table td
    /*for (var j = 0; j < width.length; j++) {
      if (j === width.length - 1) {
        tableHtml += "<td></td></tr>";
      } else {
        tableHtml += "<td></td>";
      }
    }*/
  }
  return tableHtml;
}

makeTable();
