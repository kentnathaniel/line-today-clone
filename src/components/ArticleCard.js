import './ArticleCard.scss'

const LINE_IMAGE_PATH = 'https://obs.line-scdn.net/'

const ArticleCard = ({ article, bookmarkList, toggleBookmarkHandler }) => {
  const { id, publisher, thumbnail, title, url } = article

  let isArticleBookmarked = false
  if (bookmarkList.length > 0) {
    isArticleBookmarked = bookmarkList.findIndex(bookmark => bookmark.id === id) >= 0
  }

  let thumbnailPath = ''
  if (thumbnail) {
    thumbnailPath = `${LINE_IMAGE_PATH}${thumbnail.hash}/w580`
  }

  return (
    <div className='article-card'>
      <a href={url.url}>
        <img
          className='thumbnail'
          alt={title}
          src={thumbnailPath} />
      </a>
      <div className='d-flex w-100 justify-content-between'>
        {publisher && <p>Publisher: {publisher}</p>}
        <button
          className={isArticleBookmarked ? 'btn-success' : null}
          onClick={() => toggleBookmarkHandler(article)}>
          Bookmark
      </button>
      </div>
      <a href={url.url}>
        <p>{title}</p>
      </a>
    </div>
  )
}

export default ArticleCard