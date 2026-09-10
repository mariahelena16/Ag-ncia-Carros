'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@agencia.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(email, password)) {
      router.push('/itens');
      router.refresh();
      return;
    }

    setError('E-mail ou senha inválidos.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-[18px] border border-red-500/40 bg-[#111111] shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:block min-h-[620px] bg-cover bg-center" style={{ backgroundImage: "url('https://gazetapopularoficial.com.br/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-22-at-11.01.23.jpeg')" }} />

          <div className="relative flex items-center justify-center bg-[#0f0f0f] p-8 md:p-12">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,0,64,0.7) 0%, rgba(0,0,0,0) 35%)', backgroundSize: '22px 22px' }} />

            <div className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-black/70 p-8 shadow-2xl">
              <h1 className="text-4xl font-bold text-white text-center mb-8">Faça Login</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-red-200 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-red-200 mb-2">Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-500"
                >
                  Entrar
                </button>

                <p className="text-center text-sm text-zinc-300">
                  Ainda não tem conta?{' '}
                  <a href="/cadastro-usuario" className="font-semibold text-red-400 hover:text-red-300">
                    Cadastre-se
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
