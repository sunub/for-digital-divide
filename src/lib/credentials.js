import { decode } from "js-base64";

const base64url = {
  encode: function (buffer) {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  },
  decode: function (base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const binStr = window.atob(base64);
    const bin = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bin[i] = binStr.charCodeAt(i);
    }
    return bin.buffer;
  },
};

export async function createCredentials() {
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };

  const res = await fetch("/api/registerRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ opts }),
    credentials: "same-origin",
  });
  const json = await res.json();
  const options = json.options;

  if (options.excludeCredentials.length) {
    for (let cred of options.excludeCredentials) {
      cred.id = decode(cred.id);
    }
  }

  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  const credential = {};
  credential.id = cred?.id;
  credential.rawId = cred?.rawId;
  credential.type = cred?.type;

  if (cred.response) {
    const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
    const attestationObject = base64url.encode(cred.response.attestationObject);
    credential.response = {
      clientDataJSON,
      attestationObject,
    };
  }

  localStorage.setItem("credId", credential.id);

  return await fetch("/api/registerResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ credential }),
    credentials: "same-origin",
  });
}
