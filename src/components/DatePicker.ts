import { expect, Page, Locator } from '@playwright/test';

export interface DateParts {
  day: number;
  month: number;
  year: number;
}

export class DatePicker {
  private readonly page: Page;
  private readonly modal: Locator; 
  private readonly startDateSelector: Locator;
  private readonly selectYear: Locator;
  private readonly panel: Locator;
  private readonly selectMonth: Locator;
  private readonly elementText: Locator;
  private readonly yearBtn: (y: string) => Locator;
  private readonly months: Locator;
  private readonly monthBtn: (i: number) => Locator;
  private readonly day: (d: string) => Locator; 


  constructor(page: Page) {
    this.page = page;  
    this.modal = page.getByRole('dialog').filter({ hasText: /add employee/i });    
    this.startDateSelector = this.modal.locator('#startDate');
    this.selectYear = this.modal.locator("[data-e2e='select-year']");
    this.panel = this.modal.locator('[data-testid="daypicker-panel"]');
    this.yearBtn = (y) => this.panel.getByRole('button', { name: y.toString(), exact: true });
    this.selectMonth = this.modal.locator('[data-e2e="select-month"]');
    this.months = this.panel.locator('button[data-track-action]');
    this.monthBtn = (i: number) => this.months.nth(i);
    this.day = (d) => this.panel.locator("//div[text()='" + d + "']");
    this.elementText = this.modal.locator('div[name="startDate"] span');
  
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

}
