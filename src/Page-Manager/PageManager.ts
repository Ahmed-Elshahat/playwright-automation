//import { LoginPage } from "./Project-Name1/Login_Page/loginPage";
import { Page } from "@playwright/test";
//import { ProductPage } from "./Project-Name1/Products_Page/ProductsPage";

export class PageManager {
  public static instance: PageManager | null = null;
  public readonly page: Page;
  //public readonly loginPage: LoginPage;
  //public readonly productPage: ProductPage;

  constructor(page: Page) {
    this.page = page;
    // this.loginPage = new LoginPage(this.page);
    // this.productPage = new ProductPage(this.page);
  }

  public static getInstance(page: Page): PageManager {
    if (!PageManager.instance) {
      PageManager.instance = new PageManager(page);
    }
    return PageManager.instance;
  }

  lgnPage() {
    //  return this.loginPage;
  }

  productpage() {
    //  return this.productPage;
  }
}
