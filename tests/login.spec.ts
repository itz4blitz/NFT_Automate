import { test, expect } from '@playwright/test';
import { loginPO } from '../page-objects/solsea/loginPageObject';

test('Logging in to SolSea.io as User 1', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}login`)
    const loginPage = new loginPO(page);
    await loginPage.login(`${process.env.USER_1}`, `${process.env.USER_1_PASS}`)
    expect(await loginPage.checkIsLoggedIn());
    await page
      .context()
      .storageState({ path: '../storageState/user1.json'});
});

test.describe("User 1 - tests utilizing User1 storageState.json", () => {
  test.use({ storageState: '../storageState/user1.json'})

  test("Verify storageState is valid",  async ({page}) => {
    await page.goto(`${process.env.BASE_URL}`);
    const loginPage = new loginPO(page);
    const isLoggedIn = await loginPage.checkIsLoggedIn();
    if (!isLoggedIn){
      test.fail();
    }
  });

})