import { MenuProps } from 'antd';

export enum Theme {
  Primary = 'primary',
  Secondary = 'secondary',
  Thirdary = 'thirdary'
}
export const themes: { [key: string]: { [key: string]: string } } = {
  [Theme.Primary]: {
    '--gt-base-color': '#1b524f',
    '--gt-primary-color-rgb': '27, 82, 79' /** #1b594f*/,
    '--gt-primary-color': 'rgb(var(--gt-primary-color-rgb))',
    '--gt-success-color': '#52c41a',
    '--gt-warning-color': '#faad14',
    '--gt-error-color': '#a9081c',
    '--gt-info-color': '#2f49ff',
    '--gt-link-color': '#8a2be2',
    '--gt-submit-color': '#2b5654',
    '--gt-form-item-label-color': '#4b0310',
    '--gt-light-green-color': '#dcf0cc',
    '--gt-active-bg-color-rgb': 'rgb(0, 164, 126)',
    '--gt-active-bg-color': 'var(--gt-active-bg-color-rgb)',
    '--gt-container-bg-color': '#fff',
    '--gt-hover-text-color': '#ffe457',
    '--gt-header-grid-bg-color': '#cbeaca',
    '--gt-base-foreground-color': '#ffffffde',
    '--gt-base-border-color': '#cccccc',
    '--gt-base-pading': '8px',
    '--gt-header-height': '37px',
    '--gt-logo-height': '61px',
    '--gt-drawer-header-hight': '40px',
    '--gt-drawer-width': 'calc(100vw - 80px)',
    '--gt-scrollbar-with': '6px',
    '--gt-sider-collapsed-width': '0px',
    '--gt-sider-min-width': '200px',
    '--gt-sider-max-width': '300px',
    '--gt-border-color': '#d1d1d1',
    '--gt-clone-action-color': '#3f72af',
    '--gt-delete-action-color': '#d14d72',
    '--gt-edit-action-color': '#364f6b',
    '--gt-download-action-color': '#bf9270',
    '--gt-create-action-color': '#3282b8',
    '--gt-active-sort-bg-color': '#c1d8c3',
    '--gt-background-layout': '#e5e5e5',
    '--gt-footer-height': '43px',
    '--gt-border-radius-button': '5px',
    '--gt-placeholder-color': '#a9a1a1e0',
    '--gt-text-color': '#ffffff'
  },
  [Theme.Secondary]: {
    '--gt-base-color': '#ab1818e3',
    '--gt-primary-color-rgb': '171 24 24 / 89%',
    '--gt-primary-color': 'rgb(var(--gt-primary-color-rgb))',
    '--gt-success-color': '#52c41a',
    '--gt-warning-color': '#faad14',
    '--gt-error-color': '#a9081c',
    '--gt-info-color': '#2f49ff',
    '--gt-link-color': '#8a2be2',
    '--gt-submit-color': '#2b5654',
    '--gt-form-item-label-color': '#4b0310',
    '--gt-light-green-color': '#dcf0cc',
    '--gt-active-bg-color-rgb': 'rgb(193, 137, 53)',
    '--gt-active-bg-color': 'var(--gt-active-bg-color-rgb)',
    '--gt-container-bg-color': '#fff',
    '--gt-hover-text-color': '#ffe457',
    '--gt-header-grid-bg-color': '#cbeaca',
    '--gt-base-foreground-color': '#ffffffde',
    '--gt-base-border-color': '#cccccc',
    '--gt-base-pading': '8px',
    '--gt-header-height': '37px',
    '--gt-logo-height': '61px',
    '--gt-drawer-header-hight': '40px',
    '--gt-drawer-width': 'calc(100vw - 80px)',
    '--gt-scrollbar-with': '6px',
    '--gt-sider-collapsed-width': '0px',
    '--gt-sider-min-width': '200px',
    '--gt-sider-max-width': '300px',
    '--gt-border-color': '#d1d1d1',
    '--gt-clone-action-color': '#3f72af',
    '--gt-delete-action-color': '#d14d72',
    '--gt-edit-action-color': '#364f6b',
    '--gt-download-action-color': '#bf9270',
    '--gt-create-action-color': '#3282b8',
    '--gt-active-sort-bg-color': '#c1d8c3',
    '--gt-background-layout': '#e5e5e5',
    '--gt-footer-height': '43px',
    '--gt-border-radius-button': '5px',
    '--gt-placeholder-color': '#a9a1a1e0',
    '--gt-text-color': '#ffffff'
  },
  [Theme.Thirdary]: {
    '--gt-base-color': '#1b524f',
    '--gt-primary-color-rgb': 'rgb(27, 82, 79)' /** #1b594f*/,
    '--gt-primary-color': 'rgb(var(--gt-primary-color-rgb))',
    '--gt-success-color': '#52c41a',
    '--gt-warning-color': '#faad14',
    '--gt-error-color': '#a9081c',
    '--gt-info-color': '#2f49ff',
    '--gt-link-color': '#8a2be2',
    '--gt-submit-color': '#2b5654',
    '--gt-form-item-label-color': '#4b0310',
    '--gt-light-green-color': '#dcf0cc',
    '--gt-active-bg-color-rgb': 'rgb(0, 164, 126)',
    '--gt-active-bg-color': 'var(--gt-active-bg-color-rgb)',
    '--gt-container-bg-color': '#fff',
    '--gt-hover-text-color': '#ffe457',
    '--gt-header-grid-bg-color': '#cbeaca',
    '--gt-base-foreground-color': '#ffffffde',
    '--gt-base-border-color': '#cccccc',
    '--gt-base-pading': '8px',
    '--gt-header-height': '37px',
    '--gt-logo-height': '61px',
    '--gt-drawer-header-hight': '40px',
    '--gt-drawer-width': 'calc(100vw - 80px)',
    '--gt-scrollbar-with': '6px',
    '--gt-sider-collapsed-width': '0px',
    '--gt-sider-min-width': '200px',
    '--gt-sider-max-width': '300px',
    '--gt-border-color': '#d1d1d1',
    '--gt-clone-action-color': '#3f72af',
    '--gt-delete-action-color': '#d14d72',
    '--gt-edit-action-color': '#364f6b',
    '--gt-download-action-color': '#bf9270',
    '--gt-create-action-color': '#3282b8',
    '--gt-active-sort-bg-color': '#c1d8c3',
    '--gt-background-layout': '#e5e5e5',
    '--gt-footer-height': '43px',
    '--gt-border-radius-button': '5px',
    '--gt-placeholder-color': '#a9a1a1e0',
    '--gt-text-color': '#ffffff'
  }
};
