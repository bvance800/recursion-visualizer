class MazeMachine {
    name = "Match"
    canvas = {
        border: true
    }
    //TODO Seperate data from implementation, inject it
    maze = {
        rowCount: 10,
        columnCount: 10,
        sideLength: 25,
        percentageOfWalls: 50,
        numberOfGeneratedPaths: 1,
        numberOfPaths: 0,
        WALL: 1,
        mazeGrid: []
    }
    colors = {
        BLUE: "blue",
        RED: "red",
        BLACK: "black",
        GREEN: "green"
    }
    mazeType = {
        RIGHT_DOWN: "right-down",
        ALL_DIRECTIONS: "all-directions"
    } 
    traversalType = {
        RECURSION: "recursion",
    }
    //solutions contain the lines of code in text as well as an action, ie how that line affects the state.
    solutions = [
        {
            type: this.mazeType.RIGHT_DOWN,
            steps : [
                {
                    // Line 1
                    comment: '// The function declaration',
                    action: null,
                    codeString : "gridRecurseRightDown(currentRow, currentColumn, grid) {"
                },
                {
                    // Line 2
                    comment: '// Check if we are looking at a spot that is out of bounds',
                    action: this.checkOutOfBounds,
                    codeString: 'if(currentRow >= numberOfRows || currentColumn >= numberOfCols) {',
                    ifCodeBlock : [
                        {
                            // Line 3
                            comment: '// This path is blocked, return the news there are 0 paths this way',
                            action: this.returnZero,
                            codeString: 'return 0;'
                        }
                    ]
                    // Line 4 "}"
                },
                {
                    // Line 5
                    comment: '// Check if the spot we are at is a wall or open space',
                    codeString: 'if(grid[currentRow][currentColumn] === 1) {',
                    action: this.checkIfPositionIsWall,
                    ifCodeBlock: [
                        {
                            // Line 6
                            comment: '// This path is blocked, return the news there are 0 paths this way',
                            action: this.returnZero,
                            codeString: 'return 0;'
                        }
                    ]
                    // Line 7 "}"
                },
                {
                    // Line 8
                    comment: '// Check if we have reached the end of the maze',
                    codeString: 'if((currentRow === numberOfRows - 1) && (currentColumn === numberOfCols - 1)) {',
                    action: this.checkIfEndReached,
                    ifCodeBlock: [
                        {
                            // Line 9
                            comment: '// This path reached the end! Return that we found 1 unique, succesful path',
                            action: this.returnOne,
                            codeString: 'return 1;'
                        }
                    ]
                    // Line 10
                },
                {
                    // Line 11
                    comment: '// Recursively count all of the succesful maze paths that continue\nto the right of our current position',
                    codeString: 'const pathsFromTheRight = this.gridRecurseRightDown(currentRow, currentColumn + 1, grid, numRows, numCols); ',
                    action : this.recursiveCallRight
                },
                {
                    // Line 12
                    comment: '// Recursively count all of the succesful maze paths that continue\nbelow our current position',
                    codeString: 'const pathsFromBelow = this.gridRecurseRightDown(currentRow + 1, currentColumn, grid, numRows, numCols); ',
                    action : this.recursiveCallDown
                },
                {
                    // Line 13
                    codeString: 'return pathsFromTheRight + pathsFromBelow;',
                    action: this.returnPathTotals
                    
                }
                
                
            ]
        } // Line 14 "}"
    ]
    // //main recursive function that traverses the maze
    // gridRecurseRightDown(currentRow, currentColumn, grid, numRows, numCols){ // 1
    //     //is the spot we are looking out of bounds? if so go back
    //     if(currentRow >= numRows || currentColumn >= numCols){               // 2
    //         return 0;                                                        // 3
    //     }                                                                    // 4
    //     // is where we are a solid wall? if so, go back.
    //     if(grid[currentRow][currentColumn] === this.maze.WALL){             // 5
    //         return 0;                                                       // 6
    //     }                                                                   // 7
    //     if((currentRow === numRows - 1) && (currentColumn === numCols - 1)){// 8
    //         return 1; // 9
    //     } // 10
    //     let pathsFromTheRight = this.gridRecurseRightDown(currentRow, currentColumn + 1, grid, numRows, numCols); // 11
    //     let pathsFromBelow = this.gridRecurseRightDown(currentRow + 1, currentColumn, grid, numRows, numCols); // 12                                                                                               
    //     return pathsFromTheRight + pathsFromBelow; // 13
    // } // 14 (ie 'return 0')
    directions = {
        RIGHT: {
            row: 1,
            column: 0
        },
        UP: {
            row: 0,
            column: -1
        },
        DOWN: {
            row: 0,
            column: 1
        },
        LEFT: {
            row: -1,
            column: 0
        }
    }
    //TODO Seperate code UI from maze logic
    linesOfCode = 10
    activeLineOfCode = 1
    currentState = {
        somenumber:1
    }
    previousStates = []
    codeBlockPlaying = false;
    codePlaySpeedMilliseconds = 500;

    checkOutOfBounds(currentRow, currentColumn, numberOfRows, numberOfColumns){
        return currentRow >= numberOfRows || currentColumn >= numberOfColumns
    }

    checkIfPositionIsWall(currentRow, currentColumn, grid, wall ){
        return grid[currentRow][currentColumn] === wall
    }

    //Copy the previous state, assign zero to the variable being returned to
    // set current line to line to be returned to
    returnZero(){
        return 0;
    }

    //Copy the previous state, assign 1 to the variable being returned to
    // set current line to line to be returned to
    returnOne(){
        return 1;
    }

    //copy the previous state and assign the total paths (paths from right and paths from down) to variable being returned to
    // set current line to the line to be returned to
    returnPathTotals(){
        return 5; 
    }

    checkIfEndReached(currentRow, currentColumn, grid){
        return currentRow === grid[0].length && currentColumn === grid.length
    }

    recursiveCallRight() {
        //new state is old state with coordinates shifted to right by 1
    }

    recursiveCallDown() {
        //new state is old state with coordinates shifted down by 1
    }


    setName(newName) {
        console.log("Used setter")
        this.name = newName;
    }

    playCodeBlock(){
        this.codeBlockPlaying = true;
        this.incrementActiveLineOfCode();
        this.setNextState();
        this.setNextStepTimeout();
    }

    setNextStepTimeout(){
        setTimeout(() => {
            this.stepNextLineOfCode();
        }, this.codePlaySpeedMilliseconds);
    }

    pauseCodeBlock(){
        this.codeBlockPlaying = false;
    }


    incrementActiveLineOfCode(){
        console.log("increment active line of code")
        this.activeLineOfCode = (this.activeLineOfCode + 1)
         
         if(this.activeLineOfCode > this.linesOfCode){
             this.activeLineOfCode = 1;
         }
    }

    decrementActiveLineOfCode(){
        this.activeLineOfCode = (this.activeLineOfCode - 1) % this.linesOfCode
        
        if(this.activeLineOfCode <= 0){
            this.activeLineOfCode = this.linesOfCode;
        }
    }

    //saves information representing
    // - which line of code we would return to if we return from this function call
    // - which line of code is about to be executed
    // - value of any variable in the function 
    // - the state 

    initiateState(){
        //create copy of state and 
        let state = {
            lineToReturnTo : -1,
            variabelToInitialize: null, 
            currentLineToExecute: 0,
            variables : {
                currentRow : 'undefined',
                currentColumn : 'undefined', 
                numberOfRows : 'undefined',
                numberOfCols : 'undefined',
                pathsFromTheRight : 'undefined',
                pathsFromBelow : 'undefined'
            }
        }

    }

    copyObject(objectToCopy){
        if(objectToCopy === null) return;
        let newObject = {}
        Object.entries(objectToCopy).forEach(entry =>{
            const [key, value] = entry;
            // console.log('key:', key)

            if(typeof value === "object"){
                let newValue = this.copyObject(value);
                newObject[key] = newValue;
            }
            else {
                newObject[key] = value;
            }
        })

        return newObject;
    }

    changeToPreviousState(){
        console.log(this.previousStates[0], this.currentState)
        this.currentState = this.previousStates.pop();
    }

    setNextState(){
        console.log("setting next state")
        this.previousStates.push(this.copyObject(this.currentState));
        this.currentState.somenumber++
        if(this.currentState.somenumber > 10){
            this.currentState.somenumber = 1;
        }
        console.log(this.previousStates, this.currentState)
    }

    //TODO seperate code UI from maze logic
    stepNextLineOfCode() {
        if(this.codeBlockPlaying){
            console.log("stepping next line of code")
            this.incrementActiveLineOfCode();
            this.setNextState();

            this.setNextStepTimeout()
         }
    }
    //TODO seperate code UI from maze logic
    stepBackLineOfCode() {
        if(this.previousStates.length > 0){
            this.decrementActiveLineOfCode();
            this.changeToPreviousState();
        }
  
    }

    //return integer representing the total possible unique paths through the grid of 1s and 0s following a specific traversal type
    // return -1 if path traversal type is unknown
    howManyPathsThroughMaze(grid, traversalType, numRows, numCols){
        console.log(grid.length, grid[0].length)
        if(traversalType === this.traversalType.RECURSION){
            let rowStart = 0;
            let colStart = 0;
        
            return this.gridRecurseRightDown(rowStart, colStart, grid, numRows, numCols)
            // console.log(grid)
        }
        return -1;
    }

    //main recursive function that traverses the maze
    gridRecurseRightDown(currentRow, currentColumn, grid) { // 1
        const numberOfRows = grid.length;
        const numberOfCols = grid[0].length;

        //is the spot we are looking out of bounds? if so go back
        if(currentRow >= numberOfRows || currentColumn >= numberOfCols){               // 2
            return 0;                                                        // 3
        }                                                                    // 4
        // is where we are a solid wall? if so, go back.
        if(grid[currentRow][currentColumn] === this.maze.WALL){             // 5
            return 0;                                                       // 6
        }                                                                   // 7
        if((currentRow === numberOfRows - 1) && (currentColumn === numberOfCols - 1)){// 8
            this.drawSquare(currentColumn * this.maze.sideLength, currentRow * this.maze.sideLength, this.maze.sideLength, true, this.colors.GREEN) // ONLY FOR USE IN VISUALIZATION
            return 1; // 9
        } // 10
        this.drawSquare(currentColumn * this.maze.sideLength, currentRow * this.maze.sideLength, this.maze.sideLength, true, this.colors.RED) // ONLY FOR USE IN VISUALIZATION
        let pathsFromTheRight = this.gridRecurseRightDown(currentRow, currentColumn + 1, grid, numberOfRows, numberOfCols); // 11
        let pathsFromBelow = this.gridRecurseRightDown(currentRow + 1, currentColumn, grid, numberOfRows, numberOfCols); // 12
                                                                                                                
        return pathsFromTheRight + pathsFromBelow; // 13
    }

    fillMazeWithSquares(rows, columns, size, isSolid){
        // console.log(rows, columns, size)
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < columns; col++){
                let upperLeftX = row * size;
                let upperLeftY = col * size
                this.drawSquare(upperLeftX, upperLeftY, size, isSolid)
            }
        }
    }

    //Return grid of 0's and 1s representing a maze where there are at least 'numberOfPaths' number of open paths through the maze of the mazeType
    makeMazeWithMultiplePaths(numberOfPaths, mazeType){

        //create random grid of 0s and 1s with no garunteed path through the maze
        let combinedGrid = this.createRandomGrid(this.maze.rowCount, this.maze.columnCount, this.maze.percentageOfWalls)
        for(let i = 0; i < numberOfPaths; i++){
            //create path represented by directions to go at each open space in the maze (UP, DOWN, LEFT, RIGHT)
            let path = (this.createMazePath(this.maze.rowCount, this.maze.columnCount, mazeType))
            //carve the path into the maze
            combinedGrid = this.combineGridAndPath(combinedGrid, path)
        }
        return combinedGrid;
    }

    //draw a square, filled or just outlined, on the canvas at the given coordinates
    drawSquare(upperLeftX, upperLeftY, sideLength, isSolid, color = this.colors.BLACK){
        let mazeContext = this.getCanvasContext();
        mazeContext.beginPath();
        mazeContext.lineWidth = "1";
        mazeContext.strokeStyle = color;
        mazeContext.fillStyle = color;
        // console.log("drawing! ", color)

        if(isSolid){
            mazeContext.fillRect(upperLeftX, upperLeftY, sideLength, sideLength);
        }else{
            mazeContext.rect(upperLeftX, upperLeftY, sideLength, sideLength);
        }
        mazeContext.stroke();
    }

    //TODO seperate UI from the logic
    // 
    setUpCanvas(rows, columns, size){
        // console.log("Set up canvas!")
        let height = rows * size;
        let width = columns * size;
        let mazeCanvas = this.getCanvas() //gets element used for maze 
        mazeCanvas.width = width;
        mazeCanvas.height = height;
        
    }

    createMazePath(rows, columns, mazeType){
        // console.log(mazeType, data.mazeType.RIGHT_DOWN, rows, columns)
        switch(mazeType){
        case this.mazeType.RIGHT_DOWN:
            return this.createMazePath_RightDown(rows, columns)
            break;
        }
    }

    //Creates a random path of of directions representing a path from top left to bottom right of a grid of size ROWS and COLUMNS
    createMazePath_RightDown(rows, columns){

        let RIGHT = this.directions.RIGHT;
        let DOWN = this.directions.DOWN;

        let notFinishedPath = true;
        let path = [];
        let currentRow = 1;
        let currentColumn = 1;

        while(notFinishedPath){
            //PATH REACHED THE FINISH SQUARE (Bottom Right)
            if(currentRow == rows && currentColumn == columns){
                notFinishedPath = false;
            }
            //TODO was this line necessary?
            else if(currentRow == rows || currentColumn == columns){ 
                // PATH REACHED BOTTOM OF GRID, FORCE MOVE RIGHT
                if(currentRow == rows){ 
                    currentColumn++;
                    path.push(RIGHT);
                }
                // PATH REACHED RIGHT OF GRID, FORCE MOVE DOWN
                else if(currentColumn == columns){
                    currentRow++;
                    path.push(DOWN)
                }
            }
            else{
                //RANDOMLY DECIDE TO GO RIGHT OR DOWN
                if(this.flipCoin()){
                    currentRow++;
                    path.push(DOWN)
                }
                else{
                    currentColumn++;
                    path.push(RIGHT);
                }
            }
        }
        return path;
    }

    //with the given dimensions, return a randomly generated 2D array of 1's and 0's 
    createRandomGrid(numberOfRows, numberOfcols, threshHold){
        let grid = [];
        for(let i = 0; i < numberOfRows; i++){
            grid.push([]);
            for(let j = 0; j < numberOfcols; j++){
                grid[i].push(this.randomChance(threshHold))
            }
        }
        return grid;
    }

    //given a grid of 0's and 1's, draw a filled, colored square on the canvas wherever a 1 is found
    drawSolidGrid(grid, squareSideLength){
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid.length; j++){
                if(grid[i][j]){
                    const upperLeftX = j * squareSideLength;
                    const upperLeftY = i * squareSideLength;
                    const isSolid = true;
                    this.drawSquare( upperLeftX, upperLeftY , squareSideLength, isSolid)
                }
            }
        }
    }

    //Given a grid of 0's and 1's and a path represented by directions (integers representing up, down, left, right), carve out the path in the maze by
    //placing 0's representing the open path
    combineGridAndPath(grid, path){
        let currentRow = 0;
        let currentCol = 0;
        
        for(let i = 0; i < path.length; i++){
            grid[currentRow][currentCol] = 0;
            currentRow += path[i].row;
            currentCol += path[i].column;
        }
        //Set final square as open path point (0)
        grid[grid.length - 1][grid[0].length - 1] = 0;
        return grid;
    }

    drawPath(path, size, color, isSolid){
        let row = 0;
        let column = 0;

        for(let i = 0; i < path.length; i++){
            this.drawSquare(row * size, column * size, size, isSolid, color);
            row += path[i].row;
            column += path[i].column;
        }
        this.drawSquare(row * size, column * size, size, isSolid, color);
    }

    consoleLogPath(path){
        for(let i = 0; i < path.length; i++){
            console.log(path[i])
        }
    }

    getCanvas(){
        return document.getElementById('maze');
    }

    getCanvasContext(){
        return this.getCanvas().getContext("2d");
    }

    //RETURNS 1 or 0
    flipCoin(){
        let coinFlip = Math.floor(Math.random() * 2);
        return coinFlip;
    }

    //threshhold: probablity of returning a 1
    randomChance(threshhold){
        let randomChance = Math.floor(Math.random() * 100);
        // console.log(randomChance)
        if(randomChance < threshhold){
            return 1;
        }

        return 0;
    }
}



 

