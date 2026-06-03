import { useMemo, useState } from 'react'
import Widget from '../components/Widget'
import { ListIcon, CheckIcon, ShieldIcon, TerminalIcon, ServerIcon } from '../components/icons'
import type { ReactNode } from 'react'

type Category = 'Frontend' | 'Backend' | 'Pentesting'

interface Task {
  id: number
  text: string
  cat: Category
  done: boolean
}

const CATEGORY_META: Record<Category, { color: string; icon: ReactNode }> = {
  Frontend: { color: 'text-sky-300', icon: <TerminalIcon width={14} height={14} /> },
  Backend: { color: 'text-emerald-300', icon: <ServerIcon width={14} height={14} /> },
  Pentesting: { color: 'text-rose-300', icon: <ShieldIcon width={14} height={14} /> },
}

const SEED: Task[] = [
  { id: 1, text: 'Polish dashboard glass widgets', cat: 'Frontend', done: true },
  { id: 2, text: 'Wire transit countdown to live feed', cat: 'Frontend', done: false },
  { id: 3, text: 'Cache weather API responses', cat: 'Backend', done: false },
  { id: 4, text: 'Harden auth token rotation', cat: 'Backend', done: false },
  { id: 5, text: 'Run recon on lab VM (UTM)', cat: 'Pentesting', done: false },
  { id: 6, text: 'Review last night’s Burp findings', cat: 'Pentesting', done: false },
]

const ORDER: Category[] = ['Frontend', 'Backend', 'Pentesting']

export default function FocusQueue({ index }: { index: number }) {
  const [tasks, setTasks] = useState<Task[]>(SEED)
  const [draft, setDraft] = useState('')
  const [cat, setCat] = useState<Category>('Frontend')

  const toggle = (id: number) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))

  const add = () => {
    const text = draft.trim()
    if (!text) return
    setTasks((t) => [...t, { id: Date.now(), text, cat, done: false }])
    setDraft('')
  }

  const grouped = useMemo(
    () => ORDER.map((c) => ({ cat: c, items: tasks.filter((t) => t.cat === c) })),
    [tasks],
  )
  const doneCount = tasks.filter((t) => t.done).length

  return (
    <Widget
      title="Deep Focus Priority Queue"
      accent="Today’s goals"
      icon={<ListIcon />}
      index={index}
      headerRight={
        <span className="chip">
          {doneCount}/{tasks.length} done
        </span>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {grouped.map(({ cat: c, items }) => {
          const meta = CATEGORY_META[c]
          return (
            <div key={c} className="rounded-2xl bg-white/[0.025] p-3.5">
              <div className={`mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] ${meta.color}`}>
                {meta.icon}
                {c}
              </div>
              <ul className="space-y-1.5">
                {items.length === 0 && (
                  <li className="text-xs text-white/30">No tasks queued.</li>
                )}
                {items.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => toggle(t.id)}
                      className="group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-md border transition-colors ${
                          t.done
                            ? 'border-bronze bg-bronze text-black'
                            : 'border-white/25 group-hover:border-bronze/60'
                        }`}
                      >
                        {t.done && <CheckIcon width={11} height={11} strokeWidth={3} />}
                      </span>
                      <span
                        className={`text-sm leading-snug ${
                          t.done ? 'text-white/35 line-through' : 'text-white/80'
                        }`}
                      >
                        {t.text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex gap-1.5">
          {ORDER.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                cat === c
                  ? 'bg-bronze/20 text-bronze-light'
                  : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder={`Add a ${cat} goal…`}
            className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-bronze/50 focus:outline-none"
          />
          <button
            onClick={add}
            className="rounded-xl bg-bronze px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-bronze-light"
          >
            Add
          </button>
        </div>
      </div>
    </Widget>
  )
}
