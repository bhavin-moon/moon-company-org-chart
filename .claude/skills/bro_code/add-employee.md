# Add Employee Skill

Quick skill to add a single employee to a department.

## Purpose
Streamlined process for adding individual employees to the organizational chart with proper hierarchy and formatting.

## Workflow

### Step 1: Gather Information

Ask the user for:
1. **Employee name** (format: Mr./Miss/Mrs. FirstName FatherName LastName)
2. **Designation** (full title and abbreviation)
3. **Department** (which department to add to)
4. **Hierarchy level** (Senior/Mid/Junior - or infer from title)

### Step 2: Locate Department

Use Grep to find the department in index.html:
```bash
Grep pattern: <h3>Department Name</h3>
```

### Step 3: Add Employee

Insert the new employee HTML in the correct hierarchy section:
```html
<div class="member-item hierarchy-[level]">
    <strong>[Full Name]</strong>
    <span class="designation">[Title] [Abbreviation]</span>
</div>
```

**Hierarchy placement rules:**
- Senior employees go first (hierarchy-senior)
- Mid-level in the middle (hierarchy-mid, indented 10px)
- Junior at the end (hierarchy-junior, indented 20px)

### Step 4: Update Count

1. Count total employees in the department
2. Find the Full Hierarchy badge (search for department name)
3. Update the count: `Dept Name (XX)`

### Step 5: Confirm

Show the user:
```
✅ Added: [Employee Name]
✅ Department: [Dept Name]
✅ Hierarchy: [Senior/Mid/Junior]
✅ New total: [X] employees
```

## Example

**Input:**
- Name: Miss Priyanka Rajendra Patil
- Designation: Assistant Manager [AM]
- Department: KPO
- Hierarchy: Mid

**Output HTML:**
```html
<div class="member-item hierarchy-mid">
    <strong>Miss Priyanka Rajendra Patil</strong>
    <span class="designation">Assistant Manager [AM]</span>
</div>
```

**Update Full Hierarchy:**
```html
<!-- Before -->
<div class="mini-dept" data-dept="kpo" onclick="showDepartmentDetails('KPO', 'Namita')">
    KPO (94)
</div>

<!-- After -->
<div class="mini-dept" data-dept="kpo" onclick="showDepartmentDetails('KPO', 'Namita')">
    KPO (95)
</div>
```

## Notes

- Always preserve exact HTML formatting and indentation
- Verify hierarchy class matches job title
- Ensure designation includes abbreviation in brackets
- Double-check employee count accuracy