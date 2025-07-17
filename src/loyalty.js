const membershipTiers = [
    { name: 'Bronze', points: '0-50', perks: ['5% off every 5th visit'] },
    { name: 'Silver', points: '51-150', perks: ['10% off every 5th visit', 'Free size upgrade monthly'] },
    { name: 'Gold', points: '151-300', perks: ['15% off every 5th visit', 'Free size upgrade weekly', 'Priority queue'] },
    { name: 'Platinum', points: '301+', perks: ['20% off every 5th visit', 'Free size upgrade on every visit', 'Exclusive tasting events'] },
];

const faqs = [
    { q: "How do I check my points balance?", a: "Sign in to your account on our website or mobile app to view your current points balance." },
    { q: "Do my points expire?", a: "Points are valid for 12 months from the date of earning." },
    { q: "Can I transfer my points to someone else?", a: "Points are non-transferable and can only be used by the account holder." },
    { q: "How do I redeem my rewards?", a: "You can redeem rewards at the counter or through our mobile app when placing an order." },
];

function renderMembershipTiers() {
    const tiersContainer = document.getElementById('membership-tiers');
    membershipTiers.forEach(tier => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="font-weight: bold; color: #795548; margin-right: 0.5rem;">${tier.name}:</span>
            <div>
                <p>${tier.points} points</p>
                <ul style="list-style-type: disc; padding-left: 1.5rem; font-size: 0.875rem; color: #666;">
                    ${tier.perks.map(perk => `<li>${perk}</li>`).join('')}
                </ul>
            </div>
        `;
        tiersContainer.appendChild(li);
    });
}

function renderFAQs() {
    const faqContainer = document.getElementById('faq-list');
    faqs.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <p class="faq-question">${faq.q}</p>
            <p class="faq-answer">${faq.a}</p>
        `;
        faqContainer.appendChild(div);
    });
}

function setActiveTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });

    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

// User management
const users = JSON.parse(localStorage.getItem('users')) || [];

function createUser(name, email, password) {
    const user = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, never store plain text passwords
        points: 0,
        tier: 'Bronze',
        activities: [],
        notifications: true,
        joinDate: new Date().toISOString()
    };
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
}

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    renderMembershipTiers();
    renderFAQs();

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => setActiveTab(tab.dataset.tab));
    });

    document.getElementById('join-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('join-name').value;
        const email = document.getElementById('join-email').value;
        const password = document.getElementById('join-password').value;
        
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }
        
        const user = createUser(name, email, password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'account.html';
    });

    document.getElementById('signin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        const user = login(email, password);
        if (user) {
            window.location.href = 'account.html';
        } else {
            alert('Invalid email or password');
        }
    });

    const faqBar = document.getElementById('faq-bar');
    const faqContent = document.getElementById('faq-content');
    const faqArrow = document.querySelector('.faq-arrow');
    faqBar.addEventListener('click', () => {
        faqContent.classList.toggle('active');
        faqArrow.style.transform = faqContent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});