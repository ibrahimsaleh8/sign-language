// Function to check if user is logged in
function checkLogin() {
  // Get the current page path
  const currentPath = window.location.pathname;

  // Check if we're on the login page
  const isLoginPage =
    currentPath.includes("index.html") ||
    currentPath === "/" ||
    currentPath === "";

  // Get authentication status from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // If not on login page and not authenticated, redirect to login
  if (!isLoginPage && !isAuthenticated) {
    window.location.href = "index.html";
    return false;
  }

  // If on login page and already authenticated, redirect to home
  if (isLoginPage && isAuthenticated) {
    window.location.href = "home.html";
    return false;
  }

  return true;
}

// Run check when page loads
document.addEventListener("DOMContentLoaded", checkLogin);

// Run check when page is shown (for browser back/forward navigation)
window.addEventListener("pageshow", checkLogin);

// Add logout functionality
function logout() {
  localStorage.removeItem("isAuthenticated");
  window.location.href = "index.html";
}
