import React from 'react'
import styles from './Layout.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
