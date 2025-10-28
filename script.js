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

// Generate Department Tree View
function generateDepartmentTreeView(deptName, seniorEmployees, midEmployees, juniorEmployees) {
    if (seniorEmployees.length === 0 && midEmployees.length === 0 && juniorEmployees.length === 0) {
        return '';
    }

    let treeHTML = '<div class="mini-tree-view">';
    treeHTML += '<svg class="mini-tree-svg" id="mini-tree-svg"></svg>';

    // Department node at top
    treeHTML += `
        <div class="mini-tree-level">
            <div class="mini-tree-node dept-node-root">
                <div class="mini-node-name">${deptName}</div>
                <div class="mini-node-count">${seniorEmployees.length + midEmployees.length + juniorEmployees.length} employees</div>
            </div>
        </div>
    `;

    // Senior employees level
    if (seniorEmployees.length > 0) {
        treeHTML += '<div class="mini-tree-level">';
        seniorEmployees.forEach((emp, idx) => {
            treeHTML += `
                <div class="mini-tree-node mini-node-senior" data-level="senior" data-idx="${idx}">
                    <div class="mini-node-name">${emp.name}</div>
                    <div class="mini-node-title">${emp.designation}</div>
                </div>
            `;
        });
        treeHTML += '</div>';
    }

    // Mid-level employees
    if (midEmployees.length > 0) {
        treeHTML += '<div class="mini-tree-level">';
        midEmployees.forEach((emp, idx) => {
            treeHTML += `
                <div class="mini-tree-node mini-node-mid" data-level="mid" data-idx="${idx}">
                    <div class="mini-node-name">${emp.name}</div>
                    <div class="mini-node-title">${emp.designation}</div>
                </div>
            `;
        });
        treeHTML += '</div>';
    }

    // Junior employees
    if (juniorEmployees.length > 0) {
        treeHTML += '<div class="mini-tree-level">';
        juniorEmployees.forEach((emp, idx) => {
            treeHTML += `
                <div class="mini-tree-node mini-node-junior" data-level="junior" data-idx="${idx}">
                    <div class="mini-node-name">${emp.name}</div>
                    <div class="mini-node-title">${emp.designation}</div>
                </div>
            `;
        });
        treeHTML += '</div>';
    }

    treeHTML += '</div>';

    // Schedule connector drawing after modal is rendered
    setTimeout(() => drawMiniTreeConnectors(), 100);

    return treeHTML;
}

