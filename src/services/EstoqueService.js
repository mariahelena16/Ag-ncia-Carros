
import { Estoque } from "@/src/models/Estoque";

export class EstoqueService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(imagem, item, quantidade, status, dataHora, sala) {
        if (!imagem)
            throw new Error("A imagem é obrigatória");

        if (!item || item.length < 2)
            throw new Error("O item deve ter no mínimo 2 caracteres");

        if (quantidade == null || quantidade < 0)
            throw new Error("A quantidade deve ser maior ou igual a 0");

        if (!status)
            throw new Error("O status é obrigatório");

        if (!sala)
            throw new Error("A sala é obrigatória");

        if (!dataHora)
            throw new Error("A data e hora são obrigatórias");

        const dataValida = new Date(dataHora);

        if (Number.isNaN(dataValida.getTime())) {
            throw new Error("Data e hora inválida");
        }

        return await this.repository.salvar(
            new Estoque(imagem, item, quantidade, status, dataHora, sala)
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const estoque = await this.repository.buscarPorId(id);

        if (!estoque)
            throw new Error("Item não encontrado");

        return estoque;
    }

    async atualizar(id, imagem, item, quantidade, status, dataHora, sala) {
        if (!id)
            throw new Error("ID é obrigatório para atualização");

        if (!imagem || !item || !status || !dataHora || !sala)
            throw new Error("Imagem, item, status, sala e data/hora são obrigatórios");

        if (quantidade == null || quantidade < 0)
            throw new Error("A quantidade deve ser maior ou igual a 0");

        const dataValida = new Date(dataHora);

        if (Number.isNaN(dataValida.getTime())) {
            throw new Error("Data e hora inválida");
        }

        await this.buscarPorId(id);

        const estoqueAtualizado = new Estoque(
            imagem,
            item,
            quantidade,
            status,
            dataHora,
            sala,
            id
        );

        return await this.repository.atualizar(id, estoqueAtualizado);
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}
