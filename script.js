// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load header.html into the element with id "header"
    fetch("header.html")
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById("header");
        if (headerContainer) {
          headerContainer.innerHTML = data;
        }
      })
      .catch(error => console.error("Error loading header:", error));
  
    // Load footer.html into the element with id "footer"
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        const footerContainer = document.getElementById("footer");
        if (footerContainer) {
          footerContainer.innerHTML = data;
        }
      })
      .catch(error => console.error("Error loading footer:", error));
  });
  