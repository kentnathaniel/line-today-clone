import ArticleCard from "./ArticleCard"
import './PageContent.scss'

const PageContent = ({ content, bookmarkList, toggleBookmarkHandler }) => {
  //Filter Empty Content
  const filteredContent = content.filter(subCategory => {
    return subCategory.articles.length > 0 && subCategory.articles[0].publishTimeUnix !== 0
  })

  return <div className='d-flex flex-wrap justify-content-center'>
    {filteredContent.map(subCategory => {
      return (
        <div className='sub-category-container card'>
          <h1>{subCategory.tagline}</h1>
          <div className='d-flex flex-wrap justify-content-start'>
            {subCategory.articles.map(article => {
              return <ArticleCard
                article={article}
                bookmarkList={bookmarkList}
                toggleBookmarkHandler={toggleBookmarkHandler}>
              </ArticleCard>
            })
            }
          </div>
        </div>)
    })}
  </div>
}

export default PageContent