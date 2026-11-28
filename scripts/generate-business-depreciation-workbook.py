from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

workbook = Workbook()
inputs = workbook.active
inputs.title = 'Inputs'
schedule = workbook.create_sheet('Annual schedule')
inputs.append(['BUSINESS DEPRECIATION', 'USD / full years'])
inputs.append(['Asset cost', 12000])
inputs.append(['Residual value', 2000])
inputs.append(['Useful life (years)', 5])
inputs.append(['Method', 'Straight-line'])
inputs.append(['Input check', '=IF(AND(COUNT(B2:B4)=3,B2>=0,B2<=1000000000,B3>=0,B3<=B2,B4>=1,B4<=100,B4=INT(B4),ROUND(B2,2)=B2,ROUND(B3,2)=B3,OR(B5="Straight-line",B5="Double-declining")),"Ready","Check inputs")'])
inputs.append(['Expected total depreciation', '=IF(B6="Ready",ROUND(B2-B3,2),"")'])
inputs.append(['Schedule total depreciation', '=IF(B6="Ready",ROUND(SUM(\'Annual schedule\'!C2:C101),2),"")'])
inputs.append(['Final closing book value', '=IF(B6="Ready",INDEX(\'Annual schedule\'!E2:E101,B4),"")'])
inputs.append(['Reconciliation', '=IF(B6<>"Ready","Check inputs",IF(AND(B7=B8,B9=B3),"Balanced","Check schedule"))'])
inputs.append(['Scope', 'One asset. Full-year book depreciation, USD.'])
inputs.append(['Rounding', 'Round each year to cents. Final year allocates the balance above residual.'])
inputs.append(['Method', 'Double-declining applies 2 ÷ useful life to opening book value.'])
inputs.append(['Source / web calculator', 'https://mybreakeven.com/calculators/business-depreciation-calculator/'])
inputs['B14'].hyperlink = inputs['B14'].value
inputs['B14'].style = 'Hyperlink'

validations = [
    ('B2', DataValidation(type='custom', formula1='AND(ISNUMBER(B2),B2>=0,B2<=1000000000,ROUND(B2,2)=B2)')),
    ('B3', DataValidation(type='custom', formula1='AND(ISNUMBER(B3),B3>=0,B3<=B2,ROUND(B3,2)=B3)')),
    ('B4', DataValidation(type='whole', operator='between', formula1=1, formula2=100)),
    ('B5', DataValidation(type='list', formula1='"Straight-line,Double-declining"')),
]
for cell, validation in validations:
    validation.showErrorMessage = True
    validation.errorTitle = 'Invalid value'
    validation.error = 'Check the amount, useful life or method.'
    inputs.add_data_validation(validation)
    validation.add(inputs[cell])
    inputs[cell].fill = PatternFill('solid', fgColor='E1F1FB')

schedule.append(['Year', 'Opening book value', 'Annual expense', 'Accumulated depreciation', 'Closing book value'])
for row in range(2, 102):
    year = row - 1
    opening = 'Inputs!$B$2' if row == 2 else f'E{row-1}'
    available = f'ROUND(B{row}-Inputs!$B$3,2)'
    base = f'IF(Inputs!$B$5="Straight-line",(Inputs!$B$2-Inputs!$B$3)/Inputs!$B$4,B{row}*2/Inputs!$B$4)'
    schedule.append([
        f'=IF(AND(Inputs!$B$6="Ready",{year}<=Inputs!$B$4),{year},"")',
        f'=IF(A{row}="","",{opening})',
        f'=IF(A{row}="","",IF(A{row}=Inputs!$B$4,{available},MIN({available},ROUND({base},2))))',
        f'=IF(A{row}="","",ROUND(Inputs!$B$2-E{row},2))',
        f'=IF(A{row}="","",ROUND(B{row}-C{row},2))',
    ])
    for cell in schedule[row][1:]:
        cell.number_format = '"$"#,##0.00'

for row in [2, 3, 7, 8, 9]:
    inputs[f'B{row}'].number_format = '"$"#,##0.00'
for sheet, widths in [(inputs, [35, 90]), (schedule, [11, 24, 21, 28, 24])]:
    sheet.freeze_panes = 'A2'
    for cell, width in zip(sheet[1], widths):
        sheet.column_dimensions[cell.column_letter].width = width
        cell.fill = PatternFill('solid', fgColor='153749')
        cell.font = Font(color='FFFFFF', bold=True)
        cell.alignment = Alignment(vertical='center')
    sheet.row_dimensions[1].height = 27

output = Path(__file__).resolve().parents[1] / 'public/downloads/business-depreciation-schedule.xlsx'
workbook.save(output)
print(output)
