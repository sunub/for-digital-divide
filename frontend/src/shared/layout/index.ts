import { ContentOpener } from "./ui/ContentOpener";
import { DeviceContent } from "./ui/DeviceContent";
import { DeviceDrawer } from "./ui/DeviceDrawer";
import { DeviceFooter } from "./ui/DeviceFooter";
import { DeviceFrame } from "./ui/DeviceFrame";
import { DrawerIndicator } from "./ui/DrawerIndicator";

export {
  ContentOpener,
  DeviceContent,
  DeviceDrawer,
  DeviceFooter,
  DeviceFrame,
  DrawerIndicator,
};

export { DevicePortalContext } from "@internal/design-system/components";

type DeviceCompoundComponent = typeof DeviceFrame & {
  Frame: typeof DeviceFrame;
  Content: typeof DeviceContent;
  Drawer: typeof DeviceDrawer;
  ContentOpener: typeof ContentOpener;
  DrawerIndicator: typeof DrawerIndicator;
};

export const Device = Object.assign(DeviceFrame, {
  Frame: DeviceFrame,
  Content: DeviceContent,
  Drawer: DeviceDrawer,
  ContentOpener: ContentOpener,
  DrawerIndicator: DrawerIndicator,
}) as DeviceCompoundComponent;
