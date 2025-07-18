import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../services/authService';

// Helper to reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('AuthService', () => {
  it('signUp registers and logs in a new user', async () => {
    const service = new AuthService();
    const result = await service.signUp('test@example.com', 'Test User', '123456');

    expect(result.success).toBe(true);
    expect(result.user).toBeTruthy();
    expect(service.isAuthenticated()).toBe(true);
    expect(service.getCurrentUser()?.email).toBe('test@example.com');
  });

  it('signUp prevents duplicate email', async () => {
    const service = new AuthService();
    await service.signUp('dup@example.com', 'Dup', '123456');
    const result = await service.signUp('dup@example.com', 'Dup2', '123456');

    expect(result.success).toBe(false);
    expect(service.getUsersCount()).toBe(1);
  });

  it('signIn authenticates an existing user', async () => {
    const service = new AuthService();
    await service.signUp('login@example.com', 'Login', '123456');
    service.signOut();
    const result = await service.signIn('login@example.com', '123456');

    expect(result.success).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.getCurrentUser()?.email).toBe('login@example.com');
  });

  it('signIn fails for unknown user', async () => {
    const service = new AuthService();
    const result = await service.signIn('missing@example.com', '123456');

    expect(result.success).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('signOut clears the current user', async () => {
    const service = new AuthService();
    await service.signUp('out@example.com', 'Out', '123456');
    service.signOut();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
    expect(localStorage.getItem('drishya-current-user')).toBeNull();
  });
});
