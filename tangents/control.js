var element = d3.select(".weareyvr-mark");
var vis = d3.select(".weareyvr-mark svg");

var height = 500;
var text = "black";
var radius = 50;
var topLeft = 50;
var topRight = 50;
var bottomRight = 0;
var bottomLeft = 0;
var colour  = "#4095c5";

// Controls
var change = function() {
  eval(this.name + ' = "' + this.value + '"'); // DIRTY!
  // console.log(this.name + ' = "' + this.value + '"');
  // var transition = vis.transition().duration(250);
  // // var delay = function(d, i) { return i * 50; };
  // transition.selectAll(".one")
  //   // .delay(delay)
  //   .attr("transform", "translate(" + one.x + ',' + one.y + ")");

  // Having troubling finding a nice data driven way to do this, since
  // each arc and line is kind of unique, so just remove all and redraw.

  document.body.style.backgroundColor = text === "white" ? "#ccc" : "white";
  vis.selectAll('*').remove();
  drawMark(vis, height, text, colour,  radius, topLeft, topRight, bottomRight, bottomLeft);
};
d3.selectAll('input[name="height"]').on("keyup", change);
d3.selectAll('input[type="range"], input[type="radio"]').on("change", change);

d3.selectAll('input[type="text"].generate').on("keyup", function change() {
  var hashed = hex_md5(this.value);
  var crc = (parseInt(hashed, 16) % 9999999999).toString(); // Get a 10 digit number
  radius = parseInt(crc.slice(0, 2), 10) || 0;
  topLeft = parseInt(crc.slice(2, 4), 10) || 0;
  topRight = parseInt(crc.slice(4, 6), 10) || 0;
  bottomRight = parseInt(crc.slice(6, 8), 10) || 0;
  bottomLeft = parseInt(crc.slice(8, 10), 10) || 0;

  d3.select('input[name="radius"]').property('value', radius)
  d3.select('input[name="topLeft"]').property('value', topLeft)
  d3.select('input[name="topRight"]').property('value', topRight)
  d3.select('input[name="bottomRight"]').property('value', bottomRight)
  d3.select('input[name="bottomLeft"]').property('value', bottomLeft)

  vis.selectAll('*').remove();
  drawMark(vis, element.attr('data-height'), text, colour,  radius, topLeft, topRight, bottomRight, bottomLeft);
});
