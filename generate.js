 
        document.addEventListener('DOMContentLoaded', function() {
            const nameInput = document.getElementById('name');
            const passwordInput = document.getElementById('password');
            const generateBtn = document.getElementById('generateBtn');
            const strengthFill = document.getElementById('strengthFill');
            const form = document.getElementById('registerForm');
            
            // Password requirement elements
            const reqLength = document.getElementById('reqLength');
            const reqUpper = document.getElementById('reqUpper');
            const reqLower = document.getElementById('reqLower');
            const reqNumber = document.getElementById('reqNumber');
            const reqSymbol = document.getElementById('reqSymbol');
            
            // Password strength checker
            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(passwordInput.value);
            });
            
            // Generate account (store in localStorage)
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = nameInput.value.trim();
                const password = passwordInput.value;
                
                // Validate inputs
                if (!name) {
                    showToast('Please enter your name', 'error');
                    return;
                }
                
                if (!isPasswordStrong(password)) {
                    showToast('Password is not strong enough, please meet all requirements', 'error');
                    return;
                }
                
                // Store user data in localStorage
                const userData = {
                    name: name,
                    password: password,
                    timestamp: new Date().toISOString()
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                showToast('Account generated successfully! Redirecting to login page...', 'success');
                
                // Redirect to login page after 2 seconds
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 2000);
            });
            
            // Function to check password strength
            function checkPasswordStrength(password) {
                const requirements = {
                    length: password.length >= 8,
                    upper: /[A-Z]/.test(password),
                    lower: /[a-z]/.test(password),
                    number: /[0-9]/.test(password),
                    symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
                };
                
                // Update requirement indicators
                updateRequirement(reqLength, requirements.length);
                updateRequirement(reqUpper, requirements.upper);
                updateRequirement(reqLower, requirements.lower);
                updateRequirement(reqNumber, requirements.number);
                updateRequirement(reqSymbol, requirements.symbol);
                
                // Calculate strength score
                const strengthScore = Object.values(requirements).filter(Boolean).length;
                const strengthPercent = (strengthScore / 5) * 100;
                
                // Update strength bar
                strengthFill.style.width = `${strengthPercent}%`;
                
                // Update color based on strength
                if (strengthPercent <= 40) {
                    strengthFill.style.backgroundColor = '#e74c3c'; // Red
                } else if (strengthPercent <= 70) {
                    strengthFill.style.backgroundColor = '#f39c12'; // Orange
                } else {
                    strengthFill.style.backgroundColor = '#2ecc71'; // Green
                }
                
                return requirements;
            }
            
            // Function to update requirement indicator
            function updateRequirement(element, isValid) {
                if (isValid) {
                    element.classList.remove('invalid');
                    element.classList.add('valid');
                    element.querySelector('i').className = 'fas fa-check';
                } else {
                    element.classList.remove('valid');
                    element.classList.add('invalid');
                    element.querySelector('i').className = 'fas fa-times';
                }
            }
            
            // Function to check if password is strong
            function isPasswordStrong(password) {
                const requirements = checkPasswordStrength(password);
                return Object.values(requirements).every(req => req === true);
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