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

// Add an event listener when the popup is loaded
document.addEventListener("DOMContentLoaded", () => {
  getapi(api_url);
});

async function getapi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    hideloader();
    show(data);
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
}

function hideloader() {
  var loadingElement = document.getElementById("loading");
  loadingElement.style.display = "none";
}

function show(data) {
  var tab = "<tr><th>Name</th><th>Phone</th></tr>";

  for (var i = 0; i < data.leads.length; i++) {
    var r = data.leads[i];
    tab +=
      "<tr><td>" +
      r.name +
      "</td><td><a href='javascript:void(0);' data-phone='" +
      r.phone +
      "' data-message='" +
      encodeURIComponent(data.message) +
      "'>" +
      r.phone +
      "</a></td></tr>";
  }

  var employeesElement = document.getElementById("leads");
  employeesElement.innerHTML = tab;

  // Attach event listeners to phone number links
  const phoneLinks = document.querySelectorAll("a[data-phone]");
  phoneLinks.forEach((link) => {
    link.addEventListener("click", onMobileNumberClick);
  });
}

function onMobileNumberClick(event) {
  event.preventDefault();
  const phone = event.target.getAttribute("data-phone");
  const message = decodeURIComponent(event.target.getAttribute("data-message"));
  const url =
    "https://web.whatsapp.com/send?phone=" +
    phone +
    "&text=" +
    encodeURIComponent(message);

  // Open a new window with the WhatsApp Web URL
  chrome.windows.create({ url: url, type: "popup" });
}









// function onMobileNumberClick(event) {
//   event.preventDefault();
//   const phone = event.target.getAttribute("data-phone");
//   const message = decodeURIComponent(event.target.getAttribute("data-message"));
//   const url =
//     "https://api.whatsapp.com/send?phone=" +
//     phone +
//     "&text=" +
//     encodeURIComponent(message);
//   window.open(url, "_blank");
// }
