//-----------------------------------------------------------
//state population data

//mapping population data by state
let state_data = new Map(); //new Map object
let state_arr = []; //for finding max and min values
let state_abbrev = {};
let dataset = {'children': []}; //array specifically for population chart
let i; //indexing
for (i = 0; i < data.length; i++){
  state_data.set(data[i]['state'], data[i]['pop']);
  state_arr.push(parseInt(data[i]['pop']));
  state_abbrev[data[i]['state']] = data[i]['abbrev'];
  dataset['children'].push({'Name': data[i]['abbrev'], 'Count': data[i]['pop']});
}
state_data = Object.assign(state_data, {title: "Population (in millions)"});
let max = state_arr.reduce(function(a, b) { //get max population
    return Math.max(a, b);
});
let min = state_arr.reduce(function(a, b) { //get min population
    return Math.min(a, b);
});
//console.log(dataset);

//colors, from Observable HQ website
let schemeBlues = ["#f7fcfd","#f6fcfd","#f6fcfd","#f5fbfd","#f5fbfc","#f4fbfc","#f4fbfc","#f3fafc","#f2fafc","#f2fafc","#f1fafc","#f1fafc","#f0f9fb","#f0f9fb","#eff9fb","#eef9fb","#eef8fb","#edf8fa","#edf8fa","#ecf8fa","#ebf8fa","#ebf7fa","#eaf7f9","#eaf7f9","#e9f7f9","#e8f6f9","#e8f6f8","#e7f6f8","#e6f6f8","#e6f5f7","#e5f5f7","#e4f5f7","#e4f5f6","#e3f4f6","#e2f4f6","#e2f4f5","#e1f4f5","#e0f3f4","#e0f3f4","#dff3f4","#def3f3","#ddf2f3","#ddf2f2","#dcf2f2","#dbf1f1","#daf1f1","#d9f1f0","#d9f0ef","#d8f0ef","#d7f0ee","#d6f0ee","#d5efed","#d4efec","#d3eeec","#d2eeeb","#d1eeeb","#d0edea","#cfede9","#ceede8","#cdece8","#ccece7","#cbebe6","#caebe6","#c9ebe5","#c7eae4","#c6eae3","#c5e9e3","#c4e9e2","#c2e8e1","#c1e8e0","#c0e7df","#bee7df","#bde6de","#bce6dd","#bae5dc","#b9e4db","#b7e4da","#b6e3da","#b4e3d9","#b3e2d8","#b1e2d7","#b0e1d6","#aee0d5","#ade0d4","#abdfd3","#aadfd2","#a8ded1","#a7ddd0","#a5ddcf","#a4dcce","#a2dbcd","#a0dbcc","#9fdacb","#9dd9ca","#9cd9c9","#9ad8c8","#98d7c7","#97d7c6","#95d6c5","#94d5c4","#92d5c3","#90d4c2","#8fd3c1","#8dd3c0","#8cd2bf","#8ad1be","#88d1bc","#87d0bb","#85cfba","#84cfb9","#82ceb8","#81cdb7","#7fcdb6","#7eccb4","#7ccbb3","#7bcbb2","#79cab1","#78c9b0","#76c9ae","#75c8ad","#73c7ac","#72c7ab","#70c6aa","#6fc5a8","#6dc5a7","#6cc4a6","#6ac3a4","#69c3a3","#68c2a2","#66c1a1","#65c19f","#64c09e","#62bf9d","#61bf9b","#60be9a","#5ebd98","#5dbd97","#5cbc96","#5bbb94","#59bb93","#58ba92","#57b990","#56b98f","#54b88d","#53b78c","#52b78b","#51b689","#50b588","#4fb486","#4db485","#4cb383","#4bb282","#4ab180","#49b17f","#48b07d","#47af7c","#46ae7b","#45ae79","#44ad78","#43ac76","#42ab75","#40aa73","#3fa972","#3ea870","#3da76f","#3ca66d","#3ba56c","#3aa56a","#39a469","#38a367","#37a266","#36a164","#35a063","#349f61","#339e60","#329d5e","#319c5d","#309b5c","#2f9a5a","#2e9959","#2d9757","#2c9656","#2b9555","#2a9453","#299352","#289251","#27914f","#26904e","#258f4d","#248e4c","#238d4a","#228c49","#218b48","#208a47","#1f8946","#1e8845","#1d8744","#1c8643","#1b8542","#1a8441","#198340","#18823f","#17813e","#16803d","#157f3c","#147e3b","#137d3a","#127c39","#117b38","#107a38","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"];
//console.log(schemeBlues.length)

