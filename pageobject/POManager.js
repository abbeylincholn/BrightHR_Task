const { LoginPage } = require('./LoginPage');
const {Sidebar} = require('./Sidebar');
const {EmployeesPage} = require('./EmployeesPage');


class POManager {

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.sidebar = new Sidebar(this.page)
        this.employeepage = new EmployeesPage(this.page)
        
    }

    getLoginPage(){
        return this.loginPage;
    }

    getSidebarPage(){
        return this.sidebar;
    }

    getEmployeesPage(){
        return this.employeepage;
    }


    
}

module.exports = {POManager}