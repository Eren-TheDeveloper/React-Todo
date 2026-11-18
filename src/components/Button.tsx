import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = { variant?: 'primary' | 'secondary' | 'destructive' } & ComponentProps<'button'>

const variants = {
  primary: 'button-primary text-white',
  secondary: 'button-secondary text-zinc-300',
  destructive: 'text-zinc-500 enabled:hover:bg-red-400/10 enabled:hover:text-red-300',
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return <button {...props} type={type} className={twMerge(
    'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-40',
    variants[variant], className,
  )} />
}
