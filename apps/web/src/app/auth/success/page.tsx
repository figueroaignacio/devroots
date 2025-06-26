'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return <div>Redirigiendo...</div>;
}
