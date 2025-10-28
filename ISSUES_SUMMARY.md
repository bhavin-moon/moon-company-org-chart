# Data Quality Issues - Quick Reference Guide

## CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION

### 1. DUPLICATE ENTRY: Manager Mishra (Lines 137-138)
**Location**: Tax and Accounts Payable department
**Current Code**:
```html
<div class="member-item">Manager Mishra</div>
<div class="member-item">Manager Mishra</div>
```
**Problems**:
- Same person listed twice
- No hierarchy class
- No designation
- No father's name
- Non-compliant format

**Required Action**: DELETE ONE or UPDATE with full information
**Priority**: CRITICAL - Blocks department integrity
**Effort**: 5 minutes

---

### 2. EMPTY DEPARTMENTS - 6 Placeholder Entries

#### ROC Department (Line 1055)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

#### Quotation Department (Line 1155)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

#### Cultural Program Moon (Line 1182)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

#### Exit Department (Line 1385)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

#### Monitoring Department (Line 1395)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

#### IT Hardware Department (Line 1517)
**Current**: `<div class="member-item">Team Members</div>`
**Status**: No real employees listed
**Full Hierarchy**: No onclick handler (missing)
**Action**: Populate with real employees or confirm empty department

**Priority**: CRITICAL - 6 departments (21% of total) lack data
**Combined Effort**: Unknown (depends on data availability)

---

### 3. INCOMPLETE ENTRIES - Missing Hierarchy Classification

#### Banking Department - "Vaishali" (Line 148)
**Current Code**:
```html
<div class="member-item">Vaishali</div>
```

**Missing**:
- Title prefix (Mr./Miss/Mrs.)
- Father's name
- Last name
- Hierarchy class
- Designation

**Correct Format Should Be**:
```html
<div class="member-item hierarchy-[level]">
    <strong>Miss/Mrs. Vaishali [FatherName] [LastName]</strong>
    <span class="designation">[Title] [Abbreviation]</span>
</div>
```

**Priority**: HIGH
**Effort**: 10 minutes (requires HR data)

---

#### Accounts Receivable - "Pradnya Shelar" (Line 487)
**Current Code**:
```html
<div class="member-item">Pradnya Shelar</div>
```

**Missing**:
- Title prefix (Mr./Miss/Mrs.)
- Father's name
- Hierarchy class
- Designation

**Potential Duplicate**: Compare with Line 171 - "Miss Pradnya Gautam Shelar" in Accounts
**Question**: Same person in two departments? Or different person?

**Correct Format Should Be**:
```html
<div class="member-item hierarchy-[level]">
    <strong>Miss Pradnya Gautam Shelar</strong>
    <span class="designation">[Title] [Abbreviation]</span>
</div>
```

**Priority**: HIGH
**Effort**: 10 minutes (requires verification)

---

## HIGH PRIORITY ISSUES

### 4. GENDER/NAME ANOMALY: "Mr. Vaishali" (Line 159)
**Location**: Accounts (Finance and Accounts) department
**Current Code**:
```html
<strong>Mr. Vaishali Shrikant Kapure</strong>
```

**Issue**: "Vaishali" is traditionally a feminine name in Indian culture
**Prefix Mismatch**: Listed as "Mr." (masculine)

**Possible Corrections**:
```html
<!-- Option 1: If employee is female -->
<strong>Miss Vaishali Shrikant Kapure</strong>

<!-- Option 2: If employee is male with unusual name -->
<!-- Keep as is, document as exception -->
```

**Priority**: HIGH - Gender accuracy in org chart
**Effort**: 5 minutes (after HR verification)
**Required Action**: Verify with HR department

---

### 5. INCOMPLETE NAMING: Missing Father's Name (Line 438)
**Location**: Admin department
**Current Code**:
```html
<strong>Mr. Dinkar Sonawane</strong>
```

**Issue**: Missing father's name (only has first name + surname)
**Format Standard**: `Mr./Miss/Mrs. FirstName FatherName LastName`

**Expected Format**:
```html
<strong>Mr. Dinkar [FatherName] Sonawane</strong>
```

**Priority**: HIGH - Naming convention compliance
**Effort**: 5 minutes (requires HR data)

---

### 6. HIERARCHY CLASSIFICATION REVIEW (Line 1476)
**Location**: Software (Information Technology) department
**Current Code**:
```html
<div class="member-item hierarchy-mid">
    <strong>Mr. Akshay Kishanla Rathi</strong>
    <span class="designation">General Manager [GM]</span>
</div>
```

**Issue**: "General Manager" typically represents senior-level position
**Current Class**: `hierarchy-mid` (medium level)
**Recommendation**: Consider `hierarchy-senior`

**Current Hierarchy Standards**:
- `hierarchy-senior`: Deputy Managers, Senior Executives
- `hierarchy-mid`: Managers, Executives
- `hierarchy-junior`: Trainees, Junior staff

**Question**: Should General Manager be elevated to hierarchy-senior?

