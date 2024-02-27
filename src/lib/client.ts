"use server";

import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { decode, encode } from "js-base64";

export const _fetch = async (path: string, payload: any = "") => {
  const headers: any = {
    "X-Requested-With": "XMLHttpRequest",
  };

  if (payload && !(payload instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(payload);
  }

  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body: payload,
  });
  console.log(res);

  // if (res.status === 200) {
  //   return res.json();
  // } else {
  //   const result = await res.json();
  //   return result.error;
  // }
};

export const getOrigin = (userAgent: string): any => {
  let origin = process.env.ORIGIN;

  const appRe = /^[a-zA-z0-9_.]+/;
  const match = userAgent.match(appRe);
  if (match) {
    // Check if UserAgent comes from a supported Android app.
    if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
      const package_names = process.env.ANDROID_PACKAGENAME.split(",").map(
        (name) => name.trim(),
      );
      const hashes = process.env.ANDROID_SHA256HASH.split(",").map((hash) =>
        hash.trim(),
      );
      const appName = match[0];
      for (let i = 0; i < package_names.length; i++) {
        if (appName === package_names[i]) {
          // We recognize this app, so use the corresponding hash.
          const octArray = hashes[i].split(":").map((h) => parseInt(h, 16));
          const androidHash = isoBase64URL.fromBuffer(
            octArray as unknown as Uint8Array,
          );
          origin = `android:apk-key-hash:${androidHash}`;
          break;
        }
      }
    }
  }

  return origin;
};

class Loading {
  progress: HTMLInputElement;
  constructor() {
    this.progress = document.querySelector("#username") as HTMLInputElement;
  }

  start() {
    this.progress.indeterminate = true;
    const inputs = document.querySelectorAll("input");
    if (inputs) {
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }

  stop() {
    this.progress.indeterminate = false;
    const inputs = document.querySelectorAll("input");
    if (inputs) {
      inputs.forEach((input) => {
        input.disabled = false;
      });
    }
  }
}

export const loading = new Loading();
