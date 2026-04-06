import { useState, useRef, useEffect } from "react";

const FontLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap" rel="stylesheet" />
);

const C = {
  sand: "#E8E0D5", taupe: "#C9BAA8", caramel: "#A68F7B",
  brown: "#7A6355", deepBrown: "#4A3D35", graphite: "#2C2C2C",
  offWhite: "#F5F0EB", coolGray: "#9DA3A6", white: "#FFFFFF",
  green: "#6B8F71", greenBg: "#EFF5EF", greenBorder: "#D0E4D2",
};

const SYSTEM_PROMPT = `Você é um assistente de alta performance criado para atuar como a mente técnica e estratégica da Personal Trainer Talita Anjos.

Sua função é pensar, analisar e produzir materiais exatamente como Talita produziria, respeitando sua metodologia, seus valores profissionais e seu posicionamento como personal trainer feminina focada em estética e saúde.

Você atua como: Especialista em treinamento feminino, hipertrofia feminina, recomposição corporal, emagrecimento saudável, periodização, biomecânica, aderência ao treino, estrategista de negócio fitness, Instagram fitness e consultoria online.

IDENTIDADE DA TALITA: Personal trainer que prioriza técnica perfeita antes de carga, constância antes de intensidade extrema, sempre pensa em progressão, usa cardio estratégico, prioriza glúteos e membros inferiores, se preocupa com saúde além da estética, explica o motivo dos treinos, busca parecer profissional premium.

Forma de comunicação: Humana, Natural, Motivadora, Profissional, Segura, Didática. Sem linguagem robótica. Como uma treinadora experiente falando. Sempre em primeira pessoa como Talita.

PLANOS DA CONSULTORIA:
- 1 protocolo (3 meses): 3x R$139,80 no cartão ou R$390,00 à vista no Pix. Composto por 1 mesociclo de 12 semanas.
- 2 protocolos (6 meses): 6x R$127,31 no cartão ou R$690,00 à vista no Pix. Composto por 2 mesociclos de 12 semanas cada.
- 4 protocolos (12 meses): 12x R$125,99 no cartão ou R$1.260,00 à vista no Pix. Composto por 4 mesociclos de 12 semanas cada.
Cada protocolo/mesociclo dura 12 semanas.

FILOSOFIA DE TREINAMENTO: Volume semanal adequado, progressão de carga planejada, controle de fadiga, técnica antes de carga, cardio como ferramenta metabólica e não punição. Prioridades estéticas: Glúteos, Posterior, Quadríceps, Core, Ombros.

REGRAS TÉCNICAS DOS TREINOS: Calcule volume semanal por músculo, distribuição por sessão, intensidade estimada, faixa de repetições, objetivo fisiológico. Inclua justificativa técnica, objetivo do microciclo, estratégia de progressão e execução. Evite treinos genéricos e exercícios redundantes.

CARDIO: Zona 2 = 60-70% de (220 - idade). Sugira tempo, frequência, momento e opções.

ANÁLISE DE ALUNAS: 1.Evolução principal 2.Evolução secundária 3.Análise técnica 4.Reconhecimento do esforço 5.Próximo objetivo 6.Mensagem motivacional.

DOCUMENTOS: Crie avaliação inicial, check-in semanal/mensal, relatório de evolução, encerramento de mesociclo, renovação, feedback técnico, formulários. Sempre organizado, profissional, claro, premium.

INSTAGRAM: Pense em autoridade, conexão, conversão, posicionamento premium, diferenciação. Crie posts, legendas, roteiros de reels, stories, scripts de venda, funis. Pense como personal que cobra caro.

NEGÓCIO: Sugira diferenciais, estrutura premium, experiência da aluna, organização, retenção e renovação.

PADRÃO: Antes de responder — isso parece trabalho de personal premium? Se não, refine. Você existe para aumentar o nível profissional da Talita. Sempre. Responda em português brasileiro.`;

// ── PLANOS ────────────────────────────────────────────────────────────────────
const PLANOS = [
  {
    id: "p1",
    nome: "1 Protocolo",
    duracao: "3 meses",
    protocolos: 1,
    semanas: 12,
    cartao: "3x de R$ 139,80",
    pix: "R$ 390,00",
    totalCartao: 419.40,
    totalPix: 390.00,
  },
  {
    id: "p2",
    nome: "2 Protocolos",
    duracao: "6 meses",
    protocolos: 2,
    semanas: 24,
    cartao: "6x de R$ 127,31",
    pix: "R$ 690,00",
    totalCartao: 763.86,
    totalPix: 690.00,
  },
  {
    id: "p4",
    nome: "4 Protocolos",
    duracao: "12 meses",
    protocolos: 4,
    semanas: 48,
    cartao: "12x de R$ 125,99",
    pix: "R$ 1.260,00",
    totalCartao: 1511.88,
    totalPix: 1260.00,
  },
];

const OBJETIVOS = ["Emagrecimento", "Hipertrofia", "Recomposição Corporal", "Saúde e Qualidade de Vida"];
const NIVEIS = ["Iniciante", "Intermediária", "Avançada"];
const PAGAMENTOS = ["Pix (à vista)", "Cartão (parcelado)"];
const STATUS_LEAD = ["Interesse", "Conversa Iniciada", "Proposta Enviada", "Negociando", "Fechou", "Perdeu"];
const SLC = { "Interesse": C.sand, "Conversa Iniciada": C.taupe, "Proposta Enviada": C.caramel, "Negociando": C.brown, "Fechou": C.green, "Perdeu": C.coolGray };
const IA_MODES = [
  { id: "treino", label: "Montar Treino", icon: "◈", prefix: "MONTAR TREINO — ", placeholder: "Descreva a aluna: objetivo, nível, dias disponíveis, equipamentos, histórico..." },
  { id: "analisar", label: "Analisar Treino", icon: "⟐", prefix: "ANALISAR TREINO — ", placeholder: "Cole o treino completo para análise técnica..." },
  { id: "aluna", label: "Analisar Aluna", icon: "✦", prefix: "ANALISAR ALUNA — ", placeholder: "Descreva as mudanças, medidas, fotos, relatos da aluna..." },
  { id: "documento", label: "Criar Documento", icon: "◻", prefix: "CRIAR DOCUMENTO — ", placeholder: "Que documento precisa? Check-in, avaliação, relatório, renovação..." },
  { id: "instagram", label: "Instagram", icon: "→", prefix: "ESTRATÉGIA INSTAGRAM — ", placeholder: "Tipo de conteúdo, tema, objetivo, público alvo..." },
  { id: "negocio", label: "Negócio", icon: "◇", prefix: "MODO MENTOR — ", placeholder: "Qual desafio do negócio quer resolver?" },
];
const TIPOS_C = ["Reel", "Carrossel", "Foto", "Story", "Live"];
const PILARES = ["Autoridade Técnica", "Conexão Pessoal", "Educação", "Bastidores", "Prova Social", "Conversão"];
const S_COLOR = { "Ideia": C.sand, "Escrevendo": C.taupe, "Pronto": C.caramel, "Publicado": C.green };
const NAV = [
  { id: "dashboard", label: "Visão Geral", icon: "◈" },
  { id: "alunas", label: "Alunas", icon: "✦" },
  { id: "ia", label: "IA Assistente", icon: "→" },
  { id: "checkin", label: "Check-in", icon: "◻" },
  { id: "conteudo", label: "Conteúdo", icon: "◇" },
  { id: "vendas", label: "Vendas", icon: "⟐" },
];

