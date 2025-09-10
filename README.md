# Test automation engineer test

We'll be using this test to assess your skill level as a test automation engineer. This test is designed to test your skills which are needed in the day-to-day job of a test automation engineer at [Beequip](https://beequip.com). 
We expect you to spend a maximum of four hours on this test. You can use Google and Stack Overflow, just like you would normally do. Don't worry when you run out of time though, we would still like to see what you came up with!

## Objectives and requirements

Use the Playwright set-up to implement and end-to-end test to the user journey of visiting Beequip's website, finding pre-owned equipment on the marketplace and requesting a quote using the lease calculator.
This means that we expect you to come up with assertions for the following interactions:

  - Visit the **test** website of Beequip (https://staging.beequip.com/)
    - This website is protected by Basic authentication, in `playwright.config.js` credentials are provided to run the Playwright tests
    - You can use the same credentials to navigate the page on your own browser
  - Navigate from the website to the Marketplace
  - Find a _Vrachtwagen_ with _Schuifzeilen_ that fits the following requirements:
    - With a _bouwjaar_ between 2018 and 2023
    - With a _kilometerstand_ less than 300.000 kilometers
    - With six _cilinders_
  - Navigate to the ad of the found equipment
  - **Stretch goal:** Calculate a monthly price using the lease calculator
    - Search for Beequip as the company (_KVK-nummer:_ 63204258)
    - Use the `@example.com` or `@mailinator.com` domain
    - **Caution:** Don't calculate for other companies, to prevent burdening our sales team
  - **Stretch goal:** Increase the _aanbetaling_ and _looptijd_ to reduce the monthly price
  - **Stretch goal:** Add data-driving tests for the _aanbetaling_ and _looptijd_ components

Requirements that you need to take into account:

  - Playwright should be used to implement the tests
  - Typescript is not mandatory
  - At least two browsers should be supported
  - A report with the test findings should be produced

## Getting started

Make sure that you can run Node 18.x and Yarn 1.22.x on your laptop and get started using:

```
# Install the dependencies
yarn install

# Run the tests
yarn playwright test
yarn playwright test --ui
```

## Deliverables

Send us a link to the hosted repository with your code. It can be hosted anywhere e.g. Github, Gitlab as long as you provide us access. 
Include all the code and instructions that are necessary to run the end-to-end tests and to verify the requirements.
Write a small paragraph (3-6 sentences) on your approach and design decisions.

## Questions

In case you have questions about the test you can contact Jan van der Pas (jan.vanderpas@beequip.nl), Marthyn Olthof (marthyn.olthof@beequip.nl) or René Sijnke (rene.sijnke@beequip.nl).