**Priority**: MEDIUM - Process review
**Effort**: 5 minutes (decision only)

---

## MISSING ONCLIK HANDLERS

### Departments Without Interactive Details in Full Hierarchy

The following departments appear in Full Hierarchy view but cannot be clicked to show details:

**Without Onclick Handlers** (6 departments):
1. Tax & AP (Line 1567)
2. Banking (Line 1568)
3. Accounts Receivable (Line 1584) - shown as "AR"
4. ROC (Line 1610)
5. Quotation (Line 1617)
6. Exit (Line 1644)
7. Monitoring (Line 1645)
8. Cultural Program Moon (Line 1621) - shown as "Cultural"
9. IT Hardware (Line 1665)

**Current Format** (Non-clickable):
```html
<div class="mini-dept">Tax & AP</div>
```

**Required Format** (Clickable with count):
```html
<div class="mini-dept" data-dept="taxap" onclick="showDepartmentDetails('Tax and Accounts Payable', 'Namita')">
    Tax & AP (X)
</div>
```

**Priority**: MEDIUM - Functionality/User Experience
**Effort**: 30 minutes total

---

## SUMMARY TABLE: All Issues

| # | Issue | Severity | Location | Type | Effort |
|---|-------|----------|----------|------|--------|
| 1 | Duplicate Manager Mishra | CRITICAL | Lines 137-138 | Duplicate + Missing Data | 5 min |
| 2 | ROC Placeholder | CRITICAL | Line 1055 | Empty Department | Unknown |
| 3 | Quotation Placeholder | CRITICAL | Line 1155 | Empty Department | Unknown |
| 4 | Cultural Placeholder | CRITICAL | Line 1182 | Empty Department | Unknown |
| 5 | Exit Placeholder | CRITICAL | Line 1385 | Empty Department | Unknown |
| 6 | Monitoring Placeholder | CRITICAL | Line 1395 | Empty Department | Unknown |
| 7 | IT Hardware Placeholder | CRITICAL | Line 1517 | Empty Department | Unknown |
| 8 | Banking Incomplete | HIGH | Line 148 | Missing Format/Class | 10 min |
| 9 | Accounts Receivable Incomplete | HIGH | Line 487 | Missing Format/Class | 10 min |
| 10 | "Mr. Vaishali" Gender Mismatch | HIGH | Line 159 | Name/Gender | 5 min |
| 11 | Dinkar Missing Father Name | HIGH | Line 438 | Naming Convention | 5 min |
| 12 | General Manager Hierarchy Review | MEDIUM | Line 1476 | Classification | 5 min |
| 13 | Missing Onclick Handlers | MEDIUM | 9 departments | UX/Functionality | 30 min |

---

## WORKLOAD IMBALANCE ALERT

### Manager Workload Distribution (Critical Organizational Issue)

```
Namita:     182 employees (64.3%) ████████████████████████████████████████
Radhika:     38 employees (13.4%) ███████
Gyan:        41 employees (14.5%) ███████
Bhavin:      20 employees (7.1%)  ████
```

**Imbalance Ratio**: Namita carries 4.8x more employees than Bhavin, 4.7x more than Gyan

**Primary Cause**: KPO Department under Namita contains 94 employees (33% of entire organization)

**Recommendation**: Consider restructuring KPO department or redistributing among managers

---

## DATA COMPLETENESS SCORECARD

| Aspect | Score | Status |
|--------|-------|--------|
| Naming Convention Compliance | 96.5% | Good |
| Hierarchy Classification Coverage | 97.9% | Good |
| Designation Format Compliance | 95.2% | Good |
| HTML Structure Integrity | 100% | Excellent |
| Count Accuracy (Full Hierarchy) | 100% | Excellent |
| Manager Distribution Accuracy | 100% | Excellent |
| Department Completeness | 78.6% | Fair (6 empty) |

**Overall Quality Score**: 74/100 (Fair - Improvement Recommended)

---

## QUICK FIX CHECKLIST

### Can Be Fixed in 30 Minutes:
- [ ] Delete duplicate Manager Mishra (Line 138)
- [ ] Update Banking entry with full format (Line 148)
- [ ] Update Accounts Receivable with full format (Line 487)
- [ ] Verify and correct "Mr. Vaishali" gender (Line 159)
- [ ] Add missing father name to Dinkar (Line 438)
- [ ] Review General Manager hierarchy (Line 1476)

### Requires Data From Other Departments:
- [ ] Populate 6 placeholder departments (ROC, Quotation, Exit, Monitoring, Cultural, IT Hardware)
- [ ] Add onclick handlers to Full Hierarchy view

### Requires HR Verification:
- [ ] Confirm Pradnya Shelar duplicate (Line 487 vs Line 171)
- [ ] Verify "Mr. Vaishali" gender prefix
- [ ] Get missing father's names

---

**For Detailed Analysis**: See DATA_QUALITY_ANALYSIS.md
