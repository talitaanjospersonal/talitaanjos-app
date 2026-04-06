import { useState, useEffect } from "react";

const FL = () => (
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap" rel="stylesheet" />
);

const C = {
  sand: "#E8E0D5", taupe: "#C9BAA8", caramel: "#A68F7B",
  brown: "#7A6355", deepBrown: "#4A3D35", graphite: "#2C2C2C",
  offWhite: "#F5F0EB", coolGray: "#9DA3A6", white: "#FFFFFF",
  green: "#6B8F71", greenBg: "#EFF5EF", greenBorder: "#D0E4D2",
};

// ── DEMO DATA ─────────────────────────────────────────────────────────────────
const DEMO_ALUNA = {
  nome: "Luiza Fernandes",
  email: "luiza@email.com",
  senha: "luiza123",
  objetivo: "Hipertrofia",
  nivel: "Intermediária",
  plano: "4 Protocolos · 12 meses",
  mesoAtual: 2,
  totalMesos: 4,
  semanaAtual: 7,
  inicio: "06/01/2026",
  validade: "05/01/2027",
};

const DEMO_HABITOS = [
  { id: 1, nome: "Beber 2L de água", icone: "◈" },
  { id: 2, nome: "Dormir 7h ou mais", icone: "◻" },
  { id: 3, nome: "Cardio zona 2 (30min)", icone: "→" },
  { id: 4, nome: "Proteína em todas as refeições", icone: "✦" },
  { id: 5, nome: "Sem álcool", icone: "◇" },
];

const DEMO_FEEDBACKS = [
  {
    id: 1, semana: "Semana 6 · Protocolo 2", data: "29/03/2026",
    texto: `**Evolução principal:** Luiza, que orgulho! Você perdeu 1,2kg nessa semana e a aderência ao treino foi de 5/5. Isso é consistência de verdade.\n\n**Evolução secundária:** Sua energia subiu de 3 para 4 — sinal claro de que o corpo está respondendo bem à periodização atual.\n\n**Análise técnica:** O volume de glúteo está no ponto ideal agora com 16 séries semanais. Não vamos aumentar ainda — o objetivo é consolidar a adaptação antes de progredir carga.\n\n**Reconhecimento:** Semana 6 é exatamente onde muita gente abandona. Você ficou. Isso é o que separa resultados reais de promessas.\n\n**Próximo objetivo:** Semana 7 com foco em progressão de carga no leg press e no stiff. Se sentir segura, aumente 5kg.\n\n**Mensagem:** Você está no meio do protocolo e já é outra pessoa. Continue.`,
  },
  {
    id: 2, semana: "Semana 4 · Protocolo 2", data: "15/03/2026",
    texto: `**Evolução principal:** Boa semana, Luiza. Aderência 4/5 e sono melhorando — isso impacta diretamente na recuperação muscular.\n\n**Análise técnica:** Percebo que o sono ainda está irregular em alguns dias. Lembra que é durante o sono que o músculo cresce — não na academia.\n\n**Próximo objetivo:** Priorizar 7h de sono essa semana. É tão importante quanto o treino.\n\n**Mensagem:** Constância bate intensidade. Sempre.`,
  },
];

