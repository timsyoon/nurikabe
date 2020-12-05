class Vertex {
    constructor(row_index, col_index, color = "white", number = undefined) {
        this.row_index = row_index;
        this.col_index = col_index;
        this.color = color;
        this.number = number;  // For numbered white squares
        // For the breadth-first search algorithm
        this.status = undefined;
        this.distance = undefined;
        this.predecessor = undefined;
    }
}

// Toggle the color of a table cell when clicked, and update the underlying grid
function toggleShade(cell, grid_row, grid_col) {
    if (cell.style.backgroundColor === "" || cell.style.backgroundColor === "white") {
        cell.style.backgroundColor = "black";
        grid[grid_row][grid_col] = "b"
    }
    else {
        cell.style.backgroundColor = "white";
        grid[grid_row][grid_col] = "w"
    }
}

// Check whether the player's submitted solution is correct
function verifyPlayerSolution(grid) {

}

// Hard code a single 5x5 grid (courtesy of Puzzle #8,861,309 from https://www.puzzle-nurikabe.com/)
let grid = [
    [new Vertex(0, 0, 3), new Vertex(0, 1), new Vertex(0, 2), new Vertex(0, 3), new Vertex(0, 4)],
    [new Vertex(1, 0), new Vertex(1, 1), new Vertex(1, 2, 2), new Vertex(1, 3), new Vertex(1, 4, 2)],
    [new Vertex(2, 0), new Vertex(2, 1), new Vertex(2, 2), new Vertex(2, 3), new Vertex(2, 4)],
    [new Vertex(3, 0), new Vertex(3, 1), new Vertex(3, 2, 1), new Vertex(3, 3), new Vertex(3, 4, 1)],
    [new Vertex(4, 0, 2), new Vertex(4, 1), new Vertex(4, 2), new Vertex(4, 3), new Vertex(4, 4)]
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
        // If the grid element contains "w" or "b", the table cell should be clickable
        if (grid[i][j] === "w" || grid[i][j] === "b") {
            cell.addEventListener("click", function() {
                toggleShade(cell, i, j);
            });
        }
        row.appendChild(cell);
    }
    table_body.appendChild(row);
}
table.appendChild(table_body);
document.body.appendChild(table);

// Add a submit button to the page
let submit_btn = document.createElement("button");
let wrapper_submit_btn = document.createElement("div");
submit_btn.innerText = "Submit";
submit_btn.id = "submit-btn";
wrapper_submit_btn.classList.add("text-center");
wrapper_submit_btn.id = "wrapper-submit-btn";
wrapper_submit_btn.appendChild(submit_btn);
document.body.appendChild(wrapper_submit_btn);

submit_btn.addEventListener("click", function() {
    verifyPlayerSolution(grid);
});
