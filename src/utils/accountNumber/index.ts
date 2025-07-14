let lastTimestamp = 0;
let sequence = 0;

function generateAccountNumber() {
  const now = Date.now();

  if (now === lastTimestamp) {
    sequence++;
  } else {
    lastTimestamp = now;
    sequence = 0;
  }

  lastTimestamp = now;
  const timestampPart = new Date(now).toISOString().replace(/\D/g, '').slice(0, 14);
  const sequencePart = sequence.toString().padStart(4, '0');

  return `${timestampPart}${sequencePart}`;
}

export function generateAccountNumber_14_4() {
  const accountNumber = generateAccountNumber();
  const accountStr = accountNumber.split('');
  return `${accountStr.slice(0, 14)}-${accountStr.slice(14)}`;
}
