# Lease Calculator E2E Tests

This repository contains end-to-end tests for the Beequip lease calculator. The tests are implemented using **Playwright Test** with **TypeScript** and are fully data-driven, allowing testing of multiple down payments and tenors.

---

##Approach

Aim for Data-driven testing: Test multiple combinations of down payment and tenor without duplicating code. (this tests are still a little flaky, and the update on the lease calculator is not working correctly with the automation framework)

Reusable helpers: Encapsulate repeated actions like opening accordions, selecting filters, and submitting forms. (So the navigation to the lease calculator would be smoother, and without repeating code)

Cross-browser considerations: Firefox receives a conditional cookie injection to avoid domain issues. (firefox needs to be injected a cookie so we can advance to the calculation results poage)

Explicit waits & keyboard events: Ensures reliable interaction with dynamic elements like autocomplete inputs.

Reporting: HTML reports with screenshots and traces on failures to facilitate debugging.

My main focus was to cover the e2e trajectory of the lease calculation feature. I was able to deliver the MVP in the desired time. I also aimed for some strech points, although the data-driven tests are still flaky, and not a representations of my full potential. Thank you for your time.

## Features

- Data-driven tests for lease calculations.
- Cross-browser support: Chromium, Firefox, and WebKit.
- Conditional cookie injection for Firefox to bypass domain-specific restrictions.
- Explicit waits for dynamic elements like autocomplete and accordion updates.
- Reports generated in HTML format with traces and screenshots on failures.

---

## Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/lease-calculator-e2e.git
cd lease-calculator-e2e

npm install

npx playwright install
```

2. Run the tests

```bash

npx playwright test

*for specific browser*

npx playwright test --project=chromium

*Generate an HTML report*

npx playwright show-report

```
