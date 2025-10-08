import { Page, Locator } from '@playwright/test';

export interface LoginData {
  username: string;
  password: string;
}

export class LoginPage {
  private readonly page: Page;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;
  private readonly appHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('#username');
    this.password = page.locator('#password');
    this.signInButton = page.locator("[type='submit']");
    this.appHeader = page.locator('#main-content').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://sandbox-login.brighthr.com/login/');
  }

  async validLogin(creds: LoginData): Promise<void> {
    await this.userName.fill(creds.username);
    await this.password.fill(creds.password);
    await this.signInButton.click();
    await this.appHeader.waitFor();
  }
}
