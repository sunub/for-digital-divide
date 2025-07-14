'use client';

import { Form } from './ui/Form';
import styled from 'styled-components';
import { MainTitle } from './ui/MainTitle';
import { EmailAndPasswordField } from './ui/EmailAndPasswordField';

export default function EmailPasswordLogin() {
  return (
    <Container>
      <MainTitle />
      <Form>
        <EmailAndPasswordField />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
