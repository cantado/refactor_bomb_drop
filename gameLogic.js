
function animateForwardMovement() {
    animateMoveForward(plane);
    animateMoveForward(camera);
    if (bomb.position.z >= 8) {
        animateMoveForward(bomb);
    }
}

function animateMoveForward(obj, val) {
    val = val || forwardSpeed;
    obj.position.y += val;
}

function planeTurn(direction) {
    plane.position.x = direction(plane.position.x, sideSpeed);
    if(!bombDropped){
        bomb.position.x = direction(bomb.position.x, sideSpeed);
    }
}

function planeTurnLeft() {
    planeTurn(function(a,b){ return a-b; });
}

function planeTurnRight() {
    planeTurn(function(a,b){ return a+b; });
}

function dropBomb() {
    bombDropped = true;
}

function animateBombFalling() {
    if (bombDropped && bomb.position.z >= -8) {
        bomb.position.z -= fallSpeed;
        bomb.rotation.x -= 0.01;
    }
}
function keyboardEvents() {
    var keys = {
        A: planeTurnLeft,
        D: planeTurnRight,
        R: location.reload,
        W: dropBomb
    };

    for(var key in keys){
        if(keyboard.pressed(key)){
            keys[key]();
        }
    }
}

function incrementAllCoordinates(obj, val) {
    obj.x += val;
    obj.y += val;
    obj.z += val;
}

function animateExplosion() {
    if (explosion.scale.x < 60) {
        incrementAllCoordinates(explosion.scale, 3);
    }
    else {
        explosion.position.z = -80;
    }
}

function hitDetectionBomb() {
    bomb.position.z <= 8 && !gameIsOver && gameOver();
}

function animate() {
    animateForwardMovement();
    animateBombFalling();
    startExplosion && animateExplosion();
}

function update(){
    keyboardEvents();
    hitDetectionBomb();
    animate();
}

module.exports = update;