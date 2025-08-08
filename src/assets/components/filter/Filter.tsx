import React, { useState, useEffect, useMemo, useCallback } from 'react'
import debounce from 'lodash.debounce'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const Filter = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filterText, setFilterText] = useState<string>('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data: Post[] = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // 1. Використовуємо useCallback, щоб мемоізувати функцію filterData
  // Вона буде змінюватися лише тоді, коли зміниться posts
  const filterData = useCallback(
    (text: string) => {
      const filteredData = posts.filter((post) =>
        post.title.toLowerCase().includes(text.toLowerCase()),
      )
      setFilteredPosts(filteredData)
    },
    [posts],
  )

  // 2. Тепер useMemo може безпечно посилатися на filterData
  // Залежність [filterData] тепер стабільна
  const debouncedFilter = useMemo(() => {
    return debounce(filterData, 300)
  }, [filterData])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setFilterText(text)
    debouncedFilter(text)
  }

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список постів</h1>
      <input
        type="text"
        placeholder="Фільтрувати за назвою..."
        value={filterText}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
      />
      <div>
        {filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map((post) => (
              <li
                key={post.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>Нічого не знайдено.</div>
        )}
      </div>
    </div>
  )
}

export default Filter
