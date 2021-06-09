const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const lblScore = document.getElementById('lbl-score');
const btnReset = document.getElementById('btn-reset');
canvas.width = 600;
canvas.height = 400;

btnReset.classList.add('hide');

btnReset.addEventListener('click', (e) => {
    window.location.reload();
})

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

const background = new Image();
background.src = 'assets/background.jpg';

const BG = {
    x1: 0, x2: canvas.width, y: 0, width: canvas.width, height: canvas.height
}

function hanldeBackground() {
    if (BG.x1 <= - BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;

    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}




function updateScore(score) {
    lblScore.innerHTML = `Score: ${Math.max(score, 0)}`;
}


function animate() {
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    //ctx.fillRect(10, temp, 50, 50);
    hanldeBackground();
    handleObstacles();
    bird.update();
    bird.draw(ctx);
    handleParticles();
    if (hanldeCollissions()) {
        return btnReset.classList.remove('hide');
    };
    updateScore(score);
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;
}

animate();

window.addEventListener('keydown', function(e) {
    //console.log(e.code);
    if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function(e) {
    //console.log(e.code);
    if (e.code === 'Space') spacePressed = false;
    
});

const bang = new Image();
bang.src = 'assets/bang.png';

function hanldeCollissions() {
    for (let index = 0; index < obstaclesArray.length; index++) {
        if ( bird.x < obstaclesArray[index].x + obstaclesArray[index]. width &&
            bird.x + bird.width > obstaclesArray[index].x && 
            ( (bird.y < 0 + obstaclesArray[index].top && bird.y + bird.height > 0) ||
              (
                bird.y > canvas.height - obstaclesArray[index].bottom && 
                bird.y + bird.height < canvas.height  
              )
            )) {
            ctx.drawImage(bang, bird.x, bird.y , 50, 50);

            ctx.font = "25px Arial";
            ctx.fillStyle = 'red';
            ctx.fillText(`Bé Vinh die rồi!!! . Điểm của bé Vinh là ${score}`, 70, canvas.height/2 )
            return true;
        }
    }
    return false;
}

