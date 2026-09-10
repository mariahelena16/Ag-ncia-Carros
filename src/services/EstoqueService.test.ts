
import { EstoqueService } from './EstoqueService';

describe('Serviço EstoqueService', () => {
    let mockRepository: any;
    let estoqueService: EstoqueService;

    beforeEach(() => {
        mockRepository = {
            salvar: jest.fn(),
            listarTodos: jest.fn(),
            buscarPorId: jest.fn(),
            atualizar: jest.fn(),
            excluir: jest.fn()
        };

        estoqueService = new EstoqueService(mockRepository);
    });

    describe('testando validações do método cadastrar', () => {

        it('deve lançar um erro se a imagem não for informada', async () => {
            await expect(
                estoqueService.cadastrar(
                    '',
                    'Notebook',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'A imagem é obrigatória'
            );
        });

        it('deve lançar um erro se o item tiver menos de 2 caracteres', async () => {
            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    'a',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'O item deve ter no mínimo 2 caracteres'
            );

            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    '',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'O item deve ter no mínimo 2 caracteres'
            );
        });

        it('deve lançar um erro se a quantidade for inválida', async () => {
            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    -1,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'A quantidade deve ser maior ou igual a 0'
            );
        });

        it('deve lançar um erro se o status não for informado', async () => {
            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    '',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'O status é obrigatório'
            );
        });

        it('deve lançar um erro se a sala não for informada', async () => {
            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    ''
                )
            ).rejects.toThrow(
                'A sala é obrigatória'
            );
        });

        it('deve lançar um erro se a data e hora não forem informadas', async () => {
            await expect(
                estoqueService.cadastrar(
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    'Entrada',
                    '',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'A data e hora são obrigatórias'
            );
        });
    });

    describe('testando validações do método buscarPorId', () => {

        it('deve lançar um erro se o item não existir', async () => {
            mockRepository.buscarPorId.mockResolvedValue(null);

            await expect(
                estoqueService.buscarPorId(999)
            ).rejects.toThrow(
                'Item não encontrado'
            );
        });
    });

    describe('testando validações do método atualizar', () => {

        it('deve lançar um erro se o ID não for informado', async () => {
            await expect(
                estoqueService.atualizar(
                    null,
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'ID é obrigatório para atualização'
            );
        });

        it('deve lançar um erro se a imagem não for informada', async () => {
            await expect(
                estoqueService.atualizar(
                    1,
                    '',
                    'Notebook',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'Imagem, item, status, sala e data/hora são obrigatórios'
            );
        });

        it('deve lançar um erro se o item não for informado', async () => {
            await expect(
                estoqueService.atualizar(
                    1,
                    'https://imagem.com/produto.jpg',
                    '',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'Imagem, item, status, sala e data/hora são obrigatórios'
            );
        });

        it('deve lançar um erro se a quantidade for inválida', async () => {
            await expect(
                estoqueService.atualizar(
                    1,
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    -1,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'A quantidade deve ser maior ou igual a 0'
            );
        });

        it('deve lançar um erro se o status não for informado', async () => {
            await expect(
                estoqueService.atualizar(
                    1,
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    '',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'Imagem, item, status, sala e data/hora são obrigatórios'
            );
        });

        it('deve lançar um erro se a data e hora não forem informadas', async () => {
            await expect(
                estoqueService.atualizar(
                    1,
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    'Entrada',
                    '',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'Imagem, item, status, sala e data/hora são obrigatórios'
            );
        });

        it('deve lançar um erro se o item não existir', async () => {
            mockRepository.buscarPorId.mockResolvedValue(null);

            await expect(
                estoqueService.atualizar(
                    999,
                    'https://imagem.com/produto.jpg',
                    'Notebook',
                    10,
                    'Entrada',
                    '2026-09-03T08:30',
                    'Sala 1'
                )
            ).rejects.toThrow(
                'Item não encontrado'
            );
        });
    });

    describe('testando o método excluir', () => {

        it('deve lançar um erro se o item não existir', async () => {
            mockRepository.buscarPorId.mockResolvedValue(null);

            await expect(
                estoqueService.excluir(999)
            ).rejects.toThrow(
                'Item não encontrado'
            );
        });
    });
});
