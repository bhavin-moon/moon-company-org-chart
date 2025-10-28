# Data Quality Issues - Detailed Inventory

## Issues by Category

---

## Category 1: Placeholder/Incomplete Data (6 entries)

### Issue #1: Manager Mishra Duplicate
- **Location:** Lines 153-154 in index.html (Tax and Accounts Payable department)
- **Current HTML:**
  ```html
  <div class="member-item">Manager Mishra</div>
  <div class="member-item">Manager Mishra</div>
  ```
- **Problems:**
  - No hierarchy class (required: hierarchy-senior/mid/junior)
  - No strong tag for name
  - No designation span
  - Duplicate entry (appears twice)
  - No father's name
- **Severity:** HIGH
- **Fix Type:** Replace with actual employee data
- **Suggested Action:**
  - Either add real employee data with proper format
  - Or replace with: `<div class="member-item hierarchy-mid"><strong>Mr. [FirstName] [FatherName] Mishra</strong><span class="designation">[Title] [Abbr]</span></div>`

---

### Issue #2: Incomplete Name "Vaishali"
- **Location:** Line 164 in index.html (Banking department)
- **Current HTML:**
  ```html
  <div class="member-item">Vaishali</div>
  ```
- **Problems:**
  - No hierarchy class
  - No strong tag
  - No designation
  - Missing father's name
  - Only first name provided
- **Severity:** MEDIUM
- **Potential Match:** Might be same person as "Mr. Vaishali Shrikant Kapure" (line 175 in Accounts)
- **Fix Type:** Complete information
- **Suggested Action:**
  ```html
  <div class="member-item hierarchy-mid">
    <strong>Mr. Vaishali Shrikant Kapure</strong>
    <span class="designation">Executive Accounts [EA]</span>
  </div>
  ```

---

### Issue #3: Incomplete Name "Pradnya Shelar"
- **Location:** Line 503 in index.html (Accounts Receivable department)
- **Current HTML:**
  ```html
  <div class="member-item">Pradnya Shelar</div>
  ```
- **Problems:**
  - No hierarchy class
  - No strong tag
  - No designation
  - Missing father's name
  - Incomplete format
- **Severity:** MEDIUM
- **Potential Match:** Same person as "Miss Pradnya Gautam Shelar" (line 187 in Accounts dept with designation "Executive Assistant [EA]")
- **Fix Type:** Complete information
- **Suggested Action:**
  ```html
  <div class="member-item hierarchy-mid">
    <strong>Miss Pradnya Gautam Shelar</strong>
    <span class="designation">Executive Assistant [EA]</span>
  </div>
  ```
- **Note:** This may be a duplicate entry in different department - verify if same person or different

---

## Category 2: Empty Departments with Placeholders (5 departments)

### Issue #4: ROC Department Empty
- **Location:** Lines 1065-1073 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Radhika">
    <div class="dept-header">
      <h3>ROC</h3>
      <span class="manager-badge">Manager: Radhika</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:**
  - Only placeholder text "Team Members"
  - No actual employee records
  - Cannot generate meaningful modal
  - Tree view will skip this department
- **Severity:** MEDIUM
- **Impact:** Incomplete organizational data
- **Fix Type:** Add employee data or remove department

---

### Issue #5: Quotation Department Empty
- **Location:** Lines 1165-1173 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Radhika">
    <div class="dept-header">
      <h3>Quotation</h3>
      <span class="manager-badge">Manager: Radhika</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:** (Same as ROC)
- **Severity:** MEDIUM

---

### Issue #6: Cultural Program Moon Department Empty
- **Location:** Lines 1192-1200 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Radhika">
    <div class="dept-header">
      <h3>Cultural Program Moon</h3>
      <span class="manager-badge">Manager: Radhika</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:** (Same as ROC)
- **Severity:** MEDIUM

---

### Issue #7: Exit Department Empty
- **Location:** Lines 1395-1403 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Gyan">
    <div class="dept-header">
      <h3>Exit</h3>
      <span class="manager-badge">Manager: Gyan</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:** (Same as ROC)
- **Severity:** MEDIUM

---

### Issue #8: Monitoring Department Empty
- **Location:** Lines 1405-1413 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Gyan">
    <div class="dept-header">
      <h3>Monitoring</h3>
      <span class="manager-badge">Manager: Gyan</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:** (Same as ROC)
- **Severity:** MEDIUM

---

### Issue #9: IT Hardware Department Empty
- **Location:** Lines 1527-1535 in index.html
- **Current HTML:**
  ```html
  <div class="dept-card" data-manager="Bhavin">
    <div class="dept-header">
      <h3>IT Hardware</h3>
      <span class="manager-badge">Manager: Bhavin</span>
    </div>
    <div class="dept-members">
      <div class="member-item">Team Members</div>
    </div>
  </div>
  ```
