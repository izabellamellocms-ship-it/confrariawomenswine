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
