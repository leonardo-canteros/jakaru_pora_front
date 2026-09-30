import type { SVGProps } from 'react'

export type IconName = 'overview' | 'garden' | 'study' | 'search' | 'plus' | 'arrow' | 'leaf' | 'reset' | 'close' | 'calendar' | 'drop' | 'thermometer' | 'history' | 'menu'

const paths: Record<IconName, React.ReactNode> = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
  garden: <><path d="M3 20h18M5 17V9l7-5 7 5v8" /><path d="M9 20v-5h6v5M8 10h.01M16 10h.01" /></>,
  study: <><path d="M4 19h16M6 16V8m6 8V4m6 12v-5" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="9" r="2" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  leaf: <><path d="M20.5 3.5c-8 0-14 2.5-14 9a5 5 0 0 0 5 5c6.5 0 9-6 9-14Z" /><path d="M3.5 21c2.5-6 6-9 12-12" /></>,
  reset: <><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  drop: <><path d="M12 3s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12Z" /></>,
  thermometer: <><path d="M14 14.76V5a3 3 0 0 0-6 0v9.76a5 5 0 1 0 6 0Z" /><path d="M11 11v7" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l4 2" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
}

export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name]}</svg>
}