// Draw connectors for mini tree view in modal
function drawMiniTreeConnectors() {
    const svg = document.getElementById('mini-tree-svg');
    if (!svg) return;

    svg.innerHTML = '';

    const container = svg.closest('.mini-tree-view');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    // Set SVG size
    svg.setAttribute('width', container.scrollWidth);
    svg.setAttribute('height', container.scrollHeight);

    const levels = container.querySelectorAll('.mini-tree-level');
    if (levels.length < 2) return;

    // Connect department node to first level
    const deptNode = levels[0].querySelector('.dept-node-root');
    const firstLevelNodes = levels[1].querySelectorAll('.mini-tree-node');

    if (deptNode && firstLevelNodes.length > 0) {
        const deptRect = deptNode.getBoundingClientRect();
        const deptCenterX = (deptRect.left + deptRect.right) / 2 - containerRect.left;
        const deptBottomY = deptRect.bottom - containerRect.top;

        // Get first and last node of first level
        const firstNodeRect = firstLevelNodes[0].getBoundingClientRect();
        const lastNodeRect = firstLevelNodes[firstLevelNodes.length - 1].getBoundingClientRect();

        const firstNodeX = (firstNodeRect.left + firstNodeRect.right) / 2 - containerRect.left;
        const lastNodeX = (lastNodeRect.left + lastNodeRect.right) / 2 - containerRect.left;
        const firstLevelTopY = firstNodeRect.top - containerRect.top;

        const midY = deptBottomY + 30;

        // Vertical line from dept
        drawMiniLine(svg, deptCenterX, deptBottomY, deptCenterX, midY, 'mini-connector-main');

        // Horizontal distributor
        drawMiniLine(svg, firstNodeX, midY, lastNodeX, midY, 'mini-connector-main');

        // Vertical lines to each node
        firstLevelNodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            const nodeCenterX = (nodeRect.left + nodeRect.right) / 2 - containerRect.left;
            const nodeTopY = nodeRect.top - containerRect.top;

            const level = node.getAttribute('data-level');
            const className = level === 'senior' ? 'mini-connector-senior' :
                            level === 'mid' ? 'mini-connector-mid' : 'mini-connector-junior';

            drawMiniLine(svg, nodeCenterX, midY, nodeCenterX, nodeTopY, className);
        });
    }

    // Connect between hierarchy levels if there are more levels
    for (let i = 1; i < levels.length - 1; i++) {
        const currentLevelNodes = levels[i].querySelectorAll('.mini-tree-node');
        const nextLevelNodes = levels[i + 1].querySelectorAll('.mini-tree-node');

        if (currentLevelNodes.length > 0 && nextLevelNodes.length > 0) {
            const currentRect = currentLevelNodes[Math.floor(currentLevelNodes.length / 2)].getBoundingClientRect();
            const currentCenterX = (currentRect.left + currentRect.right) / 2 - containerRect.left;
            const currentBottomY = currentRect.bottom - containerRect.top;

            const firstNextRect = nextLevelNodes[0].getBoundingClientRect();
            const lastNextRect = nextLevelNodes[nextLevelNodes.length - 1].getBoundingClientRect();

            const firstNextX = (firstNextRect.left + firstNextRect.right) / 2 - containerRect.left;
            const lastNextX = (lastNextRect.left + lastNextRect.right) / 2 - containerRect.left;

            const midY = currentBottomY + 30;

            // Vertical line from current level
            drawMiniLine(svg, currentCenterX, currentBottomY, currentCenterX, midY, 'mini-connector-secondary');

            // Horizontal distributor
            drawMiniLine(svg, firstNextX, midY, lastNextX, midY, 'mini-connector-secondary');

            // Lines to next level nodes
            nextLevelNodes.forEach(node => {
                const nodeRect = node.getBoundingClientRect();
                const nodeCenterX = (nodeRect.left + nodeRect.right) / 2 - containerRect.left;
                const nodeTopY = nodeRect.top - containerRect.top;

                const level = node.getAttribute('data-level');
                const className = level === 'mid' ? 'mini-connector-mid' : 'mini-connector-junior';

                drawMiniLine(svg, nodeCenterX, midY, nodeCenterX, nodeTopY, className);
            });
        }
    }
}

function drawMiniLine(svg, x1, y1, x2, y2, className) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', `mini-connector ${className}`);
    svg.appendChild(line);
}

