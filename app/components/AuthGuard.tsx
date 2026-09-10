'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NavBar from './NavBar';
import { isAdminUser, isAuthenticated } from '@/app/lib/auth';

const publicRoutes = ['/login', '/cadastro-usuario'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const a = isAuthenticated();
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute) {
      setChecked(true);
      return;
    }

    if (!a) {
      router.replace('/login');
      return;
    }

    if ((pathname === '/cadastro' || pathname === '/itens/form') && !isAdminUser()) {
      router.replace('/itens');
      return;
    }

    if (pathname === '/login' || pathname === '/cadastro-usuario') {
      router.replace('/itens');
      return;
    }

    setChecked(true);
  }, [pathname, router]);

  if (!checked && !publicRoutes.includes(pathname)) {
    return null;
  }

  if (pathname === '/login' || pathname === '/cadastro-usuario') {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
