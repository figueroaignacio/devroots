import { cn } from '@/lib/utils';
import { JSX } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'muted';

interface TypographyProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantTagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  blockquote: 'blockquote',
  muted: 'p',
};

const variantClasses: Record<Variant, string> = {
  h1: 'scroll-m-20  text-4xl font-extrabold tracking-tight text-balance',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  muted: 'text-muted-foreground text-sm',
};

export function Typography({
  variant = 'p',
  className,
  children,
}: TypographyProps) {
  const Component = variantTagMap[variant];

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
}
