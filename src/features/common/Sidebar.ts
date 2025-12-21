
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
    await this.appHeader.waitFor({ state: 'visible' });
    await this.employeesTab.click();
  }
}


// import { Page, Locator } from '@playwright/test';

// export class Sidebar {
//   private readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   private get employeesTab(): Locator {
//     return this.page.locator('[title="Employees"]');
//   }

//   private get appHeader(): Locator {
//     return this.page.locator('#main-content').first();
//   }

//   async gotoEmployees(): Promise<void> {
//     await this.appHeader.waitFor({ state: 'visible', timeout: 10000 });
//     await this.employeesTab.waitFor({ state: 'visible', timeout: 10000 });
//     await this.employeesTab.click();
//   }
// }
