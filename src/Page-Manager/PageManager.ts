import { Page } from "@playwright/test";
import { home_Page } from "../Project-Name 1/HomeARTPage/homePage";
import { MotorInsurancePage } from "../Project-Name 1/OurProducts/MotorInsurancePage";

export class PageManager {
  public static instance: PageManager | null = null;
  public readonly page: Page;
  public readonly homePage: home_Page;
  public readonly motorInsurancePage: MotorInsurancePage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new home_Page(this.page);
    this.motorInsurancePage = new MotorInsurancePage(this.page);
  }

  public static getInstance(page: Page): PageManager {
    if (!PageManager.instance) {
      PageManager.instance = new PageManager(page);
    }
    return PageManager.instance;
  }

  ARTHomePage() {
    return this.homePage;
  }
  InMotorInsurancePage() {
    return this.motorInsurancePage;
  }
}
