'use server';

const webpush = require('web-push');

export const generateVAPIDKeys = () => {
  const vapidKeys = webpush.generateVAPIDKeys();
  return vapidKeys;
};
