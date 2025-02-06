\document.addEventListener("DOMContentLoaded", () => {
    const projectButtons = document.querySelectorAll(".project-btn");

    projectButtons.forEach(button => {
        button.addEventListener("click", () => {
            const projectId = button.getAttribute("data-project");
            const details = document.getElementById(`project-${projectId}`);

            if (details.style.display === "none" || !details.style.display) {
                details.style.display = "block";
            } else {
                details.style.display = "none";
            }
        });
    });
});
