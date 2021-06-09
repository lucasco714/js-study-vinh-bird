const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = Math.random() * canvas.height/3;
        this.bottom = Math.random() * canvas.height/3 + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = `hsla(${hue}, 100%, 50%, 1)`;
        this.counted = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update() {
        this.x -= gameSpeed;
        if (!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame % 50 === 0) {
        obstaclesArray.unshift(new Obstacle());

    }

    for (let index = 0; index < obstaclesArray.length; index++) {
        obstaclesArray[index].update();
    }


    if (obstaclesArray.length > 200) {
        for (let index = 0; index < 20; index++) {
            obstaclesArray.pop(obstaclesArray[index]);
        }
    }

}