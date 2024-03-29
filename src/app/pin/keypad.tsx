import { baseurl } from '@/constants/constants';
import { server } from '@tests/server/node';

if (process.env.NODE_ENV === 'development') {
  server.listen();
}

async function getKeypadLayout() {
  const res = await fetch(`http://localhost:3000/api/keypad`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

async function Keypad() {
  const r = await getKeypadLayout();
  const row = r.keypad.size.row;

  return (
    <div>
      Keypad
      {Array.from({ length: row }, () => 0).map((_, i) => {
        return <div key={i}>Row {i}</div>;
      })}
      <div>
        <p>보안 키를 입력해주세요</p>
        <p>4자리로 입력해주세요</p>
      </div>
    </div>
  );
}

export default Keypad;
