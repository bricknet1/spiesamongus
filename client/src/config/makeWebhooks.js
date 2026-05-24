/** Make.com webhook URLs — single source of truth for mission begin/cancel flows. */

export const MAKE_WEBHOOKS = {
  begin: {
    seattle: "https://hook.us2.make.com/zweduuziv6owv5i6seen5uijkn8fzu96",
    app: "https://hook.us1.make.com/b3ulba23rs4f3pbsj99b7ck4623uyzv6",
  },
  cancel: {
    seattle: "https://hook.us2.make.com/2ewvli72lociajqsgkb2iw0owxuhrnnw",
    app: "https://hook.us1.make.com/7v75ikxoeoo61lykx6776cv3au0fc5op",
  },
};

/** @param {"begin" | "cancel"} action */
export function getMakeWebhookUrl(action, subdomain) {
  const region = subdomain === "seattle" ? "seattle" : "app";
  return MAKE_WEBHOOKS[action][region];
}
