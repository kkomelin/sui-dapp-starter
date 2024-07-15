import type { ThemeVars } from '@mysten/dapp-kit'

// Light theme has been borrowed from dapp-kit https://github.com/MystenLabs/sui/blob/main/sdk/dapp-kit/src/themes/lightTheme.ts 
// and adapted to our context.
export const lightTheme: ThemeVars = {
  blurs: {
    modalOverlay: 'blur(0)',
  },
  backgroundColors: {
    primaryButton: '#F6F7F9',
    primaryButtonHover: '#F0F2F5',
    outlineButtonHover: '#F4F4F5',
    modalOverlay: 'rgba(24 36 53 / 20%)',
    modalPrimary: 'white',
    modalSecondary: '#F7F8F8',
    iconButton: 'transparent',
    iconButtonHover: '#F0F1F2',
    dropdownMenu: '#FFFFFF',
    dropdownMenuSeparator: '#F3F6F8',
    walletItemSelected: 'white',
    walletItemHover: '#3C424226',
  },
  borderColors: {
    outlineButton: '#E4E4E7',
  },
  colors: {
    primaryButton: '#373737',
    outlineButton: '#373737',
    iconButton: '#000000',
    body: '#182435',
    bodyMuted: '#767A81',
    bodyDanger: '#FF794B',
  },
  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  shadows: {
    primaryButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.05)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    // The CSS variable is defined in styles/index.css.
    fontFamily: 'var(--sds-font-inter)',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
  },
}

// Dark theme borrowed from https://github.com/MystenLabs/sui/pull/17670 and adapted to our context.
export const darkTheme: ThemeVars = {
  blurs: {
    modalOverlay: 'blur(0)',
  },
  backgroundColors: {
    primaryButton: '#373737',
    primaryButtonHover: '#2C2C2C',
    outlineButtonHover: '#2C2C2C',
    modalOverlay: 'rgba(255, 255, 255, 0.1)',
    modalPrimary: '#373737',
    modalSecondary: '#2C2C2C',
    iconButton: 'transparent',
    iconButtonHover: '#2C2C2C',
    dropdownMenu: '#373737',
    dropdownMenuSeparator: '#2C2C2C',
    walletItemSelected: '#373737',
    walletItemHover: '#2C2C2C',
  },
  borderColors: {
    outlineButton: '#2C2C2C',
  },
  colors: {
    primaryButton: '#F6F7F9',
    outlineButton: '#F6F7F9',
    iconButton: '#F6F7F9',
    body: '#F6F7F9',
    bodyMuted: '#E4E4E7',
    bodyDanger: '#FF794B',
  },
  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  shadows: {
    primaryButton: '0px 4px 12px rgba(0, 0, 0, 0.5)',
    walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.5)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    // The CSS variable is defined in styles/index.css.
    fontFamily: 'var(--sds-font-inter)',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
  },
}
