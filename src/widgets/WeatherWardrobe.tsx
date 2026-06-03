import { useEffect, useState } from 'react'
import Widget from '../components/Widget'
import { CloudIcon, UmbrellaIcon, ShirtIcon } from '../components/icons'

// Budapest coordinates
const LAT = 47.4979
const LON = 19.0402

interface Weather {
  temp: number
  apparent: number
  precipProb: number
  wind: number
  code: number
  isDay: boolean
}

// Open-Meteo WMO weather code → label + emoji
function describe(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: 'Clear sky', emoji: '☀️' }
  if (code <= 2) return { label: 'Partly cloudy', emoji: '🌤️' }
  if (code === 3) return { label: 'Overcast', emoji: '☁️' }
  if (code <= 48) return { label: 'Foggy', emoji: '🌫️' }
  if (code <= 67) return { label: 'Rain', emoji: '🌧️' }
  if (code <= 77) return { label: 'Snow', emoji: '🌨️' }
  if (code <= 82) return { label: 'Showers', emoji: '🌦️' }
  return { label: 'Thunderstorm', emoji: '⛈️' }
}

interface Advice {
  wear: string
  umbrella: boolean
  umbrellaNote: string
}

function advise(w: Weather): Advice {
  const t = w.apparent
  let wear: string
  if (t < 0) wear = 'Heavy coat, gloves & a warm layer — it bites out there.'
  else if (t < 8) wear = 'Insulated jacket and a scarf. Layer up.'
  else if (t < 15) wear = 'Light jacket or hoodie over a tee.'
  else if (t < 22) wear = 'Long sleeves or a light sweater is plenty.'
  else if (t < 28) wear = 'T-shirt weather — keep it breezy.'
  else wear = 'Shorts & tee, stay hydrated and find shade.'

  const umbrella = w.precipProb >= 35
  const umbrellaNote = umbrella
    ? `Yes — ${w.precipProb}% chance of rain. Grab the umbrella.`
    : `No need — only ${w.precipProb}% chance of rain.`

  return { wear, umbrella, umbrellaNote }
}

// Fallback if the network is unavailable
const FALLBACK: Weather = {
  temp: 14,
  apparent: 12,
  precipProb: 40,
  wind: 11,
  code: 61,
  isDay: true,
}

export default function WeatherWardrobe({ index }: { index: number }) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day` +
      `&timezone=Europe%2FBudapest`
    let cancelled = false
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        const c = d.current
        setWeather({
          temp: Math.round(c.temperature_2m),
          apparent: Math.round(c.apparent_temperature),
          precipProb: c.precipitation_probability ?? 0,
          wind: Math.round(c.wind_speed_10m),
          code: c.weather_code,
          isDay: c.is_day === 1,
        })
        setLive(true)
      })
      .catch(() => {
        if (!cancelled) setWeather(FALLBACK)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const w = weather ?? FALLBACK
  const desc = describe(w.code)
  const advice = advise(w)

  return (
    <Widget
      title="Hyper-Local Weather & Wardrobe"
      accent="Budapest, HU"
      icon={<CloudIcon />}
      index={index}
      headerRight={
        <span className="chip flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              live ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
          />
          {weather ? (live ? 'Live' : 'Cached') : 'Loading…'}
        </span>
      }
    >
      <div className="mb-4 flex items-center justify-between rounded-3xl bg-black/30 p-4">
        <div className="flex items-center gap-3">
          <span className="text-5xl leading-none">{desc.emoji}</span>
          <div>
            <p className="bronze-text text-4xl font-semibold leading-none">{w.temp}°</p>
            <p className="mt-1 text-sm text-white/55">{desc.label}</p>
          </div>
        </div>
        <div className="space-y-1 text-right text-xs text-white/45">
          <p>Feels like {w.apparent}°</p>
          <p>Wind {w.wind} km/h</p>
          <p>Rain {w.precipProb}%</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] p-3.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-bronze/15 text-bronze-light">
            <ShirtIcon />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">Wear today</p>
            <p className="text-sm text-white/85">{advice.wear}</p>
          </div>
        </div>
        <div
          className={`flex items-start gap-3 rounded-2xl p-3.5 ${
            advice.umbrella ? 'border border-bronze/40 bg-bronze/10' : 'bg-white/[0.03]'
          }`}
        >
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
              advice.umbrella ? 'bg-bronze/25 text-bronze-glow' : 'bg-white/5 text-white/40'
            }`}
          >
            <UmbrellaIcon />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">Umbrella</p>
            <p className="text-sm text-white/85">{advice.umbrellaNote}</p>
          </div>
        </div>
      </div>
    </Widget>
  )
}
