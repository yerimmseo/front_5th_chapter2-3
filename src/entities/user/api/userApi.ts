export const userApi = {
  fetchUsers: async () => {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()

    return data
  },

  fetchUserById: async (id: number) => {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()

    return data
  },
}
