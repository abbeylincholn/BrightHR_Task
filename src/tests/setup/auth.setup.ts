import { test } from '@playwright/test';
import { LoginPage } from 'features/auth/LoginPage';

test('bootstrap authenticated state', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto(); 
  await login.validLogin({
    username: process.env.BRITHR_USERNAME!,    
    password: process.env.BRITHR_PASSWORD!
  });
  await page.context().storageState({ path: 'storageState.json' });
});
