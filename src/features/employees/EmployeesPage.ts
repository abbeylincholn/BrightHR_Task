import { expect, Page, Locator } from '@playwright/test';
import { DatePicker, DateParts } from 'components/DatePicker';


const startDate: DateParts = { day: 25, month: 12, year: 2025 };

export interface EmployeeData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  jobTitle: string;
}

export class EmployeesPage {
  private readonly page: Page;
  private readonly grid: Locator;
  private readonly addEmployeeBtn: Locator;
  private readonly modal: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly phone: Locator;
  private readonly jobTitle: Locator;
  private readonly saveBtn: Locator; 
  private readonly closeOverlayBtn: Locator;
  private readonly datePicker: DatePicker;

  constructor(page: Page) {
    this.page = page;
    this.grid = page.locator('.grid');
    this.addEmployeeBtn = page.getByRole('button', { name: 'Add employee' });
    this.modal = page.getByRole('dialog').filter({ hasText: /add employee/i });
    this.firstName = this.modal.locator('#firstName');
    this.lastName = this.modal.locator('#lastName');
    this.email = this.modal.locator('#email');
    this.phone = this.modal.locator('#phoneNumber');
    this.jobTitle = this.modal.locator('#jobTitle');
    this.saveBtn = this.modal.getByRole('button', { name: /save new employee/i });     
    this.closeOverlayBtn = page.getByRole('button', { name: /close modal/i });    
    this.datePicker = new DatePicker(page);
  }

  private fullName(emp: Pick<EmployeeData, 'firstName' | 'lastName'>): string {
    return `${emp.firstName} ${emp.lastName}`;
  }

  private employeeCardByName(name: string): Locator {
    return this.grid.getByRole('heading', { name, exact: false }).first();
  }

  async openAddEmployee(): Promise<void> {
    await this.addEmployeeBtn.click();
    await expect(this.modal).toBeVisible();
  }

  async addEmployee(emp: EmployeeData): Promise<void> {
    await this.openAddEmployee();
    await this.firstName.fill(emp.firstName);
    await this.lastName.fill(emp.lastName);
    await this.email.fill(emp.emailAddress);
    await this.phone.fill(emp.phoneNumber);
    await this.datePicker.selectDate(startDate);
    await this.jobTitle.fill(emp.jobTitle);
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();
    await expect(this.modal).toBeHidden();
    await this.closeOverlayBtn.click();
  }

  async expectEmployeeVisible(emp: EmployeeData): Promise<void> {
    const name = this.fullName(emp);
    await expect(this.employeeCardByName(name)).toBeVisible();
  }

  async expectEmployeesVisible(list: EmployeeData[]): Promise<void> {
    for (const emp of list) {
      await this.expectEmployeeVisible(emp);
    }
  }

  async navigateEmployees(): Promise<void> {
    await expect(this.grid).toBeVisible();
  }
}
