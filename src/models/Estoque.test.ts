
import { Estoque } from "./Estoque";

describe("Modelo Estoque", () => {
    it("Deve criar um item corretamente com imagem, item, quantidade, status e data/hora", () => {
        const imagemEstoque = "https://imagem.com/produto.jpg";
        const itemEstoque = "Notebook Dell";
        const quantidadeEstoque = 10;
        const statusEstoque = "Entrada";
        const dataHoraEstoque = "2026-09-03T08:30";

        const estoque = new Estoque(
            imagemEstoque,
            itemEstoque,
            quantidadeEstoque,
            statusEstoque,
            dataHoraEstoque
        );

        expect(estoque.imagem).toBe("https://imagem.com/produto.jpg");
        expect(estoque.item).toBe("Notebook Dell");
        expect(estoque.quantidade).toBe(10);
        expect(estoque.status).toBe("Entrada");
        expect(estoque.dataHora).toMatch(/T\d{2}:\d{2}:\d{2}/);
        expect(new Date(estoque.dataHora).toString()).not.toBe("Invalid Date");
        expect(estoque.id).toBeNull();
    });

    it("Deve normalizar datas no formato datetime-local para um valor ISO válido com segundos", () => {
        const estoque = new Estoque(
            "https://imagem.com/produto.jpg",
            "Cadeira",
            5,
            "Saída",
            "2026-12-09T10:20"
        );

        const data = new Date(estoque.dataHora);

        expect(isNaN(data.getTime())).toBe(false);
        expect(estoque.dataHora).toMatch(/T\d{2}:\d{2}:\d{2}/);
        expect(estoque.dataHora).toContain("2026-12-09T");
    });
});
