
        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const loginNameInput = document.getElementById('loginName');
            const loginPasswordInput = document.getElementById('loginPassword');
            const messageDiv = document.getElementById('message');
            
            // Check if user data exists in localStorage
            checkUserData();
            
            // Login form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const enteredName = loginNameInput.value.trim();
                const enteredPassword = loginPasswordInput.value;
                
                // Get stored user data
                const storedUserData = localStorage.getItem('userData');
                
                if (!storedUserData) {
                    showMessage('No account found. Please create an account first.', 'error');
                    return;
                }
                
                const storedUser = JSON.parse(storedUserData);
                
                // Check credentials
                if (enteredName === storedUser.name && enteredPassword === storedUser.password) {
                    // Set login status
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', storedUser.name);
                    
                    showMessage('Login successful! Redirecting to dashboard...', 'success');
                    
                    // Redirect to dashboard after 2 seconds
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } else {
                    showMessage('Invalid username or password. Please try again.', 'error');
                    loginPasswordInput.value = '';
                }
            });
            
            // Function to check if user data exists
            function checkUserData() {
                const storedUserData = localStorage.getItem('userData');
                
                if (!storedUserData) {
                    showMessage('No account found. Please create an account first.', 'error');
                } else {
                    // Auto-fill username if available
                    const storedUser = JSON.parse(storedUserData);
                    loginNameInput.value = storedUser.name;
                    loginNameInput.focus();
                }
            }
            
            // Function to show messages
            function showMessage(message, type) {
                messageDiv.textContent = message;
                messageDiv.className = 'message ' + type;
                messageDiv.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
            
            // Function to show toast notifications
            function showToast(message, type = 'info') {
                const backgroundColor = type === 'success' ? '#2ecc71' : 
                                       type === 'error' ? '#e74c3c' : 
                                       '#3498db';
                
                Toastify({
                    text: message,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: backgroundColor,
                    stopOnFocus: true
                }).showToast();
            }
        });