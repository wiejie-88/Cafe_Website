document.addEventListener('DOMContentLoaded', function () {
    const videos = [
        document.getElementById('video1'),
        document.getElementById('video2'),
        document.getElementById('video3')
    ];

    const captions = [
        document.getElementById('caption1'),
        document.getElementById('caption2'),
        document.getElementById('caption3')
    ];
    
    let currentVideoIndex = 0;
    const videoIntervalTime = 4000;

    function shuffleVideos() {
        // Hide all videos and captions
        videos.forEach((video, index) => {
            video.style.display = 'none';
            captions[index].style.opacity = '0'; 
        });
        
        // Display the current video and its corresponding caption
        videos[currentVideoIndex].style.display = 'block';
        captions[currentVideoIndex].style.opacity = '1';
    
        // Move to the next video in sequence
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    }

    // Start video and caption shuffle
    setInterval(shuffleVideos, videoIntervalTime);
    shuffleVideos(); 

    // Smooth scroll for internal links
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

    window.goToShopPage = function() {
        window.location.href = "shop.html";
    };
    
    window.previewProduct = function(button) {
        const productUrl = button.getAttribute("data-url");
        if (productUrl) {
            window.location.href = productUrl;
        } else {
            console.error("Product URL not specified for this item.");
        }
    };

    // Product Carousel (Top Sellers Section)
    const carouselItems = document.querySelector('.carousel-items');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const intervalTime = 5000; 
    let currentIndex = 0;
    let autoScroll;

    // Clone the first and last few items for seamless looping
    const visibleItems = 4;
    const totalItems = items.length;

    // Clone first few items and append at the end
    for (let i = 0; i < visibleItems; i++) {
        const clone = items[i].cloneNode(true);
        carouselItems.appendChild(clone);
    }

    // Clone last few items and prepend at the beginning
    for (let i = totalItems - visibleItems; i < totalItems; i++) {
        const clone = items[i].cloneNode(true);
        carouselItems.insertBefore(clone, carouselItems.firstChild);
    }

    // Calculate item width including margin
    function getItemWidth() {
        return items[0].offsetWidth + 20; 
    }

    // Set initial position to show the first original item
    carouselItems.style.transform = `translateX(-${visibleItems * getItemWidth()}px)`;
    currentIndex = visibleItems;

    // Function to update the carousel's position based on the current index
    function updateCarousel() {
        carouselItems.style.transition = 'transform 0.8s ease';
        carouselItems.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
    }

    // Reset carousel position without animation for seamless looping
    function resetCarousel() {
        carouselItems.style.transition = 'none';
        carouselItems.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
    }

    // Move to the next item with looping effect
    function nextItem() {
        currentIndex++;
        updateCarousel();

        if (currentIndex >= totalItems + visibleItems) {
            setTimeout(() => {
                currentIndex = visibleItems; 
                resetCarousel();
            }, 800);
        }
    }

    // Move to the previous item with looping effect
    function prevItem() {
        currentIndex--;
        updateCarousel();
    
        if (currentIndex < visibleItems) {
            setTimeout(() => {
                currentIndex = totalItems + visibleItems - 1;
                resetCarousel();
            }, 800);
        }
    }

    function startAutoScroll() {
        autoScroll = setInterval(nextItem, intervalTime);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Event listeners for carousel control buttons
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        prevItem();
        startAutoScroll(); 
    });

    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        nextItem();
        startAutoScroll(); 
    });

    startAutoScroll();

    // Testimonials Section - Show one testimonial at a time
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;

    function showTestimonial(index) {
        // Hide all testimonials and remove active class from all dots
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            dots[i].classList.remove('active');
        });

        // Show the current testimonial and add active class to the corresponding dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    // Automatically shuffle testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Initial display for testimonials
    showTestimonial(currentTestimonialIndex);

    // Newsletter Popup Functionality
    setTimeout(() => {
        document.getElementById('newsletterPopup').style.display = 'flex';
    }, 5000);

    // Function to close the popup
    function closePopup() {
        document.getElementById('newsletterPopup').style.display = 'none';
    }

    // Add event listener for newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    const popupText = document.querySelector('.popup-text');
    const thankYouMessage = document.createElement('div');
    thankYouMessage.innerHTML = `
        <h2>Thank You for Subscribing!</h2>
        <p>You will now receive exclusive offers, brewing tips, and cafe updates straight to your inbox.</p>
    `;
    thankYouMessage.style.textAlign = 'center'; 

    // Hide the newsletter form and show the Thank You message
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Replace the form with the Thank You message
        popupText.innerHTML = '';
        popupText.appendChild(thankYouMessage);

        setTimeout(() => {
            closePopup();
        }, 3000);
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            alert(productName + ' added to cart!');
        });
    });

    window.addToCart = function() {
        alert("Added to cart");
    };

    window.goToShopPage = function() {
        window.location.href = "shop.html";
    };

    window.previewProduct = function(button) {
        const productUrl = button.getAttribute("data-url");
        if (productUrl) {
            window.location.href = productUrl;
        } else {
            console.error("Product URL not specified for this item.");
        }
    };
});

function closePopup() {
    document.getElementById('newsletterPopup').style.display = 'none';
}

    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const priceSlider = document.getElementById('priceSlider');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const applyFilterBtn = document.getElementById('applyFilter');

    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    priceSlider.addEventListener('input', function () {
        minPrice.textContent = '$' + this.value;
    });

    applyFilterBtn.addEventListener('click', function () {
        const selectedPrice = parseInt(priceSlider.value);
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const priceText = card.querySelector('.price').textContent.replace('$', '');
            const productPrice = parseInt(priceText);

            if (productPrice <= selectedPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    