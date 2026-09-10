import Link from 'next/link';

const features = [
  {
    title: 'Visão clara do estoque',
    text: 'Acompanhe itens, quantidades e status de forma simples, arrumada e fácil de ler.'
  },
  {
    title: 'Movimentações em foco',
    text: 'Registre entradas, saídas e ajustes com uma rotina organizada e prática no dia a dia.'
  },
  {
    title: 'Gestão mais leve',
    text: 'Cadastre, edite e acompanhe tudo em um ambiente visualmente acolhedor e funcional.'
  }
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <section className="overflow-hidden rounded-[2rem] border border-[#d9c4b6]/60 bg-[#f5efe9]/90 shadow-[0_30px_90px_rgba(22,15,12,0.28)] backdrop-blur-sm">
        <div className="grid items-center gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
          <div>
            <span className="inline-flex rounded-full border border-[#cfa994] bg-[#f1e4db] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[#5b4035]">
              Invent Berry
            </span>

            <h1 className="mt-6 text-4xl leading-none text-[#1f1714] sm:text-5xl lg:text-6xl">
              Controle de estoque com mais calma e clareza.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#4b3d37]">
              Organize os itens por sala, acompanhe o andamento do inventário e mantenha tudo em um só lugar, com um visual mais elegante e funcional.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-[#1c1714] px-5 py-3 text-sm font-medium text-[#f7f1eb] transition hover:bg-[#2d221d]"
              >
                Entrar no sistema
              </Link>

              <Link
                href="/cadastro-usuario"
                className="inline-flex items-center justify-center rounded-2xl border border-[#d0b19d] bg-[#f8f1ec] px-5 py-3 text-sm font-medium text-[#2b211d] transition hover:bg-[#f2e5dc]"
              >
                Criar conta
              </Link>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#d7c2b1] bg-[#f0e3d9] p-4 shadow-[0_16px_38px_rgba(83,60,44,0.12)]">
            <div className="rounded-[1.2rem] border border-[#d0b19d] bg-[#faf5f1] p-5">
              <div className="flex items-center justify-between pb-4">
                <p className="text-sm text-[#6c564d]">Resumo</p>
                <span className="rounded-full border border-[#c6e2d2] bg-[#eaf5ee] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#315f47]">
                  Online
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#e4d5c8] bg-[#f4ece7] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#866c61]">Itens</p>
                  <p className="mt-2 text-3xl font-light text-[#1e1614]">1.248</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e4d5c8] bg-[#f4ece7] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#866c61]">Saídas</p>
                    <p className="mt-2 text-2xl font-light text-[#2a211d]">236</p>
                  </div>
                  <div className="rounded-2xl border border-[#e4d5c8] bg-[#f4ece7] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#866c61]">Entradas</p>
                    <p className="mt-2 text-2xl font-light text-[#2a211d]">318</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#f4e7de]">Vantagens</p>
          <h2 className="mt-3 text-3xl text-white">Tudo que você precisa para organizar o estoque</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[1.5rem] border border-[#d9c3b1]/50 bg-[#120f0e]/70 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9b6a2] bg-[#f1e4db] text-lg text-[#4c382f]">
                •
              </div>
              <h3 className="text-xl text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d9d0ca]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[1.6rem] border border-[#d9c3b1]/45 bg-[#140f0d]/75 p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
        <h3 className="text-2xl text-white">Pronto para começar?</h3>
        <p className="mt-2 text-[#e6d7cf]">Acesse o estoque, cadastre itens e acompanhe tudo em um único lugar.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/itens" className="inline-flex justify-center rounded-2xl bg-[#f1e4db] px-5 py-3 text-sm font-medium text-[#241b18] transition hover:bg-[#ead7ca]">
            Ver estoque
          </Link>
          <Link href="/movimentacoes" className="inline-flex justify-center rounded-2xl border border-[#d9c3b1]/60 bg-[#201b1a]/80 px-5 py-3 text-sm font-medium text-[#f9f5f2] transition hover:bg-[#2b2422]">
            Ver movimentações
          </Link>
        </div>
      </section>
    </main>
  );
}