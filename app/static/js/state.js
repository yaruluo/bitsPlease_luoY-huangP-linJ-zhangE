var order_dropdown = document.getElementById('order');
var type_dropdown = document.getElementById('type');
var render = document.getElementById('render');
var space = document.getElementById('popchart');
var pop_svg, pop_x, pop_y, pop_format;
var prev_chart = -1;

var render_pop = function(e){
  space.innerHTML = "";
  var margin = {top: 30, right: 60, bottom: 10, left: 175},
      barHeight = 25,
      width = 800 + margin.right + margin.left;
      height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  pop_x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.pop; })])
      .range([margin.left, width - margin.right]);
  pop_y = d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);
  pop_format = pop_x.tickFormat(20);
  var xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(pop_x).ticks(width / 80, data.format))
      .call(g => g.select(".domain").remove());
  var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .attr('class', 'yaxis')
      .call(d3.axisLeft(pop_y).tickFormat(i => data[i].county).tickSizeOuter(0))
  pop_svg = d3.select('#popchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
  pop_svg.append("g")
      .attr("fill", "#99aaff")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", pop_x(0))
      .attr("y", (d, i) => pop_y(i))
      .attr("width", d => pop_x(d.pop) - pop_x(0))
      .attr("height", pop_y.bandwidth());

  pop_svg.append("g")
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .enter().append("text")
      .attr("x", d => pop_x(d.pop) + 4)
      .attr("y", (d, i) => pop_y(i) + pop_y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => pop_format(d.pop));

  pop_svg.append("g")
      .call(xAxis);

  pop_svg.append("g")
      .call(yAxis);
};

var update_pop = function(e){
  pop_y.domain(d3.range(data.length));
  pop_svg.select(".yaxis")
    .transition()
    .duration(3000)
    .call(d3.axisLeft(pop_y).tickFormat(i => data[i].county).tickSizeOuter(0));
  var u = pop_svg.selectAll("rect")
    .data(data);

  u
    .enter().append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", pop_x(0))
      .attr("y", (d, i) => pop_y(i))
      .attr("width", d => pop_x(d.pop) - pop_x(0))
      .attr("height", pop_y.bandwidth())
      .attr("fill", "#99aaff");

  var v = pop_svg.selectAll("text")
    .data(data);

  v
    .enter().append("text")
    .merge(v)
    .transition()
    .duration(1000)
      .attr("x", d => pop_x(d.pop) + 4)
      .attr("y", (d, i) => pop_y(i) + pop_y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => pop_format(d.pop));

};

render.addEventListener('click', function(){
  var order = order_dropdown.options[order_dropdown.selectedIndex].value;
  if (order == 0) {
    data.sort(function (a,b) {return d3.ascending(a.county, b.county);});
  }
  else if (order == 1){
    data.sort(function(a,b) { return +a.pop - +b.pop })
  }
  else{
    data.sort(function(a,b) { return -a.pop - -b.pop })
  };
  var type = type_dropdown.options[type_dropdown.selectedIndex].value;
  if (type == 0){
    if (prev_chart == 0){
      console.log("hi");
      update_pop();
    }
    else {
      render_pop();
      console.log("bye");
    };
    prev_chart = 0;
  }
  else if (type == 1){
    // render median income chart
    prev_chart = 1;
  }
  else {
    // render voting status chart
    prev_chart = 2;
  };
});
