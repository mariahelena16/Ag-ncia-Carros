
export class Estoque {
    id: number | any;
    imagem: string;
    item: string;
    quantidade: number;
    status: string;
    sala: string;
    dataHora: string;

    static normalizarDataHora(dataHora: string): string {
        if (!dataHora) return dataHora;

        const data = new Date(dataHora);

        if (Number.isNaN(data.getTime())) {
            throw new Error('Data e hora inválida');
        }

        return data.toISOString();
    }

    constructor(
        imagem: string,
        item: string,
        quantidade: number,
        status: string,
        dataHora: string,
        sala: string,
        id: any = null
    ) {
        this.id = id;
        this.imagem = imagem;
        this.item = item;
        this.quantidade = quantidade;
        this.status = status;
        this.sala = sala;
        this.dataHora = Estoque.normalizarDataHora(dataHora);
    }
}
