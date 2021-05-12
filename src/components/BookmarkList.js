import './BookmarkList.scss'
import ArticleCard from './ArticleCard'

const BookmarkList = ({ bookmarkList, toggleBookmarkHandler }) => {
  let renderedList = (
    <h1>Sorry, currently you don't have any bookmarks</h1>
  )  

  if (bookmarkList.length > 0 ) {
    renderedList = (
      <>
        {bookmarkList.map(bookmark => {
          return <ArticleCard
            article={bookmark}
            bookmarkList={bookmarkList}
            toggleBookmarkHandler={toggleBookmarkHandler}>
          </ArticleCard>
        }
        )}
      </>
    )
  }
  
  return (
    <div className='d-flex flex-wrap justify-content-center'>
      <div className='bookmark-page-wrapper'>
        <div className='title-wrapper'>
          <h1>YOUR BOOKMARKS</h1>
        </div>
        <div className='articles-wrapper'>
          {renderedList}
        </div>
      </div>
    </div>
  )
}

export default BookmarkList