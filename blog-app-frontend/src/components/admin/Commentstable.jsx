import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'

const Commentstable = ({comment,fetchComments}) => {

    const {blog,createdAt,_id} = comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const approveComment = async () =>{
        try {
            const {data} = await axios.post('/api/user/approve-comment',{id: _id});
            if(data.success){
                toast.success(data.message);
                fetchComments();
            }else{
                toast.error(data.message);

            }
        } catch (error) {
            toast.error(error.message);
            
        }
    }

    const deleteComment = async()=>{
        const confirm = window.confirm('Are you sure you want to delete this comment ?')
        if(!confirm)return
        try {
            const {data} = await axios.post('/api/user/delete-comment',{id:_id});
            if(data.success){
                toast.success(data.message);
                await fetchComments;
            }else{
                toast.error(data.message);

            }

        } catch (error) {
            toast.error(error.message);
            
        }
    }

  return (
    <tr className='order-y border-gray-300'>
        <td className='px-6- py-4'>
            {/* //bold tag */}
            <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
            <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> : {comment.name}
            <br />
            <b className='font-medium text-gray-600'>Comments</b> : {comment.content}
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-4'>
                {!comment.isApproved ? 
                    <img src={assets.tick_icon} onClick={approveComment} className='w-5 hover:scale-110 transition-all cursor-pointer'/> : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
                }
                <img src={assets.bin_icon} onClick={deleteComment} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="" />
            </div>
        </td>
    </tr>
  )
}

export default Commentstable
