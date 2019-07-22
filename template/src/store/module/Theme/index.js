import Theme, { SET_THEME, SET_FOOTER } from './Theme';

export const ThemeNamespace = 'Theme';

export const ThemeMutationTypes = {
  SET_THEME: `${ThemeNamespace}/${SET_THEME}`,
  SET_FOOTER: `${ThemeNamespace}/${SET_FOOTER}`,
};

export default Theme;
