// Hard code a single 5x5 grid
let grid = [
    [3, "w", "w", "w", "w"],
    ["w", "w", 2, "w", 2],
    ["w", "w", "w", "w", "w"],
    ["w", "w", 1, "w", 1],
    [2, "w", "w", "w", "w"]
];

// Translate the grid to a table
let table = document.createElement("table");
let table_body = document.createElement("tbody");
// Iterate through the grid and create corresponding table rows and cells
for (let i = 0; i < grid.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < grid[0].length; j++) {
        let cell = document.createElement("td");
        cell.id = i.toString() + j.toString();  // table cell ID = "{grid row}{grid column}"
        // If the grid element contains a number, have the table cell display the number
        if (typeof grid[i][j] === "number") {
            cell.innerText = grid[i][j].toString();
        }
        row.appendChild(cell);
    }
    table_body.appendChild(row);
}
table.appendChild(table_body);
document.body.appendChild(table);
