var pop = document.getElementById('pop');
var dropdown = document.getElementById('order');
var change = document.getElementById('change');
var space = document.getElementById('popchart');

var render_pop = function(e){
  space.innerHTML = "";
  var order = dropdown.options[dropdown.selectedIndex].value;
  if (order == 0) {
    data.sort(function (a,b) {return d3.ascending(a.county, b.county);});
  }
  else if (order == 1){
    data.sort(function(a,b) { return +a.pop - +b.pop })
  }
  else{
    data.sort(function(a,b) { return -a.pop - -b.pop })
  };
  var margin = {top: 30, right: 50, bottom: 10, left: 175},
      barHeight = 25,
      width = 800 + margin.right + margin.left;
      height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  var x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.pop; })])
      .range([margin.left, width - margin.right]);
  var y = d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);
  var format = x.tickFormat(20);
  var xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, data.format))
      .call(g => g.select(".domain").remove());
  var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(i => data[i].county).tickSizeOuter(0))
  var svg = d3.select('#popchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.pop) - x(0))
      .attr("height", y.bandwidth());

  svg.append("g")
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .enter().append("text")
      .attr("x", d => x(d.pop) + 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => format(d.pop));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

};

pop.addEventListener('click', render_pop);
change.addEventListener('click', function(){
  if (space.innerHTML != ""){
    render_pop();
  };
});
