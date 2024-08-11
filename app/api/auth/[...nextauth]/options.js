import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: "Ov23liBIjOWKnBdOFCPj",
            clientSecret: "1e105ba10b5b1e7c5406c14fbf37fb8723970f3f",
        }),
        GoogleProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)

                const users = [
                    { id: 1, name: 'J Smith', email: 'jsmith@example.com', password: "hello", role: "admin" },
                    { id: 2, name: 'hari', email: 'jsmith@example.com', password: "hello", role: "user" }
                ]

                const findUser = users.find((user) => user.name === credentials.username && user.password === credentials.password)

                if (findUser?.name) {
                    return findUser
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            console.log(token)

            if (token) {
                session.user.id = token.sub
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        }

    },
    secret: "hello",
    pages: {
        signIn: "/login"
    }
}
