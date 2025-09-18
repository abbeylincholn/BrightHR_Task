class Sidebar {
  constructor(page) {
    this.page = page;
    this.employeesTab = page.locator("[title='Employees']")
  }

  async gotoEmployees() {
    await this.employeesTab.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { Sidebar };
