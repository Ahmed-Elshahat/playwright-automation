import test from "@playwright/test";
import { PageManager } from "../../../src/Page-Manager/PageManager";
import { JsonReader } from "../../../utils/JsonReader";

let pm: any;

test.describe("@Open Open the ART website", () => {
  test("Open the ART website", async ({ page }) => {
    pm = new PageManager(page);
    await pm.ARTHomePage().openArtPage(JsonReader.getEnv("dev").baseUrl);
  });
});
