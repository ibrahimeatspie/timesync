import { v } from "convex/values";
import { action, mutation } from "./_generated/server";

export async function embed(text: string): Promise<number[]> {
  const key = process.env.OPENAI_KEY;
  if (!key) {
    throw new Error("OPENAI_KEY environment variable not set!");
  }
  const req = { input: text, model: "text-embedding-ada-002" };
  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(req),
  });
  if (!resp.ok) {
    const msg = await resp.text();
    throw new Error(`OpenAI API error: ${msg}`);
  }
  const json = await resp.json();
  const vector = json["data"][0]["embedding"];
  console.log(`Computed embedding of "${text}": ${vector.length} dimensions`);
  return vector;
}

export const schedule = action({
  args: {
    optimal: v.string(),
  },
  handler: async (ctx, args) => {
    const embedding = await embed(args.optimal);
    const results = await ctx.vectorSearch("events", "by_embedding", {
      vector: embedding,
      limit: 16,
    });
    return results;
  },
});

export const insert = mutation({
  args: {
    name: v.string(),
    user: v.string(),
    start: v.number(),
    end: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      title: args.name,
      user: args.user,
      embedding: await embed(`${args.start}-${args.end}`),
    });
  },
});
