document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality
    const mainImage = document.querySelector('.gallery-main img');
    const thumbnails = document.querySelectorAll('.thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.querySelector('img').src;

            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quantity controls
    const quantityInput = document.querySelector('.quantity input');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Prevent manual input of invalid quantities
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 99) {
            this.value = 99;
        }
    });

    // Add to cart functionality
    const addToCartForm = document.querySelector('.add-to-cart-form');
    addToCartForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const quantity = parseInt(quantityInput.value);
        const productName = document.querySelector('h1').textContent;
        const price = document.querySelector('.price').textContent;

        console.log('Adding to cart:', {
            product: productName,
            quantity: quantity,
            price: price
        });
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${quantity}x ${productName} added to cart`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const panelId = button.dataset.tab;
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === panelId) {
                    panel.classList.add('active');
                }
            });
        });
    });
});

// Add dynamic styles for cart notification
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 15px 25px;
        border-radius: 4px;
        font-family: 'Jost', sans-serif;
        animation: slideIn 0.3s ease-out forwards;
        z-index: 1000;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);