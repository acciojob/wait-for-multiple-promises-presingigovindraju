//your JS code here. If required.
// Create an array of three promises, each resolving after a random time between 1 and 3 seconds
const promises = [
  new Promise(resolve => setTimeout(() => resolve("Promise 1"), Math.random() * 2000 + 1000)),
  new Promise(resolve => setTimeout(() => resolve("Promise 2"), Math.random() * 2000 + 1000)),
  new Promise(resolve => setTimeout(() => resolve("Promise 3"), Math.random() * 2000 + 1000)),
];

// Add a row that spans 2 columns with the text Loading...
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.setAttribute("colspan", "2");
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
document.getElementById("output").appendChild(loadingRow);

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then(results => {
    // Remove the loading text
    document.getElementById("output").removeChild(loadingRow);

    // Populate the table with the required values
    results.forEach((result, index) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");

      nameCell.textContent = `Promise ${index + 1}`;
      timeCell.textContent = (promises[index]._settledValueCallback.end - promises[index]._settledValueCallback.start) / 1000; // Calculate time taken in seconds

      row.appendChild(nameCell);
      row.appendChild(timeCell);
      document.getElementById("output").appendChild(row);
    });

    // Add a row for the total time taken
    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");

    totalNameCell.textContent = "Total";
    totalTimeCell.textContent = results.reduce((total, time) => total + (time._settledValueCallback.end - time._settledValueCallback.start) / 1000, 0).toFixed(3);

    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    document.getElementById("output").appendChild(totalRow);
  })
  .catch(error => console.error(error));
