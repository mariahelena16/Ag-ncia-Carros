
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useEstoqueForm(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [imagem, setImagem] = useState('');
    const [item, setItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [status, setStatus] = useState('');
    const [sala, setSala] = useState('Sala 1');
    const [dataHora, setDataHora] = useState('');

    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    const buscarEstoquePorId = async (id: number) => {
        setCarregando(true);

        try {
            const resposta = await api.get(`/itens/${id}`);
            const estoque = resposta.data;

            setEditandoId(estoque.id!);
            setImagem(estoque.imagem ? String(estoque.imagem) : '');
            setItem(estoque.item ? String(estoque.item) : '');
            setQuantidade(String(estoque.quantidade));
            setStatus(estoque.status ? String(estoque.status) : '');
            setSala(estoque.sala ? String(estoque.sala) : 'Sala 1');

            if (estoque.dataHora) {
                const data = new Date(estoque.dataHora);

                const dataFormatada = new Date(
                    data.getTime() - data.getTimezoneOffset() * 60000
                ).toISOString().slice(0, 16);

                setDataHora(dataFormatada);
            }

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(error, "Erro ao buscar os detalhes do item."),
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });

            router.push('/itens');

        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        if (idParam) {
            buscarEstoquePorId(Number(idParam));
        }
    }, [idParam]);

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        setSalvando(true);

        try {
            const dados = {
                imagem,
                item,
                quantidade: Number(quantidade),
                status,
                sala,
                dataHora
            };

            if (editandoId) {
                await api.put(`/itens/${editandoId}`, dados);
                // TODO: integrar após a conexão com Raspberry Pi.
            } else {
                await api.post('/itens', dados);
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Item salvo com sucesso!',
                icon: 'success',
                confirmButtonColor: '#8b5cf6'
            });

            router.push('/itens');

        } catch (error: any) {
            Swal.fire({
                title: 'Atenção!',
                text: extrairErro(error, "Erro ao salvar o item."),
                icon: 'warning',
                confirmButtonColor: '#3b82f6'
            });

        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {
        router.push('/itens');
    };

    return {
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
    };
}