const DEMO_CONTEUDOS = [
  {
    id: 1, titulo: "Por que seu cérebro sabota sua dieta — e como virar esse jogo",
    tipo: "Neurociência", data: "02/04/2026",
    texto: `Quando você "cede" à vontade de comer algo fora do plano, não é fraqueza. É dopamina.\n\nO sistema de recompensa do cérebro foi desenhado para buscar prazer imediato. Açúcar, gordura, sal — esses alimentos ativam os mesmos circuitos que substâncias viciantes.\n\nO que funciona: não é força de vontade. É ambiente. Tire o que te sabota de perto. Coloque o que te apoia à frente.\n\nSeu cérebro vai sempre pegar o atalho mais fácil. Faça o atalho mais fácil ser a escolha certa.`,
  },
  {
    id: 2, titulo: "Zona 2: o cardio que queima gordura sem destruir músculo",
    tipo: "Treino", data: "28/03/2026",
    texto: `Cardio intenso demais compete com o treino de força. Zona 2 não.\n\nZona 2 = 60–70% da sua frequência cardíaca máxima. Para calcular: 220 - sua idade = FCmáx. Multiplique por 0,6 e 0,7.\n\nNesse ritmo, você oxida gordura como combustível principal, melhora o sistema cardiovascular e recupera mais rápido entre os treinos.\n\n30 minutos, 3x por semana. Caminhada inclinada, bike ou escada. Simples assim.`,
  },
  {
    id: 3, titulo: "O que acontece com seu corpo nas 12 semanas de um protocolo",
    tipo: "Educação", data: "20/03/2026",
    texto: `Semanas 1–3: adaptação neuromuscular. Seu sistema nervoso aprende os movimentos. Você ainda não vê muito no espelho, mas o corpo está mudando por dentro.\n\nSemanas 4–6: início das adaptações musculares. Volume e força começam a subir. Aqui a maioria desiste achando que não está funcionando.\n\nSemanas 7–9: resultados visíveis. O corpo responde ao acúmulo das semanas anteriores. Não das últimas 7 semanas — de todas.\n\nSemanas 10–12: consolidação. Progressões de carga, refinamento da técnica, colheita do que foi plantado.\n\nVocê está no processo. Confie nele.`,
  },
];

const DEMO_TREINO = {
  semana: "Semana 7 · Protocolo 2",
  dias: [
    {
      dia: "Segunda", foco: "Glúteo + Posterior",
      exercicios: [
        { nome: "Agachamento Livre", series: "4x8–10", carga: "Prog. carga", obs: "Descer até paralelo" },
        { nome: "Leg Press 45°", series: "3x12", carga: "+5kg vs semana passada", obs: "Pés altos e afastados" },
        { nome: "Stiff com Halteres", series: "4x10–12", carga: "Carga controlada", obs: "Sentir o alongamento do posterior" },
        { nome: "Abdução no Cabo", series: "3x15", carga: "Moderada", obs: "Contrair no topo" },
        { nome: "Mesa Flexora", series: "3x12", carga: "Progressão", obs: "Fase excêntrica lenta" },
      ],
    },
    {
      dia: "Quarta", foco: "Peito + Tríceps + Ombro",
      exercicios: [
        { nome: "Supino Reto com Barra", series: "4x8–10", carga: "Técnica perfeita", obs: "" },
        { nome: "Crucifixo Inclinado", series: "3x12", carga: "Moderada", obs: "Amplitude completa" },
        { nome: "Elevação Lateral", series: "4x15", carga: "Leve-moderada", obs: "Cotovelo levemente flexionado" },
        { nome: "Tríceps Corda", series: "3x15", carga: "Progressão", obs: "Abrir no final" },
      ],
    },
    {
      dia: "Sexta", foco: "Glúteo + Quadríceps",
      exercicios: [
        { nome: "Hack Squat", series: "4x10–12", carga: "Progressão", obs: "Pés fechados e baixos" },
        { nome: "Cadeira Extensora", series: "3x15", carga: "Drop set na última", obs: "Contrair no topo" },
        { nome: "Hip Thrust com Barra", series: "4x10", carga: "+5kg vs semana passada", obs: "Contrair forte no topo" },
        { nome: "Avanço com Halteres", series: "3x12 cada", carga: "Moderada", obs: "Tronco ereto" },
        { nome: "Panturrilha em Pé", series: "4x20", carga: "Moderada", obs: "Amplitude total" },
      ],
    },
  ],
};

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GS = () => (
  <style>{`
    *{box-sizing:border-box;margin:0;padding:0;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .fade{animation:fadeUp .35s ease forwards;}
    .fade-2{animation:fadeUp .35s ease .1s both;}
    .fade-3{animation:fadeUp .35s ease .2s both;}
    .fade-4{animation:fadeUp .35s ease .3s both;}
    input,textarea{font-family:'Josefin Sans',sans-serif;outline:none;}
    input::placeholder,textarea::placeholder{color:${C.taupe};}
    input:focus,textarea:focus{border-color:${C.caramel}!important;}
    button{font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:${C.offWhite};}::-webkit-scrollbar-thumb{background:${C.taupe};border-radius:2px;}
    .card{background:${C.white};border:1px solid ${C.sand};border-radius:4px;}
    .nav-tab{background:none;border:none;padding:10px 16px;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;font-weight:300;cursor:pointer;transition:all .2s;border-bottom:2px solid transparent;color:${C.caramel};}
    .nav-tab.active{color:${C.deepBrown};border-bottom-color:${C.deepBrown};}
    .nav-tab:hover{color:${C.deepBrown};}
    .habito-check{width:28px;height:28px;border-radius:2px;border:1px solid ${C.sand};background:${C.white};cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;}
    .habito-check.done{background:${C.deepBrown};border-color:${C.deepBrown};}
    .btn-p{background:${C.deepBrown};color:${C.sand};border:none;border-radius:2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:11px 20px;transition:opacity .2s;font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    .btn-p:hover{opacity:.85;}
    .btn-p:disabled{background:${C.sand};color:${C.taupe};cursor:default;}
    .btn-g{background:none;border:1px solid ${C.sand};color:${C.caramel};border-radius:2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:9px 16px;transition:all .2s;font-family:'Josefin Sans',sans-serif;cursor:pointer;}
    .btn-g:hover{border-color:${C.caramel};}
    .lbl{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:${C.caramel};font-weight:200;}
    .pill{display:inline-flex;align-items:center;font-size:7px;letter-spacing:2px;text-transform:uppercase;font-weight:300;padding:3px 8px;border-radius:20px;}
  `}</style>
);

