import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pin from '@/app/pin/page';

describe('Pin 페이지 기능 테스트', () => {
  test('포커스하면 키패드가 열린다.', async () => {
    render(<Pin />);
  });
});
