import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// dynamic route handler
export default NextAuth({ // a component?
  providers: [ // an array
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // fields
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  // all requests to callback will be handled by NextAuth
  callbacks: { // what is a callback?
    // functions running in parallel with other functions
    async signIn ({ account, profile }) {
      if (account.provider === 'google') {
        return profile.email_verified && profile.email.endsWith('@hackbeanpot.com')
      }
      return false
    },
    async jwt ({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
  secret: process.env.JWT_SECRET
})
