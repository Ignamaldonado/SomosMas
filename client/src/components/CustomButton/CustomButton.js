import React from 'react'
import Button from 'react-bootstrap/Button'
import styles from './CustomButton.module.css'

const CustomButton = ({ href, text, customClass }) => {
    return (
        <Button href={href} variant="outline-primary" className={customClass ? customClass : styles.button}>
            {text}
        </Button>
    )
}

export default CustomButton
