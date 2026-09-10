
import prisma from "@/src/lib/prisma";
import { Estoque } from "@/src/models/Estoque";

export class EstoqueRepository {

    async salvar(obj) {
        return await prisma.estoque.create({
            data: {
                imagem: obj.imagem,
                item: obj.item,
                quantidade: obj.quantidade,
                status: obj.status,
                sala: obj.sala,
                dataHora: new Date(obj.dataHora)
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.estoque.findMany();

        return dados.map(d =>
            new Estoque(
                d.imagem,
                d.item,
                d.quantidade,
                d.status,
                d.dataHora,
                d.sala,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dados = await prisma.estoque.findUnique({
            where: { id: Number(id) }
        });

        if (!dados) return null;

        return new Estoque(
            dados.imagem,
            dados.item,
            dados.quantidade,
            dados.status,
            dados.dataHora,
            dados.sala,
            dados.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.estoque.update({
            where: { id: Number(id) },
            data: {
                imagem: obj.imagem,
                item: obj.item,
                quantidade: obj.quantidade,
                status: obj.status,
                sala: obj.sala,
                dataHora: new Date(obj.dataHora)
            }
        });
    }

    async excluir(id) {
        return await prisma.estoque.delete({
            where: { id: Number(id) }
        });
    }
}
