import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LineTodayLogo from '../assets/lineTodayLogo'

const Header = ({ categoryList, location }) => {
  // { categoryList, location, match }
  useEffect(() => {
    console.log(categoryList, location)
  }, [categoryList, location])

  return <div className='d-flex flex-column'>
    <LineTodayLogo width={200} height={50}></LineTodayLogo>
    <div>
      {categoryList && categoryList.map(category => (
        <Link to={`/${category}`}>
          <button className={category === location.pathname.replace('/', '') && 'btn-success'}>{category}</button>
        </Link>
      ))}
    </div>
    <Link to='/bookmarks'><button>Bookmark List</button></Link>
  </div>
}

export default Header