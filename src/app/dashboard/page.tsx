import dynamic from 'next/dynamic';
import Dashboard from './ui/Dashboard';
import { ClientPageState } from './ui/PageRouter';

export type PageState = 'initial_prompt' | 'register-pin' | ClientPageState;
interface SearchParams {
  [key: string]: string | PageState | undefined;
  page: PageState;
  accountIndex?: string;
}

function isClientPage(page: PageState): page is ClientPageState {
  return [
    'dashboard/login-selection',
    'sign-up/register-user',
    'dashboard/login/email-password',
    'dashboard/account',
  ].includes(page);
}

const RegisterPinPage = dynamic(() => import('./ui/RegisterPin'));
export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page, accountIndex } = (await searchParams) ?? { page: 'initial_prompt' };

  return (
    <>
      {(() => {
        switch (page) {
          case 'initial_prompt':
            return <Dashboard accountIndex={accountIndex} />;

          case 'register-pin':
            return <RegisterPinPage />;

          default:
            return <Dashboard accountIndex={accountIndex} />;
        }
      })()}
    </>
  );
}
