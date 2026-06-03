import { useMemo, useState } from 'react'
import Widget from '../components/Widget'
import { BookIcon } from '../components/icons'

// 10th-grade weekly timetable. Index 0 = Monday.
const TIMETABLE: Record<number, { time: string; subject: string; room: string }[]> = {
  1: [
    { time: '08:00', subject: 'Mathematics', room: 'A12' },
    { time: '08:55', subject: 'Physics', room: 'Lab 2' },
    { time: '10:00', subject: 'Italian', room: 'B07' },
    { time: '10:55', subject: 'History', room: 'A04' },
    { time: '12:00', subject: 'Computer Science', room: 'IT-1' },
  ],
  2: [
    { time: '08:00', subject: 'Literature', room: 'A09' },
    { time: '08:55', subject: 'Italian', room: 'B07' },
    { time: '10:00', subject: 'Chemistry', room: 'Lab 1' },
    { time: '10:55', subject: 'PE', room: 'Gym' },
    { time: '12:00', subject: 'Mathematics', room: 'A12' },
  ],
  3: [
    { time: '08:00', subject: 'Biology', room: 'Lab 3' },
    { time: '08:55', subject: 'Mathematics', room: 'A12' },
    { time: '10:00', subject: 'Geography', room: 'A06' },
    { time: '10:55', subject: 'Italian', room: 'B07' },
    { time: '12:00', subject: 'Computer Science', room: 'IT-1' },
  ],
  4: [
    { time: '08:00', subject: 'Italian', room: 'B07' },
    { time: '08:55', subject: 'History', room: 'A04' },
    { time: '10:00', subject: 'Physics', room: 'Lab 2' },
    { time: '10:55', subject: 'Literature', room: 'A09' },
    { time: '12:00', subject: 'PE', room: 'Gym' },
  ],
  5: [
    { time: '08:00', subject: 'Chemistry', room: 'Lab 1' },
    { time: '08:55', subject: 'Computer Science', room: 'IT-1' },
    { time: '10:00', subject: 'Mathematics', room: 'A12' },
    { time: '10:55', subject: 'Italian', room: 'B07' },
    { time: '12:00', subject: 'Geography', room: 'A06' },
  ],
}

const WEEKEND = [{ time: '—', subject: 'No classes · weekend', room: '' }]

// Italian vocabulary flashcards — rotates daily, manual flip & shuffle.
const FLASHCARDS = [
  { it: 'la mattina', en: 'the morning', ex: 'Studio ogni mattina.' },
  { it: 'in ritardo', en: 'late / delayed', ex: "L'autobus è in ritardo." },
  { it: 'lo zaino', en: 'the backpack', ex: 'Ho dimenticato lo zaino.' },
  { it: 'la lezione', en: 'the lesson / class', ex: 'La lezione inizia alle otto.' },
  { it: 'il compito', en: 'the homework / task', ex: 'Devo finire il compito.' },
  { it: "l'orario", en: 'the schedule', ex: "Controlla l'orario di oggi." },
  { it: 'allenarsi', en: 'to train / practice', ex: 'Mi alleno ogni sera.' },
]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function AcademicGlance({ index }: { index: number }) {
  const today = new Date()
  const dow = today.getDay()
  const lessons = TIMETABLE[dow] ?? WEEKEND

  // pick a daily card based on the date so it feels "the card of the day"
  const dailyOffset = today.getDate() % FLASHCARDS.length
  const [cardIdx, setCardIdx] = useState(dailyOffset)
  const [flipped, setFlipped] = useState(false)
  const card = useMemo(() => FLASHCARDS[cardIdx % FLASHCARDS.length], [cardIdx])

  const nextCard = () => {
    setFlipped(false)
    setCardIdx((i) => (i + 1) % FLASHCARDS.length)
  }

  return (
    <Widget
      title="Academic & Language Glance"
      accent={`${DAYS[dow]} · Grade 10`}
      icon={<BookIcon />}
      index={index}
      headerRight={<span className="chip">{lessons.length} blocks</span>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {lessons.map((l, i) => {
            const isItalian = l.subject === 'Italian'
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm ${
                  isItalian
                    ? 'border border-bronze/40 bg-bronze/10'
                    : 'bg-white/[0.03]'
                }`}
              >
                <span className="w-11 shrink-0 tabular-nums text-xs text-white/45">
                  {l.time}
                </span>
                <span
                  className={`flex-1 font-medium ${
                    isItalian ? 'text-bronze-light' : 'text-white/85'
                  }`}
                >
                  {l.subject}
                </span>
                {l.room && <span className="chip">{l.room}</span>}
              </div>
            )
          })}
        </div>

        {/* Daily Italian flashcard */}
        <div className="flex flex-col">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
            Italian card of the day
          </p>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="group relative flex flex-1 flex-col items-center justify-center rounded-3xl border border-bronze/30 bg-gradient-to-br from-bronze/15 to-transparent p-6 text-center transition-all duration-300 hover:border-bronze/60"
          >
            <span className="absolute right-3 top-3 chip">🇮🇹 tap to flip</span>
            {!flipped ? (
              <span className="bronze-text text-2xl font-semibold">{card.it}</span>
            ) : (
              <>
                <span className="text-2xl font-semibold text-white">{card.en}</span>
                <span className="mt-2 text-sm italic text-white/50">“{card.ex}”</span>
              </>
            )}
          </button>
          <button
            onClick={nextCard}
            className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.08]"
          >
            Next card →
          </button>
        </div>
      </div>
    </Widget>
  )
}
