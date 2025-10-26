# Skills Configuration

Custom skills for Moon Company Organizational Chart development.

## add-employee

**Purpose**: Quick skill to add a single employee to a department

**Usage**: `/skill add-employee`

**Instructions**:
You are adding a single employee to the organizational chart. Follow this streamlined process:

### Step 1: Gather Information

Ask the user:
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

### Step 4: Update Count

1. Count total employees in the department
2. Find the Full Hierarchy badge (search for department name)
3. Update the count: `Dept Name (XX)`

### Step 5: Confirm

Show the user:
- ✅ Added: [Employee Name]
- ✅ Department: [Dept Name]
- ✅ Hierarchy: [Senior/Mid/Junior]
- ✅ New total: [X] employees

---

## add-department

**Purpose**: Add a complete new department to the organizational chart

**Usage**: `/skill add-department`

**Instructions**:
You are creating a new department in the organizational chart.

### Step 1: Gather Information

Ask the user:
1. **Department name** (e.g., "Legal & Compliance")
2. **Manager** (Namita, Radhika, Gyan, or Bhavin)
3. **Employee list** (names, titles, hierarchy levels)

### Step 2: Determine Placement

Based on manager, insert after similar departments:
- **Namita**: After other Namita departments (Blue sections)
- **Radhika**: After other Radhika departments (Red sections)
- **Gyan**: After other Gyan departments (Green sections)
- **Bhavin**: After other Bhavin departments (Orange sections)

### Step 3: Create Department Card

```html
<div class="dept-card" data-manager="[Manager]">
    <div class="dept-header">
        <h3>[Department Name]</h3>
        <span class="manager-badge">Manager: [Manager]</span>
    </div>
    <div class="dept-members">
        <!-- Add all employees here with hierarchy classes -->
    </div>
</div>
```

### Step 4: Add to Full Hierarchy

Find the manager's section in Full Hierarchy view and add:
```html
<div class="mini-dept" data-dept="[deptid]" onclick="showDepartmentDetails('[Dept Name]', '[Manager]')">
    [Dept Name] ([Count])
</div>
```

### Step 5: Update Senior Management View

Update the department count display for the manager:
```html
<div class="dept-count">[X] Departments</div>
```

### Step 6: Confirm

Show the user:
- ✅ Created: [Department Name]
- ✅ Manager: [Manager Name]
- ✅ Employees: [X] total ([Y] Senior, [Z] Mid, [W] Junior)
- ✅ Updated Full Hierarchy and Senior Management views

---

## validate-chart

**Purpose**: Run validation checks on the organizational chart

**Usage**: `/skill validate-chart`

**Instructions**:
Perform comprehensive validation of the organizational chart data.

### Validation Steps

1. **Count Validation**
   - For each department in Department View, count employees
   - Find matching badge in Full Hierarchy
   - Compare counts and report mismatches

2. **Hierarchy Validation**
   - Check all member-items have hierarchy class
   - Verify classes are: hierarchy-senior, hierarchy-mid, or hierarchy-junior
   - Report any missing or invalid classes

3. **Manager Validation**
   - Check all dept-cards have data-manager attribute
   - Verify values are: Namita, Radhika, Gyan, or Bhavin
   - Ensure Full Hierarchy onclick handlers match

4. **Designation Validation**
   - Check all employees have designation spans
   - Verify format: "[Title] [Abbreviation]"
   - Report missing abbreviations

5. **Duplicate Detection**
   - Scan for duplicate employee names
   - Report potential duplicates with locations

### Output Report

Provide structured report:
```
🔍 ORGANIZATIONAL CHART VALIDATION REPORT
==========================================

📊 DEPARTMENT COUNT VALIDATION
✅ Admin: 4 employees (matches Full Hierarchy)
✅ HR: 4 employees (matches Full Hierarchy)
❌ KPO: 94 employees (Full Hierarchy shows 92) ⚠️ MISMATCH

🎯 HIERARCHY CLASS VALIDATION
✅ All 280 employees have hierarchy classes
❌ 3 employees missing hierarchy class in BOE department

👥 MANAGER ASSIGNMENT VALIDATION
✅ All departments assigned to valid managers
✅ All Full Hierarchy references correct

📋 DESIGNATION FORMAT VALIDATION
✅ 275 employees have proper designation format
❌ 5 employees missing abbreviations (see details below)

🔄 DUPLICATE DETECTION
⚠️ Potential duplicate: "Miss Priyanka Patil" (KPO, Software)

==========================================
SUMMARY: [X] issues found - [Y] critical, [Z] warnings
```

### Auto-Fix Option

After reporting, ask: "Would you like me to fix these issues automatically?"

---

## update-counts

**Purpose**: Synchronize employee counts between Department View and Full Hierarchy

**Usage**: `/skill update-counts`

**Instructions**:
You are synchronizing employee counts across the organizational chart.

### Process

1. **For each department in Department View**:
   - Count all `member-item` elements inside `dept-members`
   - Extract department name from `<h3>` tag
   - Extract manager from `data-manager` attribute

