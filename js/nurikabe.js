/*
Sources:
[1] Introduction to Algorithms, by Thomas H. Cormen et al., Third ed., The MIT Press, 2009, pp. 594–597. 
*/

class Vertex {
    /*
    Template used when creating a new Vertex object.
    :param row_index: The row index of the Vertex
    :param col_index: The column index of the Vertex
    :param number: (optional) The number in a numbered white square
    */
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

/*
Toggle the color of a table cell when clicked, and update the underlying grid.
:param cell: The HTML "td" element to toggle the color on
:param grid_row: The grid row index corresponding to the cell's location
:param grid_col: The grid column index corresponding to the cell's location
*/
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

/*
Find every numbered square in the grid.
:param grid: The 2D array of Vertex objects to search
:return numbered_squares: An array of Vertex objects that represent numbered squares
*/
function findNumberedSquares(grid) {
    let numbered_squares = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j].number !== undefined) {
                numbered_squares.push(grid[i][j]);  // Add the Vertex object
            }
        }
    }
    return numbered_squares;
}

/*
Check whether the islands of white squares in the grid are correct.
:param grid: A 2D array of Vertex objects
:param numbered_squares: An array of Vertex objects that represent numbered squares
:return: true if all islands in the grid are correctly formed, and false otherwise
*/
function check_islands(grid, numbered_squares) {
    for (let i = 0; i < numbered_squares.length; i++) {
        curr_numbered_square = numbered_squares[i];
        let curr_island_size = exploreBlock(grid, curr_numbered_square, "white");
        // console.log("curr_numbered_square:", curr_numbered_square);
        // console.log("curr_island_size:", curr_island_size);
        if (curr_island_size !== curr_numbered_square.number) {
            return false;
        }
    }
    return true;
}

/*
Perform a modified breadth-first search starting from the source Vertex passed in.
:param grid: The 2D array of Vertex objects that contains the block of squares to explore
:param source_vertex: The Vertex to begin the search at
:param block_color: The color of the squares that should be discovered
:return block_size: The number of squares in the final block of discovered squares

Key terms:
  a) "undiscovered": refers to squares that have not yet been encountered
  b) "frontier": refers to squares that represent the frontier between discovered
     and undiscovered squares
  c) "discovered": refers to squares that have been encountered
*/
function exploreBlock(grid, source_vertex, block_color) {
    // Set every Vertex in the grid as undiscovered 
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let curr_vertex = grid[i][j];
            curr_vertex.status = "undiscovered";
            curr_vertex.distance = Infinity;
            curr_vertex.predecessor = undefined;
        }
    }
    source_vertex.status = "frontier";
    source_vertex.distance = 0;
    source_vertex.predecessor = undefined;
    block_size = 1;  // Include the source Vertex
    let queue = [];
    queue.push(source_vertex);  // Enqueue
    while (queue.length !== 0) {
        let curr_vertex = queue.shift();  // Dequeue
        let adjacent_vertices = get_adjacent_vertices(grid, curr_vertex.row_index, curr_vertex.col_index);
        for (let i = 0; i < adjacent_vertices.length; i++) {
            let adjacent_vertex = adjacent_vertices[i];
            if (adjacent_vertex.status === "undiscovered" &&
            adjacent_vertex.color === block_color &&
            adjacent_vertex.number === undefined) {
                block_size++;
                adjacent_vertex.status = "frontier";
                adjacent_vertex.distance = curr_vertex.distance + 1;
                adjacent_vertex.predecessor = curr_vertex;
                queue.push(adjacent_vertex);
            }
        }
        curr_vertex.status = "discovered";
    }
    return block_size;
}

/*
Get all Vertex objects that are adjacent to a given location in the grid.
:param grid: The 2D array of Vertex objects
:param row_index: The grid row index of the Vertex whose neighbors should be found
:param col_index: The grid column index of the Vertex whose neighbors should be found
:return adjacent_vertices: An array of all Vertex objects that are adjacent to the Vertex
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
Check whether all black squares in the grid are connected to one another
:param grid: The 2D array of Vertex objects
:return: true if all black squares are connected and false otherwise
*/
function check_black_squares(grid) {
    // Count the total number of black squares in the grid and find the
    // first black square
    let black_square_count = 0;
    let first_black_square = undefined;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (black_square_count === 0 && grid[i][j].color === "black") {
                black_square_count++;
                first_black_square = grid[i][j];
            }
            else if (grid[i][j].color === "black") {
                black_square_count++;
            }
        }
    }
    if (black_square_count === 0) {
        return false;
    }
    // Explore the block (or "sea") of black squares beginning at the first
    // black square found
    let black_sea_size = exploreBlock(grid, first_black_square, "black");
    if (black_sea_size !== black_square_count) {
        return false;
    }
    return true;
}

/*
Check whether any 2x2 shaded or unshaded blocks exist in the grid.
:param grid: The 2D array of Vertex objects
:return: true if there exists a 2x2 block and false otherwise
*/
function check_for_two_by_twos(grid) {
    /* If either the length or width of the grid has less than 2 squares,
    then a 2x2 block cannot exist in the grid. */
    if (grid.length < 2 || grid[0].length < 2) {
        return false;
    }
    // Check every 2x2 block in the grid
    for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[0].length - 1; j++) {
            /* Starting from the upper left corner Vertex of a 2x2 block,
            check if every Vertex in the block has the same color. */
            let northwest_corner = grid[i][j];
            let northwest_color = grid[i][j].color;
            if (grid[i][j + 1].color === northwest_color &&      // Northeast corner
                grid[i + 1][j].color === northwest_color &&      // Southwest corner
                grid[i + 1][j + 1].color === northwest_color) {  // Southeast corner
                    return true;
                }
        }
    }
    return false;
}

/*
Check whether the player's submitted solution is correct. Then give feedback
to the player accordingly. This function is based on the breadth-first search
procedure given on p. 595 of the CLRS textbook [1].
:param grid: The 2D array of Vertex objects that contains the player's solution
:return: true if the player's solution is correct and false otherwise
*/
function verifyPlayerSolution(grid) {
    let feedback_area = document.getElementById("feedback");
    // Verify that all islands have the correct number of white squares
    let numbered_squares = findNumberedSquares(grid);
    let are_islands_correct = check_islands(grid, numbered_squares);
    if (are_islands_correct === false) {
        feedback_area.innerText = "One or more of the islands are incorrectly formed.";
        return false;
    }
    // Verify that all black squares are connected to one another
    let are_black_squares_connected = check_black_squares(grid);
    if (are_black_squares_connected === false) {
        feedback_area.innerText = "Not all of the black squares are connected.";
        return false;
    }
    // Verify that no 2x2 blocks of shaded or unshaded squares exist
    let do_two_by_twos_exist = check_for_two_by_twos(grid);
    if (do_two_by_twos_exist === true) {
        feedback_area.innerText = "A 2x2 block exists.";
        return false;
    }
    feedback_area.innerText = "Your solution is correct. Good job!";
    return true;
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
