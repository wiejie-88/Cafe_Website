document.addEventListener('DOMContentLoaded', function() {
    // Enroll button functionality
    const enrollButton = document.querySelector('.enroll-button');
    enrollButton.addEventListener('click', function() {
        alert('Thank you for enrolling in Advanced Brewing Techniques!');
    });


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});