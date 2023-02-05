import React from "react"
import { Carousel } from 'react-responsive-carousel'
import PropTypes from "prop-types"

//styles
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import styles from "./Slider.module.css"

//icons
import { ArrowRightSquareFill, ArrowLeftSquareFill } from "react-bootstrap-icons"

const Slider = ({ images }) => {
    //custom prev arrow
    const arrowPrev = (onClickHandler, hasNext, label) => {
        return (
            hasNext && <ArrowLeftSquareFill size={32} onClick={onClickHandler} title={label} className={styles.arrowLeft} />
        )
    }

    //custom next arrow
    const arrowNext = (onClickHandler, hasNext, label) => {
        return (
            hasNext && <ArrowRightSquareFill size={32} onClick={onClickHandler} title={label} className={styles.arrowRight} />
        )
    }

    //slide with text
    const Slide = ({ image }) => {
        return (
            <div>
                <img className={styles.imgCarousel} src={image.imageUrl} alt={image.text} />
                <p className={styles.legend}>{image.text}</p>
            </div>
        )
    }

    return (
        <Carousel
            showThumbs={false}
            autoPlay={true}
            interval={4000}
            infiniteLoop
            showArrows
            showStatus={false}
            swipeable
            emulateTouch
            renderArrowPrev={arrowPrev}
            renderArrowNext={arrowNext}
            dynamicHeight={false}
        >
            {images.map((image, index) => <Slide image={image} key={`img-${index}`} />)}
        </Carousel>
    )
}

Slider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }))
}

export default Slider
