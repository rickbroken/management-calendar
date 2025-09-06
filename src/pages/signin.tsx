'use client';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router';
import { useSession, type Session } from '../SessionContext';
import { signInWithGoogle, signInWithGithub, signInWithFacebook, signInWithCredentials } from '../firebase/auth';
import { esLocaleText } from '../locales/es';


export default function SignIn() {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();

  if (loading) {
    return <LinearProgress />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      providers={[
        { id: 'google', name: 'Google' },
        { id: 'github', name: 'GitHub' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'credentials', name: 'Correo electrónico y contraseña' },
      ]}
      localeText={esLocaleText}
      signIn={async (provider, formData, callbackUrl) => {
        let result;
        try {
          if (provider.id === 'google') {
            result = await signInWithGoogle();
          }
          if (provider.id === 'github') {
            result = await signInWithGithub();
          }
          if (provider.id === 'facebook') {
            result = await signInWithFacebook();
          }
          if (provider.id === 'credentials') {
            const email = formData?.get('email') as string;
            const password = formData?.get('password') as string;

            if (!email || !password) {
              return { error: 'El correo y la contraseña son obligatorios' };
            }

            result = await signInWithCredentials(email, password);
          }

          if (result?.success && result?.user) {
            const userSession: Session = {
              user: {
                name: result.user.displayName || '',
                email: result.user.email || '',
                image: result.user.photoURL || '',
              },
            };
            setSession(userSession);
            navigate(callbackUrl || '/', { replace: true });
            return {};
          }
          return { error: result?.error || 'No se pudo iniciar sesión' };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'Ocurrió un error',
          };
        }
      }}
        
    />
  );
}