document.addEventListener("DOMContentLoaded", function () {
    const projectButtons = document.querySelectorAll(".project-btn");

    projectButtons.forEach(button => {
        button.addEventListener("click", function () {
            const projectId = this.getAttribute("data-project");
            const projectDetails = document.getElementById(`project-${projectId}`);

            if (projectDetails) {
                // Toggle visibility
                if (projectDetails.style.display === "block") {
                    projectDetails.style.display = "none";
                } else {
                    projectDetails.style.display = "block";
                }
            }
        });
    });
});
