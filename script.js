// Moon Company Organizational Chart - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    initializeViewSwitcher();
    initializeDepartmentFilter();
    initializeInteractiveElements();
});

// View Switcher Functionality
function initializeViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const views = document.querySelectorAll('.org-chart-view');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');

            // Remove active class from all buttons and views
            viewButtons.forEach(btn => btn.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));

            // Add active class to clicked button and corresponding view
            this.classList.add('active');
            document.getElementById(targetView).classList.add('active');

            // Log view change
            console.log(`Switched to view: ${targetView}`);
        });
    });
}

// Department Filter Functionality
function initializeDepartmentFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const deptCards = document.querySelectorAll('.dept-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter department cards
            deptCards.forEach(card => {
                const cardManager = card.getAttribute('data-manager');

                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    // Animate in
                    card.style.animation = 'slideIn 0.4s ease forwards';
                } else if (cardManager === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'slideIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });

            console.log(`Filtered departments by: ${filterValue}`);
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Employee card interactions
    const employeeCards = document.querySelectorAll('.employee-card, .employee-card-small');

    employeeCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h3, strong');
            const title = this.querySelector('.title, span');

            if (name) {
                showEmployeeInfo(name.textContent, title ? title.textContent : 'Team Member');
            }
        });
    });

    // Department card interactions
    const deptCards = document.querySelectorAll('.dept-card');

    deptCards.forEach(card => {
        card.addEventListener('click', function() {
            const deptName = this.querySelector('.dept-header h3').textContent;
            const manager = this.getAttribute('data-manager');
            const members = this.querySelectorAll('.member-item');

            showDepartmentInfo(deptName, manager, members.length);
        });
    });

    // Mini department badges in full hierarchy view
    const miniDepts = document.querySelectorAll('.mini-dept');

    miniDepts.forEach(dept => {
        dept.addEventListener('click', function(e) {
            e.stopPropagation();
            const deptName = this.textContent;
            showDepartmentQuickInfo(deptName);
        });
    });
}

// Show Employee Information Modal
function showEmployeeInfo(name, title) {
    // Create modal overlay
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <div class="modal-avatar">
                    <div class="avatar-placeholder">${name.substring(0, 2).toUpperCase()}</div>
                </div>
                <h2>${name}</h2>
                <p class="modal-title">${title}</p>
            </div>
            <div class="modal-body">
                <div class="info-section">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> ${name.toLowerCase().replace(' ', '.')}@mooncompany.com</p>
                    <p><strong>Department:</strong> ${title}</p>
                    <p><strong>Location:</strong> Main Office</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="alert('Email functionality would open here')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Send Email
                    </button>
                    <button class="btn-secondary" onclick="alert('Profile view would open here')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    addModalStyles();

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Animate modal in
    setTimeout(() => modal.classList.add('show'), 10);
}

// Show Department Information Modal
function showDepartmentInfo(deptName, manager, memberCount) {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Get detailed employee list from the department card
    const deptCards = document.querySelectorAll('.dept-card');
    let employeeList = '';

    deptCards.forEach(card => {
        const cardDeptName = card.querySelector('.dept-header h3').textContent;
        const cardManager = card.getAttribute('data-manager');

        if (cardDeptName === deptName && cardManager === manager) {
            const members = card.querySelectorAll('.member-item');
            members.forEach(member => {
                const name = member.querySelector('strong')?.textContent || member.textContent;
                const designation = member.querySelector('.designation')?.textContent || '';
                const isSenior = member.classList.contains('hierarchy-senior');
                const isMid = member.classList.contains('hierarchy-mid');
                const isJunior = member.classList.contains('hierarchy-junior');

                let bgColor = '#f8f9fa';
                let marginLeft = '0px';
                let borderColor = '#ddd';

                if (isSenior) {
                    bgColor = '#e8f4f8';
                    borderColor = '#3498db';
                } else if (isMid) {
                    bgColor = '#f8fcff';
                    borderColor = '#5dade2';
                    marginLeft = '10px';
                } else if (isJunior) {
                    bgColor = '#f0f9ff';
                    borderColor = '#95c5de';
                    marginLeft = '20px';
                }

                employeeList += `
                    <div style="padding: 8px; margin: 5px 0; background: ${bgColor}; border-radius: 6px; margin-left: ${marginLeft}; border-left: 4px solid ${borderColor};">
                        <strong style="color: #2c3e50;">${name}</strong>
                        ${designation ? `<br><span style="color: #7f8c8d; font-size: 0.85em; font-style: italic;">${designation}</span>` : ''}
                    </div>
                `;
            });
        }
    });

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <div class="modal-avatar dept-avatar">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </div>
                <h2>${deptName}</h2>
                <p class="modal-title">Department Details</p>
            </div>
            <div class="modal-body">
                <div class="info-section">
                    <h3>Department Information</h3>
                    <p><strong>Manager:</strong> ${manager}</p>
                    <p><strong>Team Size:</strong> ${memberCount} members</p>
                    <p><strong>Status:</strong> <span class="status-active">Active</span></p>
                </div>
                ${employeeList ? `
                <div class="info-section">
                    <h3>Team Members</h3>
                    ${employeeList}
                </div>
                ` : ''}
                <div class="modal-actions">
                    <button class="btn-primary" onclick="alert('Team roster would open here')">
                        View Full Team
                    </button>
                    <button class="btn-secondary" onclick="alert('Department metrics would open here')">
                        View Metrics
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    addModalStyles();

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    setTimeout(() => modal.classList.add('show'), 10);
}

