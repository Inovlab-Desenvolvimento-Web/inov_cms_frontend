import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'core';

export const roleGuard = (roles: ('Admin' | 'Editor' | 'Viewer')[]): CanMatchFn => {
  return () => {
    const user = inject(AuthService).user();
    return !!user && roles.includes(user.role);
  };
};
