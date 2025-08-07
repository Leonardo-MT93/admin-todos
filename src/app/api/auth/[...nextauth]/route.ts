import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { signInEmailPassword } from "@/auth/actions/auth-actions"

const { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } = process.env



export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID!,
      clientSecret: GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: GITHUB_ID!,
      clientSecret: GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "usuario@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        const user = await signInEmailPassword(credentials!.email ?? "", credentials!.password ?? "")
        return user
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? ""
        }
      })
      if(!dbUser?.isActive){
        throw new Error("User is not active")
      }
      if(dbUser){
        token.id = dbUser.id
        token.roles = dbUser.roles
      }
      return token
    },
    async session({ session, token, user }) {
      if(session && session.user){
        session.user.id = token.id as string
        session.user.roles = token.roles as string[]
      }

      return session
    }
  }
  

}

console.log(GITHUB_ID, GITHUB_SECRET)
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST};


