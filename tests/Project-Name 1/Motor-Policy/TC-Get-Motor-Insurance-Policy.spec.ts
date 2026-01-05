import { test, Page } from "@playwright/test";
import { PageManager } from "../../../src/Page-Manager/PageManager";
import { JsonReader } from "../../../utils/JsonReader";

test.describe.serial("Add Product to the Cart Test Case", () => {
  let page: Page;
  let pm: PageManager;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    pm = PageManager.getInstance(page);

    await test.step("Open The ART Website", async () => {
      await pm.ARTHomePage().openArtPage(JsonReader.getEnv("dev").baseUrl);
    });
  });
  test("Click on Allow Button From the Pop-up", async () => {
    await test.step("Click on Allow Button From the Pop-up", async () => {
      await pm.ARTHomePage().clickOnAllowButtonForAccess();
    });
  });
  test("Click on Our Prodcuts Button", async () => {
    await test.step("Click on Our Prodcuts Button", async () => {
      await pm.ARTHomePage().moveTheCursorToOurProductsButton();
    });
  });
  test("Click on Motor Insurance Option", async () => {
    await test.step("Click on Motor Insurance Option", async () => {
      await pm.ARTHomePage().clickOnMotorInsuranceButtonFromTheProductList();
    });
  });
  test("Click on Get Your Policy Now", async () => {
    await test.step("Click on Get Your Policy Now", async () => {
      await pm
        .InMotorInsurancePage()
        .clickOnGetYourPolicyNowAfterClickingOnMotorInsuranceOption();
    });
  });
  test("Filling the 'Get Your Policy' - Motor Insurance", async () => {
    await test.step("Filling the Motor Insurance Form", async () => {
      await pm.InMotorInsurancePage().fillingThePolicyHolderDetails();
    });
  });
});
