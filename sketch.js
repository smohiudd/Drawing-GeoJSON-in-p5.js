let boundary;
let bounds = {};
let city_limit;
let padding = 20;

function preload() {
	boundary = loadJSON("https://data.calgary.ca/resource/erra-cqp9.json");
}

function setup() {
	createCanvas(600, 800);
	background(255, 233, 186);
	noLoop();

	city_limit = getBoundingBox(boundary);

}

function getBoundingBox (boundary) {

	let coords,latitude, longitude;
  let data = boundary[0].the_geom.coordinates[0];

  for (var i = 0; i < data.length; i++) {
    coords = data[i];

    for (var j = 0; j < coords.length; j++) {
			longitude = coords[0];
      latitude = coords[1];
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }
  }
  return bounds;
}


function draw() {

	let data = boundary[0].the_geom.coordinates[0];
	noStroke();
	fill(175, 173, 168);
	beginShape();
		for (var i = 0; i < data.length; i++) {
			let lon = boundary[0].the_geom.coordinates[0][i][0];
			let lat = boundary[0].the_geom.coordinates[0][i][1];

			let x = map(lon, city_limit.xMin, city_limit.xMax, 0+padding, width-padding);
			let y = map(lat,city_limit.yMin, city_limit.yMax, height-padding, 0+padding);

			vertex(x,y);
		}
	endShape(CLOSE);
}
