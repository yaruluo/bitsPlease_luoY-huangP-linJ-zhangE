var pop = document.getElementById('pop');
var dropdown = document.getElementById('order');
var change = document.getElementById('change');
var space = document.getElementById('popchart');
var svg, x, y, format;

var render_pop = function(e){
  space.innerHTML = "";
  var margin = {top: 30, right: 50, bottom: 10, left: 175},
      barHeight = 25,
      width = 800 + margin.right + margin.left;
      height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.pop; })])
      .range([margin.left, width - margin.right]);
  y = d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);
  format = x.tickFormat(20);
  var xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80, data.format))
      .call(g => g.select(".domain").remove());
  var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .attr('class', 'yaxis')
      .call(d3.axisLeft(y).tickFormat(i => data[i].county).tickSizeOuter(0))
  svg = d3.select('#popchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
  svg.append("g")
      .attr("fill", "#99aaff")
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

var update_pop = function(e){
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
  y.domain(d3.range(data.length));
  svg.select(".yaxis")
    .transition()
    .duration(3000)
    .call(d3.axisLeft(y).tickFormat(i => data[i].county).tickSizeOuter(0));
  var u = svg.selectAll("rect")
    .data(data);

  u
    .enter().append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.pop) - x(0))
      .attr("height", y.bandwidth())
      .attr("fill", "#99aaff");

  var v = svg.selectAll("text")
    .data(data);

  v
    .enter().append("text")
    .merge(v)
    .transition()
    .duration(1000)
      .attr("x", d => x(d.pop) + 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => format(d.pop));

};

pop.addEventListener('click', render_pop);
change.addEventListener('click', function(){
  if (space.innerHTML != ""){
    update_pop();
  };
});
