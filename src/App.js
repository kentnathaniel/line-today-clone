import './App.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useActions } from './hooks/use-actions';
import PageContent from './components/PageContent';
import Header from './components/Header';
import { Redirect, Route, Switch } from 'react-router-dom'
import BookmarkList from './components/BookmarkList';

const App = ({ location }) => {
  const [bookmarkList, setBookmarkList] = useState([])
  const categoryData = useSelector(state => state.categoryData)
  const { fetchData } = useActions()

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
  </>
}

export default App;
