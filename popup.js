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

   tab += "<tr><td>" + r.name + "</td><td><a href='javascript:void(0);' onclick=' onMobileNumberClick(\"" + r.phone + "\")'>" + r.phone + "</a></td></tr>";
  }

  //   tab += "<tr><td>" + r.name + "</td><td>" + r.phone + "</td></tr>";
  // }

  // Setting innerHTML as tab variable
  var employeesElement = document.getElementById("employees");
  employeesElement.innerHTML = tab;
}

// function handlePhoneClick(phoneNumber) {
//   alert("Clicked on phone number: " + phoneNumber);
//   // You can replace the alert with your desired action
// }

 function onMobileNumberClick (phone, message) {
   var message =
     "Good Morning!\r\nHope you are doing well, We are connected with you over linkedin, I am *Shyam Mohan K, Founder \u0026 CEO at RazorOps, Inc.*  I like to Introduce RazorOps - The Simplest Container Native SaaS CI/CD platform! 🚀 \r\n\r\nWe recently helped an AI/ML, edTech, FinTech and Gaming companies to scale infra and CICD process to ship code changes fast. I want to see if there is any opportunity where you can use RazorOps DevOps Solution to automation CI/CD process.\r\n \r\n*Schedule a meeting*, In case if you like to know more or Start a *FREE POC https://bit.ly/3YEEtQy*  \r\n\r\nThanks \u0026 regards,\r\nShyam Mohan K (Founder \u0026 CEO)\r\n";
   var url =
     "https://api.whatsapp.com/send?phone=" +
     phone +
     "&text=" +
     encodeURIComponent(message); // Change "message" to "Hi"
   window.open(url, "_blank");
 };
