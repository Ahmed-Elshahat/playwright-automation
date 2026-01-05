import { Locator, Page } from "@playwright/test";
import { PageBase } from "../../Base-Methods/PageBase";

export class MotorInsurancePage extends PageBase {
  public readonly getYourPolicyNow: Locator;
  public readonly nationalID_IqamaIDField: Locator;
  public readonly dateOfBirthField: Locator;
  public readonly mobileNumberField: Locator;
  public readonly sequenceNumberSection: Locator;
  public readonly sequenceNumberFieldFromTheSequenceNumberSection: Locator;

  constructor(page: Page) {
    super(page);
    this.getYourPolicyNow = this.page.locator(
      "//button[@class='d-flex gap-2 align-items-center text-capitalize lg primary w-100 color-white background-main-light-blue']"
    );
    this.nationalID_IqamaIDField = this.page.getByPlaceholder(
      "National ID / Iqama ID"
    );
    this.dateOfBirthField = this.page.locator("#mat-input-5");
    this.mobileNumberField = this.page.getByPlaceholder("5XXXXXXXX");
    this.sequenceNumberSection = this.page.locator(
      "//section[@class='MotorCard d-flex flex-column gap-3 rounded-20 px-4 py-4 align-items-start h-100 background-bg-white border-1px-main-light-blue MotorCard--shadow cursor-pointer bgClass ng-star-inserted']"
    );
    this.sequenceNumberFieldFromTheSequenceNumberSection =
      this.page.locator("");
  }

  async clickOnGetYourPolicyNowAfterClickingOnMotorInsuranceOption() {
    await this.clickButton(this.getYourPolicyNow);
  }

  async fillingThePolicyHolderDetails() {
    await this.setText(this.nationalID_IqamaIDField, "1022852311");
  }
}
