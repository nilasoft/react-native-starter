import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

export function useRTL(): boolean {
  const {i18n} = useTranslation();
  return useMemo(() => {
    let dir = i18n.dir(i18n.language);
    return dir === 'rtl';
  }, [i18n.language]);
}
