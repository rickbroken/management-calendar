import {
  GoogleAuthProvider,
  GithubAuthProvider,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';

/** Proveedor de autenticación de Google utilizado por Firebase. */
const googleProvider = new GoogleAuthProvider();
/** Proveedor de autenticación de GitHub utilizado por Firebase. */
const githubProvider = new GithubAuthProvider();
/** Proveedor de autenticación de Facebook utilizado por Firebase. */
const facebookProvider = new FacebookAuthProvider();

/**
 * Inicia sesión con el proveedor de Google y mantiene la sesión en el almacenamiento de sesión del navegador.
 * @returns {Promise<{ success: boolean; user: any; error: string | null }>} Resultado de la autenticación.
 */
export const signInWithGoogle = async () => {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      return {
        success: true,
        user: result.user,
        error: null,
      };
    });
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || 'No se pudo iniciar sesión con Google',
    };
  }
};

/**
 * Inicia sesión con el proveedor de GitHub y aplica persistencia de sesión del navegador.
 * @returns {Promise<{ success: boolean; user: any; error: string | null }>} Resultado de la autenticación.
 */
export const signInWithGithub = async () => {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const result = await signInWithPopup(firebaseAuth, githubProvider);
      return {
        success: true,
        user: result.user,
        error: null,
      };
    });
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || 'No se pudo iniciar sesión con GitHub',
    };
  }
};

/**
 * Inicia sesión con el proveedor de Facebook y conserva la sesión en el navegador.
 * @returns {Promise<{ success: boolean; user: any; error: string | null }>} Resultado de la autenticación.
 */
export const signInWithFacebook = async () => {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const result = await signInWithPopup(firebaseAuth, facebookProvider);
      return {
        success: true,
        user: result.user,
        error: null,
      };
    });
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || 'No se pudo iniciar sesión con Facebook',
    };
  }
};

/**
 * Inicia sesión con correo electrónico y contraseña utilizando el servicio de autenticación de Firebase.
 * @param {string} email Correo electrónico del usuario.
 * @param {string} password Contraseña del usuario.
 * @returns {Promise<{ success: boolean; user: any; error: string | null }>} Resultado de la autenticación.
 */
export async function signInWithCredentials(email: string, password: string) {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return {
        success: true,
        user: userCredential.user,
        error: null,
      };
    });
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || 'No se pudo iniciar sesión con correo electrónico/contraseña',
    };
  }
}

/**
 * Cierra la sesión del usuario autenticado en Firebase.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado del cierre de sesión.
 */
export const firebaseSignOut = async () => {
  try {
    await signOut(firebaseAuth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'No se pudo cerrar sesión',
    };
  }
};

/**
 * Observa los cambios en el estado de autenticación de Firebase y ejecuta un callback.
 * @param {(user: any) => void} callback Función que se invoca cuando cambia el usuario autenticado.
 * @returns {import('firebase/auth').Unsubscribe} Función para cancelar la suscripción.
 */
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseAuth.onAuthStateChanged(callback);
};
