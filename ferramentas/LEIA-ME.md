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

## Regra para formulários de inscrição
Todo formulário de inscrição (participantes, indicadas ou qualquer outro)
tem que ter o campo **WhatsApp (com DDD)** como pergunta **obrigatória**.
O WhatsApp fica só na planilha de respostas, nunca na planilha do site.

## Lista de presenças (página avulsa)
Desde 23/11/2026 a lista não fica mais no site principal. Ela está em
`lista/index.html` → https://confrariawomenswine.vercel.app/lista/
Lê as abas Presencas (status), LinkedinForm (LinkedIn do formulário) e
Participantes (LinkedIn de reserva) da planilha do site. Só participantes
com status Confirmado aparecem; canceladas e duplicadas ficam de fora.
Desde 23/11 a lista também inclui as indicadas com status "Confirmado",
lidas da aba IndicadasLista (sem WhatsApp).

## Lista de presença (/lista)
- Fonte principal: aba "Confirmação 25/11" da planilha da 3ª edição, espelhada (sem WhatsApp) na aba ListaFinal da planilha do site.
- Aparece só quem está com "Status final" começando por CONFIRMADA. LinkedIn vem de LinkedinForm / IndicadasLista.
- Se ListaFinal falhar, a página volta a usar Presencas + IndicadasLista.
