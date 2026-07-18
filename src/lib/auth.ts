import dns from "dns";

// Override DNS servers to prevent querySrv ECONNREFUSED issues on certain networks/Windows setups
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("SkillForge-AI")),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "student",
        nullable: false,
      },
    },
  },
});
