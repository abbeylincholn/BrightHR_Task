import { test } from '@playwright/test';
import data from '../utils/TestData.json';
import { POManager } from '../pageobject/POManager';
import type { EmployeeData } from '../pageobject/EmployeesPage';

type TestData = [
  { username: string; password: string },
  EmployeeData,
  EmployeeData
];

test('add two employees and verify listing for users', async ({ page }) => {
  const poManager = new POManager(page);

  const [creds, e1, e2] = data as unknown as TestData;
  const username: string = creds.username;
  const password: string = creds.password;

  const employee1: EmployeeData = e1 as EmployeeData;
  const employee2: EmployeeData = e2 as EmployeeData;

  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin({ username, password });

  const sidebarPage = poManager.getSidebarPage();
  await sidebarPage.gotoEmployees();

  const employeesPage = poManager.getEmployeesPage();
  await employeesPage.addEmployee(employee1);
  await employeesPage.addEmployee(employee2);

  await employeesPage.navigateEmployees();
  await employeesPage.expectEmployeesVisible([employee1, employee2]);
});
