class Sidebar {
  constructor(page) {
    this.page = page;
    this.employeesTab = page.locator("[title='Employees']");
    this.pageLoad = page.locator(".py-2.text-3xl.font-bold").first();
  }

  async gotoEmployees() {
    await this.pageLoad.waitFor();    
    await this.employeesTab.click();   
  }
}

module.exports = { Sidebar };
