const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator('#username');
    this.password = page.locator('#password');
    this.signInButton = page.locator("[type='submit']");
    this.pageLoad = page.locator(".py-2.text-3xl.font-bold").first();
  }

  async goto() {
    await this.page.goto("https://sandbox-login.brighthr.com/login/");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.pageLoad.waitFor();    
  }
}

module.exports = { LoginPage };