// ── UTILS ─────────────────────────────────────────────────────────────────────
const useStorage = () => {
  const get = async (key) => { try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; } };
  const set = async (key, val) => { try { await window.storage.set(key, JSON.stringify(val)); } catch {} };
  return { get, set };
};
const uid = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toLocaleDateString("pt-BR");

// Add weeks to a date string dd/mm/yyyy
const addWeeks = (dateStr, weeks) => {
  if (!dateStr) return "—";
  const [d, m, y] = dateStr.split("/").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + weeks * 7);
  return dt.toLocaleDateString("pt-BR");
};

// Generate mesociclos for a plano starting at a date, with current meso index
const buildMesociclos = (plano, inicioStr, mesoAtual) => {
  return Array.from({ length: plano.protocolos }, (_, i) => {
    const inicioMeso = addWeeks(inicioStr, i * 12);
    const fimMeso = addWeeks(inicioStr, (i + 1) * 12 - 1);
    return {
      numero: i + 1,
      label: `Protocolo ${i + 1}`,
      inicio: inicioMeso,
      fim: fimMeso,
      atual: i + 1 === mesoAtual,
      concluido: i + 1 < mesoAtual,
    };
  });
};

const weeksBetween = (dateStr1, dateStr2) => {
  if (!dateStr1 || !dateStr2) return 0;
  const parse = (s) => { const [d, m, y] = s.split("/").map(Number); return new Date(y, m - 1, d); };
  return Math.floor((parse(dateStr2) - parse(dateStr1)) / (7 * 24 * 60 * 60 * 1000));
};

const currentWeekInMeso = (mesoInicio) => {
  const now = new Date();
  const [d, m, y] = mesoInicio.split("/").map(Number);
  const start = new Date(y, m - 1, d);
  const diff = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, Math.min(diff, 12));
};

const fmt = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
    if (line.startsWith("## ")) return <h3 key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 18, color: C.deepBrown, margin: "16px 0 5px", fontStyle: "italic" }}>{line.slice(3)}</h3>;
    if (line.startsWith("### ")) return <p key={i} style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.caramel, margin: "12px 0 4px", fontWeight: 300 }}>{line.slice(4)}</p>;
    if (line.match(/^[•\-] /)) return <div key={i} style={{ display: "flex", gap: 8, margin: "2px 0" }}><span style={{ color: C.caramel, flexShrink: 0 }}>·</span><p style={{ color: C.deepBrown, fontSize: 13, lineHeight: 1.7, fontWeight: 300, margin: 0 }} dangerouslySetInnerHTML={{ __html: html.replace(/^[•\-] /, "") }} /></div>;
    if (line.match(/^\d+\./)) return <p key={i} style={{ paddingLeft: 4, color: C.deepBrown, margin: "3px 0", fontSize: 13, lineHeight: 1.7, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: html }} />;
    if (!line.trim()) return <div key={i} style={{ height: 7 }} />;
    return <p key={i} style={{ color: C.graphite, fontSize: 13, lineHeight: 1.8, margin: "1px 0", fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: html }} />;
  });
};

const callIA = async (prompt) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.map(b => b.text || "").join("") || "";
};

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GS = () => (
  <style>{`
    *{box-sizing:border-box;margin:0;padding:0;}
    @keyframes pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
    .fade-up{animation:fadeUp .3s ease forwards;}
    .slide-in{animation:slideIn .22s ease forwards;}
    input,textarea,select{font-family:'Josefin Sans',sans-serif;outline:none;}
    input::placeholder,textarea::placeholder{color:${C.taupe};}
    input:focus,textarea:focus,select:focus{border-color:${C.caramel}!important;}
    ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:${C.offWhite};}::-webkit-scrollbar-thumb{background:${C.taupe};border-radius:2px;}
    button{font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    .nav-btn{display:flex;align-items:center;gap:10px;padding:11px 20px;background:none;border:none;text-align:left;cursor:pointer;transition:all .18s;width:100%;}
    .nav-btn:hover{background:rgba(166,143,123,0.1);}
    .nav-btn.active{background:${C.deepBrown};}
    .card{background:${C.white};border:1px solid ${C.sand};border-radius:3px;}
    .card-hover{transition:box-shadow .2s,transform .2s;}
    .card-hover:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);transform:translateY(-1px);}
    .btn-p{background:${C.deepBrown};color:${C.sand};border:none;border-radius:2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:10px 18px;transition:opacity .2s;font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    .btn-p:hover{opacity:.85;}
    .btn-p:disabled{background:${C.sand};color:${C.taupe};cursor:default;opacity:1;}
    .btn-g{background:none;border:1px solid ${C.sand};color:${C.caramel};border-radius:2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:8px 14px;transition:all .2s;font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    .btn-g:hover{border-color:${C.caramel};}
    .input{background:white;border:1px solid ${C.sand};border-radius:2px;padding:10px 12px;font-size:12px;font-weight:300;color:${C.graphite};letter-spacing:.3px;width:100%;transition:border-color .2s;}
    .tag{display:inline-flex;align-items:center;font-size:8px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:3px 8px;border-radius:2px;}
    .lbl{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:${C.caramel};font-weight:200;margin-bottom:6px;display:block;}
    .plano-card{border:1px solid ${C.sand};border-radius:3px;padding:16px;cursor:pointer;transition:all .2s;}
    .plano-card:hover{border-color:${C.caramel};}
    .plano-card.selected{border-color:${C.deepBrown};background:#FAF7F4;}
  `}</style>
);

const Lbl = ({ children, style }) => <p style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 12, ...style }}>{children}</p>;
const Divider = ({ style }) => <div style={{ height: 1, background: C.sand, ...style }} />;
const Heading = ({ children }) => <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 26, color: C.graphite, fontStyle: "italic" }}>{children}</h2>;
const FW = ({ label, children }) => <div style={{ marginBottom: 14 }}><span className="lbl">{label}</span>{children}</div>;

