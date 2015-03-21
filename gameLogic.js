/**
 * animate forward movement of plane camera and bomb
 */
function animateForwardMovement() {
    plane.position.y += forwardSpeed;
    camera.position.y += forwardSpeed;
    if (bomb.position.z >= 8)
        bomb.position.y += forwardSpeed;
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
//animate bomb falling movement
    if (bombDropped == true && bomb.position.z >= -8) {
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

    for(key in keys){
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
    if (startExplosion == true && explosion.scale.x < 60) {
        incrementAllCoordinates(explosion.scale, 3);
    }
    else {
        explosion.position.z = -80;
    }
}

function hitDetectionBomb() {
    if (bomb.position.z <= 8 && gameIsOver == false) {
        gameOver();
    }
}

function animate() {
    animateForwardMovement();
    animateBombFalling();
    animateExplosion();
}

function update(){
    keyboardEvents();
    hitDetectionBomb();
    animate();
}

module.exports = update;