'use client';

import Button from '@/components/Button';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
}

export function SubmitButton({ isPending, ...props }: SubmitButtonProps) {
  return (
    <div className="flex place-content-center align-middle pt-4">
      <Button {...props} type="submit" status={isPending ? 'pending' : 'idle'} disabled={isPending}>
        확인
      </Button>
    </div>
  );
}