// ── MESOCICLO TIMELINE ────────────────────────────────────────────────────────
function MesoTimeline({ mesociclos, mesoAtual }) {
  return (
    <div>
      <span className="lbl">Linha do Tempo — Protocolos</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {mesociclos.map((m) => {
          const isCurrent = m.numero === mesoAtual;
          const isDone = m.numero < mesoAtual;
          const semanaAtual = isCurrent ? currentWeekInMeso(m.inicio) : null;
          const progress = isCurrent ? Math.round((semanaAtual / 12) * 100) : isDone ? 100 : 0;

          return (
            <div key={m.numero} style={{
              borderRadius: 3,
              border: `1px solid ${isCurrent ? C.deepBrown : isDone ? C.greenBorder : C.sand}`,
              background: isCurrent ? "#FAF7F4" : isDone ? C.greenBg : C.white,
              padding: "14px 16px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: `${progress}%`, background: isCurrent ? C.deepBrown : C.green, borderRadius: "0 2px 2px 0", transition: "width .6s ease" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p style={{ fontSize: 11, fontWeight: 300, color: isCurrent ? C.deepBrown : isDone ? C.green : C.caramel, letterSpacing: .5 }}>{m.label}</p>
                    {isCurrent && <span className="tag" style={{ background: C.deepBrown, color: C.sand, fontSize: 7 }}>Em andamento</span>}
                    {isDone && <span className="tag" style={{ background: C.greenBg, color: C.green, fontSize: 7 }}>Concluído</span>}
                    {!isCurrent && !isDone && <span className="tag" style={{ background: C.sand, color: C.taupe, fontSize: 7 }}>Futuro</span>}
                  </div>
                  <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200, letterSpacing: .5 }}>{m.inicio} → {m.fim}</p>
                </div>
                {isCurrent && semanaAtual && (
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.deepBrown, lineHeight: 1 }}>{semanaAtual}<span style={{ fontSize: 12, color: C.caramel }}>/12</span></p>
                    <p style={{ fontSize: 8, letterSpacing: 1, color: C.caramel, fontWeight: 200 }}>semana atual</p>
                  </div>
                )}
                {isDone && (
                  <span style={{ color: C.green, fontSize: 14 }}>✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PLANO SELECTOR ────────────────────────────────────────────────────────────
function PlanoSelector({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {PLANOS.map(p => (
        <div key={p.id} className={`plano-card ${value === p.id ? "selected" : ""}`} onClick={() => onChange(p.id)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 300, color: C.deepBrown, letterSpacing: .5, marginBottom: 2 }}>{p.nome} · {p.duracao}</p>
              <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{p.protocolos} mesociclo{p.protocolos > 1 ? "s" : ""} de 12 semanas cada</p>
            </div>
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${value === p.id ? C.deepBrown : C.taupe}`, background: value === p.id ? C.deepBrown : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {value === p.id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.sand }} />}
            </div>
          </div>
          <Divider style={{ margin: "8px 0" }} />
          <div style={{ display: "flex", gap: 20 }}>
            <div>
              <p style={{ fontSize: 7, letterSpacing: 2, color: C.caramel, textTransform: "uppercase", fontWeight: 200 }}>Cartão</p>
              <p style={{ fontSize: 11, color: C.graphite, fontWeight: 300, marginTop: 2 }}>{p.cartao}</p>
            </div>
            <div>
              <p style={{ fontSize: 7, letterSpacing: 2, color: C.caramel, textTransform: "uppercase", fontWeight: 200 }}>Pix</p>
              <p style={{ fontSize: 11, color: C.graphite, fontWeight: 300, marginTop: 2 }}>{p.pix} à vista</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ alunas, leads, checkins, conteudos, setNav }) {
  const ativas = alunas.filter(a => a.status === "Ativa").length;
  const pendentes = checkins.filter(c => !c.respondido).length;
  const leadsAtivos = leads.filter(l => !["Fechou", "Perdeu"].includes(l.status)).length;
  const fila = conteudos.filter(c => !c.publicado).length;

  // Alunas com mesociclo atual calculado
  const alunasMeso = alunas.filter(a => a.planoId && a.mesoAtual).slice(0, 3);

  return (
    <div className="slide-in">
      <div style={{ marginBottom: 28 }}>
        <Lbl>Hoje · {today()}</Lbl>
        <Heading>Visão <em style={{ color: C.brown }}>Geral</em></Heading>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
        {[
          { label: "Alunas Ativas", value: ativas, sub: `${alunas.length} cadastradas`, icon: "✦", nav: "alunas" },
          { label: "Check-ins Pendentes", value: pendentes, sub: "aguardando resposta", icon: "◻", nav: "checkin" },
          { label: "Leads em Aberto", value: leadsAtivos, sub: "em negociação", icon: "⟐", nav: "vendas" },
          { label: "Conteúdos na Fila", value: fila, sub: "para publicar", icon: "◇", nav: "conteudo" },
        ].map(s => (
          <div key={s.label} className="card card-hover" style={{ padding: "18px 18px 16px", cursor: "pointer" }} onClick={() => setNav(s.nav)}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.caramel, fontWeight: 200 }}>{s.label}</span>
              <span style={{ color: C.taupe, fontSize: 13 }}>{s.icon}</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: C.deepBrown, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 9, color: C.coolGray, marginTop: 5, fontWeight: 200, letterSpacing: 1 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Alunas em andamento */}
      {alunasMeso.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Lbl>Protocolos em Andamento</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {alunasMeso.map(a => {
              const plano = PLANOS.find(p => p.id === a.planoId);
              const mesos = plano ? buildMesociclos(plano, a.inicio, a.mesoAtual) : [];
              const mesoCorrente = mesos.find(m => m.numero === a.mesoAtual);
              const semana = mesoCorrente ? currentWeekInMeso(mesoCorrente.inicio) : "—";
              return (
                <div key={a.id} className="card" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 300, color: C.graphite, marginBottom: 3 }}>{a.nome}</p>
                    <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{plano?.nome} · Protocolo {a.mesoAtual}/{plano?.protocolos}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: C.deepBrown, lineHeight: 1 }}>Sem. {semana}</p>
                    <p style={{ fontSize: 8, color: C.caramel, fontWeight: 200, letterSpacing: 1 }}>de 12</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {alunas.length > 0 && alunasMeso.length === 0 && (
        <div style={{ marginBottom: 24 }}>
          <Lbl>Alunas Recentes</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {alunas.slice(0, 3).map(a => (
              <div key={a.id} className="card" style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 300, color: C.graphite }}>{a.nome}</p>
                  <p style={{ fontSize: 9, color: C.coolGray, marginTop: 2, fontWeight: 200 }}>{a.objetivo} · {a.planoNome || "Plano não definido"}</p>
                </div>
                <span className="tag" style={{ background: a.status === "Ativa" ? C.greenBg : C.sand, color: a.status === "Ativa" ? C.green : C.caramel }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {leads.filter(l => !["Fechou", "Perdeu"].includes(l.status)).length > 0 && (
        <div>
          <Lbl>Pipeline Ativo</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {leads.filter(l => !["Fechou", "Perdeu"].includes(l.status)).slice(0, 3).map(l => (
              <div key={l.id} className="card" style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 300, color: C.graphite }}>{l.nome}</p>
                  <p style={{ fontSize: 9, color: C.coolGray, marginTop: 2, fontWeight: 200 }}>{l.origem} · {l.data}</p>
                </div>
                <span className="tag" style={{ background: (SLC[l.status] || C.sand) + "33", color: SLC[l.status] || C.caramel }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {alunas.length === 0 && leads.length === 0 && (
        <div style={{ textAlign: "center", padding: "52px 0" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic", marginBottom: 8 }}>Tudo zerado por aqui</p>
          <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200 }}>Comece cadastrando uma aluna ou um lead</p>
        </div>
      )}
    </div>
  );
}

// ── ALUNAS ────────────────────────────────────────────────────────────────────
function Alunas({ alunas, setAlunas, storage, setIaContext }) {
  const [view, setView] = useState("list");
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({
    nome: "", idade: "", objetivo: "", nivel: "", obs: "",
    planoId: "", pagamento: "Pix (à vista)", inicio: "",
    mesoAtual: 1, status: "Ativa",
  });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const planoSel = PLANOS.find(p => p.id === form.planoId);

  const save = async () => {
    if (!form.nome.trim() || !form.planoId) return;
    const plano = PLANOS.find(p => p.id === form.planoId);
    const validade = addWeeks(form.inicio.replace(/-/g, "/").split("/").reverse().join("/"), plano.semanas);
    const nova = {
      ...form,
      id: uid(),
      criadoEm: today(),
      planoNome: plano.nome,
      validade,
    };
    const updated = [nova, ...alunas];
    setAlunas(updated); await storage.set("alunas", updated);
    setForm({ nome: "", idade: "", objetivo: "", nivel: "", obs: "", planoId: "", pagamento: "Pix (à vista)", inicio: "", mesoAtual: 1, status: "Ativa" });
    setView("list");
  };

  const remove = async (id) => {
    const updated = alunas.filter(a => a.id !== id);
    setAlunas(updated); await storage.set("alunas", updated);
    setSel(null); setView("list");
  };

  const advanceMeso = async (id) => {
    const updated = alunas.map(a => {
      if (a.id !== id) return a;
      const plano = PLANOS.find(p => p.id === a.planoId);
      const next = Math.min(a.mesoAtual + 1, plano?.protocolos || 1);
      return { ...a, mesoAtual: next };
    });
    setAlunas(updated); await storage.set("alunas", updated);
  };

  if (view === "form") {
    // Convert date input (yyyy-mm-dd) to dd/mm/yyyy for display
    const inicioFormatado = form.inicio
      ? form.inicio.split("-").reverse().join("/")
      : "";

    return (
      <div className="slide-in">
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
          <button className="btn-g" onClick={() => setView("list")}>← Voltar</button>
          <Heading>Nova Aluna</Heading>
        </div>
        <div className="card" style={{ padding: 24 }}>
          {/* Dados pessoais */}
          <p style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 14 }}>Dados Pessoais</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FW label="Nome Completo"><input className="input" value={form.nome} onChange={e => f("nome", e.target.value)} placeholder="Nome da aluna" /></FW>
            <FW label="Idade"><input className="input" type="number" value={form.idade} onChange={e => f("idade", e.target.value)} placeholder="Anos" /></FW>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FW label="Objetivo"><select className="input" value={form.objetivo} onChange={e => f("objetivo", e.target.value)} style={{ appearance: "none" }}><option value="">Selecione</option>{OBJETIVOS.map(o => <option key={o}>{o}</option>)}</select></FW>
            <FW label="Nível"><select className="input" value={form.nivel} onChange={e => f("nivel", e.target.value)} style={{ appearance: "none" }}><option value="">Selecione</option>{NIVEIS.map(n => <option key={n}>{n}</option>)}</select></FW>
          </div>
          <FW label="Histórico / Observações"><textarea className="input" rows={2} value={form.obs} onChange={e => f("obs", e.target.value)} placeholder="Lesões, restrições, histórico relevante..." style={{ resize: "none" }} /></FW>

          <Divider style={{ margin: "18px 0" }} />

          {/* Plano */}
          <p style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 14 }}>Plano Contratado</p>
          <FW label="Escolha o Plano">
            <PlanoSelector value={form.planoId} onChange={v => f("planoId", v)} />
          </FW>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <FW label="Forma de Pagamento">
              <select className="input" value={form.pagamento} onChange={e => f("pagamento", e.target.value)} style={{ appearance: "none" }}>
                {PAGAMENTOS.map(p => <option key={p}>{p}</option>)}
              </select>
            </FW>
            <FW label="Data de Início">
              <input className="input" type="date" value={form.inicio} onChange={e => f("inicio", e.target.value)} />
            </FW>
            <FW label="Mesociclo Atual">
              <select className="input" value={form.mesoAtual} onChange={e => f("mesoAtual", Number(e.target.value))} style={{ appearance: "none" }}>
                {Array.from({ length: planoSel?.protocolos || 1 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Protocolo {i + 1}</option>
                ))}
              </select>
            </FW>
          </div>

          {planoSel && form.inicio && (
            <div style={{ background: C.offWhite, borderRadius: 3, padding: "14px 16px", marginBottom: 14, border: `1px solid ${C.sand}` }}>
              <p style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 8 }}>Resumo do Plano</p>
              <div style={{ display: "flex", gap: 24 }}>
                <div><p style={{ fontSize: 8, color: C.coolGray, fontWeight: 200, letterSpacing: 1 }}>Início</p><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{inicioFormatado}</p></div>
                <div><p style={{ fontSize: 8, color: C.coolGray, fontWeight: 200, letterSpacing: 1 }}>Validade</p><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{addWeeks(inicioFormatado, planoSel.semanas)}</p></div>
                <div><p style={{ fontSize: 8, color: C.coolGray, fontWeight: 200, letterSpacing: 1 }}>Total</p><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{form.pagamento === "Pix (à vista)" ? planoSel.pix : planoSel.cartao}</p></div>
              </div>
            </div>
          )}

          <button className="btn-p" onClick={save} disabled={!form.nome || !form.planoId}>Cadastrar Aluna</button>
        </div>
      </div>
    );
  }

  if (view === "detail") {
    const a = alunas.find(x => x.id === sel);
    if (!a) { setView("list"); return null; }
    const plano = PLANOS.find(p => p.id === a.planoId);
    const mesos = plano ? buildMesociclos(plano, a.inicio, a.mesoAtual) : [];

    return (
      <div className="slide-in">
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <button className="btn-g" onClick={() => { setSel(null); setView("list"); }}>← Voltar</button>
        </div>

        {/* Cabeçalho */}
        <div className="card" style={{ padding: 24, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <Lbl style={{ marginBottom: 4 }}>Ficha da Aluna</Lbl>
              <Heading>{a.nome}</Heading>
            </div>
            <span className="tag" style={{ background: a.status === "Ativa" ? C.greenBg : C.sand, color: a.status === "Ativa" ? C.green : C.caramel }}>{a.status}</span>
          </div>
          <Divider style={{ marginBottom: 18 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[["Idade", a.idade ? `${a.idade} anos` : "—"], ["Objetivo", a.objetivo || "—"], ["Nível", a.nivel || "—"]].map(([k, v]) => (
              <div key={k}><span className="lbl">{k}</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{v}</p></div>
            ))}
          </div>
          {a.obs && <><Divider style={{ margin: "16px 0" }} /><span className="lbl">Histórico / Obs</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300, lineHeight: 1.7 }}>{a.obs}</p></>}
        </div>

        {/* Plano */}
        <div className="card" style={{ padding: 24, marginBottom: 12 }}>
          <Lbl style={{ marginBottom: 14 }}>Plano Contratado</Lbl>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
            {[
              ["Plano", a.planoNome || "—"],
              ["Pagamento", a.pagamento || "—"],
              ["Início", a.inicio ? a.inicio.split("-").reverse().join("/") : "—"],
              ["Validade", a.validade || "—"],
              ["Protocolo Atual", `${a.mesoAtual} de ${plano?.protocolos || "—"}`],
              ["Cadastro", a.criadoEm],
            ].map(([k, v]) => (
              <div key={k}><span className="lbl">{k}</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{v}</p></div>
            ))}
          </div>

          {/* Preço resumo */}
          {plano && (
            <div style={{ background: C.offWhite, borderRadius: 3, padding: "12px 14px", border: `1px solid ${C.sand}` }}>
              <div style={{ display: "flex", gap: 24 }}>
                <div><p style={{ fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: C.caramel, fontWeight: 200 }}>Pix</p><p style={{ fontSize: 12, color: C.graphite, fontWeight: 300, marginTop: 2 }}>{plano.pix} à vista</p></div>
                <div><p style={{ fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: C.caramel, fontWeight: 200 }}>Cartão</p><p style={{ fontSize: 12, color: C.graphite, fontWeight: 300, marginTop: 2 }}>{plano.cartao}</p></div>
              </div>
            </div>
          )}
        </div>

        {/* Mesociclos */}
        {mesos.length > 0 && (
          <div className="card" style={{ padding: 24, marginBottom: 14 }}>
            <MesoTimeline mesociclos={mesos} mesoAtual={a.mesoAtual} />
            {a.mesoAtual < (plano?.protocolos || 1) && (
              <button className="btn-g" onClick={() => advanceMeso(a.id)} style={{ marginTop: 16 }}>
                Avançar para Protocolo {a.mesoAtual + 1} →
              </button>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-p" onClick={() => {
            setIaContext(`Aluna: ${a.nome}, ${a.idade} anos, objetivo: ${a.objetivo}, nível: ${a.nivel}, plano: ${a.planoNome}, protocolo atual: ${a.mesoAtual}${a.obs ? `, obs: ${a.obs}` : ""}. `);
          }}>Usar na IA →</button>
          <button className="btn-g" onClick={() => remove(a.id)}>Remover</button>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div><Lbl>Gestão</Lbl><Heading>Alunas</Heading></div>
        <button className="btn-p" onClick={() => setView("form")}>+ Nova Aluna</button>
      </div>
      {alunas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic", marginBottom: 8 }}>Nenhuma aluna cadastrada</p>
          <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200 }}>Clique em + Nova Aluna</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {alunas.map(a => {
            const plano = PLANOS.find(p => p.id === a.planoId);
            return (
              <div key={a.id} className="card card-hover" onClick={() => { setSel(a.id); setView("detail"); }} style={{ padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 300, color: C.graphite, marginBottom: 3 }}>{a.nome}</p>
                  <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{a.objetivo || "—"} · {plano?.nome || "—"} · Protocolo {a.mesoAtual}/{plano?.protocolos || "—"}</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="tag" style={{ background: a.status === "Ativa" ? C.greenBg : C.sand, color: a.status === "Ativa" ? C.green : C.caramel }}>{a.status}</span>
                  <span style={{ color: C.taupe }}>›</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── IA ASSISTANT ──────────────────────────────────────────────────────────────
function IAAssistant({ iaContext, setIaContext }) {
  const [mode, setMode] = useState(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { if (iaContext) { setInput(p => iaContext + p); setIaContext(""); } }, [iaContext]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || !mode || loading) return;
    const m = IA_MODES.find(x => x.id === mode);
    const content = m.prefix + input.trim();
    const newMsgs = [...msgs, { role: "user", content }];
    setMsgs(newMsgs); setInput(""); setLoading(true); setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: newMsgs }),
      });
      const data = await res.json();
      if (data.error) throw new Error();
      setMsgs([...newMsgs, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "" }]);
    } catch { setError("Erro ao conectar. Tente novamente."); }
    finally { setLoading(false); }
  };

  const m = IA_MODES.find(x => x.id === mode);

  return (
    <div className="slide-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><Lbl>Assistente</Lbl><Heading>IA Técnica</Heading></div>
          {msgs.length > 0 && <button className="btn-g" onClick={() => { setMsgs([]); setInput(""); setError(""); }}>Limpar</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 16 }}>
        {IA_MODES.map(x => (
          <button key={x.id} onClick={() => setMode(x.id)} style={{ background: mode === x.id ? C.deepBrown : C.white, border: `1px solid ${mode === x.id ? C.deepBrown : C.sand}`, borderRadius: 2, padding: "9px 10px 10px", textAlign: "left", transition: "all .18s" }}>
            <span style={{ fontSize: 12, display: "block", marginBottom: 3, color: mode === x.id ? C.taupe : C.caramel }}>{x.icon}</span>
            <span style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: mode === x.id ? C.sand : C.deepBrown, fontWeight: 300, display: "block" }}>{x.label}</span>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 14 }}>
        {msgs.length === 0 && <div style={{ textAlign: "center", padding: "32px 0" }}><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: C.taupe, fontStyle: "italic" }}>{mode ? "Pronta para ajudar" : "Selecione um modo"}</p></div>}
        {msgs.map((msg, i) => (
          <div key={i} className="fade-up" style={{ marginBottom: 12 }}>
            {msg.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: C.deepBrown, borderRadius: "3px 3px 0 3px", padding: "10px 14px", maxWidth: "74%", fontSize: 12, color: C.sand, lineHeight: 1.7, fontWeight: 300 }}>{msg.content.replace(/^[A-ZÇÃÕÁÉÍÓÚ\s—]+ — /, "")}</div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, background: C.sand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brown, flexShrink: 0, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic" }}>T</div>
                <div className="card" style={{ padding: "13px 16px", flex: 1 }}>{fmt(msg.content)}</div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 24, height: 24, background: C.sand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brown, flexShrink: 0, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic" }}>T</div>
            <div className="card" style={{ padding: "12px 16px", display: "flex", gap: 4 }}>{[0, 1, 2].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: C.taupe, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${d * 0.2}s` }} />)}</div>
          </div>
        )}
        {error && <div style={{ background: "#fff5f5", border: "1px solid #f0d0d0", borderRadius: 2, padding: "10px 14px", fontSize: 11, color: "#c05050" }}>{error}</div>}
        <div ref={bottomRef} />
      </div>
      {mode && (
        <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: 12 }}>
          <p style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 6 }}>{m?.icon} {m?.label}</p>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder={m?.placeholder} rows={2}
              style={{ flex: 1, background: C.white, border: `1px solid ${C.sand}`, borderRadius: 2, padding: "10px 12px", fontSize: 12, fontWeight: 300, color: C.graphite, resize: "none", lineHeight: 1.6, letterSpacing: .3, transition: "border-color .2s", fontFamily: "'Josefin Sans',sans-serif" }} />
            <button onClick={send} disabled={!input.trim() || loading} className="btn-p" style={{ height: 44, padding: "0 16px", fontSize: 16, letterSpacing: 0 }}>→</button>
          </div>
          <p style={{ fontSize: 8, color: C.taupe, marginTop: 4, letterSpacing: 1, fontWeight: 200 }}>Enter envia · Shift+Enter nova linha</p>
        </div>
      )}
    </div>
  );
}

