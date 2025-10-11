import { expect, Page, Locator } from '@playwright/test';

interface DateParts {
  day: number;
  month: number;
  year: number;
}

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
  private readonly startDateSelector: Locator;
  private readonly selectYear: Locator;
  private readonly panel: Locator;
  private readonly selectMonth: Locator;
  private readonly elementText: Locator;
  private readonly yearBtn: (y: string) => Locator;
  private readonly months: Locator;
  private readonly monthBtn: (i: number) => Locator;
  private readonly day: (d: string) => Locator;
  private readonly closeOverlayBtn: Locator;


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
    this.startDateSelector = this.modal.locator('#startDate');
    this.selectYear = this.modal.locator("[data-e2e='select-year']");
    this.panel = this.modal.locator('[data-testid="daypicker-panel"]');
    this.yearBtn = (y) => this.panel.getByRole('button', { name: y.toString(), exact: true });
    this.selectMonth = this.modal.locator('[data-e2e="select-month"]');
    this.months = this.panel.locator('button[data-track-action]');
    this.monthBtn = (i: number) => this.months.nth(i);
    this.day = (d) => this.panel.locator("//div[text()='" + d + "']");
    this.elementText = this.modal.locator('div[name="startDate"] span');
    this.closeOverlayBtn = page.locator(".fill-white")
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

  async selectDate({ day, month, year }: DateParts): Promise<void> {
    const expectedMonth = month.toString();
    const expectedDate = day.toString();
    const expectedYear = year.toString();
    const expectedList: string[] = [expectedMonth, expectedDate, expectedYear];

    await this.startDateSelector.click();
    await this.panel.waitFor({ state: 'visible' });
    await this.selectYear.click();
    await this.yearBtn(expectedYear).click();
    await expect(this.selectMonth).toBeVisible();
    await this.selectMonth.click();
    await this.monthBtn(Number(expectedMonth) - 1).click();
    await this.day(expectedDate).click();

    const dateText = (await this.elementText.innerText()).trim();
    const parts = dateText.split(" ");
    const actualDate: string = parts[1];
    const monthName: string = parts[2];
    const actualYear: string = parts[3];
    const monthMap: Record<string, string> = {
      Jan: '1', Feb: '2', Mar: '3', Apr: '4', May: '5', Jun: '6',
      Jul: '7', Aug: '8', Sep: '9', Oct: '10', Nov: '11', Dec: '12'
    };

    const actualMonth: string = monthMap[monthName];
    const actualList: string[] = [actualMonth, actualDate, actualYear];
    expect(actualList).toEqual(expectedList);
  }

  async addEmployee(emp: EmployeeData): Promise<void> {
    await this.openAddEmployee();
    await this.firstName.fill(emp.firstName);
    await this.lastName.fill(emp.lastName);
    await this.email.fill(emp.emailAddress);
    await this.phone.fill(emp.phoneNumber);
    await this.selectDate(startDate);
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
