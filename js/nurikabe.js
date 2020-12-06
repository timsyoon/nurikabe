/*
Sources:
[1] Introduction to Algorithms, by Thomas H. Cormen et al., Third ed., The MIT Press, 2009, pp. 594–597. 
*/

class Vertex {
    constructor(row_index, col_index, number = undefined) {
        this.row_index = row_index;
        this.col_index = col_index;
        this.color = "white";
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
        grid[grid_row][grid_col].color = "black";
    }
    else {
        cell.style.backgroundColor = "white";
        grid[grid_row][grid_col].color = "white";
    }
}

// Find every numbered square in the grid
function findNumberedSquares(grid) {
    let numbered_squares = [];
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j].number !== undefined) {
                numbered_squares.push(grid[i][j]);  // Add the Vertex object
            }
        }
    }
    return numbered_squares;
}

// Check whether the islands of white squares in the grid are correct
function check_islands(grid, numbered_squares) {
    for (i = 0; i < numbered_squares.length; i++) {
        curr_numbered_square = numbered_squares[i];
        let curr_island_size = exploreIsland(grid, curr_numbered_square);
        // TODO: finish
    }
}

/*
Perform a modified breadth-first search starting from the numbered square passed in.
Key terms:
  a) "undiscovered": refers to squares that have not yet been encountered
  b) "frontier": refers to squares that represent the frontier between discovered
     and undiscovered squares
  c) "discovered": refers to squares that have been encountered
*/
function exploreIsland(grid, curr_numbered_square) {
    // Set every Vertex in the grid as undiscovered 
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            let curr_vertex = grid[i][j];
            curr_vertex.status = "undiscovered";
            curr_vertex.distance = Infinity;
            curr_vertex.predecessor = undefined;
        }
    }
    curr_numbered_square.status = "frontier";
    curr_numbered_square.distance = 0;
    curr_numbered_square.predecessor = undefined;
    white_square_count = 1;  // Include the numbered square in the count
    let queue = [];
    queue.push(curr_numbered_square);  // Enqueue
    while (queue.length !== 0) {
        let curr_vertex = queue.shift();  // Dequeue
        let adjacent_vertices = get_adjacent_vertices(grid, curr_vertex.row_index, curr_vertex.col_index);
    }
}

/*
Return a list of all the Vertex objects that are adjacent to the Vertex
at the given row and column indices
*/
function get_adjacent_vertices(grid, row_index, col_index) {
    let adjacent_vertices = [];
    let lowest_row_index = 0;
    let highest_row_index = grid.length - 1;
    let lowest_col_index = 0;
    let highest_col_index = grid[0].length - 1;
    // Check north position
    if (row_index - 1 >= lowest_row_index) {
        adjacent_vertices.push(grid[row_index - 1][col_index]);
    }
    // Check south position
    if (row_index + 1 <= highest_row_index) {
        adjacent_vertices.push(grid[row_index + 1][col_index]);
    }
    // Check east position
    if (col_index + 1 <= highest_col_index) {
        adjacent_vertices.push(grid[row_index][col_index + 1]);
    }
    // Check west position
    if (col_index - 1 >= lowest_col_index) {
        adjacent_vertices.push(grid[row_index][col_index - 1]);
    }
    return adjacent_vertices;
}

/*
Check whether the player's submitted solution is correct. Return true if correct
and false otherwise. This function is based on the breadth-first search procedure
given on p. 595 of the CLRS textbook [1].
*/
function verifyPlayerSolution(grid) {
    let numbered_squares = findNumberedSquares(grid);
    let are_islands_correct = check_islands(grid, numbered_squares);
    if (are_islands_correct === false) {
        return false;
    }
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
        cell.id = i.toString() + "," + j.toString();  // table cell ID = "{row index},{column index}"
        // If the grid Vertex represents a numbered square, display the number on the table
        if (grid[i][j].number !== undefined) {
            cell.innerText = grid[i][j].number.toString();
        }
        // Enable unnumbered table cells to change color when clicked
        if (grid[i][j].number === undefined) {
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
