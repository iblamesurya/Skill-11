import { useEffect, useState } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Unable to load users from JSONPlaceholder.')
        }

        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Something went wrong while loading users API.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <section className="panel">
      <h2 className="section-title">Users API (JSONPlaceholder)</h2>

      {loading && <p className="status">Loading users API...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id} className="list-item">
              <strong>{user.name}</strong>
              <p className="meta">Email: {user.email}</p>
              <p className="meta">Phone: {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default UserList