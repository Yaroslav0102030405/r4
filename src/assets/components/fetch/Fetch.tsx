// import { useState, useEffect } from 'react'

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

import { useState, useEffect } from 'react'

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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Fetch
