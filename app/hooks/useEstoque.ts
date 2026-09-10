
'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import type { Estoque } from '../types/estoque';
import Swal from 'sweetalert2';

export function useEstoque(){
    const [estoque, setEstoque] = useState<Estoque[]>([]);
    const [loading, setLoading] = useState(false);

    // Função blindada para extrair mensagens de erro do backend
    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    const listarEstoque = useCallback(async () => {
        setLoading(true);

        try {
            const resposta = await api.get('/itens');
            setEstoque(resposta.data);
        } catch (error: any) {
            Swal.fire('Erro!', extrairErro(error, "Erro ao buscar Estoque"), 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    const cadastrar = async (
        imagem: string,
        item: string,
        quantidade: number,
        status: string,
        dataHora: string,
        sala: string
    ) => {
        try {
            const resposta = await api.post('/itens', {
                imagem,
                item,
                quantidade,
                status,
                dataHora,
                sala
            });

            Swal.fire('Sucesso!', 'Item cadastrado com sucesso!', 'success');

            listarEstoque();

            return resposta.data;

        } catch (error: any) {
            Swal.fire('Atenção!', extrairErro(error, "Erro ao cadastrar item"), 'error');
            throw error;
        }
    };

    const excluir = async (id: number) => {
        const confirmacao = await Swal.fire({
            title: 'Excluir item?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/itens/${id}`);

                Swal.fire('Excluído!', 'O item foi removido.', 'success');

                listarEstoque();

            } catch (error: any) {
                Swal.fire('Erro!', extrairErro(error, "Erro ao excluir"), 'error');
            }
        }
    };

    return { estoque, loading, listarEstoque, cadastrar, excluir };
}