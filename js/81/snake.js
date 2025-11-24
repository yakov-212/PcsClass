(function(){
    'use strict';

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const playButton = document.querySelector('#play')
    const score = document.querySelector('#score')
    const scoreMessage = document.querySelector('#score-message')
    const sounds = document.querySelectorAll('audio:not(:first-child)')
    const music = sounds.item(0)
    const reset = document.querySelector('#reset')
    const player = document.querySelector('input')
    const effects = Array.from(sounds).slice(1);
    const highscore = document.querySelector('#highscore')
    let lose = false
    let eat = false
    const playerData = JSON.parse(localStorage.getItem('snakePlayerData')) ||{name:'Snake',score:0}
    if (playerData.score > Number(highscore.innerText)){
        highscore.innerText = playerData.score
        document.querySelector('#high-name').innerText = playerData.name
    }
    
    console.log(playerData)
    player.addEventListener('focusout',() =>{playerData.name = player.value})

    const SNAKE_SIZE = 64;

    function resizeCanvas() {
        canvas.width = window.innerWidth*.50 - (window.innerWidth*.50 % SNAKE_SIZE);
        canvas.height = window.innerHeight*.70 - (window.innerHeight*.70 % SNAKE_SIZE);
        reset.click()
    }
    window.addEventListener('resize',resizeCanvas);
    resizeCanvas();

    class Snake{
        x = SNAKE_SIZE*2;
        y = 0;
        parts = []
        direction = 'ArrowRight';
        constructor(){
            this.setParts()
            context.fillStyle = 'green'
            this.draw()
        }
        setParts(){this.parts = [{x:this.x,y:this.y},{x:this.x-SNAKE_SIZE,y:this.y},{x:this.x - SNAKE_SIZE*2,y:this.y}]}
        draw(){
            context.beginPath()
            context.fillStyle = 'green';
            this.parts.forEach(part =>{context.fillRect(part.x,part.y,SNAKE_SIZE,SNAKE_SIZE)})
        }
        move(eat){
            switch(this.direction){
                case 'ArrowRight':
                case 'd':
                    this.x+= SNAKE_SIZE;
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.x-= SNAKE_SIZE;
                    break;
                case 'ArrowUp':
                case 'w':
                    this.y-= SNAKE_SIZE;
                    break;
                case 'ArrowDown':
                case 's':
                    this.y+= SNAKE_SIZE;
                    break; 
            }
            this.parts.unshift({x:this.x,y:this.y})
            if(!eat)
                this.parts.pop()
            this.draw()
                        
        }
    }
    class Apple{
        x = 0
        y = 0
        constructor(){
            this.getPos()
            this.draw()
        }
        draw(){
            context.beginPath()
            context.fillStyle = 'red'
            context.arc(this.x,this.y,SNAKE_SIZE/2,0,2 * Math.PI)
            context.fill()
        }
        getPos(){
            do{
                this.x = this.getRand(canvas.width)
                this.y = this.getRand(canvas.height)
            }while(snake.parts.some(part => part.x === this.x -32 && part.y == this.y -32))
        }
        getRand(n){
            return (Math.floor(Math.random()*(n/SNAKE_SIZE)) * SNAKE_SIZE) +32
        }
    }

  const snake = new Snake()
  const apples = new Apple()

  
  
  reset.addEventListener("click",() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x = SNAKE_SIZE*2
    snake.y = 0
    snake.setParts()
    snake.draw()
    snake.direction = 'ArrowRight'
    apples.getPos()
    apples.draw()
    scoreMessage.innerText = 'Score: '
    score.innerText = '0'
    lose = false
  })
  function checkSnake(){
    return snake.parts.some((part,index) => {
        if (index === 0)
            return false
        return part.x === snake.parts[0].x && part.y === snake.parts[0].y
    })
  }


  playButton.addEventListener('click',() =>{
    playButton.style.backgroundColor = 'gray';
    playButton.style.color = 'black'
    document.addEventListener('keydown',e => {
    
        if(e.target.tagName !== 'INPUT'){
            e.preventDefault();
            switch(e.key){
                case 'ArrowRight':
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'ArrowDown':
                case 's':
                case 'a':
                case 'd':
                case 'w':
                    snake.direction = e.key;
                    break;
                
        }}
    })
    setInterval(() => {
        if (snake.parts[0].x >= 0  && snake.parts[0].y >= 0 && snake.parts[0].x < canvas.width && snake.parts[0].y < canvas.height && !checkSnake()){
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            effects[1].play()
            snake.move(eat)
            apples.draw()
            if (apples.x - 32 === snake.parts[0].x  && apples.y - 32 === snake.parts[0].y ){
                effects[0].play()
                context.clearRect(0, 0, canvas.width, canvas.height);
                apples.getPos()
                apples.draw()
                snake.draw()
                eat = true
                score.innerText = Number(score.innerText) + 1
            }
            else{eat = false}
            


        }
        else{
            scoreMessage.innerText = 'You Lose Score: '

            if(!lose){
                playerData.score = Number(score.innerText)
                effects[2].play();
                lose = true;
                if (playerData.score > Number(highscore.innerText)){
                    highscore.innerText = playerData.score
                    document.querySelector('#high-name').innerText = playerData.name
                }
                if(!localStorage.getItem('snakePlayerData')?.length)
                    localStorage.setItem('snakePlayerData',JSON.stringify(playerData))
                else if(JSON.parse(localStorage.getItem('snakePlayerData')).score < playerData.score) 
                    localStorage.setItem('snakePlayerData',JSON.stringify(playerData))
            }
        }
        
        
        
    },500)
  },{once: true})
  

}())