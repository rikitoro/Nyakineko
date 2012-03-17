//
const canvasWidth = 600;
const canvasHeight = 450;
//

//
var Nyanko = function(name, initX, initY, sittingImage, walkingImage) {
    this.name = name;
    this.x = initX;
    this.y = initY;
    this.image = sittingImage;
    //
    const _walkingImage = walkingImage;
    const _sittingImage = sittingImage;
    //
    var _destX = this.x;
    var _destY = this.y;
    var _drawer;
    //
    var _self = this;
    //
    this.setDrawer = function(drawer) {
	_drawer = drawer;
    }

    //
    this.moveTo = function(destX, destY) {
	_destX = destX;
	_destY = destY;
	_action();
    }

    //
    function _action() {
	if(_distance() > 15) {
	    _walk();
	    _notifyDrawer();
	    setTimeout(_action, 50);
	} else {
	    _sit();
	    _notifyDrawer();
	};
    }

    //
    function _distance() {
	var vecX = _destX - _self.x;
	var vecY = _destY - _self.y;
	var distance = Math.sqrt(vecX*vecX + vecY*vecY);
	return distance;
    }

    //
    function _walk() {
	_self.image = _walkingImage;
	var vecX = _destX - _self.x;
	var vecY = _destY - _self.y;
	var distance = _distance();
	_self.x += 10 * vecX / distance;
	_self.y += 10 * vecY / distance;
    }
	
    //
    function _sit() {
	_self.image = _sittingImage;
    }

    //
    function _notifyDrawer() {
	_drawer.update();
    }
};

//
var Drawer = function(name, canvas) {
    this.name = name;
    var _canvas = canvas;
    var _nyanko;
    var _self = this;
    //
    this.appendNyanko = function(nyanko) {
	nyanko.setDrawer(_self);
	_nyanko = nyanko;
    };
    //
    this.update = function() {
	var ctx = _canvas.getContext('2d');
	ctx.fillStyle = "rgb(190,240,190)";
	ctx.fillRect (0, 0, _canvas.width, _canvas.height);
	ctx.drawImage(_nyanko.image, 
		      _nyanko.x - _nyanko.image.width/2, 
		      _nyanko.y - _nyanko.image.height/2);
    };
    
};

window.onload = function() {
    // create nyanko
    var walkingImage = new Image();
    walkingImage.src = "nekoWalking.png";
    var sittingImage = new Image();
    sittingImage.src = "nekoSitting.png";
    var nyanko = new Nyanko("nyankosensei",
			    canvasWidth/2, canvasHeight/2, 
			    sittingImage, walkingImage);  
    // create drawer
    var canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.onmousedown = function(e) {
	nyanko.moveTo(e.offsetX, e.offsetY);
    };
    document.getElementById("nyakinekocanvas").appendChild(canvas);
    var drawer = new Drawer("picaso", canvas);

    //  
    drawer.appendNyanko(nyanko);
    //
    nyanko.moveTo(canvasWidth/2, canvasHeight/2);
};
