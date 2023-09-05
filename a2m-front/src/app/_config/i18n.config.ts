export class I18nConfig {

    public static readonly DEFAULT_LANGUAGE = 'en';
    public static readonly STORAGE_KEY = 'language';

    public static getLanguages(): LanguageItem[] {
        return [
            {
                key: 'vi',
                name: 'Tiếng Việt',
                icon: '/assets/i18n/icon/vi.gif'
            },
            {
                key: 'en',
                name: 'English',
                icon: '/assets/i18n/icon/en.svg'
            },
            {
                key: 'kr',
                name: '한국어',
                icon: '/assets/i18n/icon/kr.svg'
            }
        ];
    }
}

export class LanguageItem {
    key: string;
    name: string;
    icon: string;
    constructor(key: string, name: string, icon: string) {
        this.key = key;
        this.name = name;
        this.icon = icon;
    }
}
