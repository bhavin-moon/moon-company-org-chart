# Add Department Skill

Add a complete new department to the organizational chart.

## Purpose
Create a new department with all associated employees, proper manager assignment, and integration into all three views.

## Workflow

### Step 1: Gather Information

Ask the user:
1. **Department name** (e.g., "Legal & Compliance")
2. **Manager** (Namita, Radhika, Gyan, or Bhavin)
3. **Employee list** with:
   - Full names
   - Designations
   - Hierarchy levels

### Step 2: Determine Placement

Insert department based on manager:
- **Namita** (Blue): After other Namita departments
- **Radhika** (Red): After other Radhika departments
- **Gyan** (Green): After other Gyan departments
- **Bhavin** (Orange): After other Bhavin departments

### Step 3: Create Department Card (Department View)

```html
<div class="dept-card" data-manager="[Manager]">
    <div class="dept-header">
        <h3>[Department Name]</h3>
        <span class="manager-badge">Manager: [Manager]</span>
    </div>
    <div class="dept-members">
        <!-- Senior employees first -->
        <div class="member-item hierarchy-senior">
            <strong>[Full Name]</strong>
            <span class="designation">[Title] [Abbrev]</span>
        </div>

        <!-- Mid-level employees -->
        <div class="member-item hierarchy-mid">
            <strong>[Full Name]</strong>
            <span class="designation">[Title] [Abbrev]</span>
        </div>

        <!-- Junior employees -->
        <div class="member-item hierarchy-junior">
            <strong>[Full Name]</strong>
            <span class="designation">[Title] [Abbrev]</span>
        </div>
    </div>
</div>
```

### Step 4: Add to Full Hierarchy

Find the manager's section in Full Hierarchy view and add badge:
```html
<div class="mini-dept" data-dept="[deptid]" onclick="showDepartmentDetails('[Dept Name]', '[Manager]')">
    [Dept Name] ([Count])
</div>
```

**Important:**
- `data-dept` should be lowercase, no spaces (e.g., "legalcompliance")
- `[Count]` is total employee count in parentheses

### Step 5: Update Senior Management View

Find the manager's section and update department count:
```html
<div class="dept-count">[X] Departments</div>
```

Count all departments under that manager and update the number.

### Step 6: Verify Color Coding

Department card should automatically inherit manager's color:
- Namita: Blue (#3498db)
- Radhika: Red (#e74c3c)
- Gyan: Green (#2ecc71)
- Bhavin: Orange (#f39c12)

This is handled by CSS: `.dept-card[data-manager="Namita"]`

### Step 7: Confirm

Provide summary:
```
✅ Created: [Department Name]
✅ Manager: [Manager Name]
✅ Employees: [X] total
   - [Y] Senior
   - [Z] Mid-level
   - [W] Junior
✅ Updated Full Hierarchy
✅ Updated Senior Management view ([X] departments)
```

## Example

**Input:**
- Department: Quality Assurance
- Manager: Bhavin
- Employees:
  - Mr. Amit Kumar Sharma - Quality Manager [QM] (Senior)
  - Miss Neha Patil - QA Analyst [QAA] (Mid)
  - Miss Pooja Singh - QA Trainee [QAT] (Junior)

**Department Card Output:**
```html
<div class="dept-card" data-manager="Bhavin">
    <div class="dept-header">
        <h3>Quality Assurance</h3>
        <span class="manager-badge">Manager: Bhavin</span>
    </div>
    <div class="dept-members">
        <div class="member-item hierarchy-senior">
            <strong>Mr. Amit Kumar Sharma</strong>
            <span class="designation">Quality Manager [QM]</span>
        </div>
        <div class="member-item hierarchy-mid">
            <strong>Miss Neha Patil</strong>
            <span class="designation">QA Analyst [QAA]</span>
        </div>
        <div class="member-item hierarchy-junior">
            <strong>Miss Pooja Singh</strong>
            <span class="designation">QA Trainee [QAT]</span>
        </div>
    </div>
</div>
```

**Full Hierarchy Badge:**
```html
<div class="mini-dept" data-dept="qa" onclick="showDepartmentDetails('Quality Assurance', 'Bhavin')">
    Quality Assurance (3)
</div>
```

## Notes

- Always sort employees by hierarchy: Senior → Mid → Junior
- Use consistent naming format for all employees
- Verify onclick handler has exact department name and correct manager
- Test the Full Hierarchy badge click to ensure modal displays correctly