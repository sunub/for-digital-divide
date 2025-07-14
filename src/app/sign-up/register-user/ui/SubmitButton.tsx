'use client';

import Button from '@/components/Button';

export function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex place-content-center align-middle pt-4">
      <Button type="submit" status={isPending ? 'pending' : 'idle'} disabled={isPending}>
        확인
      </Button>
    </div>
  );
}