// Show Quick Department Info (for mini badges)
function showDepartmentQuickInfo(deptName) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <strong>${deptName}</strong>
        <p>Click on Department View to see full details</p>
    `;

    document.body.appendChild(toast);

    // Add toast styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
            }
            .toast-notification strong {
                display: block;
                font-size: 1.1em;
                margin-bottom: 5px;
            }
            .toast-notification p {
                margin: 0;
                font-size: 0.9em;
                opacity: 0.9;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Add Modal Styles
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: background 0.3s ease;
        }

        .modal-overlay.show {
            background: rgba(0, 0, 0, 0.7);
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.7);
            opacity: 0;
            transition: all 0.3s ease;
        }

        .modal-overlay.show .modal-content {
            transform: scale(1);
            opacity: 1;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 30px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
            z-index: 10;
            background: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }

        .close-modal:hover {
            color: #e74c3c;
            background: #f8f9fa;
        }

        .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px 30px;
            text-align: center;
            color: white;
            border-radius: 20px 20px 0 0;
        }

        .modal-avatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
        }

        .modal-avatar.dept-avatar {
            border-radius: 15px;
        }

        .modal-avatar .avatar-placeholder {
            color: white;
            font-weight: bold;
            font-size: 1.5em;
        }

        .modal-header h2 {
            color: white;
            margin-bottom: 5px;
            font-size: 1.8em;
        }

        .modal-header .modal-title {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1em;
        }

        .modal-body {
            padding: 30px;
        }

        .info-section {
            margin-bottom: 25px;
        }

        .info-section h3 {
            color: #2c3e50;
            font-size: 1.2em;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }

        .info-section p {
            color: #555;
            margin: 10px 0;
            font-size: 0.95em;
        }

        .info-section strong {
            color: #2c3e50;
            font-weight: 600;
        }

        .status-active {
            color: #2ecc71;
            font-weight: 600;
        }

        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 25px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.95em;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .btn-secondary:hover {
            background: #667eea;
            color: white;
        }

        .btn-primary svg,
        .btn-secondary svg {
            width: 16px;
            height: 16px;
        }
    `;
    document.head.appendChild(style);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    const modal = document.querySelector('.modal-overlay');

    if (e.key === 'Escape' && modal) {
        modal.remove();
    }
});

// Print Functionality
function printChart() {
    window.print();
}

// Export Statistics
function getOrganizationStats() {
    const stats = {
        directors: 3,
        seniorManagers: 4,
        departments: document.querySelectorAll('.dept-card').length,
        totalEmployees: 40,
        managersBreakdown: {
            Namita: 11,
            Radhika: 7,
            Gyan: 7,
            Bhavin: 3
        }
    };

    console.table(stats);
    return stats;
}

// Search Functionality (Optional Enhancement)
function addSearchFeature() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search employees or departments...';
    searchInput.className = 'search-input';

    const style = document.createElement('style');
    style.textContent = `
        .search-input {
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 1em;
            margin: 20px auto;
            display: block;
            transition: all 0.3s ease;
        }
        .search-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .highlight {
            background: yellow;
            padding: 2px 4px;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);

    document.querySelector('header').appendChild(searchInput);

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const allCards = document.querySelectorAll('.employee-card, .dept-card, .employee-card-small');

        allCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                card.style.opacity = '1';
                card.style.display = '';
            } else {
                card.style.opacity = '0.3';
            }
        });
    });
}

// Initialize search (uncomment to enable)
// addSearchFeature();

// Helper function for showing department details from Full Hierarchy view
function showDepartmentDetails(deptName, manager) {
    // Find the department card
    const deptCards = document.querySelectorAll('.dept-card');
    let memberCount = 0;

    deptCards.forEach(card => {
        const cardDeptName = card.querySelector('.dept-header h3').textContent;
        const cardManager = card.getAttribute('data-manager');

        if (cardDeptName === deptName && cardManager === manager) {
            memberCount = card.querySelectorAll('.member-item').length;
        }
    });

    // Call the existing showDepartmentInfo function
    showDepartmentInfo(deptName, manager, memberCount);
}

// Make function globally available
window.showDepartmentDetails = showDepartmentDetails;

console.log('Moon Company Organizational Chart loaded successfully!');
console.log('Use getOrganizationStats() to view organization statistics');
