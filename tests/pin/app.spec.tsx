import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pin from '@/app/pin/page';
import { baseurl } from '@/constants/constants';
describe('Pin 페이지 내부의 유닛 테스트', () => {
  test('pin 번호 입력에 대한 label 테스트', async () => {
    render(<Pin />);

    expect(await screen.findByLabelText('보안 PIN 입력')).toBeInTheDocument();
  });

  test('input 클릭 시 pin pad가 열리는지 테스트', async () => {
    render(<Pin />);
    const pinInput = document.getElementById(
      'pin-pattern-input',
    ) as HTMLInputElement;

    await userEvent.click(pinInput);

    expect(
      await screen.findByText(/보안 키를 입력해주세요/),
    ).toBeInTheDocument();

    expect(await screen.findByText(/4자리로 입력해주세요/)).toBeInTheDocument();
  });

  test('Random한 Keypad 숫자 키들이 반환되는지 테스트', async () => {
    const url = `${baseurl}/keypad`;
  });
});
