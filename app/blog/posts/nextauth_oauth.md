---
title: "Setup OAuth with NextAuth , Prisma and Postgres"
date: "2024-10-23"
description: "Set up **NextAuth.js** in your **Next.js 13+ App Router** project with **Google**, **Discord**, and **GitHub OAuth**. Learn how to integrate **Prisma ORM** with **PostgreSQL**, configure OAuth providers, and manage database migrations for a seamless authentication system. Perfect for building secure, scalable apps."
author: "Shivam jain"
imageLink: "https://images.pexels.com/photos/28097263/pexels-photo-28097263/free-photo-of-water-texture-abstract-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
---

## Setting up NextAuth with Google, Discord, and GitHub OAuth , Prisma , Postgres .

### Step 1: Set up PostgreSQL Database Locally

First, create a `compose.yaml` file to define your PostgreSQL service:

```yaml
version: '3.8'

services:
  database:
    image: postgres:latest
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: pgdb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

To start the database:
- Run `docker-compose up` (for Docker users).
- Run `podman-compose up` (for Fedora/Podman users . if you have feodra it works like a charm , try podman[podman.io] out ! ).

Your database URL will look like this:

```plaintext
postgresql://admin:password@localhost:5432/pgdb
```

This is the DB URL : `postgresql://<user>:<password>@localhost:<port>/<dbname>`




### Step 2: Set Up Google OAuth

1. Visit [Google's API Dashboard](https://console.cloud.google.com/apis/dashboard) and create a new project.

![A screenshot of google's website API dashboard](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/gcloud_api_dashboard.png?raw=true)

2. In the project, navigate to the **Credentials** tab.

![A screenshot of google's oauth credentials tab](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/gcloud_api_cred.png?raw=true)


3. Click **Create Credentials** and select **OAuth client ID**.


![A ss of oauth ,click on create creds , click on oauth id](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/gcloud_api_step3.png?raw=true)

4. Under **Application type**, select **Web Application**.

![A ss of oauth ,click on Application type , click on website](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/gcloud_api_step4.png?raw=true)

5. Fill in the details:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`


![step 5](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/gcloud_api_step5.png?raw=true)

6. Copy the **Client ID** and **Client Secret**.

7. Create a `.env.local` file in your project root and add the following:

```env
GOOGLE_CLIENT_ID="Paste your Google client ID here"
GOOGLE_CLIENT_SECRET="Paste your Google client secret here"
```



### Step 3: Set Up Discord OAuth

1. Visit the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.

![Discord oauth home](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/discord_oauth_home.png?raw=true)

![Create application discord oauth](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/discord_oauth_create_app.png?raw=true)

2. Select the **OAuth2** tab.

![screenshot of clicking on oauth2 tab](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/discord_oauth2_tab.png?raw=true)

3. Under **Redirects**, add the following:
   - `http://localhost:3000/api/auth/callback/discord`

![alt text](https://github.com/shivam-jainn/shivamja.in/blob/e62e0bd21c409df7c52dd6ce877851cb1d141295/app/blog/posts/assets/nextauth_oauth/disc_redirectes.png?raw=true)

4. Copy the **Client ID** and **Client Secret**.

5. Add the following to your `.env.local` file:

```env
DISCORD_CLIENT_ID="Paste your Discord client ID here"
DISCORD_CLIENT_SECRET="Paste your Discord client secret here"
```


### Step 4: Set Up GitHub OAuth (Optional)

1. Visit [GitHub Developer Settings](https://github.com/settings/developers) and create a new OAuth application.

2. Fill out the following details:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

3. Copy the **Client ID** and **Client Secret**.

4. Add the following to your `.env.local` file:

```env
GITHUB_CLIENT_ID="Paste your GitHub client ID here"
GITHUB_CLIENT_SECRET="Paste your GitHub client secret here"
```

---

### Final `.env.local` File Example:

```env
GOOGLE_CLIENT_ID="Paste your Google client ID here"
GOOGLE_CLIENT_SECRET="Paste your Google client secret here"

DISCORD_CLIENT_ID="Paste your Discord client ID here"
DISCORD_CLIENT_SECRET="Paste your Discord client secret here"

GITHUB_CLIENT_ID="Paste your GitHub client ID here"
GITHUB_CLIENT_SECRET="Paste your GitHub client secret here"

DATABASE_URL="postgresql://admin:password@localhost:5432/pgdb"
```

### Step 5: Set Up NextAuth in Your Application

Install the necessary dependencies:

```bash
npm install next-auth
```

### Step 6: Setting Up Prisma with NextAuth

To configure Prisma with your NextAuth setup, follow the steps below:

1. **Install Prisma and the Prisma adapter:**

Run the following commands to install Prisma and its client, along with the NextAuth Prisma adapter:

```bash
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

2. **Initialize Prisma:**

Run the following command to initialize Prisma in your project:

```bash
npx prisma init
```

This will create a `prisma` folder with a `schema.prisma` file and a `.env` file.

### Step 7: Modify Prisma Schema

In the `prisma/schema.prisma` file, modify it to define the `User`, `Account`, `Session`, and `VerificationToken` models as needed by NextAuth:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId])
}

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@id([identifier, token])
}

// Optional for WebAuthn support
model Authenticator {
  credentialID         String  @unique
  userId               String
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([userId, credentialID])
}
```

### Step 8: Run Migrations

Once the schema is set, you'll need to create and apply a migration to your database:

```bash
npx prisma migrate dev --name init
```

This will generate the necessary tables in your database based on the schema defined above.

### Step 9: Set Up Prisma Client and NextAuth

Now, you'll set up Prisma to avoid creating multiple instances across your project:

1. **Create a `prisma.ts` file:**

In your project, create a `prisma.ts` file to instantiate Prisma:

```ts
// prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

2. **Set up NextAuth with Prisma Adapter:**

In your `auth.ts` or `route.ts` file for NextAuth (using the Next.js 13.2 Route Handlers), initialize NextAuth with the Prisma adapter:

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
       GoogleProvider({          
          clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        authorization: {params: {scope: scopes.join(' ')}},
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      })
  ],
});

export { handler as GET, handler as POST };
```

### Final Steps

1. **Update the `.env` file**:

Ensure that your `.env` file has the correct database connection string:

```env
DATABASE_URL="postgresql://admin:password@localhost:5432/pgdb"
```

2. **Run the Development Server**:

After setting everything up, run your Next.js app:

```bash
npm run dev
```

Now your app is configured to use NextAuth with Google, Discord, GitHub OAuth, and Prisma ORM with PostgreSQL.