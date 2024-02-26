import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name: string
        id: string
        token: string
    }

    interface Session {
        user: {
            name: string
            email: string
            id: string
            sessionToken: string
            token: string
        }
    }
}