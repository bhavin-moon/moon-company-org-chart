# Validate Chart Skill

Run comprehensive validation checks on the organizational chart.

## Purpose
Perform systematic validation of data integrity, consistency, and formatting across all views.

## Validation Checks

### 1. Count Validation

**Process:**
- For each department in Department View, count all `member-item` elements
- Find matching badge in Full Hierarchy view
- Compare counts

**Report format:**
```
📊 DEPARTMENT COUNT VALIDATION
✅ Admin: 4 employees (matches Full Hierarchy)
✅ HR: 4 employees (matches Full Hierarchy)
❌ KPO: 94 employees (Full Hierarchy shows 92) ⚠️ MISMATCH
```

### 2. Hierarchy Class Validation

**Check:**
- All member-items have exactly one hierarchy class
- Valid classes: `hierarchy-senior`, `hierarchy-mid`, `hierarchy-junior`
- No missing or invalid classes

**Report format:**
```
🎯 HIERARCHY CLASS VALIDATION
✅ 280 employees have valid hierarchy classes
❌ 3 employees missing hierarchy class in BOE department:
   - Line 456: John Doe (no hierarchy class)
   - Line 478: Jane Smith (no hierarchy class)
```

### 3. Manager Assignment Validation

**Check:**
- All dept-cards have `data-manager` attribute
- Values are: Namita, Radhika, Gyan, or Bhavin (exact spelling)
- Full Hierarchy onclick handlers reference correct manager

**Report format:**
```
👥 MANAGER ASSIGNMENT VALIDATION
✅ All 24 departments have valid manager assignments
✅ All Full Hierarchy onclick handlers match
❌ 1 department has invalid manager:
   - "Legal" dept has data-manager="Namitha" (should be "Namita")
```

### 4. Designation Format Validation

**Check:**
- All employees have `<span class="designation">` element
- Format: `[Full Title] [Abbreviation]`
- Abbreviation in square brackets

**Report format:**
```
📋 DESIGNATION FORMAT VALIDATION
✅ 275 employees have proper designation format
❌ 5 employees missing abbreviations:
   - KPO: Miss Priya Sharma - "Executive Assistant" (missing [EA])
   - Admin: Mr. Raj Patel - "Manager" (missing abbreviation)
```

### 5. Duplicate Detection

**Check:**
- Scan all employee names across all departments
- Flag potential duplicates (same full name)
- Consider legitimate duplicates if in different departments

**Report format:**
```
🔄 DUPLICATE DETECTION
✅ No duplicate employees found
⚠️ Potential duplicates (verify manually):
   - "Miss Priyanka Patil" appears in KPO (line 567) and Software (line 1234)
   - "Mr. Rahul Sharma" appears in Admin (line 123) and HR (line 789)
```

### 6. Name Format Validation

**Check:**
- Names follow format: `Mr./Miss/Mrs. FirstName [MiddleName] LastName`
- All names start with title (Mr./Miss/Mrs.)
- At least 3 words (Title FirstName LastName)

**Report format:**
```
📝 NAME FORMAT VALIDATION
✅ 278 employees have proper name format
❌ 2 employees with format issues:
   - "Priyanka Patil" (missing Mr./Miss/Mrs.)
   - "Mr. John" (too short, missing last name)
```

## Complete Report Format

```
🔍 ORGANIZATIONAL CHART VALIDATION REPORT
==========================================
Date: 2025-10-26
Total Departments: 24
Total Employees: 280

📊 DEPARTMENT COUNT VALIDATION
[Results here]

🎯 HIERARCHY CLASS VALIDATION
[Results here]

👥 MANAGER ASSIGNMENT VALIDATION
[Results here]

📋 DESIGNATION FORMAT VALIDATION
[Results here]

🔄 DUPLICATE DETECTION
[Results here]

📝 NAME FORMAT VALIDATION
[Results here]

==========================================
SUMMARY:
✅ Passed: [X] checks
⚠️ Warnings: [Y] issues
❌ Failed: [Z] critical issues

Recommendation: [Fix critical issues before deployment / All clear for deployment]
```

## Auto-Fix Option

After reporting, ask user:
```
Would you like me to automatically fix these issues?
1. Fix all (recommended)
2. Fix critical only
3. Manual review
4. Skip fixes
```

If user chooses fix option, use the `fix-formatting` skill.

## Notes

- Run this validation before every deployment
- Some warnings may be acceptable (e.g., legitimate duplicate names)
- Critical issues should be fixed immediately
- Save validation report for records