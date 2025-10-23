document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.querySelector('.login-btn');

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Clear error messages
    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
    }

    // Show error message
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    // Real-time validation
    emailInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            if (!validateEmail(this.value)) {
                showError(this, emailError, 'Please enter a valid email address');
            } else {
                this.classList.remove('error');
                emailError.textContent = '';
            }
        } else {
            clearErrors();
        }
    });

    passwordInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            if (!validatePassword(this.value)) {
                showError(this, passwordError, 'Password must be at least 6 characters long');
            } else {
                this.classList.remove('error');
                passwordError.textContent = '';
            }
        } else {
            clearErrors();
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let isValid = true;

        // Clear previous errors
        clearErrors();

        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters long');
            isValid = false;
        }

        if (isValid) {
            // Simulate login process
            loginBtn.disabled = true;
            loginBtn.textContent = 'Signing In...';

            // Add loading animation
            loginBtn.style.background = 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)';

            setTimeout(() => {
                // Simulate successful login
                loginBtn.textContent = 'Success!';
                loginBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                loginForm.classList.add('success');

                // Show success message
                alert('Login successful! Welcome back!');

                // Reset form after 2 seconds
                setTimeout(() => {
                    loginForm.reset();
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Sign In';
                    loginBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    loginForm.classList.remove('success');
                    clearErrors();
                }, 2000);

            }, 1500);
        }
    });

    // Add focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Add enter key support for form submission
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });

    // Demo credentials hint (remove in production)
    console.log('Demo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');
});
