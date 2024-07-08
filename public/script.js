document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const usernamePlaceholder = document.getElementById('usernamePlaceholder');
    
    // Replace [Username] with actual username
    const username = getUsername(); // Replace with your logic to get the username

    // Set the username placeholder text
    usernamePlaceholder.textContent = username;

    // Event listener for form submission
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Prepare form data
        const formData = new FormData(profileForm);

        try {
            // Send form data to server endpoint for processing
            const response = await fetch('http://your-backend-url/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Changes saved successfully');
                window.location.href = 'http://artemas.lol/analytics'; // Redirect to analytics page after successful save
            } else {
                alert('Failed to save changes');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes');
        }
    });

    // Function to get the username (replace with your actual logic)
    function getUsername() {
        // Example: Retrieve username from session storage or local storage
        return sessionStorage.getItem('username') || 'Guest';
    }
});
