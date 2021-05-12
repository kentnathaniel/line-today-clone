import ArticleCard from "./ArticleCard"
import Carousel from './Carousel'
import './PageContent.scss'

//Use this title if there is no title for the subcategory
const dummyTitle = [
  'ARTIKEL PILIHAN',
  'MUNGKIN KAMU SUKA',
  'CEK JUGA BERIKUT INI',
  'SPESIAL HANYA UNTUKMU',
  'FAVORIT SAAT INI',
  'JANGAN KETINGGALAN BERITA BERIKUT INI']

const PageContent = ({ content, bookmarkList, toggleBookmarkHandler }) => {
  //Filter Empty Content
  let filteredContent = content.filter(subCategory => {
    return subCategory.articles.length > 0 && subCategory.articles[0].publishTimeUnix !== 0
  })

  //Add Dummy Title to Subcategory with No Tagline
  let dummyIndex = 0
  filteredContent = filteredContent.map(subcategory => {
    let returnedSubcategory = subcategory

    if (!subcategory.tagline) {
      returnedSubcategory = {
        ...subcategory,
        tagline: dummyTitle[dummyIndex % dummyTitle.length]
      }
      dummyIndex++
    }
    return returnedSubcategory
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

  return <div className='d-flex flex-wrap justify-content-center'>
    <Carousel
      articles={subcategoryWithSlicedArticles.articles}
    ></Carousel>
    {filteredContent.map((subcategory, idx) => {
      console.log(subcategory)
      return (
        <div className='sub-category-container'>
          <div className='sub-category-title'><h1>{subcategory.tagline.toUpperCase()}</h1></div>
          <div className={`articles-wrapper type-${idx % 4}`}>
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