import type { LocaleText } from '@toolpad/core';

/**
 * Traducciones al español utilizadas por los componentes de autenticación de Toolpad.
 */
export const esLocaleText: Partial<LocaleText> = {
  accountSignInLabel: 'Iniciar sesión',
  accountSignOutLabel: 'Cerrar sesión',
  accountPreviewIconButtonLabel: 'Cuenta',
  accountPreviewTitle: 'Perfil',
  signInTitle: 'Inicia sesión en tu cuenta',
  signInSubtitle: 'Selecciona un método de inicio de sesión',
  signInRememberMe: 'Recordarme',
  providerSignInTitle: (provider: string) => `Iniciar sesión con ${provider}`,
  email: 'Correo electrónico',
  password: 'Contraseña',
  or: 'o',
  with: 'con',
  passkey: 'Clave de acceso',
  to: 'a',
};
