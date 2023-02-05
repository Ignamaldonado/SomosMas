import React from 'react'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

//Social Icons
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'

const Contact = () => {
    //Organization data (redux)
	const organization = useSelector(store => store.organization)

	const text = [
		'<p>En <strong>SOMOS MÁS</strong> necesitamos el apoyo de todos.</p>',
		'<p>Si deseas <em>ser voluntario</em>, <em>realizar aportes</em>, o recibir mayor información sobre <strong>nuestro trabajo</strong>, puedes contactarnos mediante el siguiente formulario.<p>',
		'<p>O bien puedes hacerlo a través de</p>'
	]

	const thanksMessage = '<p>Desde ya, muchas gracias por ayudarnos ❤️</p>'

	//Social media icon
    //Add more if needed (first import it from 'react-bootstrap-icons')
    const SocialIcon = ({ socialName, size }) => {
        switch (socialName) {
            case 'Facebook':
                return <Facebook size={size} className={styles.icon} />
            case 'Instagram':
                return <Instagram size={size} className={styles.icon} />
            case 'Twitter':
                return <Twitter size={size} className={styles.icon} />
            default:
                return null
        }
    }

    const SocialLinks = () => {
        return (
            <div>
                <h3>Nuestras redes</h3>
                {organization.data.socialLinks.length > 0 && (
                    <ul>
                        {organization.data.socialLinks.map((social, index) => {
                            return (
                                <li key={`social-${index}`}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                                        <SocialIcon socialName={social.name} size={36} />
                                        {' '}{social.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

	return (
		<div className={styles.container}>
			<h1>Contáctate con Nosotros</h1>
			<div className={styles.row}>
				<div className={styles.column}>
					{text.map(text => parse(text))}
					{organization.data && <SocialLinks />}
					{parse(thanksMessage)}
				</div>
				<h3 className={styles.formText}>Formulario de contacto</h3>
				<ContactForm />
			</div>
		</div>
	)
}

export default Contact
