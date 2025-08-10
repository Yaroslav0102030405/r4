import Fetch from '../components/fetch/Fetch'
import Filter from '../components/filter/Filter'
import Pokemon from '../components/pokemon/Pokemon'

const About = () => {
  return (
    <>
      <h1>Про нас</h1>
      <Fetch />
      <Filter />
      <Pokemon />
    </>
  )
}

export default About
