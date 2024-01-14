document.addEventListener('DOMContentLoaded', function() {
    generateGrid();
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the generate button by its ID
    const generateButton = document.getElementById('generate-button');

    // Add an event listener to the generate button
    generateButton.addEventListener('click', function() {
        generateGrid();
    });
});

function generateGrid() {
    const container = document.getElementById('art-container');
    container.innerHTML = ''; // Clear previous grid
    
    let gridWidth = 10; // Define grid width
    let gridHeight = 10; // Define grid height

    // Split the entire grid into sections and then subdivide those sections into rectangles
    let sections = [{ x: 0, y: 0, width: gridWidth, height: gridHeight }];
    
    // How many times we want to try splitting each section into smaller sections
    let splitAttempts = 5;

    for (let i = 0; i < splitAttempts; i++) {
        let newSections = [];
        sections.forEach(section => {
            // Randomly decide whether to split vertically or horizontally
            if (Math.random() < 0.5) {
                // Split vertically (add a new vertical line)
                if (section.width > 1) {
                    let splitX = Math.floor(Math.random() * (section.width - 1)) + 1;
                    newSections.push({ x: section.x, y: section.y, width: splitX, height: section.height });
                    newSections.push({ x: section.x + splitX, y: section.y, width: section.width - splitX, height: section.height });
                } else {
                    newSections.push(section);
                }
            } else {
                // Split horizontally (add a new horizontal line)
                if (section.height > 1) {
                    let splitY = Math.floor(Math.random() * (section.height - 1)) + 1;
                    newSections.push({ x: section.x, y: section.y, width: section.width, height: splitY });
                    newSections.push({ x: section.x, y: section.y + splitY, width: section.width, height: section.height - splitY });
                } else {
                    newSections.push(section);
                }
            }
        });
        sections = newSections;
    }
    
    // Render rectangles
    sections.forEach(rect => {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.width = `${rect.width * 50}px`; // Subtract 2px for border
        cell.style.height = `${rect.height * 50}px`; // Subtract 2px for border
        cell.style.left = `${rect.x * 50}px`;
        cell.style.top = `${rect.y * 50}px`;
        cell.style.position = 'absolute';
        cell.style.border = '3px solid black'; // Add border to each cell
        container.appendChild(cell);

        // Add click event listener for each cell
        cell.addEventListener('click', function() {
            changeColor(cell); // Function to change color
        });
    });
}

/*
function generateGrid() {
    const container = document.getElementById('art-container');
    container.innerHTML = ''; // Clear previous grid
    
    let gridWidth = 10; // Define grid width
    let gridHeight = 10; // Define grid height
    let gridMatrix = [...Array(gridHeight)].map(e => Array(gridWidth).fill(false));

    let rectangles = [];
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (!gridMatrix[y][x]) { // If the current cell is not already occupied
                // Generate random width and height
                let width = Math.floor(Math.random() * (gridWidth - x)) + 1;
                let height = Math.floor(Math.random() * (gridHeight - y)) + 1;

                // Adjust width and height if they exceed grid boundaries
                if (x + width > gridWidth) width = gridWidth - x;
                if (y + height > gridHeight) height = gridHeight - y;

                // Create the rectangle
                rectangles.push({ x, y, width, height });

                // Mark the grid positions as filled
                for (let i = y; i < y + height; i++) {
                    for (let j = x; j < x + width; j++) {
                        gridMatrix[i][j] = true;
                    }
                }
            }
        }
    }
    // Render rectangles
    rectangles.forEach(rect => {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.width = `${rect.width * 50}px`; // Assuming each grid cell is 50x50px
        cell.style.height = `${rect.height * 50}px`;
        cell.style.left = `${rect.x * 50}px`;
        cell.style.top = `${rect.y * 50}px`;
        cell.style.position = 'absolute';
        cell.style.border = '1px solid black'; // Add black border
        container.appendChild(cell);

        // Add click event listener for each cell
        cell.addEventListener('click', function() {
            changeColor(cell); // Function to change color
        });
    });

}*/

function changeColor(cell) {
    const colors = ['white', 'red', 'blue', 'yellow', 'black'];
    let currentColor = cell.style.backgroundColor;
    let nextColorIndex = colors.indexOf(currentColor) + 1;
    if (nextColorIndex >= colors.length) {
        nextColorIndex = 0;
    }
    cell.style.backgroundColor = colors[nextColorIndex];
}