import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { Account } from '@toolpad/core/Account';

import { useSession } from '../SessionContext';

/**
 * Renderiza las acciones personalizadas que aparecen en la barra de herramientas del panel.
 * @returns {JSX.Element} Contenedor con el selector de tema y la cuenta del usuario.
 */
function CustomActions() {
  return (
    <Stack direction="row" alignItems="center">
      <ThemeSwitcher />
      <Account
        slotProps={{
          preview: { slotProps: { avatarIconButton: { sx: { border: '0' } } } },
        }}
      />
    </Stack>
  );
}

/**
 * Layout principal que protege las rutas autenticadas y muestra un cargador mientras se obtiene la sesión.
 * @returns {JSX.Element} Disposición del panel o una redirección a la página de inicio de sesión.
 */
export default function Layout() {
  const { session, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );
  }

  if (!session) {
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <DashboardLayout slots={{ toolbarActions: CustomActions }}>
      <Outlet />
    </DashboardLayout>
  );
}
