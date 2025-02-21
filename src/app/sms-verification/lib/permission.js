export async function askPermission() {
  const permission = await Notification.requestPermission((result) => result);
  return permission;
}

export async function getNotificationPermissionState() {
  if (navigator.permissions) {
    const notificationState = await navigator.permissions.query({
      name: 'notifications',
    });
    return notificationState.state;
  }
  return 'denied';
}
