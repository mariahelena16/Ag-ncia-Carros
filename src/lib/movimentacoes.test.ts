import { ordenarMovimentacoes } from './movimentacoes';

describe('ordenarMovimentacoes', () => {
  it('deve ordenar as movimentações pela data e hora mais recente primeiro', () => {
    const movimentacoes = [
      { id: 1, status: 'Entrada', dataHora: '2026-09-02T10:00:00.000Z' },
      { id: 2, status: 'Saída', dataHora: '2026-09-03T11:00:00.000Z' },
      { id: 3, status: 'Entrada', dataHora: '2026-09-01T09:30:00.000Z' }
    ];

    const resultado = ordenarMovimentacoes(movimentacoes as any[]);

    expect(resultado.map((item) => item.id)).toEqual([2, 1, 3]);
  });
});
