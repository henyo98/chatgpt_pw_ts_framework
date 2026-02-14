# 🎭 Playwright + TypeScript Test Automation Framework

A scalable End-to-End (E2E) test automation framework built with **Playwright** and **TypeScript** following modern best practices like Page Object Model (POM), fixtures, and clean architecture.

---

## 📦 Tech Stack

- Playwright  
- TypeScript  
- Node.js  
- Playwright Test Runner  
- HTML Reporter  
- 
---

## 📁 Project Structure
...

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

### Set .env.<env> files
Use template file '.env.test.template' and for every environment create separate file with name '.env.<env>'.

### Set users.<env>.json files
Use template file 'users.test.json.template' and for every environment create separate file with name 'users.<env>.json'.

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run specific browser

```bash
npx playwright test --project=chromium
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

---

## 📊 Test Reports

After execution, open the HTML report:

```bash
npx playwright show-report
```

---

## 👨‍💻 Author
ZborApp