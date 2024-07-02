let isSignUp = true;
let storedPassword = '';

function toggleForm() {
    const formTitle = document.getElementById('form-title');
    const actionButton = document.getElementById('action-button');
    const toggleText = document.getElementById('toggle-text');
    
    if (isSignUp) {
        formTitle.textContent = 'Login';
        actionButton.textContent = 'Login';
        toggleText.innerHTML = 'Don\'t have an account? <span id="toggle-link" onclick="toggleForm()">Sign Up</span>';
    } else {
        formTitle.textContent = 'Sign Up';
        actionButton.textContent = 'Sign Up';
        toggleText.innerHTML = 'Already have an account? <span id="toggle-link" onclick="toggleForm()">Login</span>';
    }

    isSignUp = !isSignUp;
}

function handleAction() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isSignUp) {
        // Sign up process
        storedPassword = password;
        alert(`Signed up with Username: ${username}`);
        toggleForm(); // Automatically switch to login form after signing up
    } else {
        // Login process
        if (password === storedPassword) {
            alert(`Logged in with Username: ${username}`);
        } else {
            alert('Incorrect password');
        }
    }
}
function handleAction() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isSignUp) {
        // Sign up process
        storedUsername = username;
        storedPassword = password;
        alert(`Signed up with Username: ${username}`);
        toggleForm(); // Automatically switch to login form after signing up
    } else {
        // Login process
        if (username === storedUsername && password === storedPassword) {
            alert(`Logged in with Username: ${username}`);
            window.location.href = 'https://super-system-g4pgxg444p5299j5-5500.app.github.dev/'; // Redirect to the main page after successful login
        } else {
            alert('Incorrect username or password');
        }
    }
}