export type ActionState = {
  user_id?: number;
  status: 'idle' | 'continue' | 'success' | 'error' | 'username' | 'email' | 'signup';
  payload: string[];
  currentStep: 'login' | 'seeding' | 'done' | 'username' | 'email' | 'password';
  nextStep?: 'seeding';
};
