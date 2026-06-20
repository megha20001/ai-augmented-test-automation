# ai-augmented-test-automation
Demonstration of AI-augmented test engineering with Playwright JS for validating key web application workflows.
AI-Augmented Test Automation with Playwright

Overview
As a QA Engineer with 2 years of experience in manual and automation testing, I am exploring ways to integrate AI into my testing workflow to improve productivity and accelerate test development.
This project demonstrates how I leveraged AI tools alongside Playwright and JavaScript to design and implement automated test scenarios for a sample e-commerce application. While AI helped speed up script creation and refinement, the test scenarios, validations, and overall approach were reviewed and tailored based on testing requirements.

Tech Stack:
- Playwright
- JavaScript
- Node.js
- Git & GitHub
- AI-assisted development using Codex and ChatGPT

Test Scenarios Covered

Login Validation
- Verify successful login with valid credentials.
- Validate access to the application after authentication.

Cart Functionality
- Add products to the cart.
- Verify cart updates and item count.

Navigation Flow
- Validate navigation across different sections of the application.
- Ensure expected pages and elements are displayed.

Product Sorting
- Verify sorting functionality and validate displayed results.


Project Structure:

tests/
└── sauceDemo/
    ├── login.spec.js
    ├── cart.spec.js
    ├── navigation.spec.js
    └── sort.spec.js

playwright.config.js
package.json


AI-Assisted Workflow

In this project, AI tools were used to:

- Generate initial script drafts.
- Refine selectors and assertions.
- Explore alternative implementations.
- Improve code readability and maintainability.
- Accelerate test development and debugging.

The final scripts and validations were reviewed and adapted to align with the intended test scenarios.

Continuous Learning:
I am currently exploring how AI can complement traditional QA practices and enhance automation workflows. Future improvements to this project include:
- Implementing the Page Object Model (POM)
- Data-driven testing
- GitHub Actions CI/CD integration
- Test reporting enhancements
- Reusable utilities and fixtures
