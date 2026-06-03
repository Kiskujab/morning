import { useMemo } from 'react'
import Widget from '../components/Widget'
import { BusIcon } from '../components/icons'
import { useNow } from '../lib/useNow'

// Service headway for the 45 route (minutes past the hour it departs the stop).
// A realistic ~12 min headway across the operating day.
const ROUTE = '45'
const STOP = 'Széll Kálmán tér'
const HEADWAY_MIN = 12
const DEPART_OFFSET = [2, 14, 26, 38, 50] // minutes within each hour

interface Departure {
  at: Date
  secsAway: number
}

function nextDepartures(now: Date, count: number): Departure[] {
  const out: Departure[] = []
  const cursor = new Date(now)
  cursor.setSeconds(0, 0)
  // walk forward hour by hour collecting offsets that are still in the future
  for (let h = 0; out.length < count && h < 6; h++) {
    const base = new Date(cursor)
    base.setHours(cursor.getHours() + h, 0, 0, 0)
    for (const m of DEPART_OFFSET) {
      const at = new Date(base)
      at.setMinutes(m)
      const secsAway = Math.round((at.getTime() - now.getTime()) / 1000)
      if (secsAway >= 0) out.push({ at, secsAway })
      if (out.length >= count) break
    }
  }
  return out
}

function fmtCountdown(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  if (m <= 0) return `${s}s`
  return `${m}m ${String(s).padStart(2, '0')}s`
}

function fmtClock(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function TransitCommand({ index }: { index: number }) {
  const now = useNow(1000)
  const departures = useMemo(() => nextDepartures(now, 4), [now])
  const next = departures[0]
  const imminent = next && next.secsAway <= 180

  return (
    <Widget
      title="Transit Command"
      accent="Live schedule"
      icon={<BusIcon />}
      index={index}
      headerRight={
        <span className="chip flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${imminent ? 'bg-rose-400 animate-pulse-soft' : 'bg-emerald-400'}`}
          />
          Live
        </span>
      }
    >
      <div className="mb-4 flex items-end justify-between rounded-3xl bg-black/30 p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-bronze px-2 text-sm font-bold text-black">
              {ROUTE}
            </span>
            <span className="text-sm text-white/60">{STOP}</span>
          </div>
          <p className="mt-2 text-xs text-white/40">Next departure in</p>
        </div>
        <div className="text-right">
          <p
            className={`font-semibold tabular-nums leading-none ${
              imminent ? 'text-rose-300' : 'bronze-text'
            } text-3xl`}
          >
            {next ? fmtCountdown(next.secsAway) : '—'}
          </p>
          <p className="mt-1 text-xs text-white/45">{next ? fmtClock(next.at) : ''}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {departures.slice(1).map((d) => (
          <li
            key={d.at.toISOString()}
            className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-2.5 text-sm"
          >
            <span className="flex items-center gap-2 text-white/70">
              <BusIcon width={15} height={15} className="text-white/30" />
              Bus {ROUTE}
            </span>
            <span className="flex items-center gap-3">
              <span className="tabular-nums text-white/45">{fmtClock(d.at)}</span>
              <span className="w-16 text-right font-medium tabular-nums text-bronze-light">
                {fmtCountdown(d.secsAway)}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[11px] text-white/30">
        Headway ~{HEADWAY_MIN} min · synced {fmtClock(now)}
      </p>
    </Widget>
  )
}
