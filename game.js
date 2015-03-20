
var game = (function(){
    var scene, camera, renderer;
    var mouseX = 0, mouseY = 0;

    var canvasHeight, canvasWidth;


    var keyboard = new THREEx.KeyboardState();

//plane and bomb starting position
    var planeY = -500;
    var planeX = 30;
    var planeZ = 100;
    var bombHeight = 99;

//objects
    var plane;
    var bomb;
    var house;
    var explosion;

    var moveDirectionPlane = "n"; // l == left n == no movement r == right
    var bombDropped = false;
    var gameIsOver = false;
    var startExplosion = false;

    var forwardSpeed = 0.8;
    var sideSpeed = 0.8;
    var fallSpeed = 0.8;

//initialize the scene
    //init();
//animate the scene
   // animate();


    function init() {
        //use WebGl with antialias or canvas
        if(Detector.webgl){
            renderer = new THREE.WebGLRenderer();
        } else {
            renderer = new THREE.CanvasRenderer();
        }
        //clear background color to sky blue
        renderer.setClearColor(0xC8E2DF, 1);

        //set height and width
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        renderer.setSize(canvasWidth, canvasHeight);
        THREEx.WindowResize(renderer, camera);

        //append renderer object to DOM
        document.getElementById("canvas").appendChild(renderer.domElement);

        //create new scene
        scene = new THREE.Scene();

        //add objects
        addBomb();
        addPlane();
        addFloor();
        addHouse();

        //add perspective camera
        //(FOV, aspect ratio, near cliping, far cliping)
        camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 4000);
        //set camera position 10 units toward the z axis
        camera.position.set(00,-850,180);
        //camera look at centre of scene
        camera.lookAt(scene.position);
        scene.add(camera);

        //set camera behaviour
        controls = new THREE.TrackballControls( camera );
        controls.rotateSpeed = 0.0;
        controls.zoomSpeed = 5;
        controls.panSpeed = 0;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        //set light
        var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );
    }

    function addBomb(){

        var loader = new THREE.OBJMTLLoader();
        loader.addEventListener('load', function (event){
            bomb = event.content;
            bomb.position = {x: planeX, y: planeY-8, z: bombHeight};
            //bomb.scale = {x: 0.01, y:0.01, z:0.01};
            bomb.scale = {x: 70.01, y: 20.01, z: 38.01};
            scene.add(bomb);
        }, false);
        //loader.load('mdl/dynamite.obj', 'mdl/dynamite.mtl');
        loader.load('mdl/arrow/arrow.obj', 'mdl/arrow/arrow.mtl');
    }

    function addPlane(){
        //load plane and add it to the scene
        var loader = new THREE.OBJMTLLoader();
        loader.addEventListener('load', function (event){
            plane = event.content;
            plane.position = {x: planeX, y: planeY, z: planeZ};
            plane.scale = {x: 1.21, y:1.21, z:1.21};
            scene.add(plane);
        }, false);
        loader.load('mdl/B-2_Spirit/bomber.obj', 'mdl/B-2_Spirit/bomber.mtl');

    }

    function addFloor(){
        /*********FLOOR**********/

        //create floor geometry
        var floorGeo = new THREE.PlaneGeometry(4000, 4000, 0, 0);

        //create floor texture
        var grasTexture = new THREE.ImageUtils.loadTexture('mdl/gras.jpg');
        grasTexture.wrapS = grasTexture.wrapT = THREE.RepeatWrapping;
        overdraw = true;
        grasTexture.repeat.set(80, 80);


        var floorMat = new THREE.MeshBasicMaterial({
            map: grasTexture,
            side: THREE.DoubleSide
        });

        //combine geometry and texture and add it to the scene
        floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.position.set(0.0, 0.0, 0.0);
        scene.add(floorMesh);

    }

    function addHouse(){

        var houseMat = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa
        });
        //create house geometry
        house = new THREE.Mesh(new THREE.CubeGeometry(15.0, 15.0, 8.0), houseMat);
        house.position.set(0.0, 0.0, 4.0);

        scene.add(house);

    }



    function animate(){

        //this request calls the function animate
        requestAnimationFrame(animate);

        //the camera should always look to the centre of the bomb
        controls.update();
        camera.lookAt(plane.position);

        //moving plane and drop the bomb
        update();

        //render scene
        render();

    }

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

    function gameOver(){
        gameIsOver = true;
        //if the house is hit
        if(bomb.position.y < 40 && bomb.position.y > -40 && bomb.position.x < 40 && bomb.position.x > -40){
            house.position.z = -8;
            showText('YEA, YOU HAVE DESTROYED THE TARGET!');
        } else {
            //if not
            showText('ARE YOU BLIND? YOU HAVE MISSED THE TARGET!');
        }
        //create explosion and start animation
        addExplosion();
        startExplosion = true;
    }

    function showText(infoText){
        //set color, text and font information
        var textMatFront = new THREE.MeshBasicMaterial({ color: 0x880000 });
        var textMatSide = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });
        var materialArray = [ textMatFront, textMatSide ];
        var textGeo = new THREE.TextGeometry(infoText,
            {
                size: 30,
                height: 8,
                curveSegments: 3,
                font: "helvetiker",
                style: "normal",
                bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
                material: 0, extrudeMaterial: 1
            });

        var textMat = new THREE.MeshFaceMaterial(materialArray);
        //mesh material and geometry
        var textMesh = new THREE.Mesh(textGeo, textMat);
        textGeo.computeBoundingBox();
        var textWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
        //add it to scene
        textMesh.position.set( -400, 750, 150 );
        textMesh.rotation.x = 1.57;
        scene.add(textMesh);

    }

    function addExplosion(){
        //generate sphere and load texture
        var sphereGeo = new THREE.SphereGeometry( 1, 32, 16 );
        //var sphereTex = new THREE.ImageUtils.loadTexture('mdl/gras.jpg');
        //sphereTex.wrapS = sphereTex.wrapT = THREE.RepeatWrapping;
        //sphereTex.repeat.set(24, 24);
        //add texture
        var sphereMat = new THREE.MeshBasicMaterial({
            //map: sphereTex,
            color: 0xff0000,
            side: THREE.DoubleSide
        });
        //mesh material and geometry and add it to scene
        explosion = new THREE.Mesh( sphereGeo, sphereMat);
        explosion.position.x = bomb.position.x;
        explosion.position.y = bomb.position.y;
        explosion.position.z = 10;
        scene.add(explosion);
    }

    function render(){
        renderer.render(scene, camera);
    }

    return {
        init: init,
        addBomb: addBomb,
        addPlane: addPlane,
        addFloor: addFloor,
        addHouse: addHouse,
        animate: animate,
        update: update,
        gameOver: gameOver,
        showText: showText,
        addExplosion: addExplosion,
        render: render
    }
})();

module.exports = game;
