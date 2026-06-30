/** Make.com webhook calls — proxied through the Flask server so URLs and API keys stay server-side. */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/** POST to a Make.com scenario via the server proxy. */
export function callMakeWebhook(action, subdomain, body, { authToken } = {}) {
  const params = new URLSearchParams({
    subdomain: subdomain === "seattle" ? "seattle" : "app",
  });

  return fetch(`${API_URL}/api/make/${action}?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    body: JSON.stringify(body),
  });
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

export function notifyActorRolesChange(actorRoles, subdomain, authToken) {
  const payload = buildActorRolesWebhookPayload(actorRoles);
  return callMakeWebhook("actorRoles", subdomain, payload, { authToken });
}
