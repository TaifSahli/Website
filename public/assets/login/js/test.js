// Get the Signup button element
const signupButton = document.querySelector('.form .button');

// Add click event listener to the Signup button
signupButton.addEventListener('click', () => {
  // Navigate to the main page (replace 'main-page.html' with your actual main page URL)
  window.location.href = 'index.html';
});

// Get the "نسيت كلمة السر؟" link element
const forgotPasswordLink = document.querySelector('.form a');

// Add click event listener to the forgot password link
forgotPasswordLink.addEventListener('click', () => {
  // Navigate to the forgot password page (replace 'forgot-password.html' with your actual forgot password page URL)
  window.location.href = 'index.html';
});


document.querySelector('label[for="check"]').addEventListener('click', function() {
    // Navigate to another webpage
    window.location.href = 'signup.html'; // Change 'create_account.html' to the URL of the page you want to navigate to
});

document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.querySelector(".button");

  // Add an event listener to the login button
  loginButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Simulate a successful login by displaying a message
    alert("! تم تسجيل الدخول بحسابك");

    // Redirect the user to the linked page
    window.location.href = "index.html";
  });
});


