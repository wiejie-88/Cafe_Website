document.addEventListener('DOMContentLoaded', () => {
    // Rewards data
    const rewards = [
        { id: 1, title: "Free Coffee", description: "Any size coffee of your choice", points: 100, icon: "☕" },
        { id: 2, title: "Pastry Bundle", description: "Select any 3 pastries", points: 250, icon: "🥐" },
        { id: 3, title: "Premium Bundle", description: "2 premium drinks + 1 sandwich", points: 500, icon: "🥪" }
    ];

    // Activity data
    const defaultActivities = [
        { id: 1, type: "purchase", description: "Purchase at Downtown Store", points: 25, date: "2024-01-15" },
        { id: 2, type: "reward", description: "Redeemed Free Coffee", points: -100, date: "2024-01-10" },
        { id: 3, type: "bonus", description: "Birthday Bonus Points", points: 50, date: "2024-01-01" }
    ];

    // User management
    let currentUser = null;

    function createUser(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            alert('An account with this email already exists.');
            return null;
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            points: 0,
            tier: "Bronze",
            nextTier: "Silver",
            pointsToNext: 50,
            progress: 0,
            activities: []
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return newUser;
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
    }

    function updateUserInfo() {
        if (!currentUser) return;

        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userTier').textContent = `${currentUser.tier} Member`;
        document.getElementById('userPoints').textContent = currentUser.points;
        document.getElementById('currentTier').textContent = currentUser.tier;
        document.getElementById('nextTier').textContent = currentUser.nextTier;
        document.getElementById('pointsToNext').textContent = currentUser.pointsToNext;
        document.getElementById('progressFill').style.width = `${currentUser.progress}%`;

        // Update rewards buttons
        document.querySelectorAll('.reward-button').forEach(button => {
            const points = parseInt(button.textContent.match(/\d+/)[0]);
            button.disabled = false;
        });

        // Update activity history
        updateActivityHistory();
    }

    function updateActivityHistory() {
        const activityList = document.getElementById('activityList');
        activityList.innerHTML = '';
        const activities = currentUser.activities.length > 0 ? currentUser.activities : defaultActivities;
        activities.forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.innerHTML = `
                <div class="activity-info">
                    <p>${activity.description}</p>
                    <p>${new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <div class="activity-points ${activity.points > 0 ? 'positive' : 'negative'}">
                    ${activity.points > 0 ? '+' : ''}${activity.points} pts
                </div>
            `;
            activityList.appendChild(activityElement);
        });
    }

    // Populate rewards
    const rewardsContainer = document.querySelector('.rewards-grid');
    rewards.forEach(reward => {
        const rewardElement = document.createElement('div');
        rewardElement.className = 'reward-card';
        rewardElement.innerHTML = `
            <div class="reward-header">
                <div class="reward-icon">
                    ${reward.icon}
                </div>
                <h3 class="reward-title">${reward.title}</h3>
            </div>
            <p class="reward-description">${reward.description}</p>
            <button class="reward-button" disabled>
                Redeem for ${reward.points} points
            </button>
        `;
        rewardsContainer.appendChild(rewardElement);
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });

    // Settings dropdown
    const settingsButton = document.getElementById('settingsButton');
    const settingsDropdown = document.getElementById('settingsDropdown');

    settingsButton.addEventListener('click', (event) => {
        event.stopPropagation();
        settingsDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', (event) => {
        if (!event.target.closest('.settings-dropdown')) {
            settingsDropdown.classList.remove('show');
        }
    });

    // Profile modal
    const profileModal = document.getElementById('profileModal');
    const profileSettingsButton = document.getElementById('profileSettingsButton');
    const cancelProfileButton = document.getElementById('cancelProfileButton');

    profileSettingsButton.addEventListener('click', () => {
        if (!currentUser) {
            alert('Please log in first.');
            return;
        }
        profileModal.style.display = 'block';
        document.getElementById('name').value = currentUser.name;
        document.getElementById('email').value = currentUser.email;
    });

    cancelProfileButton.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex === -1) return;

        currentUser.name = document.getElementById('name').value;
        currentUser.email = document.getElementById('email').value;
        
        const newPassword = document.getElementById('password').value;
        if (newPassword) {
            currentUser.password = newPassword; 
        }

        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
        updateUserInfo();
        profileModal.style.display = 'none';
        alert('Profile updated successfully!');
    });

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'loyalty.html'; 
    });

    // Check for existing logged in user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInfo();
    }
});