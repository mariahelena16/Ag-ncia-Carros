'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useConcessionaria } from '@/app/hooks/useConcessionaria';

export default function ConcessionariaForm() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const {
        buscarPorId,
        cadastrar,
        atualizar,
        loading,
    } = useConcessionaria();

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cidade, setCidade] = useState('');

    useEffect(() => {
        if (id) {
            buscarPorId(Number(id)).then((concessionaria) => {
                if (concessionaria) {
                    setNome(concessionaria.nome);
                    setCnpj(concessionaria.cnpj);
                    setCidade(concessionaria.cidade);
                }
            });
        }
    }, [id, buscarPorId]);

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        const dados = {
            nome,
            cnpj,
            cidade,
        };

        if (id) {
            await atualizar(Number(id), dados);
        } else {
            await cadastrar(dados);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {id ? 'Editar Concessionária' : 'Nova Concessionária'}
                </h1>

                <p className="text-gray-500 mt-1">
                    {id
                        ? 'Altere os dados da concessionária.'
                        : 'Cadastre uma nova concessionária.'}
                </p>
            </div>

            <form
                onSubmit={salvar}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >

                {/* Nome */}
                <div className="mb-5">
                    <label
                        htmlFor="nome"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Nome
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome da concessionária"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* CNPJ */}
                <div className="mb-5">
                    <label
                        htmlFor="cnpj"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        CNPJ
                    </label>

                    <input
                        id="cnpj"
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        placeholder="00.000.000/0000-00"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Cidade */}
                <div className="mb-6">
                    <label
                        htmlFor="cidade"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Cidade
                    </label>

                    <input
                        id="cidade"
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Digite a cidade"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Botões */}
                <div className="flex justify-end gap-3">

                    <Link
                        href="/concessionaria"
                        className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                    >
                        {loading
                            ? 'Salvando...'
                            : id
                                ? 'Atualizar'
                                : 'Cadastrar'}
                    </button>

                </div>

            </form>
        </div>
    );
}