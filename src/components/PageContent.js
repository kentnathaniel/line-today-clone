import ArticleCard from "./ArticleCard"
import Carousel from './Carousel'
import './PageContent.scss'

const PageContent = ({ content, bookmarkList, toggleBookmarkHandler }) => {
  //Filter Empty Content
  const filteredContent = content.filter(subCategory => {
    return subCategory.articles.length > 0 && subCategory.articles[0].publishTimeUnix !== 0
  })

  //Algorithm for selecting with content to be shown inside carousel
  const subcategoryWithMostArticles = filteredContent.reduce((acc, subCategory) => {
    if (subCategory.articles.length > acc.articles.length) {
      return subCategory
    }
    return acc
  }, { articles: [] })

  const slicedArticle = subcategoryWithMostArticles.articles.length >= 10 ?
    subcategoryWithMostArticles.articles.slice(0, 9) :
    subcategoryWithMostArticles.articles.slice(0, subcategoryWithMostArticles.length)

  const subcategoryWithSlicedArticles = {
    ...subcategoryWithMostArticles,
    articles: slicedArticle
  }

  // if (subcategoryWithSlicedArticles) console.log(subcategoryWithSlicedArticles)

  return <div className='d-flex flex-wrap justify-content-center'>
    <Carousel
      articles={subcategoryWithSlicedArticles.articles}
    ></Carousel>
    {filteredContent.map(subcategory => {
      return (
        <div className='sub-category-container card'>
          <h1>{subcategory.tagline}</h1>
          <div className='d-flex flex-wrap justify-content-start'>
            {subcategory.articles.map(article => {
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