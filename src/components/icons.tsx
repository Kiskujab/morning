import type { SVGProps } from 'react'

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const BusIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 11h16M6 16h.01M18 16h.01M5 17v2M19 17v2" />
    <rect x="4" y="5" width="16" height="12" rx="3" />
    <path d="M4 8h16" />
  </svg>
)

export const BookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" />
    <path d="M6 19h12" />
  </svg>
)

export const TerminalIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </svg>
)

export const CloudIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M17 18a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 9.5 4.5 4.5 0 0 0 7 18h10Z" />
  </svg>
)

export const TrophyIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
  </svg>
)

export const DropIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3s6 5.7 6 10a6 6 0 1 1-12 0c0-4.3 6-10 6-10Z" />
  </svg>
)

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const ListIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
)

export const GithubIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.1 1.2 5 1.5 5 1.5a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3.5 8.5c0 5 3 6.2 6 6.5a3.4 3.4 0 0 0-1 2.6V22" />
  </svg>
)

export const PlugIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 22v-5M9 7V2M15 7V2M5 7h14v3a7 7 0 0 1-14 0V7Z" />
  </svg>
)

export const ServerIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
)

export const BoxIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M21 8 12 3 3 8l9 5 9-5Z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
)

export const UmbrellaIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 12v7a2 2 0 0 0 4 0" />
    <path d="M2 12a10 10 0 0 1 20 0Z" />
  </svg>
)

export const ShirtIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 3 6 5 3 8l3 3 1-1v9h10v-9l1 1 3-3-3-3-3-2a3 3 0 0 1-6 0Z" />
  </svg>
)

export const ShieldIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
  </svg>
)

export const CoffeeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
    <path d="M17 9h2a2 2 0 0 1 0 5h-2M7 2v2M11 2v2" />
  </svg>
)
