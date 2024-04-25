import bolt from "npm:@slack/bolt";

const { SLACK_BOT_TOKEN = "", SLACK_SIGNING_SECRET = "" } = Deno.env.toObject();

const app = new bolt.App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
});

app.event("app_mention", async (c) => {
  await c.say(`Pong! ${c.event.text}`);
});

await app.start();