- **Problems:** (Same as ROC)
- **Severity:** MEDIUM

---

## Category 3: Full Hierarchy View Synchronization Issues (7 issues)

### Issue #10: KPO Badge Count Mismatch
- **Location:** Line 1608 in index.html (Full Hierarchy View section)
- **Current HTML:**
  ```html
  <div class="mini-dept" data-dept="kpo" onclick="showDepartmentDetails('KPO (Knowledge Process Outsourcing)', 'Namita')">
    KPO (94)
  </div>
  ```
- **Badge Count:** 94
- **Actual Department View Count:** 75
- **Discrepancy:** -19 employees
- **Severity:** HIGH
- **Impact:** User sees wrong employee count, data inconsistency
- **Fix:** Change `(94)` to `(75)`

---

### Issue #11: Tax & Accounts Payable Badge Missing
- **Location:** Full Hierarchy View section, Namita's division (around line 1583)
- **Current Status:** No mini-dept badge exists
- **Department View Count:** 10 employees (2 "Manager Mishra" + placeholder cruft)
- **Actual Employees:** Should have at least 8+ after cleanup
- **Severity:** MEDIUM
- **Fix:** Add badge:
  ```html
  <div class="mini-dept" data-dept="tax-ap" onclick="showDepartmentDetails('Tax and Accounts Payable', 'Namita')">
    Tax & AP (10)
  </div>
  ```

---

### Issue #12: Banking Badge Missing
- **Location:** Full Hierarchy View section, Namita's division (around line 1583-1584)
- **Current Status:** No mini-dept badge exists
- **Department View Count:** 1 employee (Vaishali - incomplete)
- **Severity:** MEDIUM
- **Fix:** Add badge:
  ```html
  <div class="mini-dept" data-dept="banking" onclick="showDepartmentDetails('Banking', 'Namita')">
    Banking (1)
  </div>
  ```

---

### Issue #13: Accounts Receivable Badge Missing
- **Location:** Full Hierarchy View section, Namita's division
- **Current Status:** Only placeholder text exists (line 1600): `<div class="mini-dept">AR</div>`
- **Department View Count:** 1 employee (Pradnya Shelar - incomplete)
- **Severity:** MEDIUM
- **Fix:** Update existing badge to clickable:
  ```html
  <div class="mini-dept" data-dept="ar" onclick="showDepartmentDetails('Accounts Receivable', 'Namita')">
    AR (1)
  </div>
  ```

---

### Issue #14: Tax & AP Badge Not Clickable
- **Location:** Line 1583 in Full Hierarchy View
- **Current HTML:**
  ```html
  <div class="mini-dept">Tax & AP</div>
  ```
- **Missing Attributes:**
  - No `data-dept` attribute
  - No `onclick` handler
  - No employee count in parentheses
- **Severity:** MEDIUM
- **Fix:** Add attributes:
  ```html
  <div class="mini-dept" data-dept="tax-ap" onclick="showDepartmentDetails('Tax and Accounts Payable', 'Namita')">
    Tax & AP (10)
  </div>
  ```

---

### Issue #15: Banking Badge Not Clickable
- **Location:** Line 1584 in Full Hierarchy View
- **Current HTML:**
  ```html
  <div class="mini-dept">Banking</div>
  ```
- **Missing Attributes:**
  - No `data-dept` attribute
  - No `onclick` handler
  - No employee count in parentheses
- **Severity:** MEDIUM
- **Fix:** Add attributes:
  ```html
  <div class="mini-dept" data-dept="banking" onclick="showDepartmentDetails('Banking', 'Namita')">
    Banking (1)
  </div>
  ```

---

### Issue #16: ROC Badge Not Clickable
- **Location:** Line 1626 in Full Hierarchy View
- **Current HTML:**
  ```html
  <div class="mini-dept">ROC</div>
  ```
- **Missing Attributes:**
  - No `data-dept` attribute
  - No `onclick` handler
  - No employee count
- **Severity:** MEDIUM
- **Note:** Department is empty, so count would be 0 or department should be removed entirely
- **Fix Option A** (if keeping department):
  ```html
  <div class="mini-dept" data-dept="roc" onclick="showDepartmentDetails('ROC', 'Radhika')">
    ROC (0)
  </div>
  ```
- **Fix Option B** (recommended): Remove entirely if no employees

---

## Category 4: Minor Issues (3 issues)

