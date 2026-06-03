import type { ReactNode } from 'react'
import Widget from '../components/Widget'
import {
  TerminalIcon,
  GithubIcon,
  CloudIcon,
  PlugIcon,
  ServerIcon,
  BoxIcon,
} from '../components/icons'

interface DockItem {
  label: string
  sub: string
  href: string
  icon: ReactNode
}

const ITEMS: DockItem[] = [
  {
    label: 'GitHub',
    sub: 'repos & PRs',
    href: 'https://github.com',
    icon: <GithubIcon />,
  },
  {
    label: 'Netlify',
    sub: 'deploys',
    href: 'https://app.netlify.com',
    icon: <CloudIcon />,
  },
  {
    label: 'localhost:5173',
    sub: 'vite dev',
    href: 'http://localhost:5173',
    icon: <PlugIcon />,
  },
  {
    label: 'localhost:3000',
    sub: 'api server',
    href: 'http://localhost:3000',
    icon: <ServerIcon />,
  },
  {
    label: 'localhost:8080',
    sub: 'proxy / burp',
    href: 'http://localhost:8080',
    icon: <PlugIcon />,
  },
  {
    label: 'UTM · Kali',
    sub: 'lab vm',
    href: 'utm://',
    icon: <BoxIcon />,
  },
  {
    label: 'UTM · Win11',
    sub: 'target vm',
    href: 'utm://',
    icon: <BoxIcon />,
  },
]

export default function DevSecDock({ index }: { index: number }) {
  return (
    <Widget
      title="Dev & Sec Dock"
      accent="Quick launch"
      icon={<TerminalIcon />}
      index={index}
      headerRight={<span className="chip">{ITEMS.length} tools</span>}
    >
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/40 hover:bg-white/[0.07]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-bronze/15 text-bronze-light transition-colors group-hover:bg-bronze/25">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/90">{item.label}</p>
              <p className="truncate text-[11px] text-white/40">{item.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </Widget>
  )
}
