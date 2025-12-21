import { test } from 'fixtures/test.fixtures';
import data from 'utils/TestData.json' assert { type: 'json' };
import type { EmployeeData } from 'features/employees/EmployeesPage';

test('add two employees and verify listing for users', async ({ loginPage, sidebarPage, employeesPage }) => {
  const [e1, e2] = (data as any).employees as EmployeeData[];  
  await sidebarPage.gotoEmployees();
  await employeesPage.addEmployee(e1);
  await employeesPage.addEmployee(e2);
  await employeesPage.expectEmployeesVisible([e1, e2]);
});



test('add one employees and verify listing for users', async ({ loginPage, sidebarPage, employeesPage }) => {
  const [e1] = (data as any).employees as EmployeeData[]; 
  await sidebarPage.gotoEmployees();
  await employeesPage.addEmployee(e1); 
  await employeesPage.expectEmployeesVisible([e1]);
});
