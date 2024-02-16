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
  // public key에 대한 옵션
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };

  // console.log(navigator.credentials.create({ publicKey: "" }));
  // const options = await _fetch("/auth/registerRequest", opts);

  // options.user.id = decode(options.user.id);
  // options.challenge = decode(options.challenge);
};

const encodedString =
  "s%3AymI5D6dYsOO5EDeziFcd9sriBwy8fXsr.ZC%2FcOD7r0%2FFK%2FnhjUUSpBuYPglNwK0ZnDXLhrBTT3yc";
const decodedString = decodeURIComponent(encodedString);
console.log(decodedString);

// const base64DecodedString = atob(decodedString.slice(2));

// console.log(base64DecodedString);
// 서버에서 받는 옵션의 예시
// {
//   "rp": {
//     "name": "WebAuthn Codelab",
//     "id": "webauthn-codelab.glitch.me"
//   },
//   "user": {
//     "displayName": "User Name",
//     "id": "...",
//     "name": "test"
//   },
//   "challenge": "...",
//   "pubKeyCredParams": [
//     {
//       "type": "public-key",
//       "alg": -7
//     }, {
//       "type": "public-key",
//       "alg": -257
//     }
//   ],
//   "timeout": 1800000,
//   "attestation": "none",
//   "excludeCredentials": [
//     {
//       "id": "...",
//       "type": "public-key",
//       "transports": [
//         "internal"
//       ]
//     }
//   ],
//   "authenticatorSelection": {
//     "authenticatorAttachment": "platform",
//     "userVerification": "required"
//   }
// }

// csrf와 session을
// router.post("/registerRequest", csrfCheck, sessionCheck, async (req, res) => {
//   const username = req.session.username;
//   const user = Users.findByUsername(username);
//   try {
//     const excludeCredentials = [];
//     if (user.credentials.length > 0) {
//       for (let cred of user.credentials) {
//         excludeCredentials.push({
//           id: isoBase64URL.toBuffer(cred.credId),
//           type: "public-key",
//           transports: ["internal"],
//         });
//       }
//     }
//     const pubKeyCredParams = [];
//     // const params = [-7, -35, -36, -257, -258, -259, -37, -38, -39, -8];
//     const params = [-7, -257];
//     for (let param of params) {
//       pubKeyCredParams.push({ type: "public-key", alg: param });
//     }
//     const as = {}; // authenticatorSelection
//     const aa = req.body.authenticatorSelection.authenticatorAttachment;
//     const rr = req.body.authenticatorSelection.requireResidentKey;
//     const uv = req.body.authenticatorSelection.userVerification;
//     const cp = req.body.attestation; // attestationConveyancePreference
//     let asFlag = false;
//     let authenticatorSelection;
//     let attestation = "none";

//     if (aa && (aa == "platform" || aa == "cross-platform")) {
//       asFlag = true;
//       as.authenticatorAttachment = aa;
//     }
//     if (rr && typeof rr == "boolean") {
//       asFlag = true;
//       as.requireResidentKey = rr;
//     }
//     if (uv && (uv == "required" || uv == "preferred" || uv == "discouraged")) {
//       asFlag = true;
//       as.userVerification = uv;
//     }
//     if (asFlag) {
//       authenticatorSelection = as;
//     }
//     if (cp && (cp == "none" || cp == "indirect" || cp == "direct")) {
//       attestation = cp;
//     }

//     const options = await generateRegistrationOptions({
//       rpName: RP_NAME,
//       rpID: process.env.HOSTNAME,
//       userID: user.id,
//       userName: user.username,
//       timeout: TIMEOUT,
//       // Prompt users for additional information about the authenticator.
//       attestationType: attestation,
//       // Prevent users from re-registering existing authenticators
//       excludeCredentials,
//       authenticatorSelection,
//     });

//     req.session.challenge = options.challenge;

//     // Temporary hack until SimpleWebAuthn supports `pubKeyCredParams`
//     options.pubKeyCredParams = [];
//     for (let param of params) {
//       options.pubKeyCredParams.push({ type: "public-key", alg: param });
//     }

//     return res.json(options);
//   } catch (e) {
//     return res.status(400).send({ error: e });
//   }
// });
