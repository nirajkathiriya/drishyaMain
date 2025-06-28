import { useState, useEffect } from 'react';
import { AuthService, AuthState } from '../services/authService';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const authService = AuthService.getInstance();

  useEffect(() => {
    // Initialize auth state
    const currentUser = authService.getCurrentUser();
    setAuthState({
      isAuthenticated: authService.isAuthenticated(),
      user: currentUser,
      loading: false
    });

    // Listen for auth state changes
    const handleAuthStateChange = (newAuthState: AuthState) => {
      setAuthState(newAuthState);
    };

    authService.addAuthStateListener(handleAuthStateChange);

    return () => {
      authService.removeAuthStateListener(handleAuthStateChange);
    };
  }, [authService]);

  const signOut = () => {
    authService.signOut();
  };

  return {
    ...authState,
    signOut
  };
}