/* Name: Adam Ohanian
   Email: adam_ohanian@student.uml.edu
   File: script.js 
   Description: JavaScript for the dynamic multiplication table for HW3. 
   Dependencies: style.css, index.html
   Copywright (c) 2026 Adam Ohanian */
// Wait for the DOM to fully load before attaching event listeners and manipulating the DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tableForm");
  const errorMessage = document.getElementById("error-message");
  const tableContainer = document.getElementById("table-container");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";
    tableContainer.innerHTML = "";
// Retrieve and convert input values to numbers
    const minCol = Number(document.getElementById("minCol").value);
    const maxCol = Number(document.getElementById("maxCol").value);
    const minRow = Number(document.getElementById("minRow").value);
    const maxRow = Number(document.getElementById("maxRow").value);
// Validate the input values and display an error message if validation fails, otherwise generate and display the multiplication table
    const validationError = validateInput(minCol, maxCol, minRow, maxRow);
    if (validationError) {
      errorMessage.textContent = validationError;
      return;
    }
// Generate the multiplication table and append it to the table container
    const table = generateTable(minCol, maxCol, minRow, maxRow);
    tableContainer.appendChild(table);
  });
// Validates the user input and returns an error message if any validation fails, otherwise returns an empty string
  function validateInput(minCol, maxCol, minRow, maxRow) {
    const values = [minCol, maxCol, minRow, maxRow];
// Check for NaN values, non-integer values, and values outside the specified range, as well as logical errors in min/max relationships
    if (values.some(value => Number.isNaN(value))) {
      return "Please enter all four numbers.";
    }

    if (!values.every(Number.isInteger)) {
      return "Please enter only integer values.";
    }

    if (values.some(value => value < -50 || value > 50)) {
      return "All values must be between -50 and 50.";
    }

    if (minCol > maxCol) {
      return "Minimum column value cannot be greater than maximum column value.";
    }

    if (minRow > maxRow) {
      return "Minimum row value cannot be greater than maximum row value.";
    }

    return "";
  }
// Generates a multiplication table based on the provided minimum and maximum column and row values, and returns the table element
  function generateTable(minCol, maxCol, minRow, maxRow) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
// Create the header row with column labels and an empty corner cell
    const headerRow = document.createElement("tr");
    const cornerCell = document.createElement("th");
    cornerCell.textContent = "";
    headerRow.appendChild(cornerCell);
// Populate the header row with column labels
    for (let col = minCol; col <= maxCol; col++) {
      const th = document.createElement("th");
      th.textContent = col;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
// Create the body of the table with row labels and multiplication results
    for (let row = minRow; row <= maxRow; row++) {
      const tr = document.createElement("tr");

      const rowHeader = document.createElement("th");
      rowHeader.textContent = row;
      tr.appendChild(rowHeader);

      for (let col = minCol; col <= maxCol; col++) {
        const td = document.createElement("td");
        td.textContent = row * col;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
// Return the generated table element
    return table;
  }
});