import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_API } from "../../playwright.config";

setup("authenticate via api", async ({ request }) => {
  // Send authentication request
  const response = await request.post(
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

  // Extract cookies from the JSON response
  const jsonResponse = await response.json();
  const cookies = jsonResponse.cookies;

  // Set the cookies in the request object
  await request.setCookies(cookies);

  console.log(await request.storageState());
  await request.storageState({ path: STORAGE_STATE_API as string });
});
