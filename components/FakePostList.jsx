import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

function FakePostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('all')

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get('https://dummyjson.com/posts')
      setPosts(response.data.posts || [])
    } catch (err) {
      setError(err.message || 'Something went wrong while loading posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const userIds = useMemo(() => {
    const unique = [...new Set(posts.map((post) => post.userId))]
    return unique.sort((a, b) => a - b)
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (selectedUserId === 'all') {
      return posts
    }

    return posts.filter((post) => String(post.userId) === selectedUserId)
  }, [posts, selectedUserId])

  return (
    <section className="panel">
      <h2 className="section-title">Fake API Posts (DummyJSON + Axios)</h2>

      <div className="row">
        <label htmlFor="userFilter">Filter by User ID:</label>
        <select
          id="userFilter"
          className="select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="all">All Users</option>
          {userIds.map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>

        <button type="button" className="button" onClick={fetchPosts}>
          Refresh
        </button>
      </div>

      {loading && <p className="status">Loading fake API posts...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <ul className="list">
          {filteredPosts.map((post) => (
            <li key={post.id} className="list-item">
              <strong>{post.title}</strong>
              <p className="meta">User ID: {post.userId}</p>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FakePostList