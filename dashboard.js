  
        // Display user name
        document.addEventListener('DOMContentLoaded', function() {
            const userData = localStorage.getItem('userData');
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (!userData || isLoggedIn !== 'true') {
                // If user is not logged in, redirect to login page
                window.location.href = 'login.html';
                return;
            }
            
            const user = JSON.parse(userData);
            document.getElementById('userNameDisplay').textContent = user.name;
            document.getElementById('welcomeHeading').textContent = `Welcome, ${user.name}!`;
            
            // Logout button functionality
            document.getElementById('logoutBtn').addEventListener('click', function() {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            });
            
            // Prevent direct access to login page
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function() {
                window.history.go(1);
            };
        });
        
        function showProfile() {
            alert('Profile feature will be implemented soon!');
        }
        
        function showSettings() {
            alert('Settings feature will be implemented soon!');
        }
        
        function showStatistics() {
            alert('Statistics feature will be implemented soon!');
        }