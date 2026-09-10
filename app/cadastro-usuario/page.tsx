'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/lib/auth';

export default function CadastroUsuarioPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registerUser({ name, email, password });
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <div className="w-full max-w-xl rounded-[18px] border border-red-500/40 bg-[#111111] p-8 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Cadastro de Usuário</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-red-200 mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-red-200 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
              placeholder="seu@email.com"
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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-zinc-300">
            Já tem conta?{' '}
            <a href="/login" className="font-semibold text-red-400 hover:text-red-300">
              Fazer login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
