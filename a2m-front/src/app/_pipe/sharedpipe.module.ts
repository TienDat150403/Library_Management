
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { CurrencySuffixPipe } from './format_currency.pipe';
import { GenreFormatPipe } from './formatGenre.pipe';

@NgModule({
    declarations: [
        GenderPipe,
        CurrencySuffixPipe,
        GenreFormatPipe
    ],
    exports: [
        GenderPipe,
        CurrencySuffixPipe,
        GenreFormatPipe
    ]
})

export class SharedPipeModule {
    static forRoot(): ModuleWithProviders<SharedPipeModule> {
        return {
            ngModule: SharedPipeModule,
            //   providers: [ CurrencySuffixPipe ]
        };
    }
}