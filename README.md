# 🧪 Remote Testing Pipeline

An automation pipeline that integrates cross-platform acceptance testing, API performance benchmarking, and CI/CD workflows for robust web quality assurance. Designed to scale and save manual QA hours using modern tools like **Cypress**, **Selenium**, and **GitHub Actions**.

---

## 🚀 Core Features

* 💻 Developed a **parallel testing suite** triggered remotely via **PowerShell** and GitHub Actions
* 🔄 Implemented **CI/CD** for **Gherkin syntax (Cucumber)** test cases using GitHub Actions before deployments
* 🌐 Automated **API performance testing** using **POSTMAN**, improving QA efficiency and reducing 200+ hours of manual effort
* 🔍 Performed **acceptance testing** on company website modules with **Selenium XPath** targeting

---

## 🛠️ Tech Stack

| Purpose                 | Technology         |
| ----------------------- | ------------------ |
| UI Testing              | Selenium, Cypress  |
| API Performance Testing | POSTMAN            |
| CI/CD & Automation      | GitHub Actions     |
| Test Scripting          | Cucumber (Gherkin) |
| Remote Execution        | PowerShell         |
| Language                | JavaScript         |

---

## 🧩 Pipeline Overview

* **Remote Triggering**: QA engineers initiate parallel test runs via PowerShell scripts connected to GitHub workflows.
* **Acceptance Testing**: Selenium targets front-end modules using XPath-based selectors for key feature verification.
* **Performance Testing**: POSTMAN runs REST API scenarios in batches, capturing performance metrics.
* **Cucumber Integration**: Gherkin syntax tests are versioned and executed automatically as part of CI workflows.
* **CI/CD Flow**:

  1. Commit to test branch
  2. GitHub Action triggers test pipeline
  3. Cypress + Cucumber tests run
  4. Deployment proceeds only if tests pass

---

## 📁 Files

* `tests/ui/` — Cypress + Selenium scripts for web testing
* `tests/api/` — Postman collections and environments
* `features/` — Cucumber feature files in Gherkin
* `.github/workflows/` — CI configurations for test execution
* `scripts/trigger.ps1` — Remote PowerShell script for triggering runs

---

## 🎯 Results & Impact

* Reduced manual regression effort by over **200 hours per release cycle**
* Improved **test coverage** and **deployment confidence**
* Enabled **remote test orchestration** across distributed teams

---

## 📅 Timeline

**July – September 2024**
Created during a QA engineering internship focused on improving scalability and efficiency of web app testing workflows.

---

## 📬 Contact

**Kevin Chifamba**
📧 [kevinnanashe@gmail.com](mailto:kevinnanashe@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/yourprofile) • [GitHub](https://github.com/your-username)

---
