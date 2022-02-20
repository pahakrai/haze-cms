export const WEB_TOP_MENU_KEY = 'TOP_MENU';

export const getHeaderMenu = (menu = {}) => {
  if (!menu || !Object.keys(menu).length) return;
  return menu[WEB_TOP_MENU_KEY] || {};
};

export default getHeaderMenu;
