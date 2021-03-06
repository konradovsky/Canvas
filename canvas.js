var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 10; 
var minRadius = 6;

var colorArray = [
    '#555',
    '#666',
    '#444',
    // '#FECE7C',
    // '#D5E286',
    // '#EA91BD',
    // '#FFED81'
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x,y,dx,dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = 4;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 22, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.updatePosition = function(){
        if((this.x + this.radius) > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if((this.y + this.radius) > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        

        this.draw();
    }
}

var circleArray = [];

for(var i = 0; i < 60; i ++){
    // radius = Math.random() * 1 + 1;

    // Dots Size
    radius = 4;

    // Dots position
    x = Math.random() * (innerWidth - radius*2) + radius;
    y = Math.random() * (innerHeight - radius*2) + radius;

    // Dots speed 
    dx = (Math.random() - 0.5) * 0.4;
    dy = (Math.random() - 0.5) * 0.5;

    
    circleArray.push(new Circle(x,y,dx,dy,radius))
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].updatePosition();
    }
    
}
animate();
