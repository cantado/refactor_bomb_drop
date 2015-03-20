
plane = {
    position: {}
};
forwardSpeed = 0;
camera = {
    position: {}
};
bomb = {
    position: {}
};
keyboard = {
    pressed: function(){}
};
bombDropped = false;
moveDirectionPlane = 0;
startExplosion = 0;
sideSpeed = 0;
location = {};

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


});