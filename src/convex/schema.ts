import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    user: v.string(),
    title: v.string(),
    embedding: v.array(v.float64()),
  })
    .index("by_user", ["user"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 512,
    }),
});