// Show Department Information Modal with Tree Hierarchy
function showDepartmentInfo(deptName, manager, memberCount) {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Get detailed employee list from the department card and organize by hierarchy
    const deptCards = document.querySelectorAll('.dept-card');
    let seniorEmployees = [];
    let midEmployees = [];
    let juniorEmployees = [];

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

                const employee = { name, designation };

                if (isSenior) {
                    seniorEmployees.push(employee);
                } else if (isMid) {
                    midEmployees.push(employee);
                } else if (isJunior) {
                    juniorEmployees.push(employee);
                }
            });
        }
    });

    // Generate mini tree view HTML
    const employeeTreeHTML = generateDepartmentTreeView(deptName, seniorEmployees, midEmployees, juniorEmployees);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-content-wide">
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
                <p class="modal-title">Department Hierarchy Tree</p>
            </div>
            <div class="modal-body">
                <div class="info-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div>
                            <p><strong>Manager:</strong> ${manager}</p>
                            <p><strong>Team Size:</strong> ${memberCount} members</p>
                        </div>
                        <div style="text-align: right; font-size: 0.85em;">
                            <div style="margin-bottom: 5px;"><span style="display: inline-block; width: 12px; height: 12px; background: #e8f4f8; border: 2px solid #3498db; border-radius: 3px; margin-right: 5px;"></span>Senior</div>
                            <div style="margin-bottom: 5px;"><span style="display: inline-block; width: 12px; height: 12px; background: #f8fcff; border: 2px solid #5dade2; border-radius: 3px; margin-right: 5px;"></span>Mid-Level</div>
                            <div><span style="display: inline-block; width: 12px; height: 12px; background: #f0f9ff; border: 2px solid #95c5de; border-radius: 3px; margin-right: 5px;"></span>Junior</div>
                        </div>
                    </div>
                </div>
                ${employeeTreeHTML ? `
                <div class="dept-tree-container">
                    ${employeeTreeHTML}
                </div>
                ` : '<p style="text-align: center; color: #999; padding: 20px;">No employees in this department</p>'}
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

        /* Mini Tree View in Modals */
        .modal-content-wide {
            max-width: 900px;
            width: 95%;
        }

        .dept-tree-container {
            padding: 20px 0;
            background: #f9fafb;
            border-radius: 12px;
            margin-top: 20px;
        }

        .mini-tree-view {
            position: relative;
            padding: 30px 20px;
            min-height: 300px;
            overflow-x: auto;
        }

        .mini-tree-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .mini-tree-level {
            position: relative;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 70px;
            z-index: 2;
        }

        .mini-tree-node {
            position: relative;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 16px;
            min-width: 160px;
            max-width: 200px;
            text-align: center;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease;
            z-index: 2;
        }

        .mini-tree-node:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .dept-node-root {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #667eea;
            border-left-width: 4px;
            min-width: 220px;
            font-weight: 600;
        }

        .mini-node-senior {
            background: linear-gradient(135deg, #e8f4f8 0%, #d4e9f2 100%);
            border-color: #3498db;
            border-left-width: 4px;
        }

        .mini-node-mid {
            background: linear-gradient(135deg, #f8fcff 0%, #eaf5fb 100%);
            border-color: #5dade2;
            border-left-width: 4px;
        }

        .mini-node-junior {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-color: #95c5de;
            border-left-width: 4px;
        }

        .mini-node-name {
            font-size: 0.9em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 4px;
            line-height: 1.3;
            word-wrap: break-word;
        }

        .mini-node-title {
            font-size: 0.75em;
            color: #7f8c8d;
            font-style: italic;
            line-height: 1.2;
        }

        .mini-node-count {
            font-size: 0.8em;
            color: #667eea;
            font-weight: 500;
            margin-top: 4px;
        }

        /* Mini Tree Connectors */
        .mini-connector {
            stroke-width: 2;
            fill: none;
            opacity: 0.7;
        }

        .mini-connector-main {
            stroke: #667eea;
            stroke-width: 2.5;
        }

        .mini-connector-senior {
            stroke: #3498db;
            stroke-width: 2;
        }

        .mini-connector-mid {
            stroke: #5dade2;
            stroke-width: 2;
        }

        .mini-connector-junior {
            stroke: #95c5de;
            stroke-width: 1.5;
        }

        .mini-connector-secondary {
            stroke: #d1d5db;
            stroke-width: 2;
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

// Tree View Functionality
let treeZoom = 1;
const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;

function initializeTreeView() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        if (button.getAttribute('data-view') === 'tree-view') {
            button.addEventListener('click', function() {
                generateTreeView();
            });
        }
    });
}

