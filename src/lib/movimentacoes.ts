export type Movimentacao = {
  id: number;
  item: string;
  status: string;
  dataHora: string;
  tipo: 'Raspberry Pi' | 'Manual';
};

const STORAGE_KEY = 'agencia-carros-movimentacoes';

export function ordenarMovimentacoes(movimentacoes: Movimentacao[]) {
  return [...movimentacoes].sort((a, b) => {
    const dataA = new Date(a.dataHora).getTime();
    const dataB = new Date(b.dataHora).getTime();

    return dataB - dataA;
  });
}

export function listarMovimentacoes(): Movimentacao[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const dados = window.localStorage.getItem(STORAGE_KEY);

    if (!dados) {
      return [];
    }

    const parsed = JSON.parse(dados) as Movimentacao[];
    return ordenarMovimentacoes(parsed);
  } catch {
    return [];
  }
}

export function registrarMovimentacao(item: string, status: string, dataHora: string) {
  // TODO: integrar com Raspberry Pi para registrar entradas/saídas reais.
  // A área foi reservada para programação futura.
  if (typeof window === 'undefined' || !item || !status || !dataHora) {
    return null;
  }

  return {
    id: Date.now(),
    item,
    status,
    dataHora: new Date(dataHora).toISOString(),
    tipo: 'Raspberry Pi'
  } as Movimentacao;
}
