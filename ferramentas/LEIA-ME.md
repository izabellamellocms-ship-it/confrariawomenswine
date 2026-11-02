# Como o site é atualizado

Fonte da verdade: a página editável no Claude
https://claude.ai/artifact/DihXVhRctfpZWTYa9bp8FD
(Izabela e Lalesca editam pelo botão "Editar página").

Para publicar no Vercel (confrariawomenswine.vercel.app):
1. Baixar a versão atual da página (index.html) e todas as fotos dela
   (fundadoras + galeria) para uma pasta.
2. Rodar: `python3 -I ferramentas/build_site.py <pasta> .`
   Gera `index.html` e `fotos/` na raiz do repositório.
3. Commit e push na branch main. O Vercel publica sozinho.

A pasta `ferramentas/` não é publicada no site (ver `.vercelignore`).

## Desde 02/11/2026: o site lê a planilha
Fonte principal: planilha "Site – Women's Wine Confraria (edite aqui)"
(id 1C3FwsGX0mhYNHAz0NVOkH7ug0XbU73CnKbq98Ou_COE), abas Textos, Proximo,
Participantes, Galeria, Edicoes, Fundadoras. O site lê a planilha ao abrir
(`sheet_loader.js`); o `index.html` traz uma cópia embutida usada se a
planilha não responder. Fotos novas: pasta "Women's Wine – Fotos do site" no
Drive (compartilhada por link), com o link colado na aba Galeria.