// ── CHECK-IN ──────────────────────────────────────────────────────────────────
function CheckIn({ alunas, checkins, setCheckins, storage }) {
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ alunaId: "", semana: "", peso: "", sono: 0, energia: 0, aderencia: 0, dificuldades: "", obs: "" });
  const [sel, setSel] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [feedback, setFeedback] = useState("");

  const save = async () => {
    if (!form.alunaId) return;
    const aluna = alunas.find(a => a.id === form.alunaId);
    const novo = { ...form, id: uid(), alunanome: aluna?.nome || "", data: today(), respondido: false, feedback: "" };
    const updated = [novo, ...checkins];
    setCheckins(updated); await storage.set("checkins", updated);
    setForm({ alunaId: "", semana: "", peso: "", sono: 0, energia: 0, aderencia: 0, dificuldades: "", obs: "" });
    setView("list");
  };

  const genFeedback = async (ci) => {
    setGenerating(true); setFeedback("");
    const aluna = alunas.find(a => a.id === ci.alunaId);
    const plano = aluna ? PLANOS.find(p => p.id === aluna.planoId) : null;
    const prompt = `ANALISAR ALUNA — Check-in semanal:
Aluna: ${aluna ? `${aluna.nome}, objetivo: ${aluna.objetivo}, nível: ${aluna.nivel}` : ci.alunanome}
Plano: ${plano?.nome || "—"} · Protocolo atual: ${aluna?.mesoAtual || "—"}
Semana do check-in: ${ci.semana} | Peso: ${ci.peso || "não informado"} kg
Sono: ${ci.sono}/5 | Energia: ${ci.energia}/5 | Aderência: ${ci.aderencia}/5
Dificuldades: ${ci.dificuldades || "nenhuma"} | Obs: ${ci.obs || "—"}
Gere um feedback técnico e motivacional completo seguindo a estrutura padrão dos 6 pontos.`;
    try {
      const fb = await callIA(prompt);
      setFeedback(fb);
      const updated = checkins.map(c => c.id === ci.id ? { ...c, feedback: fb, respondido: true } : c);
      setCheckins(updated); await storage.set("checkins", updated);
    } catch { setFeedback("Erro ao gerar. Tente novamente."); }
    finally { setGenerating(false); }
  };

  const Score = ({ label, k }) => (
    <div style={{ marginBottom: 12 }}>
      <span className="lbl">{label}</span>
      <div style={{ display: "flex", gap: 5 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => setForm(p => ({ ...p, [k]: n }))} style={{ width: 34, height: 34, borderRadius: 2, border: `1px solid ${form[k] >= n ? C.deepBrown : C.sand}`, background: form[k] >= n ? C.deepBrown : C.white, color: form[k] >= n ? C.sand : C.caramel, fontSize: 11, fontWeight: 300, transition: "all .15s" }}>{n}</button>
        ))}
      </div>
    </div>
  );

  const selCI = checkins.find(c => c.id === sel);

  if (view === "detail" && selCI) return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
        <button className="btn-g" onClick={() => { setSel(null); setView("list"); setFeedback(""); }}>← Voltar</button>
        <p style={{ fontSize: 13, fontWeight: 300, color: C.graphite }}>{selCI.alunanome} · {selCI.semana}</p>
      </div>
      <div className="card" style={{ padding: 22, marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
          {[["Aluna", selCI.alunanome || "—"], ["Data", selCI.data], ["Peso", selCI.peso ? `${selCI.peso} kg` : "—"], ["Sono", `${selCI.sono}/5`], ["Energia", `${selCI.energia}/5`], ["Aderência", `${selCI.aderencia}/5`]].map(([k, v]) => (
            <div key={k}><span className="lbl">{k}</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{v}</p></div>
          ))}
        </div>
        {selCI.dificuldades && <><Divider style={{ marginBottom: 14 }} /><span className="lbl">Dificuldades / Relato</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300, lineHeight: 1.6 }}>{selCI.dificuldades}</p></>}
      </div>
      {(selCI.feedback || feedback) ? (
        <div className="card" style={{ padding: 22 }}>
          <p style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 14 }}>✦ Feedback Gerado</p>
          {fmt(selCI.feedback || feedback)}
        </div>
      ) : (
        <button className="btn-p" onClick={() => genFeedback(selCI)} disabled={generating}>{generating ? "Gerando..." : "✦ Gerar Feedback com IA"}</button>
      )}
    </div>
  );

  if (view === "form") return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
        <button className="btn-g" onClick={() => setView("list")}>← Voltar</button>
        <Heading>Novo Check-in</Heading>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <FW label="Aluna"><select className="input" value={form.alunaId} onChange={e => setForm(p => ({ ...p, alunaId: e.target.value }))} style={{ appearance: "none" }}><option value="">Selecione a aluna</option>{alunas.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}</select></FW>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FW label="Semana"><input className="input" value={form.semana} onChange={e => setForm(p => ({ ...p, semana: e.target.value }))} placeholder="ex: Semana 4 do Protocolo 2" /></FW>
          <FW label="Peso (kg)"><input className="input" type="number" step="0.1" value={form.peso} onChange={e => setForm(p => ({ ...p, peso: e.target.value }))} placeholder="ex: 64.5" /></FW>
        </div>
        <Score label="Qualidade do Sono" k="sono" />
        <Score label="Nível de Energia" k="energia" />
        <Score label="Aderência ao Treino" k="aderencia" />
        <FW label="Dificuldades / Relato"><textarea className="input" rows={3} value={form.dificuldades} onChange={e => setForm(p => ({ ...p, dificuldades: e.target.value }))} placeholder="O que a aluna relatou..." style={{ resize: "none" }} /></FW>
        <button className="btn-p" onClick={save}>Salvar Check-in</button>
      </div>
    </div>
  );

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div><Lbl>Acompanhamento</Lbl><Heading>Check-ins</Heading></div>
        <button className="btn-p" onClick={() => setView("form")}>+ Novo</button>
      </div>
      {checkins.length === 0 ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic", marginBottom: 8 }}>Nenhum check-in ainda</p><p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200 }}>Registre o acompanhamento de uma aluna</p></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {checkins.map(ci => (
            <div key={ci.id} className="card card-hover" onClick={() => { setSel(ci.id); setView("detail"); setFeedback(""); }} style={{ padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><p style={{ fontSize: 13, fontWeight: 300, color: C.graphite, marginBottom: 2 }}>{ci.alunanome || "—"}</p><p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{ci.semana} · {ci.data} · Aderência {ci.aderencia}/5</p></div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span className="tag" style={{ background: ci.respondido ? C.greenBg : C.sand, color: ci.respondido ? C.green : C.caramel }}>{ci.respondido ? "Respondido" : "Pendente"}</span><span style={{ color: C.taupe }}>›</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CONTEÚDO ──────────────────────────────────────────────────────────────────
function Conteudo({ conteudos, setConteudos, storage }) {
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ tipo: "", pilar: "", tema: "", caption: "", status: "Ideia", data: "" });
  const [sel, setSel] = useState(null);
  const [gen, setGen] = useState(false);

  const genCaption = async () => {
    if (!form.tema) return; setGen(true);
    try { const c = await callIA(`ESTRATÉGIA INSTAGRAM — Crie uma legenda completa:\nTipo: ${form.tipo}\nPilar: ${form.pilar}\nTema: ${form.tema}\nGancho forte, desenvolvimento, CTA e hashtags. Tom Talita Anjos — premium, feminino, técnico mas humano.`); setForm(p => ({ ...p, caption: c })); }
    catch {} finally { setGen(false); }
  };

  const save = async () => {
    if (!form.tema.trim()) return;
    const updated = [{ ...form, id: uid(), criadoEm: today(), publicado: form.status === "Publicado" }, ...conteudos];
    setConteudos(updated); await storage.set("conteudos", updated);
    setForm({ tipo: "", pilar: "", tema: "", caption: "", status: "Ideia", data: "" }); setView("list");
  };

  const cycleStatus = async (id) => {
    const order = ["Ideia", "Escrevendo", "Pronto", "Publicado"];
    const updated = conteudos.map(c => { if (c.id !== id) return c; const i = order.indexOf(c.status); const status = order[(i + 1) % order.length]; return { ...c, status, publicado: status === "Publicado" }; });
    setConteudos(updated); await storage.set("conteudos", updated);
  };

  const selC = conteudos.find(c => c.id === sel);

  if (view === "detail" && selC) return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
        <button className="btn-g" onClick={() => { setSel(null); setView("list"); }}>← Voltar</button>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8 }}><span className="tag" style={{ background: C.sand, color: C.caramel }}>{selC.tipo}</span><span className="tag" style={{ background: "transparent", color: C.coolGray }}>{selC.pilar}</span></div>
          <button onClick={() => cycleStatus(selC.id)} className="tag" style={{ background: (S_COLOR[selC.status] || C.sand) + "33", color: S_COLOR[selC.status] || C.caramel, border: "none", cursor: "pointer" }}>{selC.status} →</button>
        </div>
        <p style={{ fontSize: 15, fontWeight: 300, color: C.graphite, marginBottom: 16, lineHeight: 1.5 }}>{selC.tema}</p>
        {selC.caption && <><Divider style={{ marginBottom: 14 }} /><span className="lbl">Caption</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{selC.caption}</p></>}
      </div>
    </div>
  );

  if (view === "form") return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
        <button className="btn-g" onClick={() => setView("list")}>← Voltar</button>
        <Heading>Novo Conteúdo</Heading>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FW label="Tipo"><select className="input" value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))} style={{ appearance: "none" }}><option value="">Selecione</option>{TIPOS_C.map(t => <option key={t}>{t}</option>)}</select></FW>
          <FW label="Pilar Estratégico"><select className="input" value={form.pilar} onChange={e => setForm(p => ({ ...p, pilar: e.target.value }))} style={{ appearance: "none" }}><option value="">Selecione</option>{PILARES.map(p => <option key={p}>{p}</option>)}</select></FW>
        </div>
        <FW label="Tema / Ideia"><input className="input" value={form.tema} onChange={e => setForm(p => ({ ...p, tema: e.target.value }))} placeholder="ex: Por que treinar glúteo 2x por semana funciona melhor" /></FW>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span className="lbl" style={{ marginBottom: 0 }}>Caption</span>
            <button className="btn-g" onClick={genCaption} disabled={!form.tema || gen} style={{ fontSize: 8, padding: "5px 10px" }}>{gen ? "Gerando..." : "→ Gerar com IA"}</button>
          </div>
          <textarea className="input" rows={5} value={form.caption} onChange={e => setForm(p => ({ ...p, caption: e.target.value }))} placeholder="Escreva ou gere com IA..." style={{ resize: "vertical" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FW label="Status"><select className="input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={{ appearance: "none" }}>{["Ideia", "Escrevendo", "Pronto", "Publicado"].map(s => <option key={s}>{s}</option>)}</select></FW>
          <FW label="Data Prevista"><input className="input" type="date" value={form.data} onChange={e => setForm(p => ({ ...p, data: e.target.value }))} /></FW>
        </div>
        <button className="btn-p" onClick={save}>Salvar Conteúdo</button>
      </div>
    </div>
  );

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div><Lbl>Planejamento</Lbl><Heading>Conteúdo</Heading></div>
        <button className="btn-p" onClick={() => setView("form")}>+ Novo</button>
      </div>
      {conteudos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic", marginBottom: 8 }}>Calendário vazio</p><p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200 }}>Planeje o próximo conteúdo</p></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {conteudos.map(c => (
            <div key={c.id} className="card card-hover" onClick={() => { setSel(c.id); setView("detail"); }} style={{ padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}><div style={{ display: "flex", gap: 6, marginBottom: 3 }}><span className="tag" style={{ background: C.sand, color: C.caramel }}>{c.tipo}</span></div><p style={{ fontSize: 12, fontWeight: 300, color: C.graphite }}>{c.tema}</p>{c.data && <p style={{ fontSize: 9, color: C.coolGray, marginTop: 2, fontWeight: 200 }}>{c.data}</p>}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span className="tag" style={{ background: (S_COLOR[c.status] || C.sand) + "33", color: S_COLOR[c.status] || C.caramel }}>{c.status}</span><span style={{ color: C.taupe }}>›</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── VENDAS ────────────────────────────────────────────────────────────────────
function Vendas({ leads, setLeads, storage }) {
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ nome: "", origem: "Instagram", interesse: "", status: "Interesse", obs: "" });
  const [sel, setSel] = useState(null);
  const [script, setScript] = useState("");
  const [genS, setGenS] = useState(false);

  const save = async () => {
    if (!form.nome.trim()) return;
    const updated = [{ ...form, id: uid(), data: today() }, ...leads];
    setLeads(updated); await storage.set("leads", updated);
    setForm({ nome: "", origem: "Instagram", interesse: "", status: "Interesse", obs: "" }); setView("list");
  };

  const updStatus = async (id, status) => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(updated); await storage.set("leads", updated);
  };

  const genScript = async (lead) => {
    setGenS(true); setScript("");
    try {
      const s = await callIA(`ESTRATÉGIA INSTAGRAM — Script de resposta para lead:\nNome: ${lead.nome} | Status: ${lead.status} | Interesse: ${lead.interesse || "consultoria online"} | Origem: ${lead.origem}\nObs: ${lead.obs || "—"}\n\nPlanos disponíveis:\n- 1 Protocolo (3 meses): 3x R$139,80 ou R$390 Pix\n- 2 Protocolos (6 meses): 6x R$127,31 ou R$690 Pix\n- 4 Protocolos (12 meses): 12x R$125,99 ou R$1.260 Pix\n\nCrie uma resposta natural, calorosa, profissional — como a Talita responderia. Com próximo passo claro.`);
      setScript(s);
    } catch { setScript("Erro ao gerar. Tente novamente."); }
    finally { setGenS(false); }
  };

  const selL = leads.find(l => l.id === sel);

  if (view === "detail" && selL) return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
        <button className="btn-g" onClick={() => { setSel(null); setView("list"); setScript(""); }}>← Voltar</button>
        <Heading>{selL.nome}</Heading>
      </div>
      <div className="card" style={{ padding: 22, marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
          {[["Origem", selL.origem], ["Entrada", selL.data], ["Interesse", selL.interesse || "—"]].map(([k, v]) => (
            <div key={k}><span className="lbl">{k}</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300 }}>{v}</p></div>
          ))}
        </div>
        <Divider style={{ marginBottom: 14 }} />
        <span className="lbl">Atualizar Status</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {STATUS_LEAD.map(s => (
            <button key={s} onClick={() => updStatus(selL.id, s)} className="tag" style={{ background: selL.status === s ? (SLC[s] || C.deepBrown) : C.sand, color: selL.status === s ? (["Interesse", "Conversa Iniciada"].includes(s) ? C.caramel : C.offWhite) : C.caramel, border: "none", cursor: "pointer", padding: "6px 12px" }}>{s}</button>
          ))}
        </div>
        {selL.obs && <><Divider style={{ margin: "14px 0 10px" }} /><span className="lbl">Obs</span><p style={{ fontSize: 12, color: C.deepBrown, fontWeight: 300, lineHeight: 1.6 }}>{selL.obs}</p></>}
      </div>

      {/* Planos como referência */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <span className="lbl" style={{ marginBottom: 10 }}>Planos para Apresentar</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PLANOS.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.sand}` }}>
              <div><p style={{ fontSize: 11, fontWeight: 300, color: C.graphite }}>{p.nome} · {p.duracao}</p><p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{p.protocolos} protocolo{p.protocolos > 1 ? "s" : ""}</p></div>
              <div style={{ textAlign: "right" }}><p style={{ fontSize: 10, color: C.deepBrown, fontWeight: 300 }}>{p.pix} Pix</p><p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{p.cartao}</p></div>
            </div>
          ))}
        </div>
      </div>

      {script ? (
        <div className="card" style={{ padding: 22 }}>
          <p style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 14 }}>→ Script Gerado</p>
          {fmt(script)}
        </div>
      ) : (
        <button className="btn-p" onClick={() => genScript(selL)} disabled={genS}>{genS ? "Gerando..." : "→ Gerar Script de Resposta"}</button>
      )}
    </div>
  );

  if (view === "form") return (
    <div className="slide-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
        <button className="btn-g" onClick={() => setView("list")}>← Voltar</button>
        <Heading>Novo Lead</Heading>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <FW label="Nome"><input className="input" value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} placeholder="Nome da pessoa" /></FW>
        <FW label="Interesse"><input className="input" value={form.interesse} onChange={e => setForm(p => ({ ...p, interesse: e.target.value }))} placeholder="ex: emagrecimento, plano anual..." /></FW>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FW label="Origem"><select className="input" value={form.origem} onChange={e => setForm(p => ({ ...p, origem: e.target.value }))} style={{ appearance: "none" }}>{["Instagram", "Indicação", "WhatsApp", "Stories", "Reels", "Outro"].map(o => <option key={o}>{o}</option>)}</select></FW>
          <FW label="Status"><select className="input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={{ appearance: "none" }}>{STATUS_LEAD.map(s => <option key={s}>{s}</option>)}</select></FW>
        </div>
        <FW label="Observações"><textarea className="input" rows={2} value={form.obs} onChange={e => setForm(p => ({ ...p, obs: e.target.value }))} placeholder="Contexto, dúvidas, objeções..." style={{ resize: "none" }} /></FW>
        <button className="btn-p" onClick={save}>Salvar Lead</button>
      </div>
    </div>
  );

  const ativos = leads.filter(l => !["Fechou", "Perdeu"].includes(l.status));
  const fechados = leads.filter(l => l.status === "Fechou");

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div><Lbl>Pipeline</Lbl><Heading>Vendas</Heading></div>
        <button className="btn-p" onClick={() => setView("form")}>+ Novo Lead</button>
      </div>
      {leads.length === 0 ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic", marginBottom: 8 }}>Nenhum lead ainda</p><p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200 }}>Registre quem demonstrou interesse</p></div>
      ) : (
        <>
          {ativos.length > 0 && <><Lbl style={{ marginBottom: 8 }}>Em Andamento</Lbl><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{ativos.map(l => (<div key={l.id} className="card card-hover" onClick={() => { setSel(l.id); setView("detail"); setScript(""); }} style={{ padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><p style={{ fontSize: 13, fontWeight: 300, color: C.graphite, marginBottom: 2 }}>{l.nome}</p><p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{l.origem} · {l.data}</p></div><div style={{ display: "flex", gap: 8, alignItems: "center" }}><span className="tag" style={{ background: (SLC[l.status] || C.sand) + "33", color: SLC[l.status] || C.caramel }}>{l.status}</span><span style={{ color: C.taupe }}>›</span></div></div>))}</div></>}
          {fechados.length > 0 && <><Lbl style={{ marginBottom: 8 }}>Convertidos ✦</Lbl><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{fechados.map(l => (<div key={l.id} style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 3, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><p style={{ fontSize: 13, fontWeight: 300, color: "#3A6040" }}>{l.nome}</p><span className="tag" style={{ background: C.greenBorder, color: "#3A6040" }}>Fechou</span></div>))}</div></>}
        </>
      )}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [nav, setNav] = useState("dashboard");
  const [alunas, setAlunas] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [iaContext, setIaContext] = useState("");
  const storage = useStorage();

  useEffect(() => {
    (async () => {
      const [a, ci, co, l] = await Promise.all([storage.get("alunas"), storage.get("checkins"), storage.get("conteudos"), storage.get("leads")]);
      if (a) setAlunas(a); if (ci) setCheckins(ci); if (co) setConteudos(co); if (l) setLeads(l);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (iaContext) setNav("ia"); }, [iaContext]);

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FontLink /><GS />
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.taupe, fontStyle: "italic" }}>Carregando...</p>
    </div>
  );

  const views = {
    dashboard: <Dashboard alunas={alunas} leads={leads} checkins={checkins} conteudos={conteudos} setNav={setNav} />,
    alunas: <Alunas alunas={alunas} setAlunas={setAlunas} storage={storage} setIaContext={setIaContext} />,
    ia: <IAAssistant iaContext={iaContext} setIaContext={setIaContext} />,
    checkin: <CheckIn alunas={alunas} checkins={checkins} setCheckins={setCheckins} storage={storage} />,
    conteudo: <Conteudo conteudos={conteudos} setConteudos={setConteudos} storage={storage} />,
    vendas: <Vendas leads={leads} setLeads={setLeads} storage={storage} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Josefin Sans',sans-serif", display: "flex", flexDirection: "column" }}>
      <FontLink /><GS />
      <div style={{ borderBottom: `1px solid ${C.taupe}`, padding: "16px 24px 14px", background: C.offWhite, position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 7, letterSpacing: 4, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 2 }}>Central de Operações</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 19, color: C.graphite, lineHeight: 1 }}>Talita <em style={{ fontStyle: "italic", color: C.brown }}>Anjos</em></h1>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)} title={item.label} style={{ width: 34, height: 34, borderRadius: 2, border: `1px solid ${nav === item.id ? C.deepBrown : C.sand}`, background: nav === item.id ? C.deepBrown : "transparent", color: nav === item.id ? C.sand : C.caramel, fontSize: 12, transition: "all .18s", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ width: 175, borderRight: `1px solid ${C.sand}`, padding: "20px 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)} className={`nav-btn ${nav === item.id ? "active" : ""}`} style={{ color: nav === item.id ? C.sand : C.caramel }}>
              <span style={{ fontSize: 11, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", fontWeight: 300 }}>{item.label}</span>
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.sand}` }}>
            <p style={{ fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: C.taupe, fontWeight: 200, lineHeight: 1.9 }}>Personal Trainer<br />Consultoria Online</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: "26px 30px", overflowY: "auto", maxHeight: "calc(100vh - 65px)" }}>
          {views[nav]}
        </div>
      </div>
    </div>
  );
}
