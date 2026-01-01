import * as XLSX from "xlsx";

export class ExcelReader {
  private workbook: XLSX.WorkBook;

  constructor(filePath: string) {
    this.workbook = XLSX.readFile(filePath);
  }

  getSheetData(sheetName: string): any[] {
    const sheet = this.workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }
    return XLSX.utils.sheet_to_json(sheet);
  }
}
