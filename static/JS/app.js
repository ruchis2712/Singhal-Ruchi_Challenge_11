// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");

      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        });
    });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

    // Save the element, value, and id of the filter that was changed
    let newdate = d3.select("#datetime").property("value");
    let newcity = d3.select("#city").property("value");
    let newstate = d3.select("#state").property("value");
    let newcountry = d3.select("#country").property("value");
    let newshape = d3.select("#shape").property("value");
  
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
    
    if (newdate) {filters.datetime = newdate;} else {filters.datetime = "";}
    if (newcity) {filters.city = newcity;} else {filters.city = "";}
    if (newstate) {filters.state = newstate;} else {filters.state = "";}
    if (newcountry) {filters.country = newcountry;} else {filters.country = "";}
    if (newshape) {filters.shape = newshape;} else {filters.shape = "";}

  
    // Call function to apply all filters and rebuild the table
    filterTable();
}
  
function filterTable() {
    
    // Set the filteredData to the tableData
    let filteredData = tableData;
  
    // Loop through all of the filters and keep any data that
    // matches the filter values

    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => (row[key] === value || filters[key] === ""));
    })
  
    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
}
  
d3.selectAll("#filter-btn").on("click", updateFilters);


// Build the table when the page loads
buildTable(tableData);