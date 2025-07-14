import { DrawerContainer, DrawerContent, DrawerOpener, Input } from '../style';

export function DeviceDrawer({ children }: { children: React.ReactNode }) {
  return (
    <DrawerContainer id="drawer-container">
      <DrawerOpener htmlFor="drawer" id="drawer-label">
        <Input type="radio" id="drawer" name="device" value="drawer" readOnly />
      </DrawerOpener>
      <DrawerContent id="drawer-content">{children}</DrawerContent>
    </DrawerContainer>
  );
}
