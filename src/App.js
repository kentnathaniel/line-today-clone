import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useActions } from './hooks/use-actions';
import PageContent from './components/PageContent';
import Header from './components/Header';
import { Redirect, Route, Switch } from 'react-router-dom'
import BookmarkList from './components/BookmarkList';
import Footer from './components/Footer';
import { css } from '@emotion/react'
import { GridLoader } from 'react-spinners'

const spinnerStyling = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`

const App = ({ location }) => {
  const [bookmarkList, setBookmarkList] = useState([])
  const categoryData = useSelector(state => state.categoryData)
  const loading = useSelector(state => state.loading)
  const { fetchData } = useActions()

  useEffect(() => {
    window.scroll(0, 0)
  }, [location])

  //Lifecycle Hook when First Render The Page
  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const parsedLocalStorage = JSON.parse(localStorage.getItem('bookmarkList'))
    if (parsedLocalStorage) {
      setBookmarkList(parsedLocalStorage)
    }
  }, [])

  const toggleBookmarkHandler = (article) => {
    const isArticleBookmarked = bookmarkList.findIndex(bookmark => bookmark.id === article.id) >= 0
    let bookmarkToBeStore = [...bookmarkList, article]

    //Un-bookmarked
    if (isArticleBookmarked) {
      bookmarkToBeStore = bookmarkList.filter(bookmark => bookmark.id !== article.id)
    }

    setBookmarkList(bookmarkToBeStore)
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkToBeStore))
  }


  return <>
    <GridLoader css={spinnerStyling} color='aqua' loading={loading}></GridLoader>

    { categoryData && <>
      <Header
        location={location}
        categoryList={Object.keys(categoryData)}>
      </Header>
    </>}
    <Switch>
      {location.pathname === '/' && <Redirect to='/top'></Redirect>}
      <Route
        path='/bookmarks'
        exact
        render={() => <BookmarkList toggleBookmarkHandler={toggleBookmarkHandler} bookmarkList={bookmarkList}></BookmarkList>}>
      </Route>
      {categoryData && <Route
        path='/'
        render={() => <PageContent toggleBookmarkHandler={toggleBookmarkHandler} bookmarkList={bookmarkList} content={categoryData[location.pathname.replace('/', '')]}></PageContent>}>
      </Route>}
    </Switch>
    { categoryData && <Footer></Footer>}
  </>
}

export default App;
