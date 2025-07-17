// Get references to elements and set up initial configurations
const reservationForm = document.querySelector("form");
const confirmationModal = document.getElementById("confirmationModal");
const dateInput = document.getElementById("reservation-date");
const today = new Date();


const formattedDate = today.toISOString().split('T')[0];

// Function to show confirmation modal
function showModal() {
    confirmationModal.style.display = "flex";
}

// Function to hide confirmation modal
function closeModal() {
    confirmationModal.style.display = "none";
}



dateInput.setAttribute("min", formattedDate);

// Event listener for form submission
// Prevent default form submission
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); 

    
    let isValid = true;

    const name = document.getElementById("reservation-name").value.trim();
    const email = document.getElementById("reservation-email").value.trim();
    const contactNumber = document.getElementById("reservation-contact").value.trim();
    const bookingDate = document.getElementById("reservation-date").value;
    const partyPax = document.getElementById("reservation-pax").value;
    const timeSlots = document.querySelector('input[name="reservation-time"]:checked');
    today.setHours(0, 0, 0, 0); 
   


    // Validate form fields
    if (name === "" || !isNaN(name)) {
        alert("Please enter your full name.");
        isValid = false;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        isValid = false;
    }

    
    const phonePattern = /^[0-9-+() ]{10,15}$/;
    if (!phonePattern.test(contactNumber)) {
        alert("Please enter a valid contact number.");
        isValid = false;
    }

    
    if (bookingDate === "") {
        alert("Please select a booking date.");
        isValid = false;
    }

    
    if (partyPax === "") {
        alert("Please select the number of people.");
        isValid = false;
    }

    
    if (!timeSlots) {
        alert("Please select a reservation time.");
        isValid = false;
    }

    // Show modal if all fields are valid
    if (isValid) {
        timeSlots.setAttribute("disabled", true);
        showModal();
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith("#")) { 
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
     // Hide/show header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll === 0) {
            
            header.classList.remove('hide-nav', 'scrolled');
        } else if (currentScroll > lastScrollTop) {
            
            header.classList.remove('hide-nav');
            header.classList.add('scrolled');
        } else {
            
            header.classList.add('hide-nav');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});
