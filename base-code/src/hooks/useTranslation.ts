import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }

    if (typeof value === 'string' && options) {
      Object.keys(options).forEach(key => {
        value = value.replace(`{${key}}`, String(options[key]));
      });
    }

    return typeof value === 'string' ? value : key;
  };

  return { t };
};