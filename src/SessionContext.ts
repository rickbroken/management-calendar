import * as React from 'react';

/**
 * Representa la información de sesión asociada a un usuario autenticado.
 */
export interface Session {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

/**
 * Define la forma del contexto de sesión compartido en la aplicación.
 */
interface SessionContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  loading: boolean;
}

/**
 * Contexto de React que expone la sesión actual y utilidades relacionadas.
 */
const SessionContext = React.createContext<SessionContextType>({
  session: null,
  setSession: () => {},
  loading: true,
});

export default SessionContext;

/**
 * Hook de conveniencia para consumir el contexto de sesión en componentes funcionales.
 * @returns {SessionContextType} Estado actual de la sesión y utilidades asociadas.
 */
export const useSession = () => React.useContext(SessionContext);
