import { useMemo, useState } from 'react'
import Widget from '../components/Widget'
import { DropIcon, CoffeeIcon } from '../components/icons'

const WATER_GOAL_ML = 2500
const CUP_ML = 250
const COFFEE_GOAL = 3

function Ring({
  progress,
  size = 168,
  stroke = 14,
  children,
}: {
  progress: number
  size?: number
  stroke?: number
  children: React.ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(progress, 1))
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="hydro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a37a" />
            <stop offset="100%" stopColor="#e0bd92" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#hydro-grad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}

export default function HydrationMatrix({ index }: { index: number }) {
  const [waterMl, setWaterMl] = useState(750)
  const [coffee, setCoffee] = useState(1)

  const waterPct = useMemo(() => waterMl / WATER_GOAL_ML, [waterMl])
  const reached = waterMl >= WATER_GOAL_ML

  return (
    <Widget
      title="Hydration & Caffeine Matrix"
      accent="Daily fluids"
      icon={<DropIcon />}
      index={index}
      headerRight={
        <button
          onClick={() => {
            setWaterMl(0)
            setCoffee(0)
          }}
          className="chip transition-colors hover:bg-white/10"
        >
          Reset
        </button>
      }
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-around">
        <Ring progress={waterPct}>
          <p className="bronze-text text-3xl font-semibold leading-none">
            {Math.round(waterPct * 100)}%
          </p>
          <p className="mt-1 text-xs text-white/45">
            {(waterMl / 1000).toFixed(2)}L / {(WATER_GOAL_ML / 1000).toFixed(1)}L
          </p>
          {reached && <p className="mt-1 text-[11px] text-emerald-300">Goal hit ✓</p>}
        </Ring>

        <div className="w-full max-w-[15rem] space-y-3">
          <button
            onClick={() => setWaterMl((v) => Math.min(v + CUP_ML, WATER_GOAL_ML))}
            className="flex w-full items-center justify-between rounded-2xl border border-bronze/30 bg-bronze/10 px-4 py-3 font-medium text-bronze-light transition-all duration-300 hover:bg-bronze/20 active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <DropIcon /> +1 glass
            </span>
            <span className="text-xs text-white/45">{CUP_ML} ml</span>
          </button>

          <div className="rounded-2xl bg-white/[0.03] p-3.5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-white/70">
                <CoffeeIcon /> Caffeine
              </span>
              <span className="text-white/45">
                {coffee} / {COFFEE_GOAL} cups
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {Array.from({ length: COFFEE_GOAL }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl transition-all duration-300 ${
                      i < coffee ? 'scale-100 opacity-100' : 'scale-90 opacity-25 grayscale'
                    }`}
                  >
                    ☕
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCoffee((c) => Math.max(0, c - 1))}
                  className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10"
                >
                  −
                </button>
                <button
                  onClick={() => setCoffee((c) => Math.min(COFFEE_GOAL, c + 1))}
                  className="grid h-7 w-7 place-items-center rounded-lg bg-bronze/20 text-bronze-light transition-colors hover:bg-bronze/30"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  )
}
