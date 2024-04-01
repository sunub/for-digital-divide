import React from 'react';
import KeyLayout from './Keylayout';
import { baseurl } from '@/constants/constants';

async function getPadInfo() {
  const response = await fetch(`${baseurl}/api/keypad`);
  const data = await response.json();
  return data;
}

async function Page() {
  const padInfo = await getPadInfo();

  return <KeyLayout padInfo={padInfo} />;
}

export default Page;
