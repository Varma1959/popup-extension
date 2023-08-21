document.addEventListener("DOMContentLoaded", function () {
  let popup = document.getElementById("popup");
  let openButton = document.querySelector(".btn");
  let closeButton = document.querySelector(".pop-up button");

  openButton.addEventListener("click", openPopup);
  closeButton.addEventListener("click", closePopup);

  function openPopup() {
    popup.classList.add("open-popup");
  }

  function closePopup() {
    popup.classList.remove("open-popup");
  }
});


const api_url =
  "https://app.blinkcrm.in/api/whatsapp?api_key=19a5c89fb2ef43c1969d00e4554ab99e";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response.ok) {
    hideloader();
    show(data);
  }
}

// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  var loadingElement = document.getElementById("loading");
  loadingElement.style.display = "none";
}

// Function to define innerHTML for HTML table
function show(data) {
  var tab = "<tr><th>Name</th><th>Phone</th></tr>";

  // Loop to access all rows
  for (var i = 0; i < data.leads.length; i++) {
    var r = data.leads[i];
    tab += "<tr><td>" + r.name + "</td><td>" + r.phone + "</td></tr>";
  }

  // Setting innerHTML as tab variable
  var employeesElement = document.getElementById("employees");
  employeesElement.innerHTML = tab;
}
