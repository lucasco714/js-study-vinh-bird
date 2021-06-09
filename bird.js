const vinhBird = new Image();
vinhBird.src = 'assets/sprite.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originWidth = 505;
        this.originHeight = 640
        this.width = this.originWidth/20;
        this.height =  this.originHeight/20;
        this.weight = 1;
    }

    update() {
        let curve = Math.sin(angle) + 20;
        if (this.y > canvas.height - (this.height * 3) + curve  ) {
            this.y =  canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y  += this.vy;
        }

        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }

        if (spacePressed && this.y > this.height * 3) this.flap();
    }

    draw( ctx ){
        //ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(vinhBird, this.x, this.y, this.width, this.height);
    }

    flap() {
        this.vy -=2 ;
    }
}

const bird = new Bird();
