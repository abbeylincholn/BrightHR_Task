
const { expect } = require('@playwright/test');

class EmployeesPage {
  constructor(page) {
    this.page = page;
    //this.addEmployeeBtn = page.getByRole('button', { name: /add employee/i });
    this.addEmployeeBtn = page.getByRole("button", {name: "Add employee"});
    this.modal = page.getByRole('dialog').filter({ hasText: /add employee/i });
    this.firstName = this.modal.locator('#firstName');
    this.lastName = this.modal.locator('#lastName');
    this.email = this.modal.locator('#email');
    this.phone = this.modal.locator('#phoneNumber');
    this.jobTitle = this.modal.locator('#jobTitle');
    this.saveBtn = this.modal.getByRole('button', { name: /save new employee/i });

    this.startDateSelector = this.modal.locator('#startDate');
    this.selectYear = this.modal.locator("[data-e2e='select-year']");
    this.panel = this.modal.locator('[data-testid="daypicker-panel"]');
    this.yearBtn = (y) => this.panel.getByRole('button', { name: y.toString(), exact: true });

    this.selectMonth = this.modal.locator('[data-e2e="select-month"]');
    this.months = this.panel.locator('.sc-htoDjs.sc-kjoXOD.hMglVo');
    this.monthBtn = (index0) => this.months.nth(index0);

    this.day = (d) => this.panel.locator("//div[text()='" + d + "']");
    this.dayBtn = (d) => this.panel.getByRole('button', { name: new RegExp(`^${d}$`) });

    this.elementText = this.modal.locator('div[name="startDate"] span');

    this.employeesTab = page.locator("[title='Employees']");
    this.grid = page.locator('.grid');   
    this.overlay = page.locator('.w-7.fill-white');   

  

  }

  async selectDate() {
    const expectedMonth = "12";
    const expectedDate = "25";
    const expectedYear = "2025";
    const expectedList = [expectedMonth, expectedDate, expectedYear];

    await this.startDateSelector.click();
    await this.panel.waitFor({ state: 'visible' });
    await this.selectYear.click();
    await this.yearBtn(expectedYear).click();

    await expect(this.selectMonth).toBeVisible();
    await this.selectMonth.click();
    await this.monthBtn(Number(expectedMonth) - 1).click();
    await this.day(expectedDate).click();

    const dateText = await this.elementText.innerText();
    const parts = dateText.split(" ");
    const actualDate = parts[1];
    const monthName = parts[2];
    const actualYear = parts[3];

    const monthMap = {
      Jan: "1", Feb: "2", Mar: "3", Apr: "4", May: "5", Jun: "6",
      Jul: "7", Aug: "8", Sep: "9", Oct: "10", Nov: "11", Dec: "12"
    };
    const actualMonth = monthMap[monthName];
    const actualList = [actualMonth, actualDate, actualYear];

    expect(actualList).toEqual(expectedList);
  }

  async openAddEmployee() {    
    await this.addEmployeeBtn.click();
    await expect(this.modal).toBeVisible();
  }

  async addEmployee({ firstName, lastName, emailAddress, phoneNumber, jobTitle }) {
    await this.openAddEmployee();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(emailAddress);
    await this.phone.fill(phoneNumber);
    await this.selectDate();
    await this.jobTitle.fill(jobTitle);
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();
    await expect(this.modal).toBeHidden();
    await this.overlay.click();
  }

  

  fullName(emp) {
    return `${emp.firstName} ${emp.lastName}`;
  }

  async navigateEmployees() { 
    await this.employeesTab.click();
    await expect(this.grid).toBeVisible();
  }

   employeeName(name) {
    return this.grid.getByRole('heading', { name, exact: false }).first();
  }

  async expectEmployeeVisible(emp) {
    await expect(this.employeeName(this.fullName(emp))).toBeVisible();
  }

  async expectEmployeesVisible(list) {
    for (const emp of list) {
      const ade = await this.expectEmployeeVisible(emp);
      console.log(ade)
    }
  }

}


module.exports = { EmployeesPage };
