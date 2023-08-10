import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_API } from "../../playwright.config";

setup("authenticate via api", async ({ request }) => {
  // Send authentication request
  const response = await request.post(
    "https://demoqa.com/Account/v1/GenerateToken",
    {
      form: {
        password: "TestingWithR3n@t@",
        userName: "tau-playwright",
      },
    }
  );
  await expect(response.status()).toBe(200);
  console.log("JSON response:");
  console.log(await response.json());
  console.log(await request.storageState());
  await request.storageState({ path: STORAGE_STATE_API as string });
});
