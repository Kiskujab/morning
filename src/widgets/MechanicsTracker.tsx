import { useMemo, useState } from 'react'
import Widget from '../components/Widget'
import { TrophyIcon } from '../components/icons'

interface ChampStat {
  name: string
  emoji: string
  games: number
  wins: number
  kda: number
  cs: number
  // last 5 results, true = win — drives the trend sparkline
  recent: boolean[]
}

const SEED: ChampStat[] = [
  {
    name: 'Yasuo',
    emoji: '🗡️',
    games: 6,
    wins: 4,
    kda: 3.8,
    cs: 8.2,
    recent: [true, false, true, true, true],
  },
  {
    name: 'Akali',
    emoji: '🌀',
    games: 5,
    wins: 3,
    kda: 4.1,
    cs: 7.6,
    recent: [false, true, true, false, true],
  },
  {
    name: 'Zed',
    emoji: '🥷',
    games: 4,
    wins: 1,
    kda: 2.4,
    cs: 7.9,
    recent: [false, false, true, false, false],
  },
]

function winrate(c: ChampStat) {
  return Math.round((c.wins / c.games) * 100)
}

export default function MechanicsTracker({ index }: { index: number }) {
  const [champs, setChamps] = useState<ChampStat[]>(SEED)

  // log a quick result from last night's session
  const log = (i: number, win: boolean) =>
    setChamps((prev) =>
      prev.map((c, idx) =>
        idx === i
          ? {
              ...c,
              games: c.games + 1,
              wins: c.wins + (win ? 1 : 0),
              recent: [...c.recent.slice(-4), win],
            }
          : c,
      ),
    )

  const overall = useMemo(() => {
    const g = champs.reduce((a, c) => a + c.games, 0)
    const w = champs.reduce((a, c) => a + c.wins, 0)
    return { g, w, wr: g ? Math.round((w / g) * 100) : 0 }
  }, [champs])

  return (
    <Widget
      title="Mechanics & Mastery Tracker"
      accent="Ranked · last night"
      icon={<TrophyIcon />}
      index={index}
      headerRight={
        <span className="chip">
          {overall.wr}% WR · {overall.g}G
        </span>
      }
    >
      <div className="space-y-3">
        {champs.map((c, i) => {
          const wr = winrate(c)
          const trendUp = c.recent.slice(-3).filter(Boolean).length >= 2
          return (
            <div key={c.name} className="rounded-2xl bg-white/[0.03] p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-black/40 text-lg">
                    {c.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{c.name}</p>
                    <p className="text-[11px] text-white/40">
                      {c.kda} KDA · {c.cs} CS/min
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-semibold leading-none ${
                      wr >= 50 ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {wr}%
                  </p>
                  <p className="text-[11px] text-white/40">
                    {c.wins}W {c.games - c.wins}L
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                {/* recent form sparkline */}
                <div className="flex items-end gap-1">
                  {c.recent.map((win, k) => (
                    <span
                      key={k}
                      className={`w-2.5 rounded-sm ${
                        win ? 'bg-emerald-400/80' : 'bg-rose-400/70'
                      }`}
                      style={{ height: win ? 18 : 9 }}
                    />
                  ))}
                  <span
                    className={`ml-2 text-[11px] ${
                      trendUp ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {trendUp ? '▲ trending up' : '▼ cooling off'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => log(i, true)}
                    className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                  >
                    +W
                  </button>
                  <button
                    onClick={() => log(i, false)}
                    className="rounded-lg bg-rose-500/15 px-2.5 py-1 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/25"
                  >
                    +L
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}
