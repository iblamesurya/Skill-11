import { useMemo, useState } from 'react'
import LocalUserList from './LocalUserList'
import UserList from './UserList'
import FakePostList from './FakePostList'

const VIEWS = {
  local: 'local',
  usersApi: 'usersApi',
  fakeApi: 'fakeApi',
}

function Dashboard() {
  const [activeView, setActiveView] = useState(VIEWS.local)

  const content = useMemo(() => {
    if (activeView === VIEWS.local) {
      return <LocalUserList />
    }

    if (activeView === VIEWS.usersApi) {
      return <UserList />
    }

    return <FakePostList />
  }, [activeView])

  return (
    <main className="app">
      <h1 className="title">News Portal Data Dashboard</h1>
      <p className="subtitle">React API Integration: Local JSON, Fetch API, and Axios</p>

      <nav className="nav">
        <a
          href="#local-users"
          className={`nav-link ${activeView === VIEWS.local ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            setActiveView(VIEWS.local)
          }}
        >
          Local Users
        </a>

        <a
          href="#users-api"
          className={`nav-link ${activeView === VIEWS.usersApi ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            setActiveView(VIEWS.usersApi)
          }}
        >
          Users API
        </a>

        <a
          href="#fake-api-posts"
          className={`nav-link ${activeView === VIEWS.fakeApi ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            setActiveView(VIEWS.fakeApi)
          }}
        >
          Fake API Posts
        </a>
      </nav>

      {content}
    </main>
  )
}

export default Dashboard