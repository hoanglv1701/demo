export const findFirstMenu = (menu: any[]) => {
  for (const item of menu) {
    if (item.component) {
      return item;
    }
    if (item.children) {
      const found: any = findFirstMenu(item.children);
      if (found) return found;
    }
  }
  return null;
};
