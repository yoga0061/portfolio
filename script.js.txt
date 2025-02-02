document.addEventListener('DOMContentLoaded', () => {
    const projectButtons = document.querySelectorAll('.project-btn');

    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project'); // Get the project number
            const projectDetails = document.getElementById('project-' + projectId); // Get the corresponding details

            // Toggle the visibility of the project details
            if (projectDetails.style.display === 'none' || projectDetails.style.display === '') {
                projectDetails.style.display = 'block';
                this.textContent = 'See Less'; // Change button text to "See Less"
            } else {
                projectDetails.style.display = 'none';
                this.textContent = 'See More'; // Change button text back to "See More"
            }
        });
    });
});
