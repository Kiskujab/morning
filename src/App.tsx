import { useNow } from './lib/useNow'
import TransitCommand from './widgets/TransitCommand'
import AcademicGlance from './widgets/AcademicGlance'
import DevSecDock from './widgets/DevSecDock'
import WeatherWardrobe from './widgets/WeatherWardrobe'
import MechanicsTracker from './widgets/MechanicsTracker'
import HydrationMatrix from './widgets/HydrationMatrix'
import FocusQueue from './widgets/FocusQueue'

function greeting(h: number): string {
  if (h < 5) return 'Late night'
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function App() {
  const now = useNow(1000)
  const dateLabel = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const timeLabel = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <div className="ambient-canvas min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <header className="animate-fade-up mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" style={{ opacity: 0 }}>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-bronze-light/70">
              Morning Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {greeting(now.getHours())}.
            </h1>
            <p className="mt-1 text-sm text-white/45">{dateLabel}</p>
          </div>
          <div className="glass flex items-center gap-3 self-start px-5 py-3 sm:self-auto">
            <span className="h-2.5 w-2.5 rounded-full bg-bronze animate-pulse-soft" />
            <span className="bronze-text text-2xl font-semibold tabular-nums">{timeLabel}</span>
          </div>
        </header>

        {/* Responsive bento grid */}
        <main className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <TransitCommand index={0} />
          </div>
          <div className="lg:col-span-2">
            <WeatherWardrobe index={1} />
          </div>
          <div className="lg:col-span-2">
            <HydrationMatrix index={2} />
          </div>

          <div className="lg:col-span-3">
            <AcademicGlance index={3} />
          </div>
          <div className="lg:col-span-3">
            <MechanicsTracker index={4} />
          </div>

          <div className="lg:col-span-2">
            <DevSecDock index={5} />
          </div>
          <div className="lg:col-span-4">
            <FocusQueue index={6} />
          </div>
        </main>

        <footer className="mt-10 text-center text-xs text-white/25">
          Phantom Black · Mystic Bronze · One UI inspired · {now.getFullYear()}
        </footer>
      </div>
    </div>
  )
}