const Divider = ({ style }) => <div style={{ height: 1, background: C.sand, ...style }} />;

const fmtFeedback = (text) => {
  return text.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
    if (line.startsWith("**") && line.endsWith("**")) return null;
    return <p key={i} style={{ fontSize: 13, color: C.graphite, lineHeight: 1.85, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: html }} />;
  });
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) return;
    setLoading(true); setErro("");
    await new Promise(r => setTimeout(r, 900));
    if (email === DEMO_ALUNA.email && senha === DEMO_ALUNA.senha) {
      onLogin(DEMO_ALUNA);
    } else {
      setErro("E-mail ou senha incorretos.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <FL /><GS />

      {/* Logo */}
      <div className="fade" style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 8, letterSpacing: 5, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 10 }}>Área da Aluna</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 36, color: C.graphite, lineHeight: 1 }}>
          Talita <em style={{ fontStyle: "italic", color: C.brown }}>Anjos</em>
        </h1>
        <p style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: C.coolGray, fontWeight: 200, marginTop: 8 }}>Personal Trainer · Consultoria Online</p>
      </div>

      {/* Card */}
      <div className="fade-2 card" style={{ width: "100%", maxWidth: 380, padding: 32 }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: C.graphite, fontStyle: "italic", marginBottom: 24 }}>Entrar na sua área</p>

        <div style={{ marginBottom: 14 }}>
          <p className="lbl" style={{ marginBottom: 7 }}>E-mail</p>
          <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="seu@email.com" type="email"
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 2, padding: "11px 13px", fontSize: 12, fontWeight: 300, color: C.graphite, background: C.white, transition: "border-color .2s" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <p className="lbl" style={{ marginBottom: 7 }}>Senha</p>
          <input value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="••••••••" type="password"
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 2, padding: "11px 13px", fontSize: 12, fontWeight: 300, color: C.graphite, background: C.white, transition: "border-color .2s" }} />
        </div>

        {erro && <p style={{ fontSize: 11, color: "#c05050", marginBottom: 14, fontWeight: 300 }}>{erro}</p>}

        <button className="btn-p" onClick={handleLogin} disabled={loading || !email || !senha} style={{ width: "100%" }}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p style={{ fontSize: 10, color: C.coolGray, marginTop: 20, textAlign: "center", fontWeight: 200, lineHeight: 1.6 }}>
          Esqueceu sua senha? Entre em contato<br />com sua treinadora.
        </p>
      </div>

      {/* Demo hint */}
      <div className="fade-3" style={{ marginTop: 24, textAlign: "center" }}>
        <p style={{ fontSize: 9, color: C.taupe, fontWeight: 200, letterSpacing: 1 }}>Demo: luiza@email.com · luiza123</p>
      </div>
    </div>
  );
}

