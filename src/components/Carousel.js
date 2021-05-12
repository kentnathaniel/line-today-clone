import { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import './Carousel.scss'

const LINE_IMAGE_PATH = 'https://obs.line-scdn.net/'

const CustomCarousel = ({ articles }) => {
  const [current, setCurrent] = useState(0)
  const length = articles.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  console.log(current)

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}></FaArrowAltCircleLeft>
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}></FaArrowAltCircleRight>
      {articles.map((article, index) => {
        const { id, publisher, thumbnail, title, url } = article
        return (
          <>
            <div key={index} className={index === current ? 'slide active' : 'slide'}>
              {index === current && <img className='image' src={`${LINE_IMAGE_PATH}/${article.thumbnail.hash}`} alt={article.title}></img>}
            </div>
            <div className={index === current ? 'slide-caption active' : 'slide-caption'}>
              <a href={url.url}>
                <h3>{title}</h3>
              </a>
            </div>
          </>
        )
      })}
    </section>
  )
}

export default CustomCarousel

{/* <_Carousel fade interval={2000}>
{articles.map(({ id, publisher, thumbnail, title, url }) => {
  let thumbnailPath = ''
  if (thumbnail) {
    thumbnailPath = `${LINE_IMAGE_PATH}${thumbnail.hash}/w580`
  }

  return <_Carousel.Item>
    <a href={url.url}>
      <img
        src={thumbnailPath}
        alt="First slide"
      />
    </a>
    <_Carousel.Caption>
      <a href={url.url}>
        <h3>{title}</h3>
      </a>
    </_Carousel.Caption>
  </_Carousel.Item>
})}
</_Carousel> */}