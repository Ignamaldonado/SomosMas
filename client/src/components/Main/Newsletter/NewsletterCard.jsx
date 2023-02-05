import React from 'react'
import s from './NewsletterCard.module.css'
import CustomButton from '../../CustomButton/CustomButton'

const NewsletterCard = ({ name, img, text, url }) => {
  const plainText = text.replaceAll(/<[^>]+>/g, '').slice(0, 200)

  return (
    <div className={s.card_container}>
        <div className={s.img_container}>
            <img className={s.new_img} src={img} alt="Not found" width="150" height="150"/>
        </div>
        <div className={s.info_container}>
            <div className={s.preview_container}>
                <p className={s.new_text}>{plainText}</p>
            </div>
            <div className={s.new_button_card}>
                <CustomButton text='Ver novedad' customClass={s.new_button} href={`/novedades/${url}`} />
            </div>
        </div>
    </div>
  )
}

export default NewsletterCard