//mapping population data by state
var state_data = new Map(); //new Map object
var i; //indexing
for (i = 0; i < data.length; i++){
  state_data.set(data[i]['state'], data[i]['pop']);
}
state_data = Object.assign(state_data, {title: "Population"});

var pop = document.getElementById('pop');
pop.addEventListener('click', () => {
});
