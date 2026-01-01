/*
import test from "@playwright/test";
import { PageManager } from "../../../src/PageManager";
import path from "path";
import { ExcelReader } from "../../../utils/ExcelReader";
let pm: any;

export const EXCEL_LOGIN_PATH = path.join(
  process.cwd(),
  "Data",
  "admin-credentails.xlsx"
);
const excel = new ExcelReader(EXCEL_LOGIN_PATH);
const loginData = excel.getSheetData("Sheet1");
test.describe("@Login Login Test", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.lgnPage().navigateToLoginPage();
  });

  for (const data of loginData) {
    test(`Login Test Case with user: ${data.username}`, async ({ page }) => {
      await pm.lgnPage().navigateToLoginPage();
      await pm.lgnPage().fillUserName(data.username);
      await pm.lgnPage().fillPassword(data.password);
      await pm.lgnPage().clickOnLoginButton();
    });
  }
});
*/
