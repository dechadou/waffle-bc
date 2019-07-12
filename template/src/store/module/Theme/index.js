import Theme, { SET_THEME } from './Theme';

export const ThemeNamespace = 'Theme';

export const ThemeMutationTypes = {
  SET_THEME: `${ThemeNamespace}/${SET_THEME}`,
};

export default Theme;
