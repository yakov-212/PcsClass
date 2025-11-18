(function (){
    'use strict';
    const theCanvas = document.querySelector('#can');
    const context = theCanvas.getContext('2d');
    const add = document.querySelector("#add")
    const speed = document.querySelector('#speed')
    const angle = document.querySelector('#angle')
    const color = document.querySelector('#color')


    function resizeCanvas() {
        theCanvas.width = window.innerWidth;
        theCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    add.addEventListener('click',e => {
        let dy = angle.value
         if (angle.value === '10'){dy = 200}
         new Ball(speed.value,dy,color.value)
        })
    resizeCanvas();
    const RADIUS = 50;
    let rad = RADIUS + 1;
    


 
    

    class Ball{
        static all = []
        constructor(speed,dy,color){
            this.x = rad
            this.y = rad
            this.dx = 1
            this.dy = dy
            this.speed = speed
            this.color = color
            this.magnitude = Math.sqrt(this.dx*this.dx + this.dy*this.dy)
            Ball.all.push(this)

        }
        draw(){
            context.beginPath();
            context.fillStyle = this.color;
            this.x += (this.dx / this.magnitude)*this.speed
            this.y += (this.dy / this.magnitude)*this.speed
            if (this.x < RADIUS + 1 || this.x >= theCanvas.width - rad) {
                this.dx = -this.dx;
            }
            if (this.y < RADIUS + 1 || this.y >= theCanvas.height - rad) {
                this.dy = -this.dy;
            }
            context.arc(this.x, this.y, RADIUS, 0, 2 * Math.PI);
            context.fill();
        }
    }
    
    setInterval(() =>{
        context.clearRect(0,0, theCanvas.width, theCanvas.height);
        if(Ball.all.length)
            Ball.all.forEach(ball => ball.draw())
    })

}())