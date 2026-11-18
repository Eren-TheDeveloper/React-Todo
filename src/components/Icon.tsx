import type { ComponentProps } from 'react'

const paths = {
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  left: 'm14 6-6 6 6 6',
  right: 'm10 6 6 6-6 6',
  trash: 'M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6',
  spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
  flame: 'M12 3c1 5-4 5-4 9 0 2 1 3 2 3-1-3 2-4 3-6 0 3 4 4 4 7a5 5 0 0 1-10 0C3 11 8 8 12 3Z',
  calendar: 'M8 3v4M16 3v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1ZM8 14h2M14 14h2',
}

export function Icon({ name, ...props }: { name: keyof typeof paths } & ComponentProps<'svg'>) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d={paths[name]} />
  </svg>
}
