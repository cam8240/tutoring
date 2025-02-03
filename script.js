document.addEventListener("DOMContentLoaded", function () {
  // Load header dynamically
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.getElementById("header");
      if (headerContainer) {
        headerContainer.innerHTML = data;

        // Add "active" class to current page link
        const navLinks = headerContainer.querySelectorAll(".nav-link");
        const currentPath = window.location.pathname.split("/").pop(); // Get filename from URL

        navLinks.forEach(link => {
          if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
          }
        });

        // Attach event listener for mobile menu toggle
        const menuToggle = headerContainer.querySelector("#mobile-menu");
        const navList = headerContainer.querySelector(".nav-list");
        const header = headerContainer.querySelector("header"); // Get header element

        if (menuToggle && navList && header) {
          menuToggle.addEventListener("click", function () {
            navList.classList.toggle("active");
            header.classList.toggle("expanded"); // Expand header when menu is open
          });
        }
      }
    })
    .catch(error => console.error("Error loading header:", error));

  // Load footer dynamically
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
