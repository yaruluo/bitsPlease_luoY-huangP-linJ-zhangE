var order_dropdown = document.getElementById('order');
var type_dropdown = document.getElementById('type');
var render = document.getElementById('render');
var update = document.getElementById('update');
var space = document.getElementById('popchart');
var pop_svg, pop_x, pop_y, pop_format;
var income_svg, income_x, income_y, income_format;
var voting_svg;
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

var render_income = function(e){
  space.innerHTML = "";
  var margin = {top: 30, right: 60, bottom: 10, left: 175},
      barHeight = 25,
      width = 800 + margin.right + margin.left;
      height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  income_x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.income; })])
      .range([margin.left, width - margin.right]);
  income_y = d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);
  income_format = income_x.tickFormat(20);
  var xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(income_x).ticks(width / 80, data.format))
      .call(g => g.select(".domain").remove());
  var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .attr('class', 'yaxis')
      .call(d3.axisLeft(income_y).tickFormat(i => data[i].county).tickSizeOuter(0))
  income_svg = d3.select('#popchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
  income_svg.append("g")
      .attr("fill", "#99aaff")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", income_x(0))
      .attr("y", (d, i) => income_y(i))
      .attr("width", d => income_x(d.income) - income_x(0))
      .attr("height", income_y.bandwidth());

  income_svg.append("g")
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .enter().append("text")
      .attr("x", d => income_x(d.income) + 4)
      .attr("y", (d, i) => income_y(i) + income_y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => "$" + income_format(d.income));

  income_svg.append("g")
      .call(xAxis);

  income_svg.append("g")
      .call(yAxis);
};

var update_income = function(e){
  income_y.domain(d3.range(data.length));
  income_svg.select(".yaxis")
    .transition()
    .duration(3000)
    .call(d3.axisLeft(income_y).tickFormat(i => data[i].county).tickSizeOuter(0));
  var u = income_svg.selectAll("rect")
    .data(data);

  u
    .enter().append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", income_x(0))
      .attr("y", (d, i) => income_y(i))
      .attr("width", d => income_x(d.income) - income_x(0))
      .attr("height", income_y.bandwidth())
      .attr("fill", "#99aaff");

  var v = income_svg.selectAll("text")
    .data(data);

  v
    .enter().append("text")
    .merge(v)
    .transition()
    .duration(1000)
      .attr("x", d => income_x(d.income) + 4)
      .attr("y", (d, i) => income_y(i) + income_y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => "$" + income_format(d.income));

};

var render_voting = function(e) {
  space.innerHTML = "";
  console.log(vote_data);
  var height = 500,
      width = 500;

  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const radius = Math.min(width, height) / 2 * 0.8;

  var arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

  var pie = d3.pie()
    .sort(null)
    .value(d => d.value);

  var color = d3.scaleOrdinal()
    .domain(vote_data.map(d => d.name))
    .range(['#799fcb', '#f9665e']);

  const arcs = pie(vote_data);

  const svg = d3.select('#popchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString()));
};

render.addEventListener('click', function(){
  var type = type_dropdown.options[type_dropdown.selectedIndex].value;
  console.log(type);
  if (type == 0 || type == 1){
    update.style.display = "block";
    order_dropdown.style.display = "block";
    data.sort(function (a,b) {return d3.ascending(a.county, b.county);});
    order_dropdown.value = 0;
    if (type == 0){
      render_pop();
    }
    else {
      render_income();
    };
  }
  else{
    update.style.display = "none";
    order_dropdown.style.display = "none";
    render_voting();
  };
});

update.addEventListener('click', function(){
  var order = order_dropdown.options[order_dropdown.selectedIndex].value;
  var type = type_dropdown.options[type_dropdown.selectedIndex].value;
  if (order == 0) {
    data.sort(function (a,b) {return d3.ascending(a.county, b.county);});
  }
  else if (order == 1 && type == 0){
    data.sort(function(a,b) { return +a.pop - +b.pop })
  }
  else if (order == 1 && type == 1){
    data.sort(function(a,b) { return +a.income - +b.income })
  }
  else if (type == 0){
    data.sort(function(a,b) { return -a.pop - -b.pop })
  }
  else {
    data.sort(function(a,b) { return -a.income - -b.income })
  };
  if (type == 0){
    update_pop();
    prev_chart = 0;
  }
  else if (type == 1){
    // render median income chart
    update_income();
    prev_chart = 1;
  };
});
