export const SITE_MAP = [
  {
    step: 1,
    title: 'start',
    path: '/',
  },
  {
    step: 2,
    title: 'intro',
    path: '/intro',
  },
  {
    step: 3,
    title: '회원가입',
    path: '/signup',
  },
];

export const REDIRECT_REASONS = {
  ALREADY_REGISTERED: 'already-registered',
  EMAIL_NOT_VERIFIED: 'email-not-verified',
  PIN_NOT_VERIFIED: 'pin-not-verified',
  EXIST_DEVICE_ID: 'exist-device-id',
} as const;
