/**
 * animate forward movement of plane camera and bomb
 */
function animateForwardMovement() {
    plane.position.y += forwardSpeed;
    camera.position.y += forwardSpeed;
    if (bomb.position.z >= 8)
        bomb.position.y += forwardSpeed;
}

function planeTurnLeft() {
    plane.position.x -= sideSpeed;
    if (bombDropped == false) {
        bomb.position.x -= sideSpeed;
    }
}
function planeTurnRight() {
    plane.position.x += sideSpeed;
    if (bombDropped == false) {
        bomb.position.x += sideSpeed;
    }
}
function dropBomb() {
    bombDropped = true;
}
function keyboardEvents() {
    var keys = {
        A: planeTurnLeft,
        D: planeTurnRight,
        R: location.reload,
        W: dropBomb
    };

    for(key in keys){
        if(keyboard.pressed(key)){
            keys[key]();
        }
    }

    //animate bomb falling movement
    if (bombDropped == true && bomb.position.z >= -8) {
        bomb.position.z -= fallSpeed;
        bomb.rotation.x -= 0.01;
    }
}

function animateExplosion() {
//animate the explosion
    if (startExplosion == true && explosion.scale.x < 60) {
        explosion.scale.x += 3;
        explosion.scale.y += 3;
        explosion.scale.z += 3;
    }

    if (startExplosion == true && explosion.scale.x >= 60) {
        explosion.position.z = -80;
    }
}

function hitDetectionBomb() {
    //control hit detection
    if (bomb.position.z <= 8 && gameIsOver == false) {
        gameOver();
    }
}
function update(){
    animateForwardMovement();
    keyboardEvents();
    hitDetectionBomb();
    animateExplosion();
}

module.exports = update;