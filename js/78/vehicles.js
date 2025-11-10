function Vehicle (color) {
    this.color = color;
    vSpeed = 0;
    this.go = speed =>{
        this.vSpeed = speed;
        console.log(`now going at speed ${this.vSpeed}`)
    };
    this.print = () => {
        console.log(`i am ${this.color} and my speed is ${this.vSpeed}`)
    }

}
function Plane(color){
    Vehicle.call(this,color);
    this.go = speed => {
        this.vSpeed = speed
        console.log(`now flying at speed ${this.vSpeed}`)
    }
}
v1 = new Vehicle('red')
p1 = new Plane('yellow')