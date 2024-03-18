import { baseurl } from "@/constants/constants";

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

export async function getCredentials() {
  navigator.credentials.get({
    publicKey: {
      challenge: new Uint8Array(32),
      allowCredentials: [
        {
          id: new Uint8Array(32),
          type: "public-key",
        },
      ],
    },
  });
}

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

  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  if (options.excludeCredentials.length) {
    for (let cred of options.excludeCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }

  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  const credential = {};
  credential.id = cred?.id;
  credential.rawId = base64url.encode(cred.rawId);
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

export async function authenticate(conditional = false) {
  const res = await fetch(`${baseurl}/api/auth/signinRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "same-origin",
  });
  const options = (await res.json()).options;

  options.challenge = base64url.decode(options.challenge);
  options.allowCredentials = [];

  const cred = await navigator.credentials.get({
    publicKey: options,
    // 사용자가 이전에 저장한 인증 정보가 있는 경우에만 인증 정보를 선택할 수 있는 선택지를 주는 것 = 'conditional'
    // 사용자가 이전에 저장한 인증 정보가 없어도 인증을 진행할 수 있게 하는 것 = 'optional'
    mediation: conditional ? "conditional" : "optional",
  });
  console.log(cred);

  const credential = {};
  credential.id = cred.id;
  credential.type = cred.type;
  credential.rawId = base64url.encode(cred.rawId);

  const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
  const authenticatorData = base64url.encode(cred.response.authenticatorData);
  const signature = base64url.encode(cred.response.signature);
  const userHandle = base64url.encode(cred.response.userHandle);

  credential.response = {
    clientDataJSON,
    authenticatorData,
    signature,
    userHandle,
  };

  return "user";
  // return await fetch(`${baseurl}auth/signinResponse`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //   },
  //   body: JSON.stringify({ credential }),
  //   method: "POST",
  //   credentials: "same-origin",
  // });
}
