document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form submission
    const loginForm = document.querySelector('.login-form');
    const loginButton = document.querySelector('.login-button');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        loginButton.classList.add('loading');
        
        // Redirect after animation
        setTimeout(() => {
            window.location.replace('index.html');
        }, 1500); // 1.5 seconds delay
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`جاري تسجيل الدخول باستخدام ${platform}...`, 'info');
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${getIconForType(type)}"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        default:
            return 'fa-info-circle';
    }
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 15px 25px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(-120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-right: 4px solid #4CAF50;
    }

    .notification.error {
        border-right: 4px solid #f44336;
    }

    .notification.warning {
        border-right: 4px solid #ff9800;
    }

    .notification.info {
        border-right: 4px solid #2196F3;
    }

    .notification i {
        font-size: 1.2em;
    }

    .notification.success i {
        color: #4CAF50;
    }

    .notification.error i {
        color: #f44336;
    }

    .notification.warning i {
        color: #ff9800;
    }

    .notification.info i {
        color: #2196F3;
    }
`;
document.head.appendChild(style); 