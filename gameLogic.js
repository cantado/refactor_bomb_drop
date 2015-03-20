function update(){
    //animate forward movement of plane camera and bomb
    plane.position.y += forwardSpeed;
    camera.position.y += forwardSpeed;
    if(bomb.position.z >= 8)
        bomb.position.y += forwardSpeed;

    //control plane
    if(keyboard.pressed("A"))
        moveDirectionPlane = "l";
    if(keyboard.pressed("S"))
        moveDirectionPlane = "n";
    if(keyboard.pressed("D"))
        moveDirectionPlane = "r";

    //reset (reload window)
    if(keyboard.pressed("R"))
        location.reload();

    //drop bomb
    if(keyboard.pressed("W"))
        bombDropped = true;

    //animate bomb falling movement
    if(bombDropped == true && bomb.position.z >= -8){
        bomb.position.z -= fallSpeed;
        bomb.rotation.x -= 0.01;
    }
    //animate plane side movement
    if(moveDirectionPlane == "l"){
        plane.position.x -= sideSpeed;
        if(bombDropped == false){
            bomb.position.x -= sideSpeed;
        }
    }
    if(moveDirectionPlane == "r"){
        plane.position.x += sideSpeed;
        if(bombDropped == false){
            bomb.position.x += sideSpeed;
        }
    }

    //control hit detection
    if(bomb.position.z <= 8 && gameIsOver == false){
        gameOver();
    }

    //animate the explosion
    if(startExplosion == true && explosion.scale.x < 60){
        explosion.scale.x += 3;
        explosion.scale.y += 3;
        explosion.scale.z += 3;
    }

    if(startExplosion == true && explosion.scale.x >= 60){
        explosion.position.z = -80;
    }
}

module.exports = update;