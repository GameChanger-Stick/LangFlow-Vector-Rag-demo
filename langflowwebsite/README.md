# LangFlow Website (React + Vite)

This is a small UI that sends your prompt to a LangFlow flow and displays the returned chat message.

## Setup

1) Install dependencies

`npm install`

2) Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

- `VITE_LANGFLOW_ENDPOINT` (example: `http://localhost:7860/api/v1/run/<YOUR_FLOW_ID>`)
- `VITE_LANGFLOW_API_KEY`

3) Run dev server

`npm run dev`
