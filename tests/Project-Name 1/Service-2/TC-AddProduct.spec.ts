/*
import { test } from "@playwright/test";
import { PageManager } from "../../../src/PageManager";
import { allure } from "allure-playwright";

test.describe.serial("Add Product to the Cart Test Case", () => {
  let page;
  let pm: PageManager;

  test.beforeAll(async ({ browser }) => {
    // allure.feature("Add To Cart E2E");
    //allure.story("User Can Add any product to the cart");
    // allure.description("descriptionnnnnnnnnnnn");

    const context = await browser.newContext();
    page = await context.newPage();
    pm = PageManager.getInstance(page);
    await test.step("Filling Login Credentials", async () => {
      await pm.lgnPage().navigateToLoginPage();
      await pm.lgnPage().fillUserName(process.env.Username!);
      await pm.lgnPage().fillPassword(process.env.Password!);
      await pm.lgnPage().clickOnLoginButton();
    });
  });

  test("Clicking on Add To Cart button", async () => {
    await test.step("Verify ELement Exists and Click on Add To Cart button", async () => {
      allure.step("Add product to cart", async () => {
        await pm
          .productpage()
          .waitTillAddToCardElementExist(pm.productPage.AddToCartButton);
        await pm.productpage().clickOnAddToCardButton();
      });
    });
  });

  test("Clicking on Shopping Cart Icon", async () => {
    await test.step("Verify ELement Exists and Click on Shopping Cart Icon", async () => {
      await pm
        .productpage()
        .waitTillAddToCardElementExist(pm.productPage.shoppingCartIcon);
      await pm.productpage().clickOnShoppingCartIcon();
    });
  });
});
*/
