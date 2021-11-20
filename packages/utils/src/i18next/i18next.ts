import { useTranslation as useI18nextTranslation } from 'react-i18next';

// useTranslation hook if app dosnt use react-i18next;
export const useTranslation = (): { t: (s: string) => string } => {
  if (useI18nextTranslation) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useI18nextTranslation();
  }
  return {
    t: (s: string) => s,
  };
};
