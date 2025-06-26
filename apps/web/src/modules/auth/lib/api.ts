const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function loginWithGithub() {
  window.location.href = `${API_BASE_URL}/auth/login`;
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    return await res.json();
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function getAuthStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/status`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return await res.json();
    }

    return { isAuthenticated: false, user: null };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false, user: null };
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
}
