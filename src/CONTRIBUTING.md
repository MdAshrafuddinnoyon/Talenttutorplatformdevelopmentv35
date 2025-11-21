# 🤝 Contributing to Talent Tutor

<div align="center">

**Thank you for considering contributing to Talent Tutor!**

We welcome contributions from everyone. This document provides guidelines for contributing to the project.

[Code of Conduct](#-code-of-conduct) • [Getting Started](#-getting-started) • [Development](#-development-workflow) • [Pull Requests](#-pull-request-process)

</div>

---

## 📖 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Getting Started](#-getting-started)
3. [Development Workflow](#-development-workflow)
4. [Coding Standards](#-coding-standards)
5. [Commit Guidelines](#-commit-guidelines)
6. [Pull Request Process](#-pull-request-process)
7. [Issue Guidelines](#-issue-guidelines)
8. [Testing](#-testing)
9. [Documentation](#-documentation)
10. [Community](#-community)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Our Standards

**Positive behavior includes:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards others

**Unacceptable behavior includes:**
- ❌ Harassment or discriminatory language
- ❌ Personal attacks
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

### Enforcement

Violations can be reported to: conduct@websearchbd.com

---

## 🚀 Getting Started

### Prerequisites

Before you start contributing, ensure you have:

```bash
✅ Node.js 18+ installed
✅ npm or yarn installed
✅ Git installed
✅ A code editor (VS Code recommended)
✅ Basic knowledge of React & TypeScript
✅ Understanding of Tailwind CSS
```

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/talent-tutor.git
   cd talent-tutor
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/websearchbd/talent-tutor.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 💻 Development Workflow

### 1. Create a Branch

**Always create a new branch for your work:**

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes (formatting, etc.)
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

**Examples:**
```bash
git checkout -b feature/video-calling
git checkout -b fix/chat-dialog-crash
git checkout -b docs/update-readme
```

### 2. Make Changes

**Follow these guidelines:**
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Keep changes focused and atomic
- Test your changes thoroughly

### 3. Commit Your Changes

**Follow commit message guidelines (see below)**

```bash
git add .
git commit -m "feat: add video calling feature"
```

### 4. Keep Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch
git rebase upstream/main
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a pull request from your fork to the main repository.

---

## 📝 Coding Standards

### TypeScript

**Use TypeScript for all files:**

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
  role: 'teacher' | 'guardian' | 'student';
}

export function UserCard({ name, email, role }: UserProps) {
  // ...
}

// ❌ Bad
export function UserCard(props: any) {
  // ...
}
```

**Define interfaces for all props:**

```typescript
// ✅ Good
interface MyComponentProps {
  title: string;
  onClose: () => void;
  isOpen?: boolean;
}

// ❌ Bad - missing types
function MyComponent(props) {
  // ...
}
```

### React Components

**Use functional components:**

```typescript
// ✅ Good
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return <div>...</div>;
}

// ❌ Bad - class component
export class MyComponent extends React.Component {
  // ...
}
```

**Use hooks appropriately:**

```typescript
// ✅ Good
const [state, setState] = useState<string>('');
const value = useMemo(() => computeValue(), [dependency]);

// ❌ Bad
let state = '';
const value = computeValue(); // Computed on every render
```

### Naming Conventions

**Files:**
```
✅ PascalCase for components: UserCard.tsx
✅ camelCase for utils: creditSystem.ts
✅ kebab-case for styles: user-card.css
```

**Variables:**
```typescript
✅ camelCase: const userName = 'John';
✅ PascalCase for components: const UserCard = () => {};
✅ UPPER_CASE for constants: const API_URL = '...';
```

**Functions:**
```typescript
✅ camelCase: function calculateTotal() {}
✅ Descriptive names: handleSubmit, fetchUserData
❌ Single letters: function a() {}
```

### Tailwind CSS

**Follow Tailwind best practices:**

```tsx
// ✅ Good - organized classes
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ❌ Bad - no organization
<div className="flex bg-white px-4 items-center rounded-lg py-2 hover:shadow-lg shadow-md justify-between transition-shadow">
```

**Avoid custom CSS unless necessary:**

```tsx
// ✅ Good - use Tailwind
<div className="text-emerald-600 font-semibold">

// ❌ Bad - custom CSS
<div style={{ color: '#10b981', fontWeight: 600 }}>
```

### Multi-Language Support

**Always provide both Bengali and English:**

```typescript
// ✅ Good
const content = {
  bn: {
    title: 'শিরোনাম',
    description: 'বিবরণ',
  },
  en: {
    title: 'Title',
    description: 'Description',
  },
};

// ❌ Bad - only English
const content = {
  title: 'Title',
  description: 'Description',
};
```

### Component Structure

**Follow this structure:**

```typescript
// 1. Imports
import React, { useState } from 'react';
import { Button } from './components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onSave: () => void;
}

// 3. Component
export function MyComponent({ title, onSave }: MyComponentProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false);
  
  // 5. Handlers
  const handleClick = () => {
    setIsOpen(true);
  };
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Open</Button>
    </div>
  );
}
```

---

## 📋 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

### Examples

**Good commit messages:**

```bash
feat(chat): add real-time messaging feature

- Implement WebSocket connection
- Add message history
- Handle reconnection

Closes #123

---

fix(credit): correct credit deduction calculation

Fixed an issue where credits were deducted twice
when scheduling video meetings.

Fixes #456

---

docs(readme): update installation instructions

Added steps for Windows users and troubleshooting section.

---

style(header): improve responsive layout

Adjusted spacing and alignment for mobile devices.
```

**Bad commit messages:**

```bash
❌ "fixed stuff"
❌ "update"
❌ "changes"
❌ "asdf"
❌ "final commit"
```

### Commit Message Rules

1. **Use imperative mood** ("add" not "added")
2. **Capitalize first letter**
3. **No period at the end of subject**
4. **Limit subject to 50 characters**
5. **Wrap body at 72 characters**
6. **Reference issues when applicable**

---

## 🔄 Pull Request Process

### Before Creating PR

**Checklist:**

- [ ] Code follows our style guidelines
- [ ] All tests pass (manual testing for now)
- [ ] No console errors
- [ ] Responsive design works
- [ ] Both Bengali and English work
- [ ] Documentation updated (if needed)
- [ ] Commits are clean and descriptive

### Creating the PR

1. **Use a descriptive title:**
   ```
   ✅ "Add video calling feature to chat dialog"
   ❌ "Update files"
   ```

2. **Fill out the PR template:**
   ```markdown
   ## Description
   Brief description of what this PR does
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   How was this tested?
   
   ## Screenshots (if applicable)
   
   ## Related Issues
   Closes #123
   ```

3. **Link related issues:**
   - Use "Closes #123" for bug fixes
   - Use "Relates to #456" for features

4. **Request review:**
   - Tag relevant reviewers
   - Wait for approval

### PR Review Process

**Reviewers will check:**
- Code quality
- Functionality
- Tests
- Documentation
- Design consistency

**You may be asked to:**
- Make changes
- Add tests
- Update documentation
- Resolve conflicts

### After Approval

1. **Squash commits** (if requested)
2. **Merge when approved**
3. **Delete your branch**

---

## 🐛 Issue Guidelines

### Before Creating an Issue

**Search existing issues:**
- Check if it's already reported
- Check if it's being worked on
- Check if it's already fixed

### Creating a Good Issue

#### For Bug Reports

**Use this template:**

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Browser: Chrome 100
- OS: Windows 11
- Device: Desktop

## Additional Context
Any other relevant information
```

#### For Feature Requests

**Use this template:**

```markdown
## Feature Description
Clear description of the feature

## Problem it Solves
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other ways to solve this

## Additional Context
Any mockups, examples, or references
```

---

## ✅ Testing

### Manual Testing

**Before submitting PR:**

1. **Test all user roles:**
   - Teacher
   - Guardian
   - Student
   - Admin
   - Donor

2. **Test responsive design:**
   - Mobile (< 640px)
   - Tablet (768px)
   - Desktop (1024px+)

3. **Test both languages:**
   - Bengali
   - English

4. **Test edge cases:**
   - Empty states
   - Error states
   - Loading states
   - Long text
   - Special characters

5. **Browser testing:**
   - Chrome
   - Firefox
   - Safari
   - Edge

### Automated Testing (Coming Soon)

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test
npm run test UserCard.test.tsx
```

---

## 📚 Documentation

### When to Update Documentation

**Update docs when:**
- Adding new features
- Changing existing features
- Fixing bugs that affect usage
- Changing APIs or interfaces
- Adding new components

### Which Files to Update

| Change | Update |
|--------|--------|
| New feature | README.md, USER_GUIDE.md, PROJECT_STATUS.md |
| Bug fix | PROJECT_STATUS.md (Known Issues) |
| New component | Add inline documentation |
| API change | README.md, QUICKSTART.md |
| New page | README.md (Project Structure) |
| Configuration | QUICKSTART.md, README.md |

### Documentation Standards

**Inline Comments:**

```typescript
// ✅ Good - explains WHY
// Using setTimeout to debounce rapid clicks
// and prevent multiple API calls
setTimeout(handleClick, 300);

// ❌ Bad - explains WHAT (obvious)
// Set timeout
setTimeout(handleClick, 300);
```

**Component Documentation:**

```typescript
/**
 * UserCard component displays user information in a card format
 * 
 * @param name - User's full name
 * @param email - User's email address
 * @param role - User's role (teacher, guardian, student)
 * @param onEdit - Callback when edit button is clicked
 */
export function UserCard({ name, email, role, onEdit }: UserCardProps) {
  // ...
}
```

---

## 🌍 Community

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General discussions
- **Email** - dev@websearchbd.com
- **Discord** - Coming soon

### Getting Help

**If you're stuck:**

1. Check documentation
2. Search existing issues
3. Ask in discussions
4. Contact via email

**When asking for help:**
- Be specific
- Provide context
- Include error messages
- Share relevant code
- Mention what you've tried

### Recognition

**Contributors will be:**
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in commits
- Invited to contributor events

---

## 🎯 Good First Issues

**New to the project? Start here:**

Look for issues labeled:
- `good first issue` - Easy tasks for beginners
- `help wanted` - Community help needed
- `documentation` - Documentation improvements
- `bug` - Bug fixes (some are simple)

---

## 🏆 Contribution Levels

### Level 1: First-Timer
- Fix typos
- Update documentation
- Add comments
- Improve error messages

### Level 2: Contributor
- Fix bugs
- Add small features
- Improve UI/UX
- Write tests

### Level 3: Regular Contributor
- Add major features
- Refactor code
- Review PRs
- Help other contributors

### Level 4: Core Contributor
- Architecture decisions
- Mentor others
- Maintain documentation
- Release management

---

## 📋 Contribution Checklist

Before submitting:

### Code Quality
- [ ] Follows TypeScript standards
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Proper error handling
- [ ] Clean imports

### Functionality
- [ ] Feature works as intended
- [ ] No breaking changes
- [ ] Backward compatible
- [ ] Edge cases handled

### Design
- [ ] Matches existing design
- [ ] Responsive on all devices
- [ ] Accessible (keyboard nav, etc.)
- [ ] Smooth animations

### Languages
- [ ] Bengali content added
- [ ] English content added
- [ ] Both work correctly

### Documentation
- [ ] README updated (if needed)
- [ ] USER_GUIDE updated (if needed)
- [ ] Inline comments added
- [ ] JSDoc added (if applicable)

### Testing
- [ ] Manually tested
- [ ] All user roles tested
- [ ] All devices tested
- [ ] Both languages tested

---

## ❓ FAQs

**Q: I'm new to open source. Where do I start?**  
A: Start with "good first issue" labeled issues. They're designed for beginners.

**Q: How long does PR review take?**  
A: Usually 1-3 days. Larger PRs may take longer.

**Q: Can I work on multiple issues?**  
A: Yes, but it's better to finish one before starting another.

**Q: My PR was rejected. What now?**  
A: Don't worry! Make the requested changes and resubmit. All contributions help you learn.

**Q: Do I need to know Bengali?**  
A: No, but you should provide both Bengali and English content. Use translation tools if needed.

**Q: Can I use AI tools (ChatGPT, Copilot)?**  
A: Yes, but understand the code you're submitting. You're responsible for it.

**Q: How do I get credit for my contribution?**  
A: We automatically track all contributors. You'll be listed in CONTRIBUTORS.md.

---

## 🙏 Thank You!

Every contribution, no matter how small, makes Talent Tutor better.

**Ways to contribute:**
- 💻 Code contributions
- 📝 Documentation improvements
- 🐛 Bug reports
- 💡 Feature suggestions
- 🎨 Design improvements
- 🌍 Translations
- 📢 Spread the word

---

<div align="center">

**Happy Contributing! 🎉**

*Together, we're building something amazing*

---

[Back to Top](#-contributing-to-talent-tutor) • [README](README.md) • [Code of Conduct](#-code-of-conduct)

© 2025 Talent Tutor - Open Source with ❤️

</div>
