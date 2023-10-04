document.addEventListener('load', setUp());


function setUp(){
    window.machine = new MazeMachine();
    //
    window.machine.setUpCanvas(window.machine.maze.rowCount,
                window.machine.maze.columnCount, 
                window.machine.maze.sideLength)
    // fillMazeWithSquares(10, 10, this.maze.sideLength, true)
    
    //TODO, i don't like passing in variables from the maze machine to itself :P
    window.machine.mazeGrid = window.machine.makeMazeWithMultiplePaths(window.machine.maze.numberOfGeneratedPaths, window.machine.mazeType.RIGHT_DOWN);

    //TODO seperate out drawing the UI from logic of the maze
    window.machine.drawSolidGrid(window.machine.mazeGrid, window.machine.maze.sideLength)

    //TODO assigning this could happen inside the mazemachine
    window.machine.maze.numberOfPaths = window.machine.howManyPathsThroughMaze(window.machine.mazeGrid,
                                                                        window.machine.traversalType.RECURSION)
    updateUI()

} 

function updateUI(){
    document.getElementById('paths-count').innerHTML = window.machine.maze.numberOfPaths;
}