### Issue #17: Footer Statistics Outdated
- **Location:** Lines 1751-1753 in index.html
- **Current HTML:**
  ```html
  <div class="stat-item">
    <div class="stat-number">40+</div>
    <div class="stat-label">Team Members</div>
  </div>
  ```
- **Problem:** Shows "40+" but actual count is 289 (or 283 excluding placeholders)
- **Severity:** LOW (cosmetic)
- **Fix:**
  ```html
  <div class="stat-item">
    <div class="stat-number">289</div>
    <div class="stat-label">Team Members</div>
  </div>
  ```

---

### Issue #18: Script Stats Hardcoded
- **Location:** Lines 551-567 in script.js
- **Current Code:**
  ```javascript
  function getOrganizationStats() {
    const stats = {
      directors: 3,
      seniorManagers: 4,
      departments: document.querySelectorAll('.dept-card').length,
      totalEmployees: 40,  // ← WRONG
      managersBreakdown: {
        Namita: 11,
        Radhika: 7,
        Gyan: 7,
        Bhavin: 3
      }
    };
  }
  ```
- **Problem:** `totalEmployees: 40` is hardcoded but should be dynamic
- **Severity:** LOW
- **Fix:**
  ```javascript
  totalEmployees: document.querySelectorAll('.member-item').length
  ```

---

### Issue #19: Manager Departments Breakdown Outdated
- **Location:** Lines 557-562 in script.js
- **Current Code:**
  ```javascript
  managersBreakdown: {
    Namita: 11,    // Should be 12
    Radhika: 7,    // Should be 7 ✓
    Gyan: 7,       // Should be 7 ✓
    Bhavin: 3      // Should be 3 ✓
  }
  ```
- **Problem:** Namita's count shows 11 but she manages 12 departments
- **Severity:** LOW
- **Fix:** Update to `Namita: 12`

---

## Category 5: Data Consistency Issues (2 issues)

### Issue #20: Pradnya Shelar Duplicate Identity
- **Locations:**
  - Line 503: `Pradnya Shelar` (incomplete, Accounts Receivable)
  - Line 187: `Miss Pradnya Gautam Shelar` (complete, Accounts Finance)
- **Problem:** May be same person in two departments or data entry error
- **Severity:** MEDIUM
- **Investigation Required:** Verify if:
  - Same person with dual roles?
  - Duplicate entry?
  - Person transferred between departments?
- **Fix:** Once verified, consolidate to single, complete record

---

### Issue #21: Vaishali Identity Unclear
- **Locations:**
  - Line 164: `Vaishali` (incomplete, Banking)
  - Line 175: `Mr. Vaishali Shrikant Kapure` (complete, Accounts)
- **Problem:** Banking shows "Vaishali" but Accounts shows full name "Mr. Vaishali Shrikant Kapure"
- **Severity:** MEDIUM
- **Note:** Unusual that Banking shows `Mr. Vaishali` without full name while Accounts shows full formal name
- **Investigation Required:** Verify if same person
- **Fix:** Update Banking to:
  ```html
  <div class="member-item hierarchy-mid">
    <strong>Mr. Vaishali Shrikant Kapure</strong>
    <span class="designation">Executive Accounts [EA]</span>
  </div>
  ```

---

## Priority Fix Order

### CRITICAL (Fix immediately - Day 1)
1. Issue #10 - KPO count mismatch (94→75)
2. Issue #1 - Manager Mishra duplicates/placeholders

### HIGH PRIORITY (Fix within Week 1)
3. Issue #2 - Complete "Vaishali" name
4. Issue #3 - Complete "Pradnya Shelar" name
5. Issue #11-15 - Tax & AP, Banking, AR badges

### MEDIUM PRIORITY (Fix within Week 2)
6. Issue #4-9 - Handle empty departments (add data or remove)
7. Issue #20-21 - Verify and consolidate duplicate identities

### LOW PRIORITY (Fix within Month 1)
8. Issue #17 - Update footer statistics
9. Issue #18-19 - Fix script.js stats function

---

## Impact Summary

| Category | Count | Employee Impact | Functional Impact | Data Quality Impact |
|----------|-------|-----------------|-------------------|---------------------|
| Placeholder/Incomplete | 3 | 4 affected records | Tree view junk data | HIGH |
| Empty Departments | 6 | 0 records | Cannot generate modals | MEDIUM |
| Sync Mismatches | 7 | -19 (KPO count) | Non-functional badges | HIGH |
| Duplicates/Variants | 2 | 2 possible duplicates | Confusion in views | MEDIUM |
| Cosmetic/Minor | 3 | 0 | Display issues | LOW |

**Total Issues:** 21
**Employees Affected:** ~9 (direct) + potential duplicates
**Data Quality Impact:** 10.3% of records have issues

