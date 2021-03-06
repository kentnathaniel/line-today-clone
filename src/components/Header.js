import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LineTodayLogo from '../assets/LineTodayLogo'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css';
import './Header.scss'

const Header = ({ categoryList, location }) => {
  const categoryTitle = useSelector(state => state.categoryTitle)

  return (
    <>
      <div className='header'>
        <Link to='/' className='logo-wrapper'>
          <LineTodayLogo color='white' width={150} height={50}></LineTodayLogo>
        </Link>
        <Link to='/bookmarks'>
          <button className='bookmark-button'>Your Bookmarks</button>
        </Link>
      </div>
      <Swiper
        slidesPerView={'auto'}>
        {categoryList && categoryList.map(category => {
          const isCategorySelected = category === location.pathname.replace('/', '')
          const categoryStyleClass = isCategorySelected ? 'selected-category' : ''
          return (
            <SwiperSlide>
              <Link className={categoryStyleClass} to={`/${category}`}>
                <p
                  className={categoryStyleClass}>
                  {categoryTitle[category]}
                </p>
              </Link>
            </SwiperSlide>)
        }
        )}
      </Swiper>
    </>
  )
}

export default Header