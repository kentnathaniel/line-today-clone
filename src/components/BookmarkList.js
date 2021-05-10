const THUMBNAIL_PATH = 'https://obs.line-scdn.net/'

const BookmarkList = ({ bookmarkList, toggleBookmarkHandler }) => {
  return (
    <div className='d-flex card'>
      <h1>Bookmarked Pages :</h1>
      <div className='d-flex card flex-row'>
        {bookmarkList.map(bookmark => {
          const { publisher, thumbnail, title, url } = bookmark
          return (
            <div className='card m-1' style={{ width: '20%' }}>
              {/* {console.log(url)} */}
              {url && <a href={url.url}>
                {thumbnail && <img alt={title} style={{ width: '100%', height: '250px', backgroundSize: 'cover' }} className='' src={`${THUMBNAIL_PATH}${thumbnail.hash}/w580`} />}
              </a>}
              {publisher && <p>Publisher: {publisher}</p>}
              <a href={url.url}>
                <p>{title}</p>
              </a>
              <button className='btn-success' onClick={() => toggleBookmarkHandler(bookmark)}>Un-bookmark</button>
            </div>)
        }
        )}
      </div>
    </div>
  )
}

export default BookmarkList