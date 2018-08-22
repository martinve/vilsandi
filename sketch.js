
let step = 10;
let vol = .2;
let palette;
let d = 4;
let p = 0;

let shapes = [];

let mic;


function setup() {
	createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.amp(vol);
	mic.start();

	pixelDensity(1);
	frameRate(12);
	ellipseMode(RADIUS);
	rectMode(CENTER);
	colorMode(HSL);
	noStroke();
	noCursor();

	let size = max(width, height);
	let radius = Math.ceil(Math.sqrt(2 * pow(size, 2))) + step;

	palette = getPalette();

	let index = 0;
	while(radius > 0) {
		radius -= step;
		let shape = getShape(index, radius);
		shapes.push(shape);
		index++;
	}

}



function getPalette() {
	let palettes = [
		['#de3d83', '#00b8b8', '#e4bd0b', '#ec6b2d', '#37bbe4'],
		['green', 'yellow'],
		['green', 'yellow', 'magenta'],		
		['red' , 'white', 'blue']
	];
	return random(palettes);

}



function draw() {
	background("#ddd");
	
	translate(width/2, height/2);
	translate(offsetX(),  offsetY());

	shapes.forEach((shape, index, shapes) => {
		shape.update();
		shape.draw();

		if (index == shapes.length - 1) {
			if (shape.r() > step) {
				shapes.push(getShape(index, 0));
				shapes.unshift();
			}
		} 
	});

}


function getShape(index, radius) {
	if (random() == .1) {
		return new Square(index, radius);
	}
	return new Circle(index, radius);
}


function offsetX() {
	return map(mouseX, 0, width, -width/d, width/d);
}

function offsetY() {
	return map(mouseY, 0, height, -height/d, height/d);
}




function keyPressed() {
	console.log(key);
	if (key == "r") {
		let n = random(2, 6);
		let p = [];
		for (let i = 0; i < n; i++) {
			p.push(color(random(0, 255), random(0, 255), random(0, 255)));
		}
		return palette = p;
	}

	palette = getPalette();
}