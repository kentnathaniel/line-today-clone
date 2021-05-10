import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ categoryList, location }) => {
  // { categoryList, location, match }
  useEffect(() => {
    console.log(categoryList, location)
  }, [categoryList, location])

  return <div>
    <img></img>
    {categoryList && categoryList.map(category => (
      <Link to={`/${category}`}>
        <button className={category === location.pathname.replace('/', '') && 'btn-success'}>{category}</button>
      </Link>
    ))}
    <Link to='/bookmarks'><button>Bookmark List</button></Link>
  </div>
}

export default Header