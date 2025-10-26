# Update Counts Skill

Synchronize employee counts between Department View and Full Hierarchy.

## Purpose
Ensure employee counts displayed in Full Hierarchy badges match the actual number of employees in Department View.

## Process

### Step 1: Scan Department View

For each `dept-card`:
1. Extract department name from `<h3>` tag
2. Extract manager from `data-manager` attribute
3. Count all `<div class="member-item">` elements inside `<div class="dept-members">`

### Step 2: Find Full Hierarchy Badge

Search Full Hierarchy section for:
```html
<div class="mini-dept" ... onclick="showDepartmentDetails('[Dept Name]', '[Manager]')">
```

Match by department name in the onclick attribute.

### Step 3: Update Count

Replace the number in parentheses:
```html
<!-- Before -->
Dept Name (92)

<!-- After -->
Dept Name (94)
```

### Step 4: Report Changes

Track all updates and display summary.

## Output Report Format

```
🔄 EMPLOYEE COUNT UPDATE REPORT
================================
Date: 2025-10-26
Departments scanned: 24

✅ Admin: 4 employees (no change)
✅ HR: 4 employees (no change)
🔄 KPO: Updated 92 → 94 employees
🔄 Software: Updated 15 → 17 employees
🔄 Approval: Updated 18 → 19 employees
✅ Billing: 9 employees (no change)
... [all departments]

================================
Summary:
- Departments checked: 24
- Counts updated: 3
- Counts unchanged: 21
- Total employees: 280
```

## Edge Cases

### Department Exists in Dept View but Not in Full Hierarchy

**Action:** Create new badge
```html
<div class="mini-dept" data-dept="[id]" onclick="showDepartmentDetails('[Dept Name]', '[Manager]')">
    [Dept Name] ([Count])
</div>
```

**Warning:**
```
⚠️ New department badge created for "[Dept Name]"
Please verify placement in Full Hierarchy under [Manager]'s section.
```

### Department Exists in Full Hierarchy but Not in Dept View

**Action:** Flag for review
```
❌ Orphaned badge found: "[Dept Name]" ([Count])
This department has a Full Hierarchy badge but no Department View card.
Recommend: Remove badge or create dept-card.
```

### Department Name Mismatch

**Action:** Suggest correction
```
⚠️ Name mismatch detected:
Dept View: "KPO (Knowledge Process Outsourcing)"
Full Hierarchy: "KPO"
These may be the same department. Please verify.
```

## Algorithm

```javascript
// Pseudocode
for each dept-card in Department View:
    dept_name = extract from <h3>
    manager = extract from data-manager
    count = count member-items

    find badge in Full Hierarchy where:
        onclick contains dept_name AND manager

    if badge found:
        current_count = extract number from badge
        if current_count != count:
            update badge with new count
            log change
    else:
        warn about missing badge

end for

display report
```

## Usage Example

**Before:**
```html
<!-- Department View -->
<div class="dept-card" data-manager="Namita">
    <h3>KPO</h3>
    <div class="dept-members">
        <!-- 94 member-items -->
    </div>
</div>

<!-- Full Hierarchy -->
<div class="mini-dept" onclick="showDepartmentDetails('KPO', 'Namita')">
    KPO (92)
</div>
```

**After:**
```html
<!-- Full Hierarchy -->
<div class="mini-dept" onclick="showDepartmentDetails('KPO', 'Namita')">
    KPO (94)  <!-- Updated -->
</div>
```

## Notes

- Run this after bulk employee additions/removals
- Always verify count accuracy manually for large departments
- If counts are off by more than 10, double-check for missing hierarchy classes
- This skill does NOT modify Department View, only Full Hierarchy badges