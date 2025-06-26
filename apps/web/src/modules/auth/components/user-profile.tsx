'use client';

import { useAuthStore } from '../store/auth-store';

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
        <div className="flex flex-col space-y-1">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
          <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.avatarUrl}
        alt={user.name || user.username}
        className="size-7 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {user.name || user.username}
        </span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
    </div>
  );
};