2. **Find matching Full Hierarchy badge**:
   - Search for department name in Full Hierarchy section
   - Locate the `<div class="mini-dept">` with matching name

3. **Update the count**:
   - Replace the number in parentheses: `Dept Name (XX)`

4. **Report changes**:
```
🔄 EMPLOYEE COUNT UPDATE REPORT
================================
✅ Admin: 4 employees (no change)
🔄 KPO: Updated 92 → 94 employees
🔄 Software: Updated 15 → 17 employees
✅ HR: 4 employees (no change)
================================
Updated 2 departments
```

### Edge Cases

- If department exists in Department View but not in Full Hierarchy, create badge
- If department exists in Full Hierarchy but not in Department View, flag for review
- If department name doesn't match exactly, suggest correction

---

## export-data

**Purpose**: Export employee data in various formats (CSV, JSON, Markdown)

**Usage**: `/skill export-data`

**Instructions**:
Extract employee data from index.html and export in requested format.

### Step 1: Extract Data

Parse index.html and extract:
- Department name
- Manager
- Employee full name
- Designation
- Hierarchy level

### Step 2: Format Options

**CSV Format**:
```csv
Department,Manager,Employee Name,Designation,Hierarchy Level
Admin,Namita,Miss Pooja Sharma,Executive Assistant [EA],Mid
Admin,Namita,Mr. Rahul Patil,Office Manager [OM],Senior
```

**JSON Format**:
```json
{
  "departments": [
    {
      "name": "Admin",
      "manager": "Namita",
      "employees": [
        {
          "name": "Miss Pooja Sharma",
          "designation": "Executive Assistant",
          "abbreviation": "EA",
          "hierarchy": "mid"
        }
      ]
    }
  ]
}
```

**Markdown Format**:
```markdown
# Moon Company Organizational Chart Data

## Admin Department
**Manager**: Namita
**Total Employees**: 4

### Senior Staff
- Mr. Rahul Patil - Office Manager [OM]

### Mid-Level Staff
- Miss Pooja Sharma - Executive Assistant [EA]
```

### Step 3: Save File

Create file with appropriate extension and provide download path.

### Step 4: Statistics

Include summary:
- Total employees: [X]
- Total departments: [Y]
- By manager: Namita ([A]), Radhika ([B]), Gyan ([C]), Bhavin ([D])
- By hierarchy: Senior ([E]), Mid ([F]), Junior ([G])

---

## import-data

**Purpose**: Import employee data from external sources (CSV, Excel, images)

**Usage**: `/skill import-data`

**Instructions**:
Import structured employee data and convert to organizational chart HTML.

### Supported Formats

1. **CSV/Excel** - Columns: Department, Manager, Name, Designation, Hierarchy
2. **Images/Screenshots** - Extract via OCR/visual analysis
3. **Structured text** - Parse formatted lists

### Import Process

1. **Read source data**
2. **Validate structure** (required fields present)
3. **Group by department and manager**
4. **Sort by hierarchy** (Senior → Mid → Junior)
5. **Generate HTML** for Department View
6. **Generate HTML** for Full Hierarchy badges
7. **Preview changes** before applying

### Validation Before Import

- Check for duplicate employees
- Validate manager names (must be: Namita, Radhika, Gyan, Bhavin)
- Verify hierarchy levels (Senior, Mid, Junior)
- Ensure designations have abbreviations

### Output

Provide:
1. **Summary**: "Ready to import [X] employees across [Y] departments"
2. **Preview**: Show first 5 employees
3. **Confirmation**: "Proceed with import? (yes/no)"
4. **On confirm**: Apply changes to index.html and update counts

---

## fix-formatting

**Purpose**: Fix common formatting issues in employee data

**Usage**: `/skill fix-formatting`

**Instructions**:
Scan and fix formatting inconsistencies in the organizational chart.

### Issues to Fix

1. **Missing Abbreviations**
   - Find designations without brackets: `Executive Assistant`
   - Suggest abbreviation: `Executive Assistant [EA]`

2. **Inconsistent Name Format**
   - Fix: `Priyanka Patil` → `Miss Priyanka [Father] Patil`
   - Ask user for missing middle names

3. **Wrong Hierarchy Classes**
   - Trainee with hierarchy-mid → should be hierarchy-junior
   - Deputy Manager with hierarchy-junior → should be hierarchy-senior

4. **Missing Hierarchy Classes**
   - `<div class="member-item">` without hierarchy class
   - Infer from designation and apply

5. **Whitespace/Indentation**
   - Fix inconsistent HTML indentation
   - Remove trailing spaces

### Auto-Fix Rules

- **Trainee** → hierarchy-junior
- **Deputy Manager, Senior [anything]** → hierarchy-senior
- **Manager, Executive** → hierarchy-mid
- **Missing Mr./Miss/Mrs.** → Ask user for gender

### Report

```
🔧 FORMATTING FIX REPORT
========================
✅ Fixed 12 missing abbreviations
✅ Corrected 5 hierarchy class assignments
✅ Standardized 8 employee name formats
⚠️ 3 employees need manual review (missing middle names)
========================
Total fixes applied: 25
```
