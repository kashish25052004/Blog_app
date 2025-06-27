import React from 'react'
import { useNavigate } from 'react-router-dom';

const Blogcard = ({blog}) => {
    const {title, description,category, image, _id} = blog;
   
    // Destructure the blog object to extract relevant properties
    const navigate = useNavigate();
    // Initialize the useNavigate hook to programmatically navigate to a different route
    function handleBlogCardClick() {
        // Navigate to the blog details page when the card is clicked
        navigate(`/blog/${_id}`);
    }

  return (
    <div onClick={handleBlogCardClick} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
        <img src={image} alt="" className='aspect-video' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5'>
            {/* {title} */}
            <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600'>{description.replace(/<[^>]*>/g, '').slice(0,80)}...</p>
        </div>
    </div>
  )
}

export default Blogcard
