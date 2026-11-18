import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = { variant?: 'primary' | 'secondary' | 'destructive' } & ComponentProps<'button'>

const variants = {
  primary: 'bg-violet-600 text-white enabled:hover:bg-violet-500',
  secondary: 'bg-zinc-700 text-zinc-100 enabled:hover:bg-zinc-600',
  destructive: 'text-red-300 enabled:hover:bg-red-950 enabled:hover:text-red-200',
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return <button {...props} type={type} className={twMerge(
    'min-h-10 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-40',
    variants[variant], className,
  )} />
}
