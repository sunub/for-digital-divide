'use server';

import webpush from 'web-push';
import usePgPool from '@/hooks/use-pgpool.hook';

export async function getVAPIDKey(formData: FormData) {
  const username = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const phoneNum = phone.replace(/-/g, '');

  const getSubscription = async () => {
    return usePgPool(async (client) => {
      const query = `SELECT * FROM push_subscriptions WHERE username = $1`;
      return await client.query(query, [username]);
    });
  };

  const subscription = await getSubscription();

  const hasSubscription = subscription.rows.length > 0;
  if (hasSubscription) return subscription.rows[0].subscription;

  const vapidKeys = webpush.generateVAPIDKeys();

  const setSubscription = async () => {
    return await usePgPool(async (client) => {
      const query = `INSERT INTO push_subscriptions(username, subscription, phone_num) VALUES($1, $2, $3)`;
      await client.query(query, [username, vapidKeys.privateKey, phoneNum]);
    });
  };
  await setSubscription();

  return vapidKeys.publicKey;
}

// Database Schema
// CREATE TABLE push_subscriptions(
//   username TEXT NOT NULL PRIMARY KEY,
//   phone_num TEXT NOT NULL CHECK(LENGTH(phone_num) = 11),
//   subscription TEXT NOT NULL,
//   createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
// );
