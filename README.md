# Playwright Automation Framework Template

## Overview
This is a robust, production-ready **template framework** for Web Automation using **Playwright** and **TypeScript**. It is designed to be cloned and adapted for new projects.

## Architecture
The framework follows the **Page Object Model (POM)** pattern and strictly separates concerns:

- **`pages/`**: UI Logic (Page Objects). contains `TemplatePage.ts` as an example.
- **`tests/`**: Test Scenarios. contains `example.spec.ts`.
- **`test-data/`**: External JSON data files.
- **`types/`**: TypeScript interfaces for data validation.
- **`utils/`**: Shared helpers.

## Setup
1.  **Clone the Repo**:
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    npx playwright install
    ```

## Usage
### Running Tests
- **Run All Tests**: `npm test`
- **Run in Headed Mode**: `npm run test:chromium`
- **Generate Report**: `npm run report` (Generates single-file Allure report)

### How to Add a New Test
1.  Create a **Data Type** in `types/`.
2.  Add **JSON Data** in `test-data/`.
3.  Create a **Page Object** in `pages/` (encapsulating locators and actions).
4.  Write the **Test Spec** in `tests/`, importing the Page Object and Data.

## Reporting
The framework is configured with **Allure**.
Running `npm run report` automatically generates a standalone `index.html` report.
