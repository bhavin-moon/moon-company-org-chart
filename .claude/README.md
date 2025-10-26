# Claude Code Configuration

This directory contains custom agents, skills, and commands for the Moon Company Organizational Chart project.

## 📁 Structure

```
.claude/
├── agents.md              # Custom agent configurations
├── skills.md              # Reusable skill definitions
├── commands/              # Slash command definitions
│   ├── add-employee.md
│   ├── add-department.md
│   ├── validate.md
│   ├── sync-counts.md
│   ├── export-data.md
│   ├── deploy.md
│   ├── stats.md
│   ├── find-employee.md
│   ├── fix-formatting.md
│   └── backup.md
├── settings.local.json    # Local settings
└── README.md             # This file
```

## 🤖 Agents

Specialized agents for complex, multi-step tasks. Invoke with natural language or `/agent [name]`.

### Available Agents

1. **org-chart-updater**
   - Adding/updating employees
   - Managing departments
   - Maintaining hierarchy structure
   - *Use when*: Bulk employee updates, restructuring

2. **chart-validator**
   - Comprehensive validation checks
   - Data integrity verification
   - Consistency reports
   - *Use when*: After updates, before deployment

3. **deployment-helper**
   - Git workflow management
   - GitHub Pages deployment
   - Troubleshooting
   - *Use when*: Pushing changes, deployment issues

4. **data-extractor**
   - Import from images/spreadsheets
   - Format conversion
   - Data structuring
   - *Use when*: Bulk data import from external sources

## 🛠️ Skills

Focused, single-purpose tasks. Invoke with `/skill [name]`.

### Available Skills

1. **add-employee** - Add single employee quickly
2. **add-department** - Create new department with employees
3. **validate-chart** - Run all validation checks
4. **update-counts** - Sync employee counts across views
5. **export-data** - Export to CSV/JSON/Markdown
6. **import-data** - Import from external sources
7. **fix-formatting** - Auto-fix formatting issues

## ⚡ Commands

Quick one-liner commands. Invoke with `/command-name`.

### Available Commands

| Command | Description |
|---------|-------------|
| `/add-employee` | Add a new employee to a department |
| `/add-department` | Create a new department |
| `/validate` | Run validation checks |
| `/sync-counts` | Synchronize employee counts |
| `/export-data` | Export employee data |
| `/deploy` | Deploy to GitHub Pages |
| `/stats` | Show organizational statistics |
| `/find-employee` | Search for an employee |
| `/fix-formatting` | Fix formatting issues |
| `/backup` | Create timestamped backup |

## 📖 Usage Examples

### Adding Employees

**Quick single add**:
```
/add-employee
```
Then answer prompts for name, designation, department, hierarchy.

**Bulk add with agent**:
```
Use the org-chart-updater agent to add these 15 employees to the KPO department
[paste employee list]
```

### Validation

**Quick check**:
```
/validate
```

**Comprehensive validation**:
```
Use chart-validator agent to perform full validation before deployment
```

### Deployment

**Simple deployment**:
```
/deploy
```

**Guided deployment**:
```
Use deployment-helper agent to push changes and verify live site
```

### Data Management

**Export data**:
```
/export-data
```
Choose format: CSV, JSON, or Markdown

**Import from image**:
```
Use data-extractor agent with this employee roster screenshot
[attach image]
```

## 🎯 When to Use What

### Use Commands When:
- Quick, single operation
- Standard workflow (add one employee, deploy)
- No decision-making needed

### Use Skills When:
- Focused task with some complexity
- Need structured process
- Want reusable operation

### Use Agents When:
- Multi-step workflow
- Need decision-making
- Complex data processing
- Problem-solving required

## 🔧 Configuration Tips

### Customizing Agents

Edit `agents.md` to:
- Add new specialized agents
- Modify existing agent instructions
- Add domain-specific rules

### Creating New Commands

Add new `.md` file in `commands/`:
```bash
# File: .claude/commands/my-command.md
Brief description of what this command does. Keep it concise and action-oriented.
```

### Extending Skills

Edit `skills.md` to:
- Add new skills
- Update skill workflows
- Modify validation rules

## 📊 Current Data Structure

The organizational chart has:
- **280+ employees**
- **24 departments**
- **4 managers**: Namita (Blue), Radhika (Red), Gyan (Green), Bhavin (Orange)
- **3 hierarchy levels**: Senior, Mid, Junior
- **3 view modes**: Senior Management, Department View, Full Hierarchy

## ⚠️ Important Rules

When working with this project:

1. **Data lives in index.html** - NOT in org-data.js
2. **Always update TWO places**: Department View + Full Hierarchy badges
3. **Preserve hierarchy classes**: hierarchy-senior/mid/junior
4. **Follow naming format**: Mr./Miss/Mrs. FirstName FatherName LastName
5. **Include abbreviations**: [Full Title] [ABV]
6. **Test before deploying**: Open index.html locally first

## 🚀 Quick Start Workflow

### Daily Development

1. **Make changes** to employee data
2. **Validate**: `/validate`
3. **Sync counts**: `/sync-counts`
4. **Test locally**: Open index.html
5. **Deploy**: `/deploy`

### Monthly Maintenance

1. **Backup**: `/backup`
2. **Validate**: Use chart-validator agent
3. **Fix issues**: `/fix-formatting`
4. **Export data**: `/export-data` (for records)
5. **Deploy**: `/deploy`

### Bulk Updates

1. **Create backup**: `/backup`
2. **Import data**: Use data-extractor agent
3. **Validate**: `/validate`
4. **Fix formatting**: `/fix-formatting`
5. **Sync counts**: `/sync-counts`
6. **Test locally**: Review changes
7. **Deploy**: `/deploy`

## 📝 Notes

- All agents and skills are **context-aware** of the project structure
- Commands are **stateless** - each invocation is independent
- Skills can be **chained** for complex workflows
- Agents can **call skills** internally for subtasks

## 🔗 Related Files

- `CLAUDE.md` - General project guidance for Claude
- `README.md` - Project documentation
- `DEPLOYMENT.md` - Deployment instructions

## 💡 Tips

- Use `/stats` to get quick overview before updates
- Run `/validate` after any bulk changes
- Create `/backup` before major restructuring
- Use `/find-employee` to locate before editing
- Chain commands: `/sync-counts` then `/validate` then `/deploy`

---

**Last Updated**: 2025-10-26
**Configuration Version**: 1.0
