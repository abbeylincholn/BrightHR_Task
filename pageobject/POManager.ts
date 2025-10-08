import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Sidebar } from './Sidebar';
import { EmployeesPage } from './EmployeesPage';

export class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly sidebar: Sidebar;
  private readonly employeepage: EmployeesPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.sidebar = new Sidebar(this.page);
    this.employeepage = new EmployeesPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getSidebarPage(): Sidebar {
    return this.sidebar;
  }

  getEmployeesPage(): EmployeesPage {
    return this.employeepage;
  }
}
