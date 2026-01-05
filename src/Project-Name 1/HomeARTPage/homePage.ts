import { Locator, Page } from "@playwright/test";
import { PageBase } from "../../Base-Methods/PageBase";
export class home_Page extends PageBase {
  public readonly urlStageLink: string;
  public readonly allowPermissionButton: Locator;
  public readonly ourProducts: Locator;
  public readonly motorInsurance: Locator;

  constructor(page: Page) {
    super(page);
    this.urlStageLink = process.env.Stage!;
    this.allowPermissionButton = this.page.getByText("Allow", { exact: true });
    this.ourProducts = this.page.locator("#megaMenuButton");
    this.motorInsurance = this.page.locator("//a[text()=' Motor Insurance ']");
  }

  async openArtPage(url: string) {
    await this.clearAllCookies();
    await this.navigateToPage(url);
    // Wait for a key element to be visible instead of a hard wait
    await this.waitUntilVisibilityOfElement(this.allowPermissionButton);
  }

  async clickOnAllowButtonForAccess() {
    await this.clickButton(this.allowPermissionButton);
  }
  async moveTheCursorToOurProductsButton() {
    await this.moveToElement(this.ourProducts);
  }
  async clickOnMotorInsuranceButtonFromTheProductList() {
    await this.clickButton(this.motorInsurance);
  }
}
