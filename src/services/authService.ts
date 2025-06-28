// Authentication service for user management
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLoginAt: Date;
  isVerified: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export class AuthService {
  private static instance: AuthService;
  private users: User[] = [];
  private currentUser: User | null = null;
  private listeners: ((authState: AuthState) => void)[] = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('drishya-users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers).map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        lastLoginAt: new Date(user.lastLoginAt)
      }));
    }

    // Check if user is already logged in
    const savedUser = localStorage.getItem('drishya-current-user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.currentUser!.lastLoginAt = new Date(this.currentUser!.lastLoginAt);
      this.currentUser!.createdAt = new Date(this.currentUser!.createdAt);
    }
  }

  async signUp(email: string, name: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Check if user already exists
      const existingUser = this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return { success: false, message: 'An account with this email already exists. Please sign in instead.' };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
      }

      // Validate password strength
      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: email.toLowerCase(),
        name: name.trim(),
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isVerified: true // Auto-verify for demo purposes
      };

      // Add to users list
      this.users.push(newUser);
      this.saveUsers();

      // Set as current user
      this.currentUser = newUser;
      this.saveCurrentUser();

      this.notifyListeners();

      return { success: true, message: 'Account created successfully! Welcome to Drishya!', user: newUser };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, message: 'An error occurred during sign up. Please try again.' };
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Find user
      const user = this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return { success: false, message: 'No account found with this email address. Please sign up first.' };
      }

      // In a real app, you would verify the password hash here
      // For demo purposes, we'll just check if password is provided
      if (!password || password.length < 1) {
        return { success: false, message: 'Please enter your password.' };
      }

      // Update last login
      user.lastLoginAt = new Date();
      this.saveUsers();

      // Set as current user
      this.currentUser = user;
      this.saveCurrentUser();

      this.notifyListeners();

      return { success: true, message: 'Welcome back!', user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: 'An error occurred during sign in. Please try again.' };
    }
  }

  signOut(): void {
    this.currentUser = null;
    localStorage.removeItem('drishya-current-user');
    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getAllUsers(): User[] {
    return [...this.users]; // Return copy to prevent direct modification
  }

  getUsersCount(): number {
    return this.users.length;
  }

  getRecentSignUps(days: number = 7): User[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return this.users.filter(user => user.createdAt >= cutoffDate);
  }

  private saveUsers(): void {
    localStorage.setItem('drishya-users', JSON.stringify(this.users));
  }

  private saveCurrentUser(): void {
    if (this.currentUser) {
      localStorage.setItem('drishya-current-user', JSON.stringify(this.currentUser));
    }
  }

  addAuthStateListener(callback: (authState: AuthState) => void): void {
    this.listeners.push(callback);
  }

  removeAuthStateListener(callback: (authState: AuthState) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    const authState: AuthState = {
      isAuthenticated: this.isAuthenticated(),
      user: this.getCurrentUser(),
      loading: false
    };
    this.listeners.forEach(listener => listener(authState));
  }

  // Admin function to export user emails
  exportUserEmails(): string[] {
    return this.users.map(user => user.email);
  }

  // Admin function to get user statistics
  getUserStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: this.users.length,
      today: this.users.filter(user => user.createdAt >= today).length,
      thisWeek: this.users.filter(user => user.createdAt >= thisWeek).length,
      thisMonth: this.users.filter(user => user.createdAt >= thisMonth).length,
      verified: this.users.filter(user => user.isVerified).length
    };
  }
}