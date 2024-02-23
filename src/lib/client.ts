"use server";

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

export const registerCredential = async () => {
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };

  await fetch("http://localhost:3000/api/registerRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "same-origin",
    body: JSON.stringify(opts),
  });

  // options.user.id = decode(options.user.id);
  // options.challenge = decode(options.challenge);

  // if (options.excludeCredentials.length > 0) {
  //   for (let cred of options.excludeCredentials) {
  //     cred.id = decode(cred.id);
  //   }
  // }

  // const cred = await navigator.credentials.create({
  //   publicKey: options as PublicKeyCredentialCreationOptions,
  // });
  // console.log(cred);
  // const credential = {};
  // credential.id = cred.id;
  // credential.type = cred.type;
  // credential.rawId = base64url.encode(cred.rawId);

  // if (cred.response) {
  //   const clientDataJSON =
  //     base64url.encode(cred.response.clientDataJSON);
  //   const authenticatorData =
  //     base64url.encode(cred.response.authenticatorData);
  //   const signature =
  //     base64url.encode(cred.response.signature);
  //   const userHandle =
  //     base64url.encode(cred.response.userHandle);
  //   credential.response = {
  //     clientDataJSON,
  //     authenticatorData,
  //     signature,
  //     userHandle,
  //   };
  // }
};
