import React from 'react'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message }) => {
    return (
        <small className={styles.error}>{message}</small>
    )
}

export default ErrorMessage
