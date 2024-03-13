import { generateVAPIDKeys } from './keys';

const { getSWRegistration, urlBase64ToUint8Array } = require('./utils');

export async function subscribeUserToPush() {
  const registration = await getSWRegistration();

  const vapidKey = await generateVAPIDKeys();
  const subscirbeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey.publicKey),
  };

  const subscription =
    await registration.pushManager.subscribe(subscirbeOptions);
  return JSON.stringify(subscription);
}
