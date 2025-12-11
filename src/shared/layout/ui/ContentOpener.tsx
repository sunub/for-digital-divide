import * as styles from "../style/layout.css";

export function ContentOpener() {
  return (
    <label htmlFor="device-content" className={styles.openr}>
      <input
        type="radio"
        defaultChecked
        id="device-content"
        name="device"
        value="content"
        readOnly
        className={styles.input}
      />
    </label>
  );
}
