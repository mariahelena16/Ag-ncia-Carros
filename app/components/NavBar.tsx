
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './NavBar.css';
import { getCurrentUser, logout } from '@/app/lib/auth';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getCurrentUser();

  const links = [
    { href: '/', label: 'Início' },
    { href: '/itens', label: 'Estoque' },
    { href: '/movimentacoes', label: 'Movimentações' }
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="brand-wrap">
        <div className="brand-mark">I</div>
        <div>
          <div className="brand-title">Invent Berry</div>
          <div className="brand-subtitle">{user?.name || 'Usuário'}</div>
        </div>
      </div>

      <ul className="nav-list">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={pathname === item.href ? 'active' : ''}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className="logout-button" type="button">
        Sair
      </button>
    </nav>
  );
}

