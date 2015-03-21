
plane = {
    position: {}
};
forwardSpeed = 0;
camera = {
    position: {}
};
bomb = {
    position: {},
    rotation: {}
};
explosion = {
    scale: { x: 0, y: 0, z: 0 },
    position: {}
};
keyboard = {
    pressed: function(){}
};
bombDropped = false;
moveDirectionPlane = 0;
startExplosion = false;
sideSpeed = 0;
location = {};
gameIsOver = false;

var assert = require('assert');
var update = require('../gameLogic');

describe('Test', function(){
    beforeEach(function(){

    });

    it('pressing A should turn plane left', function(){
        keyboard.pressed = function(key){ return key==='A' };
        sideSpeed = 1;
        plane.position.x = 0;
        update();
        assert.equal(plane.position.x, -1);
    });

    it('pressing A should turn bomb left', function(){
        keyboard.pressed = function(key){ return key==='A' };
        sideSpeed = 1;
        bomb.position.x = 0;
        update();
        assert.equal(bomb.position.x, -1);
    });

    it('pressing S should stop plane turning', function(){
        keyboard.pressed = function(key){ return key==='S' };
        sideSpeed = 1;
        plane.position.x = 0;
        update();
        assert.equal(plane.position.x, 0);
    });

    it('pressing S should stop bomb turning', function(){
        keyboard.pressed = function(key){ return key==='S' };
        sideSpeed = 1;
        bomb.position.x = 0;
        update();
        assert.equal(bomb.position.x, 0);
    });

    it('pressing D should turn plane right', function(){
        keyboard.pressed = function(key){ return key==='D' };
        sideSpeed = 1;
        plane.position.x = 0;
        update();
        assert.equal(plane.position.x, 1);
    });

    it('pressing D should turn bomb right', function(){
        keyboard.pressed = function(key){ return key==='D' };
        sideSpeed = 1;
        bomb.position.x = 0;
        update();
        assert.equal(bomb.position.x, 1);
    });

    it('pressing R should reload the page', function(){
        var reloadingPage = false;
        location.reload = function(){ reloadingPage = true; };
        keyboard.pressed = function(key){ return key==='R' };
        update();
        assert.equal(reloadingPage, true);
    });

    it('pressing W should drop bomb', function(){
        keyboard.pressed = function(key){ return key==='W' };
        update();
        assert.equal(bombDropped, true);
    });

    it('dropped bomb should fall down', function(){
        bomb.position.z = 100;
        bomb.rotation.x = 90;
        fallSpeed = 1;
        keyboard.pressed = function(key){ return key==='W' };
        update();
        update();
        assert.equal(bomb.position.z, 98);
    });

    it('dropped bomb should rotate', function(){
        bomb.rotation.x = 1;
        keyboard.pressed = function(key){ return key==='W' };
        update();
        update();
        assert.equal(bomb.rotation.x, 0.98);
    });

    it('landing bomb should end game', function(){
        gameOver = function(){ gameIsOver=true; };
        bomb.position.z = 8;
        update();
        assert.equal(gameIsOver, true);
    });

    it('explosion should getting bigger', function(){
        startExplosion = true;
        update(); // +3
        update(); // +3
        assert.equal(explosion.scale.x, 6);
    });

    it('explosion should get a max size', function(){
        startExplosion = true;
        explosion.scale.x = 57;
        update(); // +3
        update(); // +3
        assert.equal(explosion.scale.x, 60);
    });

    it('explosion should hide after max size', function(){
        startExplosion = true;
        explosion.scale.x = 57;
        update(); // +3
        update(); // +3
        assert.equal(explosion.position.z, -80);
    });

    it('after bomb drop pressing A should turn plane left and keep bomb directory', function(){
        sideSpeed = 1;
        plane.position.x = 1;
        bomb.position.x = 1;
        bombDropped = true;
        keyboard.pressed = function(key){ return key==='A' };
        update();
        assert.equal(plane.position.x, 0);
        assert.equal(bomb.position.x, 1);
    });
});