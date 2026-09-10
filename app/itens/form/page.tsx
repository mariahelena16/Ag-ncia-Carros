
'use client';

import { Suspense } from 'react';
import { useEstoqueForm } from '../../hooks/useEstoqueForm';

function EstoqueFormContent() {
    const {
        imagem, setImagem,
        item, setItem,
        quantidade, setQuantidade,
        status, setStatus,
        sala, setSala,
        dataHora, setDataHora,
        editandoId,
        carregando,
        salvando,
        salvar,
        cancelar
    } = useEstoqueForm();

    if (carregando) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 font-medium">Carregando dados do estoque...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-black/85 rounded-2xl shadow-2xl border border-red-500/40 p-8 backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-white mb-6 tracking-wide">
                    {editandoId ? 'Editar Item' : 'Novo Item'}
                </h1>

                <form onSubmit={salvar} className="space-y-6">

                    <div>
                        <label htmlFor="imagem" className="block text-sm font-medium text-red-200 mb-1">
                            Imagem
                        </label>
                        <input
                            id="imagem"
                            type="text"
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                            placeholder="Ex: https://imagem.com/produto.jpg"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="item" className="block text-sm font-medium text-red-200 mb-1">
                            Item
                        </label>
                        <input
                            id="item"
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="Ex: Notebook Dell"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="quantidade" className="block text-sm font-medium text-red-200 mb-1">
                            Quantidade
                        </label>
                        <input
                            id="quantidade"
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Ex: 10"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-red-200 mb-1">
                            Status
                        </label>
                        <input
                            id="status"
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="Ex: Entrada, Saída"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="sala" className="block text-sm font-medium text-red-200 mb-1">
                            Sala
                        </label>
                        <select
                            id="sala"
                            value={sala}
                            onChange={(e) => setSala(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        >
                            <option value="Sala 1">Sala 1</option>
                            <option value="Sala 2">Sala 2</option>
                            <option value="Sala 3">Sala 3</option>
                            <option value="Sala 4">Sala 4</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dataHora" className="block text-sm font-medium text-red-200 mb-1">
                            Data e Hora
                        </label>
                        <input
                            id="dataHora"
                            type="datetime-local"
                            value={dataHora}
                            onChange={(e) => setDataHora(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-zinc-700">
                        <button
                            type="button"
                            onClick={cancelar}
                            disabled={salvando}
                            className="px-6 py-2 border border-zinc-600 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={salvando}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all font-medium shadow-md shadow-red-500/30 disabled:opacity-70 flex items-center gap-2"
                        >
                            {salvando ? 'Salvando...' : 'Salvar Item'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default function EstoqueFormPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-64"><p className="text-gray-500 font-medium">Carregando formulário...</p></div>}>
            <EstoqueFormContent />
        </Suspense>
    );
}