//variables
let us;
let pathData;
let path;

var render_map = async function(data, color, colorScale, min, max, num, val){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  pathData = await getMapData();
  path = d3.geoPath();
  let format = d3.format("d");
  let formatComma = d3.format(",");
  let formatPercent = d3.format(",.2%");

  if (val == 0){
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .direction('n')
      .html(function(d) {
        return "<center><b>" + d.properties.name + "</b></center>" + "<br/><span class='desc'>Population: " + formatComma(data.get(d.properties.name)) + "</span>"
      });
  }
  else if (val == 1){
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .direction('n')
      .html(function(d) {
        return "<center><b>" + d.properties.name + "</b></center>" +
              "<br><span class='desc'>" + name + " Population: " + formatComma(eth_map.get(d.properties.name)) +
              "<br>" + "% of Total Pop: " + formatPercent(eth_percent.get(d.properties.name)) + "</span>"
    });
  }
  else {
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .direction('n')
      .html(function(d) {
        return "<center><b>" + d.properties.name + "</b></center>" +
              "<br><span class='desc'>" + "Female-to-Male Ratio: " + formatPercent(gen_map.get(d.properties.name)) + "</span>"
    });
  }

  //create map
  const svg = d3.select('#chart')
    .append('svg')
    .attr("viewBox", [0, 0, 975, 610]);

  svg.call(tip);

  //fill in state colors
  svg.append("g")
    .selectAll("path")
    .data(pathData)
    .enter().append("a")
    .attr("class", function(d){ return "state" } )
    .attr("id", function(d){ return d.properties.name } )
    .attr("xlink:href", d => "/"+ d.properties.name)
      .append("path")
        .attr("fill", d => color(data.get(d.properties.name)))
        .attr("d", path)
        .on("mouseover", tip.show)
        .on("mouseleave", tip.hide);

  //label all the states
  svg.selectAll("text")
    .data(pathData)
    .enter().append("svg:text")
      .text(d => state_abbrev[d.properties.name])
      .attr("x", d => path.centroid(d)[0])
      .attr("y", d=> path.centroid(d)[1])
      .attr("text-anchor","middle")
      .attr('font-size','8px')
      .attr('font-weight', 'bold');

  //create state borders
  svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  legend = g => {
    const x = d3.scaleLinear()
        .domain(d3.extent(colorScale.domain()))
        .rangeRound([0, 300]);

    g.selectAll("rect")
      .data(colorScale.range().map(d => colorScale.invertExtent(d)))
      .join("rect")
        .attr("height", 8)
        .attr("x", d => x(d[0]))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("fill", d => color(d[0]));

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.title);

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(d3.format(num))
        .tickValues(colorScale.range().slice(1).map(d => colorScale.invertExtent(d)[0])))
      .select(".domain")
        .remove();
  };

  svg.append("g")
    .attr("transform", "translate(600,40)")
    .call(legend);
};

const getMapData = async () => {
  us = await d3.json('static/json/states-albers-10m.json');
  return topojson.feature(us, us.objects.states).features;
};

var render_pop_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  var diameter = 1000;
  var color = d3.scaleOrdinal(d3.schemeTableau10);

  var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
      return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    node.append("title")
      .text(function(d) {
        return d.Name + ": " + d.Count;
      });

    node.append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d,i) {
        return color(i);
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
        return d.r/5;
      })
      .attr("fill", "white");

    node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
      return d.r/5;
    })
    .attr("fill", "white");

    d3.select(self.frameElement)
      .style("height", diameter + "px");

};

