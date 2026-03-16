import { useMemo, useState } from 'react'
import './App.css'

function extractLangflowMessage(payload) {
  if (!payload) return ''

  if (typeof payload === 'string') return payload

  const candidates = [
    payload?.message,
    payload?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message,
    payload?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.text,
    payload?.outputs?.[0]?.outputs?.[0]?.artifacts?.message,
    payload?.outputs?.[0]?.outputs?.[0]?.results?.message?.text,
    payload?.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message,
  ]

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) return value
  }

  return ''
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => import.meta.env.VITE_LANGFLOW_ENDPOINT, [])
  const apiKey = useMemo(() => import.meta.env.VITE_LANGFLOW_API_KEY, [])

  async function handleRunClick() {
    setIsLoading(true)
    setError('')
    setOutputValue('')

    try {
      if (!endpoint) {
        throw new Error('Missing VITE_LANGFLOW_ENDPOINT in environment')
      }
      if (!apiKey) {
        throw new Error('Missing VITE_LANGFLOW_API_KEY in environment')
      }

      const payload = {
        output_type: 'chat',
        input_type: 'chat',
        input_value:
          inputValue.trim() || 'what are the tourist places near my location',
        session_id: crypto.randomUUID(),
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      }

      const response = await fetch(endpoint, options)
      const json = await response.json().catch(() => null)
      if (!response.ok) {
        const message =
          (json && (json.message || json.error)) ||
          `Request failed with status ${response.status}`
        throw new Error(message)
      }

      const message = extractLangflowMessage(json)
      if (!message) {
        throw new Error('Could not extract message from response')
      }

      setOutputValue(message)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container">
      <h1 className="title">LangFlow Website</h1>
      <p className="subtitle">Type a question, click Run, see the output.</p>

      <div className="field">
        <label className="label" htmlFor="input">
          Input text
        </label>
        <textarea
          id="input"
          className="textarea"
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question, e.g. what are the tourist places near my location" 
        />
      </div>

      <button
        className="button"
        onClick={handleRunClick}
        disabled={isLoading}
        type="button"
      >
        {isLoading ? 'Running…' : 'Run'}
      </button>

      {error ? <div className="error">{error}</div> : null}

      <div className="field">
        <label className="label" htmlFor="output">
          Output
        </label>
        <textarea
          id="output"
          className="textarea"
          rows={12}
          value={outputValue}
          readOnly
          placeholder="Response will appear here…"
        />
      </div>
    </main>
  )
}

export default App
