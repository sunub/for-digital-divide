'use client';

import styled from 'styled-components';
import { AlertDialog, AlertDialogContent } from '@/components/AlertDialog';
import { FlexCenterDiv, FlexDiv } from '@/shared/style/component/div';
import { AlertCloseButton } from '../../Alert/AlertCloseButton';
import Link from 'next/link';
import { LinkButton } from './LinkButton';

export function AlertMessage({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogContent>
        <ContentContainer>
          <Title>간편 로그인을 등록해주세요!</Title>
          <Description>
            간편 로그인 설정이 되어 있지 않습니다. PIN을 등록하면 이메일과 비밀번호를 사용하지 않고 간편 로그인을 이용할
            수 있습니다.
          </Description>
          <Container>
            <AlertCloseButton />
            <LinkButton asChild>
              <Link href="/dashboard?page=register-pin">PIN 등록하기</Link>
            </LinkButton>
          </Container>
        </ContentContainer>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ContentContainer = styled(FlexCenterDiv)`
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: color-mix(in oklch, var(--color-text) 70%, transparent);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Container = styled(FlexDiv)`
  width: 100%;
  justify-content: flex-end;
  gap: 1rem;
`;
