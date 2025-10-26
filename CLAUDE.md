# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static HTML-based organizational chart** for Moon Company displaying 280+ employees across 24 departments. It's a **pure frontend application** with no build process, dependencies, or backend - just open `index.html` in a browser.

**Repository**: https://github.com/bhavin-moon/moon-company-org-chart
**Deployment**: GitHub Pages (static hosting)

## Running the Application

```bash
# No build process needed - just open the file
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

Or use any local web server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Architecture

### Core Files (No bundler/transpiler)
- **index.html** - Complete application with embedded employee data (3,981 lines)
- **styles.css** - All styling including 3-tier hierarchy colors and scrollable lists
- **script.js** - Vanilla JavaScript for view switching, filtering, and modals

### Three View Modes (Toggled via buttons in header)
1. **Senior Management View** (`#senior-management`) - Directors + 4 senior managers with department counts
2. **Department View** (`#department-view`) - Grid of department cards, filterable by manager
3. **Full Hierarchy View** (`#full-hierarchy`) - Complete org structure with clickable department badges

### Data Architecture

Employee data is **hardcoded directly in index.html** within department cards. The structure is:

```html
<div class="dept-card" data-manager="Namita|Radhika|Gyan|Bhavin">
    <div class="dept-header">
        <h3>Department Name</h3>
        <span class="manager-badge">Manager: [Name]</span>
    </div>
    <div class="dept-members">
        <!-- Employee items with hierarchy classes -->
        <div class="member-item hierarchy-senior">
            <strong>Full Name</strong>
            <span class="designation">Title [Abbreviation]</span>
        </div>
        <div class="member-item hierarchy-mid">...</div>
        <div class="member-item hierarchy-junior">...</div>
    </div>
</div>
```

**CRITICAL**: Employee data is NOT in `org-data.js` - that's just a template. All actual data lives in `index.html` in three places:
1. Department View section (lines ~150-1400)
2. Full Hierarchy View badges (lines ~1550-1700)
3. Modal generation happens dynamically from Department View data

### 3-Tier Hierarchy System

**CSS Classes** (with visual indentation and color coding):
- `hierarchy-senior` - Dark blue, no indent (Deputy Managers, Senior Executives)
- `hierarchy-mid` - Medium blue, 10px indent (Managers, Executives)
- `hierarchy-junior` - Light blue, 20px indent (Trainees, Junior staff)

**Color Coding by Manager**:
- Namita: Blue (#3498db) - 12 departments
- Radhika: Red (#e74c3c) - 6 departments
- Gyan: Green (#2ecc71) - 7 departments
- Bhavin: Orange (#f39c12) - 3 departments

### Scrollable Department Lists

Large departments (like KPO with 94 members) have scrollable member lists:
```css
.dept-members {
    max-height: 400px;
    overflow-y: auto;
}
```

## Adding/Updating Employees

### Method 1: Update Department View (Primary)

1. **Find the department** in `index.html` (search for department name)
2. **Add member items** inside `<div class="dept-members">`:
```html
<div class="member-item hierarchy-senior">
    <strong>Mr./Miss/Mrs. [Full Name with Father's Name]</strong>
    <span class="designation">[Full Title] [Abbreviation]</span>
</div>
```

3. **Update the Full Hierarchy badge** employee count (search for department name in Full Hierarchy section):
```html
<div class="mini-dept" data-dept="deptname" onclick="showDepartmentDetails('Dept Name', 'Manager')">
    Dept Name (XX)  <!-- Update count here -->
</div>
```

### Method 2: Add New Department

1. **In Department View section**, add after similar manager's departments:
```html
<div class="dept-card" data-manager="Namita">
    <div class="dept-header">
        <h3>New Department Name</h3>
        <span class="manager-badge">Manager: Namita</span>
    </div>
    <div class="dept-members">
        <!-- Add members -->
    </div>
</div>
```

2. **In Full Hierarchy section**, add badge under correct manager:
```html
<div class="mini-dept" data-dept="newdept" onclick="showDepartmentDetails('New Department Name', 'Namita')">
    New Dept (X)
</div>
```

### Naming Conventions

**Employee names**: Always full format with father's name
- Format: `Mr./Miss/Mrs. [FirstName] [FatherName] [LastName]`
- Example: `Miss Priyanka Rajendra Patil`

**Designations**: Include full title + abbreviation in brackets
- Format: `[Full Title] [Abbreviation]`
- Example: `Deputy Manager [DM]`, `Senior SEZ Executive [Sr. SEZE]`

## Key JavaScript Functions

### `showDepartmentDetails(deptName, managerName)`
Called when clicking department badges in Full Hierarchy view. Dynamically generates modal by:
1. Finding matching `dept-card` in Department View
2. Extracting all `member-item` elements
3. Building modal HTML preserving hierarchy styling

### `initializeDepartmentFilter()`
Powers the filter buttons in Department View using `data-manager` attribute matching.

### `initializeViewSwitcher()`
Toggles visibility between three view containers using `.active` class.

## Modal System

Modals are dynamically generated (not pre-rendered). When clicking:
- **Employee cards**: Shows basic name + title
- **Department cards**: Shows full scrollable employee list with hierarchy preserved
- **Full Hierarchy badges**: Fetches data from Department View section

Close modals via:
- Click close button
- Click outside modal
- Press ESC key

## Git Workflow

The repository is already pushed to GitHub. To deploy updates:

```bash
# Make your changes to index.html, styles.css, or script.js
git add .
git commit -m "Update: [description]"
git push origin main
```

GitHub Pages auto-deploys from `main` branch within 2-3 minutes.

## Important Constraints

1. **No external dependencies** - Pure HTML/CSS/JS only
2. **Data lives in HTML** - Not in separate JSON/JS files
3. **Static site** - No server-side processing, no API calls
4. **Maintain hierarchy classes** - Critical for visual structure
5. **Keep department counts updated** - Manually sync between Department View and Full Hierarchy badges
6. **Scrollable lists** - Max height 400px prevents page overflow

## Common Tasks

### Update employee count for a department
1. Count members in Department View `<div class="dept-members">`
2. Update number in Full Hierarchy badge: `DeptName (XX)`

### Change manager colors
Edit in `styles.css`:
```css
.dept-card[data-manager="Namita"] { border-left-color: #newcolor; }
```

### Add new hierarchy tier
Would require new CSS class + updating all affected HTML sections. Current 3-tier system is hardcoded.

## File You Can Ignore

- `org-data.js` - Template only, not used by application
- `data-input-helper.html` - Helper tool, not part of main app
- `.claude/` - Claude Code settings
- `Forms - organizational flowchart and Task us tracker.md` - Source data reference

## Testing

No automated tests. Manual testing checklist:
1. Open `index.html` in browser
2. Toggle between 3 view modes - verify switching works
3. Click filter buttons in Department View - verify filtering
4. Click department badges in Full Hierarchy - verify modals show correct data with hierarchy
5. Verify scrollable lists work for large departments (KPO, DSPF, Software)
6. Test ESC key closes modals
7. Test responsive design at different screen widths