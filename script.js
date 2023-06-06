const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

const particlesArray = [];

let hue = 0;

function sleep(ms) {
    return new Promise(resolve => (resolve, ms));
}

let Mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', function(event) {
    Mouse.x = event.x;
    Mouse.y = event.y;
    for (let i = 0; i < 20; i++) {
        particlesArray.push(new particles());
    }
})

canvas.addEventListener('mousemove', function() {
    Mouse.x = event.x;
    Mouse.y = event.y;
    for (let i = 0; i < 7; i++) {
        particlesArray.push(new particles());
    }
})


class particles {

    constructor() {
        this.x = Mouse.x;
        this.y = Mouse.y;
        // this.x = Math.random() * winWidth;
        // this.y = Math.random() * winHeight;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue} , 100% , 50%)`;

    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new particles())
//     }
// }
// init();
// console.log(particlesArray)


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();


        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                c.beginPath();
                c.strokeStyle = particlesArray[i].color;
                c.lineWidth = particlesArray[i].size / 4;
                c.moveTo(particlesArray[i].x, particlesArray[i].y);
                c.lineTo(particlesArray[j].x, particlesArray[j].y);
                c.stroke();
            }


        }

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {

    requestAnimationFrame(animate);
    // c.clearRect(0, 0, winWidth, winHeight);
    c.fillStyle = "rgba(0,0,0,0.1)";
    c.fillRect(0, 0, winWidth, winHeight);
    handleParticles();
    hue += 0.5;


}
animate();