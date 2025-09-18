const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobject/POManager');
//const dataset = require('../utils/TestData.json');
const data = JSON.parse(JSON.stringify(require('../utils/TestData.json')));



test('add two employees and verify listing for users', async ({ page }) => {

    const poManager = new POManager(page);

    const username = data[0].username;
    const password = data[0].password;
    const employee1 = data[1]
    const employee2 = data[2]

    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(username, password);

    const sidebarPage = poManager.getSidebarPage();
    await sidebarPage.gotoEmployees();

    const employeepage = poManager.getEmployeesPage();
    await employeepage.addEmployee(employee1)   
    await employeepage.addEmployee(employee2)

    await employeepage.navigateEmployees();
    await employeepage.expectEmployeesVisible([employee1, employee2]);



    // await employeepage.addEmployee(employee1)
    // await employeepage.addEmployee(employee2)


});




