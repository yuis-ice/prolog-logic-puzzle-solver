# Contributing to Prolog Logic Puzzle Solver

Thank you for your interest in contributing to the Prolog Logic Puzzle Solver! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** provided in `.github/ISSUE_TEMPLATE/`
3. **Provide detailed information** including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots (if applicable)

### Submitting Pull Requests

1. **Fork the repository** and create a new branch
2. **Follow the coding standards** outlined below
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Submit a pull request** using the provided template

## 🏗 Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/prolog-logic-puzzle-solver.git
cd prolog-logic-puzzle-solver

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Check types and linting
npm run lint
```

## 📋 Coding Standards

### TypeScript Guidelines

- Use **strict TypeScript** configuration
- Provide **explicit types** for function parameters and return values
- Use **interface definitions** for complex objects
- Follow **PascalCase** for components and interfaces
- Use **camelCase** for variables and functions

### React Best Practices

- Use **functional components** with hooks
- Implement **proper error boundaries**
- Follow **React naming conventions**
- Use **semantic HTML** elements
- Ensure **accessibility compliance**

### Prolog Code Standards

- Use **clear predicate names** that describe their purpose
- Add **comments** explaining complex logic
- Follow **consistent formatting** for clauses
- Use **meaningful variable names**
- Test **constraint satisfaction** thoroughly

## 🧩 Adding New Puzzles

To add a new logic puzzle to the database:

### 1. Define the Puzzle Structure

```typescript
{
  id: 'unique_puzzle_id',
  title: 'Descriptive Puzzle Title',
  description: 'Clear problem description with entities and attributes',
  constraints: [
    'Constraint 1: Clear logical rule',
    'Constraint 2: Another logical rule',
    // ... more constraints
  ],
  variables: {
    people: ['entity1', 'entity2', 'entity3'],
    attributes: {
      attribute1: ['value1', 'value2', 'value3'],
      attribute2: ['valueA', 'valueB', 'valueC']
    }
  },
  prologCode: `
% Puzzle Name
solve_puzzle(Result) :-
  % Define your Prolog constraints here
  % Use permutation/2 for domain assignment
  % Apply logical constraints with member/2
  `,
  solution: [
    // Expected solution array
  ],
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### 2. Testing Your Puzzle

- Ensure **all constraints are satisfiable**
- Verify the **solution is unique** (or document multiple solutions)
- Test **edge cases** and constraint interactions
- Add **appropriate difficulty rating**

### 3. Documentation

- Update the **README.md** puzzle list
- Add **clear constraint descriptions**
- Include **example walkthrough** if complex

## 🎨 UI/UX Guidelines

### Design Principles

- **Clarity**: Information should be easy to understand
- **Accessibility**: Support screen readers and keyboard navigation
- **Responsiveness**: Work well on mobile and desktop
- **Performance**: Fast loading and smooth interactions

### CSS Standards

- Use **CSS custom properties** for theming
- Follow **BEM methodology** for class naming
- Ensure **cross-browser compatibility**
- Optimize for **performance** (avoid layout thrashing)

## 🧪 Testing Guidelines

### Unit Tests

- Test **individual functions** and components
- Mock **external dependencies** (Prolog engine)
- Use **descriptive test names**
- Aim for **high code coverage**

### Integration Tests

- Test **user workflows** end-to-end
- Verify **Prolog integration** works correctly
- Test **puzzle solving** functionality
- Check **error handling** scenarios

### Browser Testing

- Test on **major browsers** (Chrome, Firefox, Safari, Edge)
- Verify **mobile responsiveness**
- Check **accessibility** with screen readers
- Test **performance** on slower devices

## 📖 Documentation Standards

### Code Documentation

- Use **JSDoc comments** for functions
- Document **complex algorithms**
- Explain **Prolog constraint logic**
- Include **usage examples**

### README Updates

- Keep **installation instructions** current
- Update **feature lists** when adding functionality
- Maintain **accurate project structure**
- Include **links to relevant documentation**

## 🔄 Release Process

### Version Numbering

We follow **Semantic Versioning** (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run full test suite
- [ ] Create release notes
- [ ] Tag the release
- [ ] Deploy to production

## 📜 Contributor License Agreement (CLA)

By submitting a pull request or contribution, you agree to the following:

> You grant the project founder a **non-exclusive, irrevocable, worldwide, royalty-free license** to use, modify, sublicense, and relicense your contribution, including the right to incorporate it into dual-licensed or commercial versions of the project.

This ensures that the project can grow sustainably while preserving creator rights.  
If you are contributing on behalf of a company or organization, please contact us in advance.

## 🆘 Getting Help

### Community Support

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Discord**: Join our community chat (link in README)

### Maintainer Contact

- **Email**: jobs.fumiya@pm.me
- **GitHub**: [@yuis-ice](https://github.com/yuis-ice)

## 🏆 Recognition

Contributors are recognized in:
- **Contributors section** of README.md
- **Release notes** for significant contributions
- **Special mentions** in project documentation

Thank you for helping make this project better! 🎉
