class Shape {
	
	constructor(index, radius) {
		this.index = index;	
		this.radius = radius;
		this.x = 0;
		this.y = 0;
		this.angle = 0
		this.distortion = random(-5, 5);
	}

	update() {
		this.radius++;

		let r = this.getDistortion();

		this.x = cos(this.angle) * r + offsetX()
		this.y = sin(this.angle) * r + offsetY();

		this.angle += ( -1 * (this.index % 2)) * .001;

		let i = this.index % palette.length;

		fill( palette[i] ); 
		rotate(this.angle);
		//fill( this.index % 2 ? 0 : 255);
	}

	r() {
		return this.radius;
	}


	getDistortion() {
		let level = mic.getLevel();
		return map(level, 0, 1, 0, this.radius) * this.distortion;
	}
}



class Square extends Shape {

	constructor(index, radius) {
		super(index, radius);
		this.cornerRadius = 4;
	}


	update() {
		this.angle = .01;
		super.update();
	}


	draw() {
		rect(this.x, this.y, this.radius, this.radius);
	}

}



class Circle extends Shape {

	constructor(index, radius) {
		super(index, radius);
	}
		
	draw() {
		ellipse(this.x, this.y, this.radius);
	}

}