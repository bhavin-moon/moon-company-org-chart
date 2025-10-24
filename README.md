## Moon Company Organizational Chart

### Overview
Interactive organizational chart with multiple view modes and filtering capabilities.

### Files
- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `script.js` - Interactive functionality
- `org-data.js` - Employee data structure (template provided)

### Features

#### 3 View Modes:
1. **Senior Management View** - Shows directors and senior managers with department counts
2. **Department View** - Grid view of all departments with filtering by manager
3. **Full Hierarchy View** - Complete organizational structure

#### Interactive Features:
- Click employee cards to see detailed information
- Click department cards to see team details
- Filter departments by senior manager
- Smooth animations and hover effects
- Responsive design for all devices
- Keyboard support (ESC to close modals)

### How to Update Employee Data

The spreadsheet image provided contains the complete employee roster. To update the chart:

#### Method 1: Update HTML Directly

1. Open `index.html`
2. Find the department sections (search for `<!-- Namita's Departments -->`)
3. Update the member lists in each `<div class="dept-members">` section

Example:
```html
<div class="dept-card" data-manager="Namita">
    <div class="dept-header">
        <h3>Tax and Accounts Payable</h3>
        <span class="manager-badge">Manager: Namita</span>
    </div>
    <div class="dept-members">
        <div class="member-item">Employee Name 1</div>
        <div class="member-item">Employee Name 2</div>
        <div class="member-item">Employee Name 3</div>
    </div>
</div>
```

#### Method 2: Use JavaScript Data Structure

1. Open `org-data.js`
2. Update the employee arrays in each department
3. The data structure is organized by senior manager > department > employees array

Example:
```javascript
"Tax and Accounts Payable": [
    "Employee Name 1",
    "Employee Name 2",
    "Employee Name 3"
]
```

### Data Structure from Spreadsheet

Based on the uploaded spreadsheet, the organization has:

**Directors (3):**
- Durga Moondra
- Ratan Moondra
- Ashish Jhagarawat

**Senior Managers (4):**

1. **Namita** - Manages 11-12 departments:
   - Tax and Accounts Payable
   - Banking
   - Accounts
   - DSPF
   - DTAP
   - Admin
   - HR
   - Accounts Receivable
   - GST
   - KPO
   - MPR/QPR/HPR/IEC/RCMC

2. **Radhika** - Manages 7 departments:
   - Approval
   - ROC
   - Billing
   - Contract
   - Quotation
   - Marketing - Business Development
   - Cultural Program Moon

3. **Gyan** - Manages 7 departments:
   - BOE
   - Removal
   - Customs
   - Softex and Export
   - Exit
   - Monitoring
   - APR

4. **Bhavin** - Manages 3 departments:
   - Software
   - Digital Marketing
   - IT Hardware

### To Extract Data from Spreadsheet

1. Open the spreadsheet image in an image viewer
2. For each department, list all employee names
3. Update either the HTML directly or use the org-data.js structure
4. The script will automatically calculate statistics

### Customization

**Colors:**
- Namita's departments: Blue (#3498db)
- Radhika's departments: Red (#e74c3c)
- Gyan's departments: Green (#2ecc71)
- Bhavin's departments: Orange (#f39c12)

To change colors, edit `styles.css`:
```css
.dept-card[data-manager="Namita"] {
    border-left-color: #your-color;
}
```

**Add Search Feature:**
In `script.js`, uncomment line 571:
```javascript
addSearchFeature();
```

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Print Support
Use Ctrl+P or Cmd+P to print. The print view automatically hides controls and optimizes layout.

### Future Enhancements
- [ ] Import employee data from Excel/CSV
- [ ] Export chart as PDF/Image
- [ ] Employee photo upload
- [ ] Department performance metrics
- [ ] Org chart tree view with connecting lines
- [ ] Dark mode toggle
- [ ] Multi-language support

### Support
For questions or issues, refer to the comments in the source code or update the employee data using the template provided.
