import { ContentOpener } from "./ui/ContentOpener";
import { DeviceContent } from "./ui/DeviceContent";
import { DeviceDrawer } from "./ui/DeviceDrawer";
import { DeviceFooter } from "./ui/DeviceFooter";
import { DeviceFrame } from "./ui/DeviceFrame";
import { DrawerIndicator } from "./ui/DrawerIndicator";

export const Device = Object.freeze({
  content: DeviceContent,
  drawer: DeviceDrawer,
  footer: DeviceFooter,
  frame: DeviceFrame,
  contentOpener: ContentOpener,
  drawerIndicator: DrawerIndicator,
});
