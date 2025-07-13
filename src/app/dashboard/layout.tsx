import { DeviceContent, DeviceFrame } from '@/shared/layout';
import { AnimatePresenceContainer } from './ui/AnimatePresenceContainer';
import { DashboardHeader } from './ui/Dashboard/ui/DashboardHeader';
import { getUsername } from './ui/Dashboard/utils/getUsername';
import { DashboardRootContainer } from './ui/Dashboard/style';
import { MainTitle } from './ui/MainTitle';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const username = await getUsername();

  return (
    <>
      <DeviceFrame>
        <DeviceContent>
          <DashboardRootContainer>
            <DashboardHeader username={username} />
            <MainTitle />
            <AnimatePresenceContainer>{children}</AnimatePresenceContainer>
          </DashboardRootContainer>
        </DeviceContent>
      </DeviceFrame>
      <div id="tooltip-root" />
    </>
  );
}
