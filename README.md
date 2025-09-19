# BrightHR QA Automation Task

This repository contains automated end-to-end tests for the BrightHR Task web application using [Playwright](https://playwright.dev/).  
The suite covers employee management scenarios (adding employees, verifying records, etc.) with Page Object Model structure.

---

## 📦 Project Structure

```
BrightHR_QA_AUTOMATION_TASK/
├── .github/workflows/     # GitHub Actions CI configuration
├── pageobjectmodel/       # Page Object classes
│   ├── LoginPage.js
│   └── POMManager.js
├── tests/                 # Test specs
│   └── employees.spec.js
├── utils/                 # Helper utilities (test data, employees)
├── playwright.config.js   # Playwright test runner configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/abbeylincholn/BrightHR_Task.git
cd BrightHR_Task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install --with-deps
```

### 4. Run tests
- Run all tests (default: Chromium, Firefox, WebKit):
```bash
npx playwright test
```

- Run a single project (browser):
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

- Run a single file:
```bash
npx playwright test tests/employees.spec.js
```

### 5. View reports
- Default HTML report:
```bash
npx playwright show-report
```

- Allure report (requires [Allure CLI](https://allurereport.org/docs/playwright/)):
```bash
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```

---

## 🤖 Continuous Integration (CI)

This project uses **GitHub Actions** (`.github/workflows/playwright.yml`) to run Playwright tests on every push and pull request.

- Runs on `ubuntu-latest`
- Installs dependencies and Playwright browsers
- Executes all test projects (Chromium, Firefox, WebKit)
- Uploads Playwright HTML report as an artifact
- Supports Allure reporting (results stored in `allure-results/`)

### Workflow trigger
- On push to `main` and `master`
- On pull requests to `main` and `master`

### Run locally with the same config
```bash
npx playwright test
```

---

## 🧩 Key Features
- **Page Object Model (POM):** test logic separated from UI selectors.
- **Multiple Browsers:** Chromium, Firefox, WebKit supported.
- **Retries:** Each failing test retries once (`retries: 1`).
- **Artifacts:** HTML and Allure reports for better insights.
- **CI-ready:** GitHub Actions workflow pre-configured.

---

## 🛠️ Troubleshooting
- **Browsers missing error:** Run `npx playwright install --with-deps`.
- **Type errors in config:** Stick to one module system (CommonJS or ESM).
- **Allure not found:** Install Allure CLI via [docs](https://allurereport.org/docs/playwright/).

-


