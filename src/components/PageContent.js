const THUMBNAIL_PATH = 'https://obs.line-scdn.net/'

const PageContent = ({ content, bookmarkList, toggleBookmarkHandler }) => {
  return <>
    {content.map(subCategory => {
      return subCategory.articles.length > 0 && subCategory.articles[0].publishTimeUnix !== 0 &&
        <div className='d-flex card flex-wrap'>
          {/* {console.log(subCategory)} */}
          <h1>{subCategory.tagline}</h1>

          <div className='d-flex flex-wrap'>{
            subCategory.articles.map(article => {
              // console.log(article)
              const { id, publisher, thumbnail, title, url } = article
              let isArticleBookmarked = false
              // console.log('test', bookmarkList)
              if (bookmarkList.length > 0) {
                isArticleBookmarked = bookmarkList.findIndex(bookmark => bookmark.id === id) >= 0
              }

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
                  <button className={isArticleBookmarked ? 'btn-success' : null} onClick={() => toggleBookmarkHandler(article)}>Bookmark</button>
                </div>

              )
            })
          }

          </div>)
        </div>
    })}
  </>
}

export default PageContent