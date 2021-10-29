import useSWR from 'swr'
import { fetchRequest } from 'utils/fetch.util'

export default function useUser() {
  const { data } = useSWR('user/auth', fetchRequest.fetcherSWR)
  async function login(email: string, password: string) {
    let errorMessage = ''
    let successMessage = ''

    const response = await fetchRequest.post('/users/auth', { email, password })

    return {
      errorMessage,
      successMessage,
    }
  }

  return { login }
}
