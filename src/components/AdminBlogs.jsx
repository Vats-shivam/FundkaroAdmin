import React from 'react'
import { useState } from 'react'
import CreateBlog from './CreateBlog'
import PreviewBlog from './PreviewBlog'

function AdminBlogs() {
  const [ previewblog, SetPreviewBlogs ] = useState(false);

  const [ blog, SetBlog ] = useState({
      title:"",
      author:"",
      profession:"",
      photo:null,
      description:"",
      content:"",
      date:"",
      ph:100,
      pw:100,
  })

  return (
    <div>
    <div className='flex flex-wrap flex-col justify-center items-center'>
      <div>Admin Blogs</div>
      <div className='flex flex-wrap gap-x-2'>
          <button className='p-3 border' onClick={()=>{SetPreviewBlogs(false)}}>Create Blog</button>
          <button className='p-3 border' onClick={()=>{
            SetPreviewBlogs(true)
            var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            SetBlog({...blog,date:date});
          }}>Preview Blogs</button>
      </div>
    </div>
    <div className='pt-10'>
      {!previewblog ? <CreateBlog blog={blog} SetBlog={SetBlog}/>:<PreviewBlog blog={blog}/>}
      </div>
    </div>
  )
}

export default AdminBlogs