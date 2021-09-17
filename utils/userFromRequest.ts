// export async function userFromRequest(
//   req: IncomingMessage & { cookies: NextApiRequestCookies },
// ): Promise<User> {
//   const { auth: token } = req.cookies

//   if (!token) return undefined

//   try {
//     const data = jwt.verify(token, JWT_TOKEN_KEY)

//     if (!data) return undefined

//     const user = await prisma.user.findUnique({
//       where: { email: (data as any).email },
//     })

//     if (user) user.password = ''

//     return user
//   } catch (error) {
//     return undefined
//   }
// }
