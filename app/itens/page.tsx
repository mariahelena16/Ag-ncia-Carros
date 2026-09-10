
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useEstoque } from '../hooks/useEstoque';
import { isAdminUser } from '@/app/lib/auth';

export default function Estoque() {
    const { estoque, loading, listarEstoque, excluir } = useEstoque();
    const isAdmin = isAdminUser();
    const [termoBusca, setTermoBusca] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('todos');
    const [salaFiltro, setSalaFiltro] = useState('todas');
    const [ordenacao, setOrdenacao] = useState('recentes');

    useEffect(() => {
        listarEstoque();
    }, [listarEstoque]);

    const statusDisponiveis = useMemo(
        () => ['todos', ...new Set(estoque.map((item) => item.status).filter(Boolean))],
        [estoque]
    );

    const salasDisponiveis = useMemo(
        () => ['todas', ...new Set(estoque.map((item) => item.sala).filter(Boolean))],
        [estoque]
    );

    const itensFiltrados = useMemo(() => {
        const busca = termoBusca.trim().toLowerCase();

        const filtrados = estoque.filter((item) => {
            const atendeBusca =
                !busca ||
                item.item.toLowerCase().includes(busca) ||
                item.status.toLowerCase().includes(busca) ||
                item.sala.toLowerCase().includes(busca);

            const atendeStatus = statusFiltro === 'todos' || item.status === statusFiltro;
            const atendeSala = salaFiltro === 'todas' || item.sala === salaFiltro;
            return atendeBusca && atendeStatus && atendeSala;
        });

        return [...filtrados].sort((a, b) => {
            if (ordenacao === 'quantidadeAlta') {
                return Number(b.quantidade) - Number(a.quantidade);
            }

            if (ordenacao === 'quantidadeBaixa') {
                return Number(a.quantidade) - Number(b.quantidade);
            }

            return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
        });
    }, [estoque, termoBusca, statusFiltro, salaFiltro, ordenacao]);

    const itensPorSala = useMemo(() => {
        const salas = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4'];

        return salas.reduce<Record<string, typeof estoque>>((acc, sala) => {
            acc[sala] = itensFiltrados.filter((item) => item.sala === sala);
            return acc;
        }, {});
    }, [itensFiltrados]);

    const totalProdutos = estoque.length;
    const totalQuantidade = estoque.reduce((soma, item) => soma + Number(item.quantidade || 0), 0);
    const itensBaixos = estoque.filter((item) => Number(item.quantidade) <= 5).length;
    const itensAtivos = estoque.filter((item) => item.status.toLowerCase().includes('dispon') || item.status.toLowerCase().includes('ativo')).length;

    return (
        <div className="max-w-7xl mx-auto p-6 pb-12">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-red-200/80">Dashboard</p>
                    <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Meu Estoque</h1>
                    {!isAdmin && <p className="mt-2 text-sm text-zinc-300">Visualização somente</p>}
                </div>

                {isAdmin && (
                    <Link
                        href="/cadastro"
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:shadow-red-500/40"
                    >
                        + Novo item
                    </Link>
                )}
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/55 p-5 shadow-xl backdrop-blur-md">
                    <p className="text-sm text-zinc-400">Total de itens</p>
                    <p className="mt-3 text-3xl font-bold text-white">{totalProdutos}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/55 p-5 shadow-xl backdrop-blur-md">
                    <p className="text-sm text-zinc-400">Unidades em estoque</p>
                    <p className="mt-3 text-3xl font-bold text-emerald-400">{totalQuantidade}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/55 p-5 shadow-xl backdrop-blur-md">
                    <p className="text-sm text-zinc-400">Itens com estoque baixo</p>
                    <p className="mt-3 text-3xl font-bold text-amber-400">{itensBaixos}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/55 p-5 shadow-xl backdrop-blur-md">
                    <p className="text-sm text-zinc-400">Itens ativos</p>
                    <p className="mt-3 text-3xl font-bold text-sky-400">{itensAtivos}</p>
                </div>
            </div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/55 p-4 shadow-xl backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                    <label htmlFor="busca" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Buscar item
                    </label>
                    <input
                        id="busca"
                        type="text"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        placeholder="Pesquisar por nome ou status..."
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                </div>

                <div className="min-w-[180px]">
                    <label htmlFor="status" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Status
                    </label>
                    <select
                        id="status"
                        value={statusFiltro}
                        onChange={(e) => setStatusFiltro(e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    >
                        {statusDisponiveis.map((status) => (
                            <option key={status} value={status}>
                                {status === 'todos' ? 'Todos' : status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="min-w-[180px]">
                    <label htmlFor="sala" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Sala
                    </label>
                    <select
                        id="sala"
                        value={salaFiltro}
                        onChange={(e) => setSalaFiltro(e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    >
                        {salasDisponiveis.map((sala) => (
                            <option key={sala} value={sala}>
                                {sala === 'todas' ? 'Todas as salas' : sala}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="min-w-[180px]">
                    <label htmlFor="ordenacao" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Ordenar
                    </label>
                    <select
                        id="ordenacao"
                        value={ordenacao}
                        onChange={(e) => setOrdenacao(e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    >
                        <option value="recentes">Mais recentes</option>
                        <option value="quantidadeAlta">Quantidade maior</option>
                        <option value="quantidadeBaixa">Quantidade menor</option>
                    </select>
                </div>
            </div>

            <div className="mb-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                {(['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4'] as const).map((sala) => {
                    const itensDaSala = itensPorSala[sala] || [];
                    const totalSala = itensDaSala.reduce((soma, item) => soma + Number(item.quantidade || 0), 0);

                    return (
                        <div key={sala} className="rounded-2xl border border-white/10 bg-black/55 p-5 shadow-xl backdrop-blur-md">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">{sala}</h2>
                                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200">
                                    {itensDaSala.length} itens
                                </span>
                            </div>

                            <p className="mb-3 text-sm text-zinc-400">Total em estoque: <span className="font-semibold text-emerald-300">{totalSala}</span></p>

                            <div className="space-y-2">
                                {itensDaSala.length === 0 ? (
                                    <p className="rounded-xl border border-dashed border-zinc-700 p-3 text-sm text-zinc-500">
                                        Nenhum item cadastrado
                                    </p>
                                ) : (
                                    itensDaSala.map((item) => (
                                        <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-medium text-white">{item.item}</span>
                                                <span className="text-xs font-semibold text-amber-300">{item.quantidade}</span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                                                <span>{item.status}</span>
                                                <span>{item.sala}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-950/90 text-zinc-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Item</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Sala</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Quantidade</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Atualização</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                                    {isAdmin ? 'Ações' : 'Permissão'}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-zinc-300">
                                        Carregando estoque...
                                    </td>
                                </tr>
                            ) : itensFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-zinc-300">
                                        Nenhum item encontrado para os filtros selecionados.
                                    </td>
                                </tr>
                            ) : (
                                itensFiltrados.map((item) => {
                                    const baixo = Number(item.quantidade) <= 5;
                                    const statusClass =
                                        item.status.toLowerCase().includes('baixo') || baixo
                                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                            : item.status.toLowerCase().includes('venda') || item.status.toLowerCase().includes('saída')
                                                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';

                                    return (
                                        <tr key={item.id} className="transition-colors hover:bg-zinc-900/80">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={item.imagem}
                                                        alt={item.item}
                                                        className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/10"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-white">{item.item}</p>
                                                        <p className="text-xs text-zinc-400">#{item.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-200">
                                                    {item.sala}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${baixo ? 'bg-amber-500/10 text-amber-300' : 'bg-zinc-800 text-zinc-200'}`}>
                                                    {item.quantidade}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-zinc-300">
                                                {new Date(item.dataHora).toLocaleString('pt-BR', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short'
                                                })}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    {isAdmin ? (
                                                        <>
                                                            <Link
                                                                href={`/itens/form?id=${item.id}`}
                                                                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                                                            >
                                                                Editar
                                                            </Link>
                                                            <button
                                                                onClick={() => excluir(item.id!)}
                                                                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-zinc-400">Leitura</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
