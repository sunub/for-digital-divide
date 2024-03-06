'use client';

import React from 'react';
import styled from 'styled-components';
import { Slot } from '@radix-ui/react-slot';
import { variant } from 'valibot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'wide' | 'sm' | 'lg' | 'pill' | 'icon';
  asChild?: boolean;
}

const Default = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;
`;

const buttonVariants = {
  variants: {
    variant: {},
    size: {
      default: '',
      wide: '',
      sm: '',
      lg: '',
      pill: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: Default,
    size: 'default',
  },
};

const TypeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    let ButtonCompo, ButtonSize;

    switch (variant) {
      default:
        ButtonCompo = styled(Default)`
          background-color: var(--color-button);
          color: var(--color-primary-foreground);
          &:hover {
            background-color: var(--color-primary/80);
          }
        `;
        break;
    }

    switch (size) {
      case 'wide':
        break;

      default:
        break;
    }

    const Comp = asChild ? Slot : ButtonCompo;
    return <Comp ref={ref} {...props} />;
  },
);

TypeButton.displayName = 'Button';

export { TypeButton };

// import { Slot } from '@radix-ui/react-slot'
// import { cva, type VariantProps } from 'class-variance-authority'
// import * as React from 'react'

// import { cn } from '#app/utils/misc.tsx'

// const buttonVariants = cva(
// 	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors outline-none focus-visible:ring-4 focus-within:ring-4 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
// 	{
// 		variants: {
// 			variant: {
// 				default: 'bg-primary text-primary-foreground hover:bg-primary/80',
// 				destructive:
// 					'bg-destructive text-destructive-foreground hover:bg-destructive/80',
// 				outline:
// 					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
// 				secondary:
// 					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
// 				ghost: 'hover:bg-accent hover:text-accent-foreground',
// 				link: 'text-primary underline-offset-4 hover:underline',
// 			},
// 			size: {
// 				default: 'h-10 px-4 py-2',
// 				wide: 'px-24 py-5',
// 				sm: 'h-9 rounded-md px-3',
// 				lg: 'h-11 rounded-md px-8',
// 				pill: 'px-12 py-3 leading-3',
// 				icon: 'h-10 w-10',
// 			},
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default',
// 		},
// 	},
// )

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
// 	({ className, variant, size, asChild = false, ...props }, ref) => {
// 		const Comp = asChild ? Slot : 'button'
// 		return (
// 			<Comp
// 				className={cn(buttonVariants({ variant, size, className }))}
// 				ref={ref}
// 				{...props}
// 			/>
// 		)
// 	},
// )
// Button.displayName = 'Button'

// export { Button, buttonVariants }