function generateTreeView() {
    const container = document.getElementById('tree-container');
    if (!container || container.innerHTML.trim() !== '<!-- Tree structure will be generated by JavaScript -->') {
        return; // Already generated
    }

    // Extract all data from Department View
    const orgData = extractOrganizationalData();

    // Build tree HTML
    let treeHTML = '<svg class="tree-svg" id="tree-svg"></svg>';

    // Level 1: Directors
    treeHTML += '<div class="tree-level level-directors" id="directors-level">';
    treeHTML += `
        <div class="tree-node node-director" data-id="director-1">
            <div class="tree-node-name">Durga Moondra</div>
            <div class="tree-node-title">Founder & Director</div>
        </div>
        <div class="tree-node node-director" data-id="director-2">
            <div class="tree-node-name">Ratan Moondra</div>
            <div class="tree-node-title">Co-Founder & Director</div>
        </div>
        <div class="tree-node node-director" data-id="director-3">
            <div class="tree-node-name">Ashish Jhagarawat</div>
            <div class="tree-node-title">Director</div>
        </div>
    `;
    treeHTML += '</div>';

    // Level 2: Senior Managers
    treeHTML += '<div class="tree-level level-managers" id="managers-level">';
    orgData.managers.forEach((manager, idx) => {
        treeHTML += `
            <div class="tree-node node-manager" data-id="manager-${idx}" data-manager="${manager.name}">
                <div class="tree-node-name">${manager.name}</div>
                <div class="tree-node-title">Senior Manager</div>
                <div class="tree-node-count">${manager.departments.length} Depts</div>
            </div>
        `;
    });
    treeHTML += '</div>';

    // Level 3 & 4: Departments and Employees (organized by manager in sections)
    orgData.managers.forEach((manager, mgrIdx) => {
        const managerClass = `manager-${manager.name.toLowerCase()}`;

        treeHTML += `<div class="manager-section" id="section-${mgrIdx}">`;
        treeHTML += `<div class="manager-departments">`;

        manager.departments.forEach((dept, deptIdx) => {
            const deptId = `dept-${mgrIdx}-${deptIdx}`;

            treeHTML += `<div class="dept-group ${managerClass}">`;
            treeHTML += `
                <div class="tree-node node-department" data-id="${deptId}" data-manager="${manager.name}">
                    <div class="tree-node-name">${dept.name}</div>
                    <div class="tree-node-count">${dept.employees.length} people</div>
                </div>
            `;

            // Employees under this department
            treeHTML += `<div class="dept-employees" id="${deptId}-employees">`;
            dept.employees.forEach((emp, empIdx) => {
                const nodeClass = emp.hierarchy === 'senior' ? 'node-senior' :
                                 emp.hierarchy === 'mid' ? 'node-mid' : 'node-junior';
                treeHTML += `
                    <div class="tree-node ${nodeClass}" data-id="${deptId}-emp-${empIdx}">
                        <div class="tree-node-name">${emp.name}</div>
                        <div class="tree-node-title">${emp.designation || ''}</div>
                    </div>
                `;
            });
            treeHTML += '</div>'; // dept-employees
            treeHTML += '</div>'; // dept-group
        });

        treeHTML += '</div>'; // manager-departments
        treeHTML += '</div>'; // manager-section
    });

    container.innerHTML = treeHTML;

    // Add click handlers for collapsible departments
    setTimeout(() => {
        addDepartmentCollapseHandlers();
        // Start with all departments collapsed for cleaner view
        collapseAllDepartments();
        drawTreeConnectors();
    }, 100);
}

function extractOrganizationalData() {
    const data = {
        managers: [
            { name: 'Namita', departments: [] },
            { name: 'Radhika', departments: [] },
            { name: 'Gyan', departments: [] },
            { name: 'Bhavin', departments: [] }
        ]
    };

    // Extract from Department View cards
    const deptCards = document.querySelectorAll('.dept-card');

    deptCards.forEach(card => {
        const managerName = card.getAttribute('data-manager');
        const deptName = card.querySelector('.dept-header h3')?.textContent.trim();

        if (!managerName || !deptName) return;

        const employees = [];
        const memberItems = card.querySelectorAll('.member-item');

        memberItems.forEach(item => {
            const name = item.querySelector('strong')?.textContent.trim() || item.textContent.trim();
            const designation = item.querySelector('.designation')?.textContent.trim() || '';

            let hierarchy = 'junior';
            if (item.classList.contains('hierarchy-senior')) hierarchy = 'senior';
            else if (item.classList.contains('hierarchy-mid')) hierarchy = 'mid';

            employees.push({ name, designation, hierarchy });
        });

        // Find the manager and add department
        const manager = data.managers.find(m => m.name === managerName);
        if (manager) {
            manager.departments.push({ name: deptName, employees });
        }
    });

    return data;
}

