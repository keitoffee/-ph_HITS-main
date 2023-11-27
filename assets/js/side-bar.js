function updateDateTime() {
  // Get the current date and time
  var currentDateTime = new Date();

  // Format the date
  var formattedDateTime = currentDateTime.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Display the formatted date on the webpage
  document.getElementById('datetime').textContent = formattedDateTime;
}

// Update the date every second (1000 milliseconds)
setInterval(updateDateTime, 1000);

// Initial call to display the date immediately
updateDateTime();

const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

// Add this script at the end of your HTML, just before the closing </body> tag

// Function to handle navigation link clicks
function handleNavLinkClick(linkId, pageUrl) {
  const link = document.getElementById(linkId);

  // Add a click event listener to the link
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // Check if the link is already the active link (i.e., the same page is open)
    if (window.location.pathname === pageUrl) {
      // Reload the current page
      location.reload();
    } else {
      // Navigate to the specified page
      window.location.href = pageUrl;
    }
  });
}

// Call the function for each navigation link
handleNavLinkClick("dashboardLink", "dashboard.html");
handleNavLinkClick("scheduleContentLink", "schedule-content.html");
handleNavLinkClick("livestreamLink", "livestream.html");
handleNavLinkClick("historyLink", "history.html");
