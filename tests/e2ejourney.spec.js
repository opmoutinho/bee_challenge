// @ts-check
import { test, expect} from '@playwright/test';

test('I navigate to the webstie and use the lease calculator', async ({browserName, browser})=> {
  const context = await browser.newContext();

  if (browserName === 'firefox') {
    await context.addCookies([{
      name: 'ZukoDomainCheck_1757492495352',
      value: 'true',
      domain: '.staging.beequip.com',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax'
    }]);
  }
  const page = await context.newPage();
  await page.goto('https://staging.beequip.com/');

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('link', { name: 'Vind je materieel' }).click()
  ]);

  await openCategory(newPage);
  await selectSchuifzeilen(newPage);
  await fillFilters(newPage);
  await fillLeaseFormAndSubmit(newPage, '63204258', 'pmoutest@example.com');
})

const leaseTestData = [
  { downPayment: '30000', tenor: '96' },
  { downPayment: '45000', tenor: '96' },
  { downPayment: '15000', tenor: '48' },
];


test.describe('Lease Calculator Data-Driven Tests', () => {
  leaseTestData.forEach(({ downPayment, tenor }) => {
    test(`Lease calculation for downpayment ${downPayment} and tenor ${tenor} months`, async ({ browser, browserName }) => {
      const context = await browser.newContext();

      if (browserName === 'firefox') {
        await context.addCookies([{
          name: 'ZukoDomainCheck_1757492495352',
          value: 'true',
          domain: '.staging.beequip.com',
          path: '/',
          httpOnly: false,
          secure: true,
          sameSite: 'Lax'
        }]);
      }

      const page = await context.newPage();
      await page.goto('https://staging.beequip.com/');

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByRole('link', { name: 'Vind je materieel' }).click()
      ]);

      await openCategory(newPage);
      await selectSchuifzeilen(newPage);
      await fillFilters(newPage);
      await fillLeaseFormAndSubmit(newPage, '63204258', 'pmoutest@example.com');

      const monthlyPaymentLocator = newPage.locator('div[data-hook="monthly-payment"] h2');
      let initialLeasePrice = await monthlyPaymentLocator.innerText();
      initialLeasePrice = initialLeasePrice.replace(/\D/g, '');

      await newPage.locator('input[data-hook="tenor-input"]').fill(tenor);
      await newPage.locator('input[data-hook="downpayment-input"]').clear()
      await newPage.locator('input[data-hook="downpayment-input"]').type(downPayment, { delay: 1000 });
      
      await newPage.keyboard.press('Tab');

      newPage.waitForTimeout(15000)

      await newPage.waitForFunction(
        (selector, oldValue) => {
          const el = document.querySelector(selector);
          return el && el.innerText.replace(/\D/g, '') !== oldValue;
        },
        'div[data-hook="monthly-payment"] h2'
      );

      let leasePrice = await monthlyPaymentLocator.innerText();
      leasePrice = leasePrice.replace(/\D/g, '');

      expect(leasePrice).not.toBe(initialLeasePrice);
    });
  });
});



async function openAccordion(page, name) {
  const accordion = page.locator(`legend:has-text("${name}")`);
  await accordion.scrollIntoViewIfNeeded();
  await accordion.waitFor({ state: 'visible' });
  await accordion.click();
}

async function openCategory(newPage) {
  await newPage.locator('article[data-hook="category-card"] a:has-text("Vrachtwagen")').click();
  await expect(newPage).toHaveURL(/.*\/marktplaats\/vrachtwagen/);
}

async function selectSchuifzeilen(newPage) {
  await newPage.getByRole('button', { name: 'Bekijk meer' }).click();
  await newPage.getByLabel('Schuifzeilen').check();
  await expect(newPage.getByLabel('Schuifzeilen')).toBeChecked();
}

async function fillFilters(newPage) {
  await openAccordion(newPage, 'Bouwjaar');
  await newPage.locator('input[data-hook="aggregation-yearOfConstruction-from"]').fill('2018');
  await newPage.locator('input[data-hook="aggregation-yearOfConstruction-to"]').fill('2023');
  await newPage.getByRole('button', { name: 'Ok' }).click();

  await openAccordion(newPage, 'Kilometerstand');
  await newPage.locator('input[data-hook="aggregation-usageInKilometers-from"]').fill('0');
  await newPage.locator('input[data-hook="aggregation-usageInKilometers-to"]').fill('300000');
  const kmAccordion = newPage.locator('div.sc-af1ad99f-6.beoaLq', { has: newPage.locator('legend:has-text("Kilometerstand")') });
  await kmAccordion.locator('button:has-text("Ok")').click();

  await openAccordion(newPage, 'Aantal cilinders');
  const accordion = newPage.locator('legend:has-text("Aantal cilinders")');
  const checkboxContainer = accordion.locator('xpath=following-sibling::div//div[@data-hook="aggregation-checkbox"]').filter({ has: newPage.locator('span:has-text("6")') });
  const checkbox = checkboxContainer.locator('input[type="checkbox"]');
  await checkbox.check({ force: true });

  
}

 async function fillLeaseFormAndSubmit(newPage, kvkNumber, email) {
  await newPage.click('article[data-hook="object-card"] a[href="/marktplaats/objecten/113415-mercedes-benz-actros-2127-schuifzeil-box-laadklep-apk-07-25/"]');

  await newPage.getByRole('link', { name: 'Maandbedrag berekenen' }).click();

  const input = newPage.locator('input[data-hook="company-search-input"]');
  await input.type(kvkNumber, { delay: 1000 });

  await newPage.waitForFunction(() => {
    const combo = document.querySelector('div[role="combobox"]');
    return combo && combo.getAttribute('aria-expanded') === 'true';
  });

  const firstOption = newPage.locator('#downshift-0-item-0');
  await firstOption.waitFor({ state: 'visible' });
  await firstOption.click();

  await newPage.locator('input[data-hook="contact-person-email"]').fill(email);

  await newPage.locator('button[data-hook="go-to-lease-price"]').click();

  await expect(newPage.locator('div[data-hook="monthly-payment"] h2')).toBeVisible();
}