//-----------------------------------------------------------
//ethnicity data
var render_eth_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";
  var columns = ['hispanic', 'white', 'black', 'native', 'asian', 'pacific'];
  // console.log(d3.stack().keys(columns)(eth_data));
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
      .domain(eth_data.map(d => d.abbrev))
      .range([0, 2 * Math.PI])
      .align(0);
  var y = d3.scaleLinear()
      .domain([0, d3.max(eth_data, d => d.total)])
      .range([innerRadius, outerRadius]);
  var z = d3.scaleOrdinal()
      .domain(columns)
      .range(["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#c4bfff"].reverse());
  var xAxis = g => g
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .call(g => g.selectAll("g")
        .data(eth_data)
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
  const svg = d3.select('#chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto");

  svg.append('g')
    .selectAll('g')
    .data(d3.stack().keys(columns)(eth_data))
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

let eth_map, eth_percent, eth_map_val, eth_max, eth_min, name;
let eth_abbrev = {"asian": "Asian American", "white": "White", "black": "African American", "native": "Native American", "hispanic": "Hispanic", "pacific": "Pacific Islander"};

var calculate_eth_values = function(nationality) {
  eth_map = new Map();
  eth_percent = new Map();
  eth_map_val = [];
  for (i = 0; i < eth_data.length; i++){
    eth_map.set(eth_data[i]['state'], eth_data[i][nationality]);
    eth_percent.set(eth_data[i]['state'], eth_data[i][nationality] / eth_data[i]['total']);
    eth_map_val.push(eth_data[i][nationality]);
  }
  name = eth_abbrev[nationality];
  eth_map = Object.assign(eth_map, {title: name + " Population (millions)"});
  eth_max = eth_map_val.reduce(function(a, b){
    return Math.max(a, b);
  });
  eth_min = eth_map_val.reduce(function(a, b){
    return Math.min(a, b);
  });
};
calculate_eth_values("white");

let schemeYellows = ["#fff7ec","#fff7eb","#fff6ea","#fff6e9","#fff5e7","#fff5e6","#fff4e5","#fff4e4","#fff3e3","#fff3e2","#fff2e1","#fff2e0","#fff1de","#fff1dd","#fff0dc","#fff0db","#feefda","#feefd9","#feeed7","#feeed6","#feedd5","#feedd4","#feecd3","#feecd2","#feebd0","#feebcf","#feeace","#feeacd","#fee9cc","#fee9ca","#fee8c9","#fee8c8","#fee7c7","#fee7c6","#fee6c4","#fee5c3","#fee5c2","#fee4c1","#fee4bf","#fee3be","#fee3bd","#fee2bc","#fee1ba","#fee1b9","#fee0b8","#fee0b7","#fedfb5","#fedeb4","#fedeb3","#fdddb2","#fddcb1","#fddcaf","#fddbae","#fddaad","#fddaac","#fdd9ab","#fdd8a9","#fdd8a8","#fdd7a7","#fdd6a6","#fdd6a5","#fdd5a4","#fdd4a3","#fdd4a1","#fdd3a0","#fdd29f","#fdd29e","#fdd19d","#fdd09c","#fdcf9b","#fdcf9a","#fdce99","#fdcd98","#fdcc97","#fdcc96","#fdcb95","#fdca94","#fdc994","#fdc893","#fdc892","#fdc791","#fdc690","#fdc58f","#fdc48e","#fdc38d","#fdc28c","#fdc18b","#fdc08a","#fdbf89","#fdbe88","#fdbd87","#fdbc86","#fdbb85","#fdba84","#fdb983","#fdb882","#fdb781","#fdb680","#fdb57f","#fdb47d","#fdb27c","#fdb17b","#fdb07a","#fdaf79","#fdae78","#fdac76","#fdab75","#fdaa74","#fca873","#fca772","#fca671","#fca46f","#fca36e","#fca26d","#fca06c","#fc9f6b","#fc9e6a","#fc9c68","#fc9b67","#fb9a66","#fb9865","#fb9764","#fb9563","#fb9462","#fb9361","#fb9160","#fa905f","#fa8f5e","#fa8d5d","#fa8c5c","#f98b5b","#f9895a","#f98859","#f98759","#f88558","#f88457","#f88356","#f78155","#f78055","#f77f54","#f67d53","#f67c52","#f67b52","#f57951","#f57850","#f4774f","#f4754f","#f4744e","#f3734d","#f3714c","#f2704c","#f26f4b","#f16d4a","#f16c49","#f06b49","#f06948","#ef6847","#ef6646","#ee6545","#ed6344","#ed6243","#ec6042","#ec5f42","#eb5d41","#ea5c40","#ea5a3f","#e9593e","#e8573c","#e8563b","#e7543a","#e65339","#e65138","#e55037","#e44e36","#e44c35","#e34b34","#e24932","#e14831","#e04630","#e0442f","#df432e","#de412d","#dd402b","#dc3e2a","#dc3c29","#db3b28","#da3927","#d93826","#d83624","#d73423","#d63322","#d53121","#d43020","#d32e1f","#d22c1e","#d12b1d","#d0291b","#cf281a","#ce2619","#cd2518","#cc2317","#cb2216","#ca2015","#c91f14","#c81d13","#c71c12","#c61b11","#c51911","#c31810","#c2170f","#c1150e","#c0140d","#bf130c","#be120c","#bc110b","#bb100a","#ba0e09","#b80d09","#b70c08","#b60b07","#b50b07","#b30a06","#b20906","#b10805","#af0705","#ae0704","#ac0604","#ab0504","#a90503","#a80403","#a60402","#a50302","#a40302","#a20302","#a00201","#9f0201","#9d0201","#9c0101","#9a0101","#990101","#970101","#960100","#940100","#920000","#910000","#8f0000","#8e0000","#8c0000","#8a0000","#890000","#870000","#860000","#840000","#820000","#810000","#7f0000"];

//-----------------------------------------------------------
//gender data
let gen_arr = [];
let gen_map = new Map();
let gen_map_val = [];
for (i = 0; i < gender_data.length; i++){
  gen_arr.push(gender_data[i]['mratio']);
  gen_arr.push(gender_data[i]['fratio']);
  gen_map.set(gender_data[i]['state'], gender_data[i]['female'] / gender_data[i]['male']);
  gen_map_val.push(gender_data[i]['female'] / gender_data[i]['male']);
}
let rmax = gen_arr.reduce(function(a, b) { //get max ratio
    return Math.max(a, b);
});
gen_map = Object.assign(gen_map, {title: "Female-to-Male Ratio"});
let gen_max = gen_map_val.reduce(function(a, b) { //get max population
    return Math.max(a, b);
});
let gen_min = gen_map_val.reduce(function(a, b) { //get min population
    return Math.min(a, b);
});

let schemePurples = ["#f7f4f9","#f6f3f9","#f6f3f8","#f5f2f8","#f5f2f8","#f4f1f7","#f4f0f7","#f3f0f7","#f3eff6","#f2eff6","#f2eef6","#f1edf5","#f1edf5","#f0ecf5","#f0ebf4","#efebf4","#efeaf4","#eee9f3","#eee9f3","#ede8f3","#ede7f2","#ece6f2","#ece6f1","#ebe5f1","#ebe4f1","#eae3f0","#eae3f0","#e9e2ef","#e9e1ef","#e8e0ef","#e8dfee","#e7deee","#e6dded","#e6dced","#e5dbec","#e5dbec","#e4daeb","#e4d9eb","#e3d7ea","#e3d6e9","#e2d5e9","#e1d4e8","#e1d3e8","#e0d2e7","#e0d1e7","#dfd0e6","#dfcfe5","#decee5","#decce4","#ddcbe4","#dccae3","#dcc9e2","#dbc8e2","#dbc7e1","#dac5e0","#dac4e0","#d9c3df","#d9c2df","#d8c0de","#d8bfdd","#d7bedd","#d7bddc","#d6bcdb","#d6badb","#d5b9da","#d5b8da","#d4b7d9","#d4b6d8","#d3b4d8","#d3b3d7","#d3b2d6","#d2b1d6","#d2b0d5","#d1aed5","#d1add4","#d1acd3","#d0abd3","#d0aad2","#d0a8d2","#d0a7d1","#cfa6d0","#cfa5d0","#cfa4cf","#cfa2ce","#cea1ce","#cea0cd","#ce9fcd","#ce9dcc","#ce9ccb","#ce9bcb","#ce9aca","#ce98c9","#ce97c9","#ce96c8","#ce94c7","#ce93c7","#cf92c6","#cf91c5","#cf8fc5","#cf8ec4","#d08cc3","#d08bc3","#d08ac2","#d188c1","#d187c1","#d186c0","#d284bf","#d283bf","#d381be","#d380bd","#d47ebc","#d47dbc","#d57bbb","#d57aba","#d678b9","#d677b8","#d775b8","#d774b7","#d872b6","#d871b5","#d96fb4","#d96db3","#da6cb3","#da6ab2","#db69b1","#db67b0","#dc65af","#dc64ae","#dd62ad","#dd60ac","#de5fab","#de5daa","#df5ba9","#df59a8","#df58a7","#e056a6","#e054a5","#e053a4","#e151a3","#e14fa2","#e14da0","#e24c9f","#e24a9e","#e2489d","#e2479c","#e2459b","#e24399","#e24298","#e34097","#e33e96","#e33d94","#e33b93","#e33a92","#e33890","#e2378f","#e2358e","#e2348c","#e2328b","#e2318a","#e23088","#e12e87","#e12d85","#e12c84","#e02b82","#e02a81","#df2880","#df277e","#df267d","#de257b","#dd247a","#dd2378","#dc2277","#dc2175","#db2074","#da2072","#d91f71","#d91e6f","#d81d6e","#d71c6d","#d61b6b","#d51b6a","#d41a68","#d31967","#d21866","#d11864","#d01763","#cf1662","#ce1661","#cd155f","#cc145e","#cb145d","#c9135c","#c8125b","#c7125a","#c61159","#c41058","#c31057","#c20f56","#c00f55","#bf0e54","#bd0d53","#bc0d52","#ba0c51","#b90c50","#b70b4f","#b60b4f","#b40a4e","#b30a4d","#b1094c","#b0094b","#ae084b","#ac084a","#ab0749","#a90748","#a80648","#a60647","#a40546","#a30545","#a10544","#a00444","#9e0443","#9c0442","#9b0341","#990340","#97033f","#96033f","#94023e","#93023d","#91023c","#8f023b","#8e013a","#8c0139","#8b0138","#890137","#880136","#860135","#840134","#830133","#810032","#800031","#7e0030","#7d002f","#7b002d","#79002c","#78002b","#76002a","#750029","#730028","#720027","#700026","#6f0025","#6d0024","#6c0022","#6a0021","#690020","#67001f"];

var render_gen_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  var groupKey = 'abbrev';
  var keys = ['mratio', 'fratio'];
  var margin = ({top: 10, right: 10, bottom: 20, left: 40}),
      height = 500,
      width = 1000 + margin.right + margin.left;

  var x0 = d3.scaleBand()
    .domain(gender_data.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1);

  var x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05);

  var y = d3.scaleLinear()
    .domain([0, rmax]).nice()
    .rangeRound([height - margin.bottom, margin.top]);

  var color = d3.scaleOrdinal()
    .range(["#bae1ff", "#ffd1dc"]);

  var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove());

  var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "%"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(gender_data.y));

  var legend = svg => {
    const g = svg
        .attr("transform", `translate(${width},0)`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    g.append("rect")
        .attr("x", -19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    g.append("text")
        .attr("x", -24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
  };

  var svg = d3.select('#chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append("g")
    .selectAll("g")
    .data(gender_data)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);
};

//-----------------------------------------------------------
//rendering
var display_dropdown = document.getElementById('display');
var value_dropdown = document.getElementById('value');
var renderbtn = document.getElementById('renderbtn');
var color, colorScale;

var render = function(e){
  var display = display_dropdown.options[display_dropdown.selectedIndex].value;
  var value = value_dropdown.options[value_dropdown.selectedIndex].value;
  document.getElementById("ethform").style.display = "none";

  if (display == 0){ //map
    if (value == 0){ //population
      color = d3.scaleQuantize()
        .domain([min, max])
        .range(schemeBlues.slice(0, schemeBlues.length));
      colorScale = d3.scaleQuantize()
        .domain([min, max])
        .range(d3.schemeBuGn[8]);
      render_map(state_data, color, colorScale, min, max, ".2s", 0);
    }
    else if (value == 1){ //ethnicity
      document.getElementById("ethform").style.display = "block";
      color = d3.scaleQuantize()
        .domain([eth_min, eth_max])
        .range(schemeYellows.slice(0, schemeYellows.length));
      colorScale = d3.scaleQuantize()
        .domain([eth_min, eth_max])
        .range(d3.schemeOrRd[8]);
      render_map(eth_map, color, colorScale, eth_min, eth_max, ".2s", 1);
    }
    else { //gender ratio
      color = d3.scaleQuantize()
        .domain([gen_min, gen_max])
        .range(schemePurples.slice(0, schemePurples.length));
      colorScale = d3.scaleQuantize()
        .domain([gen_min, gen_max])
        .range(d3.schemePuRd[8]);
      render_map(gen_map, color, colorScale, gen_min, gen_max, ",.1%", 2);
    }
  }
  else {
    if (value == 0){ //population
      render_pop_chart();
    }
    else if (value == 1){ //ethnicity
      render_eth_chart();
    }
    else { //gender ratio
      render_gen_chart();
    }
  }
};

var render_eth_map = function(nationality){
  calculate_eth_values(nationality);
  render();
};

renderbtn.addEventListener('click', render);
