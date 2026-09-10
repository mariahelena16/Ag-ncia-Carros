
import { NextResponse } from 'next/server';

import { EstoqueRepository } from '@/src/repository/EstoqueRepository';

import { EstoqueService } from '@/src/services/EstoqueService';

const service = new EstoqueService(new EstoqueRepository());

export async function GET(req, { params }) {

    try {

        const { id } = await params;

        const item = await service.buscarPorId(id);

        return NextResponse.json(item, { status: 200 });

    } catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 404 });

    }

}

export async function PUT(req, { params }) {

    try {

        const { id } = await params;

        const body = await req.json();

        const res = await service.atualizar(
            id,
            body.imagem,
            body.item,
            body.quantidade,
            body.status,
            body.dataHora,
            body.sala
        );

        return NextResponse.json(res, { status: 200 });

    } catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 400 });

    }

}

export async function DELETE(req, { params }) {

    try {

        const { id } = await params;

        const res = await service.excluir(id);

        return NextResponse.json(res, { status: 200 });

    } catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 400 });

    }

}
