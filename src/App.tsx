import * as React from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation, Authentication } from '@toolpad/core/AppProvider';
import { firebaseSignOut, onAuthStateChanged } from './firebase/auth';
import SessionContext, { type Session } from './SessionContext';
import theme from '../theme';
import { esLocaleText } from './locales/es';

/**
 * Configuración de la navegación principal del panel, con los segmentos disponibles y sus iconos.
 */
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'To Do GinNor',
    icon: <ListAltIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendario',
    icon: <CalendarMonthIcon />,
  },
];

/**
 * Información de marca mostrada en la interfaz de Toolpad.
 */
const BRANDING = {
  title: 'To Do GinNor',
};

/**
 * Implementación personalizada de los controladores de autenticación para el panel.
 */
const AUTHENTICATION: Authentication = {
  signIn: () => {},
  signOut: firebaseSignOut,
};

/**
 * Componente raíz de la aplicación que configura el proveedor de Toolpad y el contexto de sesión.
 * @returns {JSX.Element} Proveedor de Toolpad con las rutas hijas.
 */
export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  /**
   * Memoriza el valor compartido del contexto de sesión para evitar renders innecesarios.
   */
  const sessionContextValue = React.useMemo(
    () => ({
      session,
      setSession,
      loading,
    }),
    [session, loading],
  );

  React.useEffect(() => {
    /**
     * Suscribe al observador de autenticación de Firebase para mantener la sesión actualizada.
     */
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setSession({
          user: {
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
          },
        });
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={AUTHENTICATION}
      theme={theme}
      localeText={esLocaleText}
    >
      <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
      </SessionContext.Provider>
    </ReactRouterAppProvider>
  );
}
