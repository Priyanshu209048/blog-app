import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadAllCategories().then(data => {
            setCategories([...data])
        }).catch((error) => {
            console.error(error)
            toast.error("Error in loading categories")
        })
    }, [])

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
                    All blogs
                </ListGroupItem>
                {
                    categories && categories.map((cat, index) => {
                        return (
                            <ListGroupItem tag={Link} to={"/categories/" + cat.categoryId} className='border-0 shadow-0 mt-1' key={index} action={true}>
                                {cat.categoryName}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default CategorySideMenu