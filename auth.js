// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

// Set authentication state
function setAuthenticated(value) {
  localStorage.setItem("isAuthenticated", value);
}

// Check authentication on page load
document.addEventListener("DOMContentLoaded", () => {
  // Skip auth check for login page
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    return;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    window.location.href = "index.html";
  }
});

// Handle logout
function logout() {
  setAuthenticated(false);
  window.location.href = "index.html";
}
