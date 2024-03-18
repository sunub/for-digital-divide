'use client';

import CheckBox from '@/components/CheckBox';
import Button from '../Button/Button';
import styled from 'styled-components';
import { moveToPatternPage } from '@/lib/revalidate';

const RequiredLabel = styled.label`
  &::after {
    content: '[필수]';
    font-size: 0.85rem;
    color: red;
    padding-left: 0.25rem;
  }
`;

function RequiredItem({
  id,
  name,
  content,
}: {
  id: string;
  name: string;
  content: string;
}) {
  return (
    <li className="relative flex flex-row items-center gap-3">
      <CheckBox id={id} name={name} required={true} />
      <RequiredLabel htmlFor={id}>{content}</RequiredLabel>
    </li>
  );
}

function OptionalItem({
  id,
  name,
  content,
}: {
  id: string;
  name: string;
  content: string;
}) {
  return (
    <div className="relative flex flex-row items-center gap-3">
      <CheckBox id={id} name={name} />
      <label htmlFor={id}>{content}</label>
    </div>
  );
}

function AgreeForm() {
  const requiredItems = [
    {
      id: 'agree-phone',
      name: 'agree-phone',
      content: '휴대폰 본인인증 약관',
    },
    {
      id: 'agree-autification-paper',
      name: 'agree-autification-paper',
      content: '국민인증서 약관',
    },
    {
      id: 'agree-privacy',
      name: 'agree-privacy',
      content: '개인정보 수집 및 이용 약관',
    },
    {
      id: 'agree-marketing',
      name: 'agree-marketing',
      content: '마케팅 정보 수신 동의',
    },
  ];

  return (
    <form
      action={'/start/pattern'}
      className="flex h-full justify-evenly flex-col"
      onSubmit={() => moveToPatternPage()}
    >
      <ol className="w-full flex flex-col gap-3">
        {requiredItems.map((item) => (
          <RequiredItem
            key={item.id}
            id={item.id}
            name={item.name}
            content={item.content}
          />
        ))}
        <OptionalItem
          id={'agree-electric-document'}
          name="agree-electric-document"
          content="전자문서 약관동의"
        />
      </ol>
      <div className="flex w-full justify-end">
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
}

export default AgreeForm;
