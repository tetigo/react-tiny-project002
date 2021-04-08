import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import Error from './Error'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const [error, setError] = useState(false)

  const removeTour = (id) => {
    const newTours = tours.filter((cada) => cada.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setLoading(true)
    try {
      const data = await fetch(url)
      if (data.status > 400) throw new Error(data.statusText)
      const tours = await data.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTours()
  }, [])
  if (loading)
    return (
      <main>
        <Loading />
      </main>
    )
  if (error)
    return (
      <main>
        <Error />
      </main>
    )
  if (tours.length === 0)
    return (
      <main className="title">
        <div>
          <h2>No Tours Left</h2>
        </div>
        <button className="btn" onClick={fetchTours}>
          Refresh
        </button>
      </main>
    )
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
