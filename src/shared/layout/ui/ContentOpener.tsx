import { Openr, Input } from '../style';

export function ContentOpener() {
  return (
    <Openr htmlFor="device-content">
      <Input type="radio" defaultChecked id="device-content" name="device" value="content" readOnly />
    </Openr>
  );
}
