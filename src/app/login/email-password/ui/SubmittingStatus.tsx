'use client';

import styled from 'styled-components';
import { StatusLoader } from './StatusLoader';

import type { ActionState } from '../../types';

export function SubmittingStatus({
  actionState,
  isSubmitting,
  isPending,
  isSeedingProgress,
}: {
  actionState: ActionState;
  isSubmitting: boolean;
  isPending: boolean;
  isSeedingProgress: boolean;
}) {
  return (
    <Container>
      {isSubmitting ? (
        <>
          <StatusLoader actionState={actionState} isPending={isPending && actionState.status !== 'continue'}>
            {!isPending && actionState.status === 'continue' ? (
              <span>로그인 완료</span>
            ) : actionState.status === 'error' ? (
              <span>로그인 실패</span>
            ) : (
              <span>로그인 중...</span>
            )}
          </StatusLoader>
          {!isPending && actionState.status === 'continue' && (
            <StatusLoader actionState={actionState} isPending={isSeedingProgress}>
              {isSeedingProgress ? <span>데모 데이터 주입 중...</span> : <span>주입 완료</span>}
            </StatusLoader>
          )}
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
`;
