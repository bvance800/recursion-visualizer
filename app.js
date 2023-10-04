
let data = {
    machine: new MazeMachine(),
    pressPlay: pressPlay,
    pressPause: pressPause

}

const app = Vue.createApp({
    data(){
        return data
    },
    methods:{  
    },
    mounted(){
        
        this.machine.setUpCanvas(this.machine.maze.rowCount,
                    this.machine.maze.columnCount, 
                    this.machine.maze.sideLength)
        
        //TODO, i don't like passing in variables from the maze machine to itself :P
        this.machine.mazeGrid = this.machine.makeMazeWithMultiplePaths(this.machine.maze.numberOfGeneratedPaths, this.machine.mazeType.RIGHT_DOWN);

        //TODO seperate out drawing the UI from logic of the maze
        this.machine.drawSolidGrid(this.machine.mazeGrid, this.machine.maze.sideLength)

        //TODO assigning this could happen inside the mazemachine
        this.machine.maze.numberOfPaths = this.machine.howManyPathsThroughMaze(this.machine.mazeGrid,
                                                                            this.machine.traversalType.RECURSION)
    } 
})

function pressPlay(){
    hideElement(document.getElementById('play-btn'))
    showElement(document.getElementById('pause-btn'))
    this.machine.playCodeBlock();
}
function pressPause(){
    hideElement(document.getElementById('pause-btn'))
    showElement(document.getElementById('play-btn'))
    this.machine.pauseCodeBlock();
}


function hideElement(element){
    element.classList.add('d-none')
}
function showElement(element){
    element.classList.remove('d-none');
}

app.mount('#app');