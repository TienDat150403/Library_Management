import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencySuffix'
})
export class CurrencySuffixPipe implements PipeTransform {
    transform(value: any, currencyCode: string, suffix: string, digitsInfo?: string): any {
        const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: currencyCode, currencyDisplay: 'symbol', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
        const replacedValue = formattedValue.replace('.', ',');
        return replacedValue.replace(currencyCode, '') + suffix;
    }
}