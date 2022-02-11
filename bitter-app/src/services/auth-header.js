export default function authHeader() {
  const account = JSON.parse(localStorage.getItem('account'))

  if (account && account.token) {
    return { 'x-access-token': account.token }
  }

  return {}
}