function drawTreeConnectors() {
    const svg = document.getElementById('tree-svg');
    if (!svg) return;

    // Clear existing lines
    svg.innerHTML = '';

    const container = document.getElementById('tree-container');
    const containerRect = container.getBoundingClientRect();

    // Set SVG size
    svg.setAttribute('width', container.scrollWidth);
    svg.setAttribute('height', container.scrollHeight);

    // Connect Directors to Managers (single vertical line to horizontal distributor)
    const directorsLevel = document.getElementById('directors-level');
    const managersLevel = document.getElementById('managers-level');

    if (directorsLevel && managersLevel) {
        const directorsRect = directorsLevel.getBoundingClientRect();
        const managersRect = managersLevel.getBoundingClientRect();
        const managerNodes = managersLevel.querySelectorAll('.tree-node');

        // Center point below directors
        const directorsCenterX = (directorsRect.left + directorsRect.right) / 2 - containerRect.left;
        const directorsBottomY = directorsRect.bottom - containerRect.top;

        // Midpoint Y for horizontal distributor
        const midY = directorsBottomY + 40;

        // Draw vertical line from directors down
        drawStraightLine(svg, directorsCenterX, directorsBottomY, directorsCenterX, midY, 'line-director');

        if (managerNodes.length > 0) {
            const firstManagerRect = managerNodes[0].getBoundingClientRect();
            const lastManagerRect = managerNodes[managerNodes.length - 1].getBoundingClientRect();

            const firstManagerX = (firstManagerRect.left + firstManagerRect.right) / 2 - containerRect.left;
            const lastManagerX = (lastManagerRect.left + lastManagerRect.right) / 2 - containerRect.left;

            // Draw horizontal distributor line
            drawStraightLine(svg, firstManagerX, midY, lastManagerX, midY, 'line-director');

            // Draw vertical lines down to each manager
            managerNodes.forEach(managerNode => {
                const managerRect = managerNode.getBoundingClientRect();
                const managerCenterX = (managerRect.left + managerRect.right) / 2 - containerRect.left;
                const managerTopY = managerRect.top - containerRect.top;

                drawStraightLine(svg, managerCenterX, midY, managerCenterX, managerTopY, 'line-manager');
            });
        }
    }

    // Connect Managers to their Departments (grouped by manager)
    const managerNodes = document.querySelectorAll('.tree-node.node-manager');

    managerNodes.forEach((managerNode, idx) => {
        const managerName = managerNode.getAttribute('data-manager');
        const managerRect = managerNode.getBoundingClientRect();
        const managerCenterX = (managerRect.left + managerRect.right) / 2 - containerRect.left;
        const managerBottomY = managerRect.bottom - containerRect.top;

        const managerSection = document.getElementById(`section-${idx}`);
        if (!managerSection) return;

        const deptNodes = managerSection.querySelectorAll('.tree-node.node-department');
        if (deptNodes.length === 0) return;

        // Midpoint Y for horizontal distributor
        const firstDeptRect = deptNodes[0].getBoundingClientRect();
        const deptTopY = firstDeptRect.top - containerRect.top;
        const midY = managerBottomY + (deptTopY - managerBottomY) / 2;

        // Draw vertical line from manager down
        drawStraightLine(svg, managerCenterX, managerBottomY, managerCenterX, midY, 'line-manager');

        // Get leftmost and rightmost department
        const firstDeptX = (firstDeptRect.left + firstDeptRect.right) / 2 - containerRect.left;
        const lastDeptRect = deptNodes[deptNodes.length - 1].getBoundingClientRect();
        const lastDeptX = (lastDeptRect.left + lastDeptRect.right) / 2 - containerRect.left;

        // Draw horizontal distributor line
        drawStraightLine(svg, Math.min(firstDeptX, lastDeptX), midY, Math.max(firstDeptX, lastDeptX), midY, 'line-department');

        // Draw vertical lines to each department
        deptNodes.forEach(deptNode => {
            const deptRect = deptNode.getBoundingClientRect();
            const deptCenterX = (deptRect.left + deptRect.right) / 2 - containerRect.left;
            const deptTopY = deptRect.top - containerRect.top;

            drawStraightLine(svg, deptCenterX, midY, deptCenterX, deptTopY, 'line-department');

            // Only draw employee connections if department is expanded
            if (!deptNode.classList.contains('collapsed')) {
                const deptId = deptNode.getAttribute('data-id');
                const employeesContainer = document.getElementById(`${deptId}-employees`);

                if (employeesContainer && !employeesContainer.classList.contains('collapsed')) {
                    const empNodes = employeesContainer.querySelectorAll('.tree-node');
                    if (empNodes.length === 0) return;

                    const deptBottomY = deptRect.bottom - containerRect.top;

                    // Simple vertical lines to employees (no horizontal distributor for employees)
                    empNodes.forEach(empNode => {
                        const empRect = empNode.getBoundingClientRect();
                        const empCenterX = (empRect.left + empRect.right) / 2 - containerRect.left;
                        const empTopY = empRect.top - containerRect.top;

                        drawStraightLine(svg, deptCenterX, deptBottomY, empCenterX, empTopY, 'line-employee');
                    });
                }
            }
        });
    });
}

