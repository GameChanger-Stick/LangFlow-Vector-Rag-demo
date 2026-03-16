# LangFlow Vector RAG Demo

This repo contains a LangFlow flow export for a Vector + RAG demo, plus a small Vite/React website.

## Contents

- `Vector Rag LangFlow.json` — LangFlow flow export (import this into LangFlow)
- `langflowwebsite/` — Vite + React UI

## Run the website (local)

```bash
cd langflowwebsite
npm install
npm run dev
```

## Build / lint

```bash
cd langflowwebsite
npm run lint
npm run build
```

## Notes

- Environment variables: copy `langflowwebsite/.env.example` to `langflowwebsite/.env` and fill in values as needed.
