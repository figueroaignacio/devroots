import { LogoutButton } from '@/modules/auth/components/logout-button';
import { UserProfile } from '@/modules/auth/components/user-profile';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Mi App</h1>
            </div>
            <div className="flex items-center">
              <UserProfile />
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido!</h2>
          <p className="mt-2 text-gray-600">
            Has iniciado sesión correctamente.
          </p>
        </div>
        <div className="px-4 py-6 sm:px-0">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