function drawStraightLine(svg, x1, y1, x2, y2, className) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', `connector-line ${className}`);
    svg.appendChild(line);
}

function drawPath(svg, x1, y1, x2, y2, className) {
    // Draw a path with a bend in the middle
    const midY = (y1 + y2) / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;

    path.setAttribute('d', d);
    path.setAttribute('class', `connector-line ${className}`);

    svg.appendChild(path);
}

// Department Collapse/Expand Functions
function addDepartmentCollapseHandlers() {
    const deptNodes = document.querySelectorAll('.tree-node.node-department');

    deptNodes.forEach(deptNode => {
        deptNode.addEventListener('click', function() {
            toggleDepartmentCollapse(this);
        });
    });
}

function toggleDepartmentCollapse(deptNode) {
    const deptId = deptNode.getAttribute('data-id');
    const employeesContainer = document.getElementById(`${deptId}-employees`);

    if (employeesContainer) {
        employeesContainer.classList.toggle('collapsed');
        deptNode.classList.toggle('collapsed');

        // Redraw connectors after toggle
        setTimeout(() => {
            drawTreeConnectors();
        }, 350);
    }
}

function collapseAllDepartments() {
    const deptNodes = document.querySelectorAll('.tree-node.node-department');

    deptNodes.forEach(deptNode => {
        const deptId = deptNode.getAttribute('data-id');
        const employeesContainer = document.getElementById(`${deptId}-employees`);

        if (employeesContainer) {
            employeesContainer.classList.add('collapsed');
            deptNode.classList.add('collapsed');
        }
    });
}

function expandAllDepartments() {
    const deptNodes = document.querySelectorAll('.tree-node.node-department');

    deptNodes.forEach(deptNode => {
        const deptId = deptNode.getAttribute('data-id');
        const employeesContainer = document.getElementById(`${deptId}-employees`);

        if (employeesContainer) {
            employeesContainer.classList.remove('collapsed');
            deptNode.classList.remove('collapsed');
        }
    });

    // Redraw connectors after expanding all
    setTimeout(() => {
        drawTreeConnectors();
    }, 350);
}

// Zoom Functions
function zoomIn() {
    if (treeZoom < MAX_ZOOM) {
        treeZoom += ZOOM_STEP;
        applyZoom();
    }
}

function zoomOut() {
    if (treeZoom > MIN_ZOOM) {
        treeZoom -= ZOOM_STEP;
        applyZoom();
    }
}

function resetZoom() {
    treeZoom = 1;
    applyZoom();
}

function applyZoom() {
    const container = document.getElementById('tree-container');
    if (container) {
        container.style.transform = `scale(${treeZoom})`;
        container.style.transformOrigin = 'top center';

        // Redraw connectors after zoom
        setTimeout(() => {
            drawTreeConnectors();
        }, 50);
    }
}

// Initialize tree view on load
document.addEventListener('DOMContentLoaded', function() {
    initializeTreeView();
});

// Redraw connectors on window resize
window.addEventListener('resize', function() {
    const treeView = document.getElementById('tree-view');
    if (treeView && treeView.classList.contains('active')) {
        drawTreeConnectors();
    }
});
