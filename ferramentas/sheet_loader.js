  // Lê a planilha "Site – Women's Wine Confraria" e atualiza a página.
  // Se a planilha não responder, a página continua com a cópia embutida.
  const SHEET = "1C3FwsGX0mhYNHAz0NVOkH7ug0XbU73CnKbq98Ou_COE";
  const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  const edId = (s) => { const m = String(s ?? "").match(/\d+/); return m ? m[0] + "ª" : String(s ?? "").trim(); };
  const cellText = (c) => { if (!c) return ""; if (typeof c.v === "string") return c.v; if (c.f != null) return String(c.f); return c.v == null ? "" : String(c.v); };
  function loadTab(name) {
    return new Promise((resolve, reject) => {
      const cb = "__ww" + Math.random().toString(36).slice(2);
      const s = document.createElement("script");
      const done = () => { clearTimeout(timer); try { delete window[cb]; } catch (_) { window[cb] = undefined; } s.remove(); };
      const timer = setTimeout(() => { done(); reject(new Error("timeout")); }, 12000);
      window[cb] = (r) => { done(); if (!r || r.status === "error" || !r.table) reject(new Error("erro")); else resolve(r.table.rows.map((row) => (row.c || []).map(cellText))); };
      s.onerror = () => { done(); reject(new Error("rede")); };
      s.src = "https://docs.google.com/spreadsheets/d/" + SHEET + "/gviz/tq?tqx=out:json;responseHandler:" + cb + "&headers=1&sheet=" + encodeURIComponent(name) + "&_=" + Date.now();
      document.head.appendChild(s);
    });
  }
  const filled = (rows) => rows.filter((r) => r.some((v) => String(v).trim() !== ""));
  const tabs = {
    Textos(rows) {
      rows.forEach(([k, v]) => { const n = norm(k); if (!v) return;
        if (n.includes("frase")) S.tagline = v; else if (n.includes("apresenta")) S.lead = v;
        else if (n.includes("surgiu")) S.historia = v; else if (n.includes("objetivo")) S.objetivo = v; });
    },
    Proximo(rows) {
      const P = Object.assign({}, S.proximo || {});
      rows.forEach(([k, v]) => { const n = norm(k);
        if (n.startsWith("link") && n.includes("participante")) P.formParticipante = v.trim();
        else if (n.startsWith("link") && n.includes("indicada")) P.formIndicada = v.trim();
        else if (n.startsWith("edic")) P.titulo = v;
        else if (n.startsWith("data")) P.quando = v;
        else if (n.startsWith("situa")) { const s = norm(v); P.status = s.startsWith("abert") ? "abertas" : s.startsWith("encerr") ? "encerradas" : "breve"; }
        else if (n.startsWith("texto")) P.descricao = v;
        else if (n.startsWith("link") && n.includes("lista")) P.listaLink = v.trim();
        else if (n.startsWith("aviso")) P.listaAviso = v; });
      S.proximo = P;
    },
    Edicoes(rows) {
      const list = filled(rows).filter((r) => r[0]).map(([id, quando, desc]) => ({ id: edId(id), titulo: edId(id) + " edição", quando: quando || "", descricao: desc || "" }));
      if (list.length) S.edicoes = list.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    },
    Participantes(rows) {
      S.participantes = filled(rows).filter((r) => String(r[0]).trim()).map(([nome, empresa, linkedin, eds], i) => ({
        id: "s" + i, nome: nome.trim(), empresa: (empresa || "").trim(), linkedin: /linkedin\.com\//.test(linkedin || "") ? linkedin.trim() : "",
        edicoes: String(eds || "").split(/\s*(?:,|;|\/|\se\s)\s*/).map((x) => x.trim()).filter(Boolean).map(edId) }))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    },
    Galeria(rows) {
      S.galeria = filled(rows).filter((r) => String(r[1]).trim()).map(([ed, foto, leg], i) => ({ id: "f" + i, foto: foto.trim(), legenda: leg || "", edicao: edId(ed) }));
    },
    Fundadoras(rows) {
      const list = filled(rows).filter((r) => String(r[0]).trim()).map(([nome, papel, desc, linkedin, foto]) => ({
        id: norm(nome).replace(/[^a-z0-9]+/g, "-"), nome: nome.trim(), papel: papel || "", descricao: desc || "", linkedin: (linkedin || "").trim(), foto: (foto || "").trim() }));
      if (list.length) S.fundadoras = list;
    },
  };
  Object.keys(tabs).forEach((name) => {
    loadTab(name).then((rows) => { tabs[name](rows); render(); }).catch(() => {});
  });
