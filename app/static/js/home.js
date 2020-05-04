//-----------------------------------------------------------
//state population data

//mapping population data by state
let state_data = new Map(); //new Map object
let state_arr = []; //for finding max and min values
let i; //indexing
for (i = 0; i < data.length; i++){
  state_data.set(data[i]['state'], data[i]['pop']);
  state_arr.push(parseInt(data[i]['pop']));
}
state_data = Object.assign(state_data, {title: "Population"});
let max = state_arr.reduce(function(a, b) { //get max population
    return Math.max(a, b);
});
let min = state_arr.reduce(function(a, b) { //get min population
    return Math.min(a, b);
});
//console.log(max);

//colors, from Observable HQ website
let schemeBlues = ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"];
//console.log(schemeBlues.length)

//variables
let created = false;
let us;
let pathData;
let path;

document.getElementById('pop').addEventListener('click', async () => {
  if (!created){ //map should only be created once
    pathData = await getMapData();
    path = d3.geoPath();
    let format = d3.format("d");

    //create color scale
    let color = d3.scaleQuantize()
      .domain([min, max])
      .range(schemeBlues.slice(0, schemeBlues.length));

    //create map
    const svg = d3.select('#popchart')
      .append('svg')
      .attr("viewBox", [0, 0, 975, 610]);

    //fill in state colors
    svg.append("g")
      .selectAll("path")
      .data(pathData)
      .join("path")
        .attr("fill", d => color(state_data.get(d.properties.name)))
        .attr("d", path)
      .append("title")
        .text(d => `${d.properties.name}${format(state_data.get(d.properties.name))}`);

    //create state borders
    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

    created = true;
  }
  else { //map has already been created

  }
});

const getMapData = async () => {
  us = await d3.json('static/json/states-albers-10m.json');
  return topojson.feature(us, us.objects.states).features;
};

//-----------------------------------------------------------
//ethnicity data
var eth = document.getElementById('eth');

var render_eth = function(e){
  var space = document.getElementById('ethchart');
  space.innerHTML = "";
  var columns = ['hispanic', 'white', 'black', 'native', 'asian', 'pacific'];
  // console.log(d3.stack().keys(columns)(dataset));
  var width = 975,
      height = width,
      innerRadius = 180,
      outerRadius = Math.min(width, height) / 2;
  var arc = d3.arc()
      .innerRadius(d =>y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.abbrev))
      .endAngle(d => x(d.data.abbrev) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);
  var x = d3.scaleBand()
      .domain(dataset.map(d => d.abbrev))
      .range([0, 2 * Math.PI])
      .align(0);
  var y = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.total)])
      .range([innerRadius, outerRadius]);
  var z = d3.scaleOrdinal()
      .domain(columns)
      .range(["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#c4bfff"].reverse());
  var xAxis = g => g
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .call(g => g.selectAll("g")
        .data(dataset)
        .enter().append("g")
          .attr("transform", d => `
            rotate(${((x(d.abbrev) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
            translate(${innerRadius},0)
          `)
          .call(g => g.append("line")
              .attr("x2", -5)
              .attr("stroke", "#000"))
          .call(g => g.append("text")
              .attr("transform", d => (x(d.abbrev) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                  ? "rotate(90)translate(0,16)"
                  : "rotate(-90)translate(0,-9)")
              .text(d => d.abbrev)))
  var yAxis = g => g
      .attr("text-anchor", "middle")
      .call(g => g.append("text")
          .attr("y", d => -y(y.ticks(5).pop()))
          .attr("dy", "-1em")
          .text("Population"))
      .call(g => g.selectAll("g")
        .data(y.ticks(5).slice(1))
        .enter().append("g")
          .attr("fill", "none")
          .call(g => g.append("circle")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.5)
              .attr("r", y))
          .call(g => g.append("text")
              .attr("y", d => -y(d))
              .attr("dy", "0.35em")
              .attr("stroke", "#fff")
              .attr("stroke-width", 5)
              .text(y.tickFormat(5, "s"))
           .clone(true)
              .attr("fill", "#000")
              .attr("stroke", "none")))
  var legend = g => g.append("g")
    .selectAll("g")
    .data(columns.reverse())
    .enter().append("g")
      .attr("transform", (d, i) => `translate(-40,${(i - 5 / 2) * 20})`)
      .call(g => g.append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", z))
      .call(g => g.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text(d => d))
  const svg = d3.select('#ethchart')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto");

  svg.append('g')
    .selectAll('g')
    .data(d3.stack().keys(columns)(dataset))
    .enter().append('g')
      .attr('fill', d => z(d.key))
    .selectAll('path')
    .data(d => d)
    .enter().append('path')
      .attr('d', arc);

  svg.append('g')
      .call(xAxis);

  svg.append('g')
      .call(yAxis);

  svg.append('g')
      .call(legend);
};

eth.addEventListener('click', render_eth);

//-----------------------------------------------------------
//gender data
