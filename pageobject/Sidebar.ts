
import { Page, Locator } from '@playwright/test';

export class Sidebar {
  private readonly page: Page;
  private readonly employeesTab: Locator;
  private readonly appHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appHeader = page.locator('#main-content').first();
    this.employeesTab = page.locator('[title="Employees"]');
  }

  async gotoEmployees(): Promise<void> {
    await this.appHeader.waitFor();
    await this.employeesTab.click();
  }
}
