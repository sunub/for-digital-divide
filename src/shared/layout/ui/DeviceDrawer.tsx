import * as styles from "../style/layout.css";

export function DeviceDrawer({ children }: { children: React.ReactNode }) {
  return (
    <div id="drawer-container" className={styles.drawerContainer}>
      <label htmlFor="drawer" id="drawer-label" className={styles.drawerOpener}>
        <input
          type="radio"
          id="drawer"
          name="device"
          value="drawer"
          readOnly
          className={styles.input}
        />
      </label>
      <div id="drawer-content" className={styles.drawerContent}>
        {children}
      </div>
    </div>
  );
}