// ── PROTOCOLO ─────────────────────────────────────────────────────────────────
function Protocolo({ aluna }) {
  const progress = Math.round((aluna.semanaAtual / 12) * 100);
  const [diaAberto, setDiaAberto] = useState(0);

  return (
    <div>
      {/* Header protocolo */}
      <div className="card fade" style={{ padding: 24, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p className="lbl" style={{ marginBottom: 5 }}>Protocolo Atual</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: C.deepBrown, fontStyle: "italic", lineHeight: 1 }}>
              {aluna.mesoAtual}º de {aluna.totalMesos}
            </p>
            <p style={{ fontSize: 9, color: C.coolGray, marginTop: 5, fontWeight: 200, letterSpacing: 1 }}>{aluna.plano}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, color: C.deepBrown, lineHeight: 1 }}>{aluna.semanaAtual}</p>
            <p style={{ fontSize: 8, color: C.caramel, fontWeight: 200, letterSpacing: 2, textTransform: "uppercase" }}>semana atual</p>
            <p style={{ fontSize: 9, color: C.coolGray, marginTop: 2, fontWeight: 200 }}>de 12</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <p style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: C.caramel, fontWeight: 200 }}>Progresso do protocolo</p>
            <p style={{ fontSize: 9, color: C.deepBrown, fontWeight: 300 }}>{progress}%</p>
          </div>
          <div style={{ height: 4, background: C.sand, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: C.deepBrown, borderRadius: 2, transition: "width 1s ease" }} />
          </div>
        </div>

        <Divider style={{ margin: "18px 0" }} />

        {/* Linha do tempo mini */}
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: aluna.totalMesos }, (_, i) => {
            const n = i + 1;
            const done = n < aluna.mesoAtual;
            const curr = n === aluna.mesoAtual;
            return (
              <div key={n} style={{ flex: 1, height: 6, borderRadius: 2, background: done ? C.green : curr ? C.deepBrown : C.sand, transition: "background .3s" }} />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <p style={{ fontSize: 8, color: C.coolGray, fontWeight: 200 }}>Início: {aluna.inicio}</p>
          <p style={{ fontSize: 8, color: C.coolGray, fontWeight: 200 }}>Validade: {aluna.validade}</p>
        </div>
      </div>

      {/* Treino da semana */}
      <div className="fade-2 card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p className="lbl" style={{ marginBottom: 4 }}>Treino da Semana</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: C.graphite, fontStyle: "italic" }}>{DEMO_TREINO.semana}</p>
          </div>
          <span className="pill" style={{ background: C.greenBg, color: C.green }}>Publicado</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DEMO_TREINO.dias.map((dia, i) => (
            <div key={i}>
              <button onClick={() => setDiaAberto(diaAberto === i ? -1 : i)} style={{
                width: "100%", background: diaAberto === i ? C.deepBrown : C.offWhite, border: `1px solid ${diaAberto === i ? C.deepBrown : C.sand}`,
                borderRadius: 3, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all .2s",
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", fontWeight: 300, color: diaAberto === i ? C.sand : C.deepBrown }}>{dia.dia}</p>
                  <p style={{ fontSize: 10, color: diaAberto === i ? C.taupe : C.caramel, fontWeight: 200 }}>{dia.foco}</p>
                </div>
                <span style={{ color: diaAberto === i ? C.taupe : C.caramel, fontSize: 12, transform: diaAberto === i ? "rotate(90deg)" : "none", transition: "transform .2s", display: "inline-block" }}>›</span>
              </button>

              {diaAberto === i && (
                <div style={{ border: `1px solid ${C.sand}`, borderTop: "none", borderRadius: "0 0 3px 3px", overflow: "hidden" }}>
                  {dia.exercicios.map((ex, j) => (
                    <div key={j} style={{ padding: "12px 16px", borderBottom: j < dia.exercicios.length - 1 ? `1px solid ${C.sand}` : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 12, fontWeight: 300, color: C.graphite, marginBottom: 3 }}>{ex.nome}</p>
                        {ex.obs && <p style={{ fontSize: 10, color: C.coolGray, fontWeight: 200 }}>{ex.obs}</p>}
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <p style={{ fontSize: 11, fontWeight: 300, color: C.deepBrown }}>{ex.series}</p>
                        <p style={{ fontSize: 9, color: C.caramel, fontWeight: 200 }}>{ex.carga}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HÁBITOS ───────────────────────────────────────────────────────────────────
function Habitos() {
  const hoje = new Date().toLocaleDateString("pt-BR");
  const [semana, setSemana] = useState(() => {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dias.push({ data: d.toLocaleDateString("pt-BR"), dia: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "") });
    }
    return dias;
  });
  const [registros, setRegistros] = useState({});
  const [diaVis, setDiaVis] = useState(hoje);

  const toggle = (dia, habitoId) => {
    const key = `${dia}-${habitoId}`;
    setRegistros(p => ({ ...p, [key]: !p[key] }));
  };

  const isDone = (dia, id) => registros[`${dia}-${id}`] || false;

  const streakHabito = (id) => {
    let streak = 0;
    for (let i = semana.length - 1; i >= 0; i--) {
      if (isDone(semana[i].data, id)) streak++;
      else break;
    }
    return streak;
  };

  const totalHoje = DEMO_HABITOS.filter(h => isDone(diaVis, h.id)).length;
  const pctHoje = Math.round((totalHoje / DEMO_HABITOS.length) * 100);

  return (
    <div>
      {/* Resumo hoje */}
      <div className="card fade" style={{ padding: 24, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p className="lbl" style={{ marginBottom: 5 }}>Hoje</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: C.deepBrown, fontStyle: "italic" }}>
              {totalHoje} de {DEMO_HABITOS.length}
            </p>
            <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200, marginTop: 3 }}>hábitos concluídos</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, color: pctHoje === 100 ? C.green : C.deepBrown, lineHeight: 1 }}>{pctHoje}%</p>
            <p style={{ fontSize: 8, color: C.caramel, fontWeight: 200, letterSpacing: 1, textTransform: "uppercase" }}>do dia</p>
          </div>
        </div>
        <div style={{ height: 4, background: C.sand, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pctHoje}%`, background: pctHoje === 100 ? C.green : C.deepBrown, borderRadius: 2, transition: "width .6s ease" }} />
        </div>
      </div>

      {/* Seletor de dia */}
      <div className="fade-2" style={{ display: "flex", gap: 5, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {semana.map(d => {
          const total = DEMO_HABITOS.filter(h => isDone(d.data, h.id)).length;
          const isHoje = d.data === hoje;
          const isSel = d.data === diaVis;
          return (
            <button key={d.data} onClick={() => setDiaVis(d.data)} style={{
              flexShrink: 0, width: 50, padding: "10px 6px", borderRadius: 3,
              border: `1px solid ${isSel ? C.deepBrown : C.sand}`,
              background: isSel ? C.deepBrown : C.white,
              cursor: "pointer", transition: "all .18s", textAlign: "center",
            }}>
              <p style={{ fontSize: 7, letterSpacing: 1, textTransform: "uppercase", color: isSel ? C.taupe : C.coolGray, fontWeight: 200, marginBottom: 4 }}>{d.dia}</p>
              <p style={{ fontSize: 13, fontWeight: 300, color: isSel ? C.sand : C.deepBrown }}>{total}</p>
              {isHoje && <div style={{ width: 4, height: 4, borderRadius: "50%", background: isSel ? C.taupe : C.caramel, margin: "4px auto 0" }} />}
            </button>
          );
        })}
      </div>

      {/* Lista hábitos */}
      <div className="card fade-3" style={{ padding: 20 }}>
        <p className="lbl" style={{ marginBottom: 16 }}>{diaVis === hoje ? "Marque os hábitos de hoje" : `Hábitos de ${diaVis}`}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DEMO_HABITOS.map(h => {
            const done = isDone(diaVis, h.id);
            const streak = streakHabito(h.id);
            return (
              <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.sand}` }}>
                <button className={`habito-check ${done ? "done" : ""}`} onClick={() => toggle(diaVis, h.id)}>
                  {done && <span style={{ color: C.sand, fontSize: 11 }}>✓</span>}
                </button>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 300, color: done ? C.caramel : C.graphite, textDecoration: done ? "line-through" : "none", transition: "all .2s" }}>{h.nome}</p>
                  {streak > 0 && <p style={{ fontSize: 9, color: C.green, fontWeight: 200, marginTop: 2 }}>🔥 {streak} dia{streak > 1 ? "s" : ""} seguido{streak > 1 ? "s" : ""}</p>}
                </div>
                <span style={{ fontSize: 13, color: done ? C.deepBrown : C.sand }}>{h.icone}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── FEEDBACKS ────────────────────────────────────────────────────────────────
function Feedbacks() {
  const [aberto, setAberto] = useState(0);

  return (
    <div>
      <div className="card fade" style={{ padding: 20, marginBottom: 12, background: C.deepBrown, border: "none" }}>
        <p className="lbl" style={{ color: C.taupe, marginBottom: 6 }}>Última mensagem da Talita</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: C.sand, fontStyle: "italic", lineHeight: 1.5 }}>
          "Semana 6 é exatamente onde muita gente abandona. Você ficou. Isso é o que separa resultados reais de promessas."
        </p>
        <p style={{ fontSize: 9, color: C.taupe, marginTop: 10, fontWeight: 200 }}>29/03/2026 · Semana 6</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DEMO_FEEDBACKS.map((fb, i) => (
          <div key={fb.id} className="card fade-2" style={{ overflow: "hidden" }}>
            <button onClick={() => setAberto(aberto === i ? -1 : i)} style={{
              width: "100%", background: "none", border: "none", padding: "16px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
            }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 12, fontWeight: 300, color: C.graphite, marginBottom: 3 }}>{fb.semana}</p>
                <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{fb.data}</p>
              </div>
              <span style={{ color: C.taupe, fontSize: 14, transform: aberto === i ? "rotate(90deg)" : "none", transition: "transform .2s", display: "inline-block" }}>›</span>
            </button>
            {aberto === i && (
              <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.sand}`, paddingTop: 16 }}>
                {fmtFeedback(fb.texto)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CHECK-IN ─────────────────────────────────────────────────────────────────
function CheckInAluna() {
  const [form, setForm] = useState({ peso: "", sono: 0, energia: 0, aderencia: 0, dificuldades: "", conquista: "" });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const Score = ({ label, k, desc }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <p className="lbl">{label}</p>
        {desc && <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{desc}</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => setForm(p => ({ ...p, [k]: n }))} style={{
            flex: 1, height: 40, borderRadius: 2,
            border: `1px solid ${form[k] >= n ? C.deepBrown : C.sand}`,
            background: form[k] >= n ? C.deepBrown : C.white,
            color: form[k] >= n ? C.sand : C.caramel,
            fontSize: 12, fontWeight: 300, transition: "all .15s",
          }}>{n}</button>
        ))}
      </div>
    </div>
  );

  const enviar = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setEnviado(true); setLoading(false);
  };

  if (enviado) return (
    <div className="card fade" style={{ padding: 40, textAlign: "center" }}>
      <p style={{ fontSize: 32, marginBottom: 16 }}>✦</p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, color: C.deepBrown, fontStyle: "italic", marginBottom: 8 }}>Check-in enviado!</p>
      <p style={{ fontSize: 12, color: C.coolGray, fontWeight: 300, lineHeight: 1.7, marginBottom: 24 }}>A Talita vai analisar e te enviar o feedback em breve. Fique de olho aqui na área de Feedbacks.</p>
      <button className="btn-g" onClick={() => { setEnviado(false); setForm({ peso: "", sono: 0, energia: 0, aderencia: 0, dificuldades: "", conquista: "" }); }}>Fazer novo check-in</button>
    </div>
  );

  return (
    <div>
      <div className="card fade" style={{ padding: 20, marginBottom: 12, border: `1px solid ${C.sand}` }}>
        <p className="lbl" style={{ marginBottom: 4 }}>Check-in Semanal</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: C.graphite, fontStyle: "italic" }}>Semana 7 · Protocolo 2</p>
        <p style={{ fontSize: 10, color: C.coolGray, fontWeight: 200, marginTop: 4 }}>Preencha com honestidade — quanto mais detalhe, melhor o feedback da Talita.</p>
      </div>

      <div className="card fade-2" style={{ padding: 24 }}>
        <div style={{ marginBottom: 18 }}>
          <p className="lbl" style={{ marginBottom: 7 }}>Peso atual (kg)</p>
          <input value={form.peso} onChange={e => setForm(p => ({ ...p, peso: e.target.value }))} type="number" step="0.1" placeholder="ex: 64.5"
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 2, padding: "11px 13px", fontSize: 13, fontWeight: 300, color: C.graphite, background: C.white, transition: "border-color .2s" }} />
        </div>

        <Score label="Qualidade do Sono" k="sono" desc="1 péssimo · 5 ótimo" />
        <Score label="Nível de Energia" k="energia" desc="1 sem energia · 5 ótimo" />
        <Score label="Aderência ao Treino" k="aderencia" desc="1 faltei muito · 5 100%" />

        <div style={{ marginBottom: 18 }}>
          <p className="lbl" style={{ marginBottom: 7 }}>Como foi a semana? Dificuldades?</p>
          <textarea value={form.dificuldades} onChange={e => setForm(p => ({ ...p, dificuldades: e.target.value }))} rows={3} placeholder="Conte o que aconteceu — treinos, alimentação, como se sentiu..."
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 2, padding: "11px 13px", fontSize: 12, fontWeight: 300, color: C.graphite, resize: "none", lineHeight: 1.6, background: C.white, transition: "border-color .2s" }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <p className="lbl" style={{ marginBottom: 7 }}>Conquista da semana 🌟</p>
          <input value={form.conquista} onChange={e => setForm(p => ({ ...p, conquista: e.target.value }))} placeholder="Algo que você se orgulha dessa semana..."
            style={{ width: "100%", border: `1px solid ${C.sand}`, borderRadius: 2, padding: "11px 13px", fontSize: 12, fontWeight: 300, color: C.graphite, background: C.white, transition: "border-color .2s" }} />
        </div>

        <button className="btn-p" onClick={enviar} disabled={loading || !form.peso || !form.sono || !form.energia || !form.aderencia} style={{ width: "100%" }}>
          {loading ? "Enviando..." : "Enviar Check-in"}
        </button>
      </div>
    </div>
  );
}

// ── CONTEÚDOS ─────────────────────────────────────────────────────────────────
function Conteudos() {
  const [aberto, setAberto] = useState(null);
  const TIPO_COLOR = { "Neurociência": { bg: "#EAE6F0", color: "#6B5B8F" }, "Treino": { bg: C.greenBg, color: C.green }, "Educação": { bg: "#F0EBE3", color: C.brown } };

  if (aberto !== null) {
    const c = DEMO_CONTEUDOS[aberto];
    return (
      <div className="fade">
        <button className="btn-g" onClick={() => setAberto(null)} style={{ marginBottom: 20 }}>← Voltar</button>
        <div className="card" style={{ padding: 28 }}>
          <span className="pill" style={{ background: (TIPO_COLOR[c.tipo] || {}).bg || C.sand, color: (TIPO_COLOR[c.tipo] || {}).color || C.caramel, marginBottom: 14, display: "inline-flex" }}>{c.tipo}</span>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: C.graphite, lineHeight: 1.3, marginBottom: 8, marginTop: 8 }}>{c.titulo}</p>
          <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200, marginBottom: 20 }}>{c.data} · Talita Anjos</p>
          <Divider style={{ marginBottom: 20 }} />
          {c.texto.split("\n").map((p, i) => (
            p.trim() ? <p key={i} style={{ fontSize: 13, color: C.graphite, lineHeight: 1.85, fontWeight: 300, marginBottom: 14 }}>{p}</p>
            : <div key={i} style={{ height: 6 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card fade" style={{ padding: 18, marginBottom: 12, background: C.offWhite, border: `1px solid ${C.sand}` }}>
        <p className="lbl" style={{ marginBottom: 4 }}>Biblioteca de Conteúdo</p>
        <p style={{ fontSize: 12, color: C.coolGray, fontWeight: 300, lineHeight: 1.6 }}>Dicas de treino, neurociência e comportamento publicadas pela Talita especialmente para você.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DEMO_CONTEUDOS.map((c, i) => (
          <div key={c.id} className={`card fade-${Math.min(i + 2, 4)}`} onClick={() => setAberto(i)} style={{ padding: "18px 20px", cursor: "pointer", transition: "box-shadow .2s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <span className="pill" style={{ background: (TIPO_COLOR[c.tipo] || {}).bg || C.sand, color: (TIPO_COLOR[c.tipo] || {}).color || C.caramel, marginBottom: 10, display: "inline-flex" }}>{c.tipo}</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: C.graphite, lineHeight: 1.3, marginBottom: 6 }}>{c.titulo}</p>
                <p style={{ fontSize: 9, color: C.coolGray, fontWeight: 200 }}>{c.data}</p>
              </div>
              <span style={{ color: C.taupe, fontSize: 16, marginLeft: 12, flexShrink: 0 }}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
const TABS = [
  { id: "protocolo", label: "Protocolo", icon: "◈" },
  { id: "habitos", label: "Hábitos", icon: "✦" },
  { id: "checkin", label: "Check-in", icon: "◻" },
  { id: "feedbacks", label: "Feedbacks", icon: "→" },
  { id: "conteudos", label: "Conteúdos", icon: "◇" },
];

export default function App() {
  const [aluna, setAluna] = useState(null);
  const [tab, setTab] = useState("protocolo");

  if (!aluna) return <Login onLogin={setAluna} />;

  const views = {
    protocolo: <Protocolo aluna={aluna} />,
    habitos: <Habitos />,
    checkin: <CheckInAluna />,
    feedbacks: <Feedbacks />,
    conteudos: <Conteudos />,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Josefin Sans', sans-serif" }}>
      <FL /><GS />

      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.sand}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 20px 0", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 7, letterSpacing: 4, textTransform: "uppercase", color: C.caramel, fontWeight: 200, marginBottom: 2 }}>Área da Aluna</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 17, color: C.graphite, lineHeight: 1 }}>
                Talita <em style={{ fontStyle: "italic", color: C.brown }}>Anjos</em>
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, fontWeight: 300, color: C.graphite }}>{aluna.nome.split(" ")[0]}</p>
              <button onClick={() => setAluna(null)} style={{ background: "none", border: "none", fontSize: 9, color: C.coolGray, letterSpacing: 1, textTransform: "uppercase", fontWeight: 200, cursor: "pointer", padding: 0 }}>Sair</button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", overflowX: "auto", gap: 0, marginBottom: -1 }}>
            {TABS.map(t => (
              <button key={t.id} className={`nav-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                <span style={{ marginRight: 5, opacity: .7 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px 80px" }}>
        {views[tab]}
      </div>
    </div>
  );
}
