import type { ReactNode } from 'react'

interface WidgetProps {
  title: string
  icon?: ReactNode
  accent?: string
  className?: string
  headerRight?: ReactNode
  children: ReactNode
  /** stagger index for the entrance animation */
  index?: number
}

export default function Widget({
  title,
  icon,
  accent,
  className = '',
  headerRight,
  children,
  index = 0,
}: WidgetProps) {
  return (
    <section
      className={`glass glass-hover animate-fade-up flex h-full flex-col p-5 sm:p-6 ${className}`}
      style={{ animationDelay: `${index * 70}ms`, opacity: 0 }}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-bronze/15 text-bronze-light">
              {icon}
            </span>
          )}
          <div className="flex flex-col">
            <h2 className="text-[15px] font-semibold leading-none tracking-tight text-white">
              {title}
            </h2>
            {accent && (
              <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                {accent}
              </span>
            )}
          </div>
        </div>
        {headerRight}
      </header>
      {children}
    </section>
  )
}
