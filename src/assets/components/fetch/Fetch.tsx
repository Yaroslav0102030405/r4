// import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { useState, useEffect } from 'react'

// // Інтерфейс для користувачів
// interface User {
//   id: number
//   name: string
//   username: string
//   email: string
//   phone: string
// }

// // Інтерфейс для постів
// interface Post {
//   userId: number
//   id: number
//   title: string
//   body: string
// }

// const Fetch = () => {
//   const [users, setUsers] = useState<User[]>([])
//   const [post, setPosts] = useState<Post[]>([])

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           'https://jsonplaceholder.typicode.com/users',
//         )
//         const data: User[] = await response.json()
//         setUsers(data)
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       }
//     }
//     fetchUsers()
//   }, [])
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <h3>{user.name}</h3>
//             <p>{user.username}</p>
//             <p>{user.email}</p>
//             <p>{user.phone}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }

// export default Fetch

// Інтерфейс для користувачів
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

// Інтерфейс для постів
interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Todos {
  id: number
  title: string
}

const Fetch = () => {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [todos, setTodos] = useState<Todos[]>([])

  const [activeButtonId, setActiveButtonId] = useState<string | null>(null)

  const handleButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLElement

    if (targetElement.tagName === 'BUTTON') {
      console.log('Клік на кнопку з ID:', targetElement.id)
      setActiveButtonId(targetElement.id)
    } else {
      setActiveButtonId(null)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse, todosResponse] = await Promise.all(
          [
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/todos'),
          ],
        )

        if (!usersResponse.ok || !postsResponse.ok || !todosResponse.ok) {
          throw new Error('Один або кілька запитів не вдалися')
        }
        const usersData: User[] = await usersResponse.json()
        const postsData: Post[] = await postsResponse.json()
        const todosData: Todos[] = await todosResponse.json()

        const soretedUsers = [...usersData].sort((a, b) =>
          a.name.localeCompare(b.name),
        )

        const sortedPosts = [...postsData].sort((a, b) =>
          a.title.localeCompare(b.title),
        )

        const sortedTodos = [...todosData].sort((a, b) =>
          a.title.localeCompare(b.title),
        )

        setUsers(soretedUsers)
        setPosts(sortedPosts)
        setTodos(sortedTodos)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <h2>Користувачі</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
      <h1>Пости</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <h1>Todos</h1>
      <table>
        <thead>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
            </tr>
          ))}
        </thead>
      </table>

      <div onClick={handleButtonClick}>
        <button
          id="btn-1"
          className={activeButtonId === 'btn-1' ? 'active' : ''}
        >
          Кнопка 1
        </button>
        <button
          id="btn-2"
          className={activeButtonId === 'btn-2' ? 'active' : ''}
        >
          Кнопка 2
        </button>
        <button
          id="btn-3"
          className={activeButtonId === 'btn-3' ? 'active' : ''}
        >
          Кнопка 3
        </button>
      </div>
    </>
  )
}

export default Fetch
