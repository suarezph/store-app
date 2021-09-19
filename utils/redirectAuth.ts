export default function redirectAuth(user: any) {
  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return
}
