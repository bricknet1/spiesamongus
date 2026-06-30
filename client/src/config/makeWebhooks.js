/** Make.com webhook URLs — single source of truth for mission begin/cancel flows. */

const MAKE_API_KEY = process.env.REACT_APP_MAKE_API_KEY || "";

/** Headers for Make.com custom webhook requests (includes optional X-Make-ApiKey auth). */
export function buildMakeWebhookHeaders() {
  return {
    "Content-Type": "application/json",
    ...(MAKE_API_KEY && { "X-Make-ApiKey": MAKE_API_KEY }),
  };
}

/** POST to a Make.com webhook with shared auth headers. */
export function callMakeWebhook(webhookUrl, body) {
  return fetch(webhookUrl, {
    method: "POST",
    headers: buildMakeWebhookHeaders(),
    body: JSON.stringify(body),
  });
}

export const MAKE_WEBHOOKS = {
  begin: {
    seattle: "https://hook.us2.make.com/zweduuziv6owv5i6seen5uijkn8fzu96",
    app: "https://hook.us1.make.com/b3ulba23rs4f3pbsj99b7ck4623uyzv6",
  },
  cancel: {
    seattle: "https://hook.us2.make.com/2ewvli72lociajqsgkb2iw0owxuhrnnw",
    app: "https://hook.us1.make.com/7v75ikxoeoo61lykx6776cv3au0fc5op",
  },
  actorRoles: {
    app: "https://hook.us1.make.com/4mhbii583tfjy1hawy3e1cm6b7vbcdf7",
    seattle: "https://hook.us2.make.com/mn4dy1oz715lxowe9si1utly8kvjgdon",
  },
};

/** @param {"begin" | "cancel" | "actorRoles"} action */
export function getMakeWebhookUrl(action, subdomain) {
  const region = subdomain === "seattle" ? "seattle" : "app";
  return MAKE_WEBHOOKS[action]?.[region] ?? null;
}

export function toLowerFirstName(name) {
  if (!name) return "";
  return String(name).trim().split(/\s+/)[0].toLowerCase();
}

/** Build Make.com payload for actor role updates (Marble actors paired with Handler). */
export function buildActorRolesWebhookPayload(actorRoles) {
  if (!actorRoles || typeof actorRoles !== "object") return [];

  const handlerName = Object.keys(actorRoles).find(
    (actor) => actorRoles[actor] === "Handler"
  );
  const handler = handlerName ? toLowerFirstName(handlerName) : "";

  return Object.entries(actorRoles)
    .filter(([, role]) => role === "Marble")
    .map(([actor]) => ({
      actor: toLowerFirstName(actor),
      handler,
    }));
}

export function notifyActorRolesChange(actorRoles, subdomain) {
  const webhookUrl = getMakeWebhookUrl("actorRoles", subdomain);
  if (!webhookUrl) return Promise.resolve();

  const payload = buildActorRolesWebhookPayload(actorRoles);
  return callMakeWebhook(webhookUrl, payload);
}
