const searchBar = document.querySelector("#search-bar");
const sidebarButtons = document.querySelectorAll('.btn-category');
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const overlay = document.querySelector('#overlay');

document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for internal links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith("#")) { // Only prevent default for section links
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event listener to toggle the sticky class on the navbar
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll === 0) {
            // At the top of the page - show navbar without background
            header.classList.remove('hide-nav', 'scrolled');
        } else if (currentScroll > lastScrollTop) {
            // Scroll down - show navbar with background
            header.classList.remove('hide-nav');
            header.classList.add('scrolled');
        } else {
            // Scroll up - hide navbar
            header.classList.add('hide-nav');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});


searchBar.addEventListener("input", (e) => {
    e.preventDefault();
    const searchQuery = searchBar.value.toLowerCase();

    // If search bar is null, set to coffee category
    if (searchQuery === '') {
        cards.forEach((card) => {
            if (card.classList.contains("coffee")) {
                card.classList.add("show");
            }
            else {
                card.classList.remove('show');
            }
        })

        sidebarButtons.forEach((button) => {
            if (button.id == "coffee") {
                button.classList.add("active");
            }
            else {
                button.classList.remove('active');
            }
        })
    } else {
        resetActiveButtons();
        cards.forEach((card) => {
            const productName = card.querySelector(".product-name").innerHTML.toLowerCase();
            if (productName.indexOf(searchQuery) !== -1) {
                card.classList.add("show");
            } else {
                card.classList.remove("show");
            }
        })
    }
})

searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        e.preventDefault();
})

// Show items by category
sidebarButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        resetActiveButtons(); // Remove active class from all buttons
        button.classList.add('active'); // Add active class to the clicked button
        cards.forEach((card) => {
            if (card.classList.contains(e.target.id)) {
                card.classList.add('show');
            }
            else {
                card.classList.remove('show');
            }

        })
    })
})

// Trigger popout modal
cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        modals.forEach((modal) => {
            if (modal.classList.contains(card.id)) {
                modal.classList.add('show');
                overlay.classList.add('show');
            }
        })
    })
})

// Close popout modal (Close when clicking overlay area)
overlay.addEventListener("click", () => {
    modals.forEach((modal) => {
        modal.classList.remove("show");
        overlay.classList.remove("show");
    })
})


// Remove the 'active' class from all buttons
function resetActiveButtons() {
    sidebarButtons.forEach((button) => {
        button.classList.remove('active');
    });
}
