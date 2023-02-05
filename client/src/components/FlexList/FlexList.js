import React from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import FlexCard from './FlexCard'

const FlexList = ({ list, section }) => {
    return (
        <CardGroup>
            {list.map((item, index)=> <FlexCard key={index} item={item} section={section} /> )}
        </CardGroup>
    )
}

export default FlexList
