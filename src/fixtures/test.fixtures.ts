import { test as base } from '@playwright/test';
import { LoginPage } from 'features/auth/LoginPage';
import { Sidebar } from 'features/common/Sidebar';
import { EmployeesPage } from 'features/employees/EmployeesPage';


export const test = base.extend<{
  loginPage: LoginPage;
  sidebarPage: Sidebar;
  employeesPage: EmployeesPage;
}>({
  loginPage: async ({ page }, use) => {const login = new LoginPage(page);
  await login.goto(); // ensure page opens
  await use(login);
},
  sidebarPage: async ({ page }, use) => { await use(new Sidebar(page)); },
  employeesPage: async ({ page }, use) => { await use(new EmployeesPage(page)); },
});


