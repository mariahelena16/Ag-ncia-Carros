
import { NextResponse } from "next/server";

import { EstoqueRepository } from "@/src/repository/EstoqueRepository";

import { EstoqueService } from "@/src/services/EstoqueService";

const service = new EstoqueService(new EstoqueRepository());

export async function GET(){

    try {

        const todosItens = await service.listar();

        return NextResponse.json(todosItens, { status: 200 });

    } catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 500 });

    }

}

export async function POST(req) {

    try {

        const body = await req.json();

        const res = await service.cadastrar(
            body.imagem,
            body.item,
            body.quantidade,
            body.status,
            body.dataHora,
            body.sala
        );

        return NextResponse.json(res, { status: 201 });

    } catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 400 });

    }

}
