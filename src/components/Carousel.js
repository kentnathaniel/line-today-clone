import { useEffect, useState, useCallback } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import './Carousel.scss'

const LINE_IMAGE_PATH = 'https://obs.line-scdn.net/'

const Carousel = ({ articles }) => {
  const [current, setCurrent] = useState(0)
  const length = articles.length

  useEffect(() => {
    if (current > length - 1) {
      setCurrent(length - 1)
    }

    const timer = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [current, length])

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }, [setCurrent, current, length])

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }, [setCurrent, current, length])

  return (
    <section className='slider'>
      <div className='arrow-wrapper left'>
        <AiOutlineArrowLeft className='left-arrow' onClick={prevSlide}></AiOutlineArrowLeft>
      </div>
      <div className='arrow-wrapper right'>
        <AiOutlineArrowRight className='right-arrow' onClick={nextSlide}></AiOutlineArrowRight>
      </div>
      {articles.map((article, index) => {
        const { thumbnail, title, url } = article
        return (
          <>
            <a href={url.url} key={index} className={index === current ? 'slide active' : 'slide'}>
              {index === current && <img
                className='image'
                src={`${LINE_IMAGE_PATH}/${thumbnail.hash}/w580`}
                alt={title}></img>}
            </a>
            <a href={url.url} className={index === current ? 'slide-caption active' : 'slide-caption'}>
              <h3>{title}</h3>
            </a>
          </>
        )
      })}
      <div className='selector'>
        {articles.map((article, index) => {
          return (
            <div onClick={() => setCurrent(index)} className={index === current ? 'dots active' : 'dots'}>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Carousel