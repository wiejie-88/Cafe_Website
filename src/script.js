// drop down menu 

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu button
    const nav = document.querySelector('nav'); // Navigation menu
    const body = document.body; 

    // Create the close button dynamically
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;'; 
    closeBtn.classList.add('nav-close'); 
    closeBtn.style.display = 'none'; 
    nav.appendChild(closeBtn);

    // Highlight the active menu item
    const currentPath = window.location.pathname.split('/').pop(); 
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute('href').split('/').pop(); 
        if (currentPath === linkPath || (!currentPath && linkPath === 'index.html')) {
            link.classList.add('active'); 
        } else {
            link.classList.remove('active'); 
        }
    });

    // Toggle dropdown menu
    menuToggle.addEventListener('click', function () {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('show');
        body.classList.toggle('no-scroll'); 
        closeBtn.style.display = isExpanded ? 'none' : 'block'; 
    });

    // Close dropdown menu when clicking the "X" button
    closeBtn.addEventListener('click', function () {
        nav.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll'); 
        closeBtn.style.display = 'none'; 
    });

    // Close dropdown menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.classList.remove('no-scroll'); 
            closeBtn.style.display = 'none'; 
        }
    });
});

    //stickty nav bar
    document.addEventListener('DOMContentLoaded', function () {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        window.addEventListener('scroll', function () {
            const currentScroll = document.documentElement.scrollTop;
        
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