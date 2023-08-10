import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_API } from "../../playwright.config";

setup("authenticate via api", async ({ request, page }) => {
  // Send authentication request

  // const response = await request.post(
    await page.goto("https://sfsh.ourpact.com/login")
    const response = await page.context().request.post(
    "https://demoqa.com/Account/v1/GenerateToken",
    {
      data: {
        password: "TestingWithR3n@t@",
        userName: "tau-playwright",
      },
    }
  );
  await expect(response.status()).toBe(200);
  console.log("JSON response:");
  console.log(await response.json());
  console.log("Cookies:");
  console.log(await page.context().cookies());  
  // Cookies are not present
  console.log(await page.context().request.storageState().then(() => {
    console.log('state written to file!');
  }).catch((err) => console.log(err)) 
  );
  console.log("storageState:");
  console.log(await page.context().storageState());
  await request.storageState({ path: STORAGE_STATE_API as string });
});
