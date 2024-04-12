import React from 'react'
import { useState } from 'react'
import CreateBlog from './CreateBlog'
import PreviewBlog from './PreviewBlog'
import axios from 'axios';
import toast, { ToastBar } from 'react-hot-toast';


function AdminBlogs() {
  const [previewblog, SetPreviewBlogs] = useState(false);

  const [blog, SetBlog] = useState({
    title: "",
    author: "",
    profession: "",
    coverPhoto: { preview: null, base64: null },
    blogPhotos: [],
    description: "",
    content: "",
    date: "",
    ph: 500,
    pw: 500,
  })
  const updateImages = ()=>{
    
  }
  const HandleBlogPost =async (e) => {
    e.preventDefault();
    var today = new Date(),
      date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    SetBlog({ ...blog, date: date })
    var error = false;
    var field = '';
    for (var i in blog) {
      if (i === 'coverPhoto' || i === 'blogPhotos') {
        continue;
      }
      if (blog[i] === '') {
        error = true;
        field = i;
        break;
      }
    }
    if (error) {
      toast.error(`${field} is required`);
      return;
    }
    // console.log(blog);

    const { data } = await axios.post('/create/blog', {
      blog
    })
    if (data.error) {
      toast.error(data.error);
    } else {
      SetBlog({
        title: "",
        author: "",
        profession: "",
        coverPhoto: { preview: null, base64: null },
        blogPhotos: [],
        description: "",
        content: "",
        date: "",
        ph: 500,
        pw: 500,
      })
    }
    if(data.message) {
          toast.success(data.message);
        }



    //   console.log(blog);
    }
    // async function HandleBlogPost(e) {
    //   e.preventDefault();
    //   console.log(contentPhotos);
    //   var today = new Date(),
    //     date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //   SetBlog({ ...blog, date: date })
    //   var error = false;
    //   var field = '';
    //   for (var i in blog) {
    //     if (i === 'photosrc' || i === 'photo') {
    //       continue;
    //     }
    //     if (blog[i] === '') {
    //       error = true;
    //       field = i;
    //       break;
    //     }
    //   }
    //   if (error) {
    //     toast.error(`${field} is required`);
    //     return;
    //   }
    //   const { data } = await axios.post('/create/blog', {
    //     blog,
    //     contentPhotos
    //   })
    //   if (data.error) {
    //     toast.error(data.error);
    //   } else {
    //     SetBlog({
    //       title: "",
    //       author: "",
    //       profession: "",
    //       photo: null,
    //       photosrc: null,
    //       description: "",
    //       content: "",
    //       date: "",
    //       ph: 500,
    //       pw: 500,
    //     })
    //     SetContentPhotos([]);
    //   }
    //   if(data.message) {
    //     toast.success(data.message);
    //   }
    // }

    return (
      <div>
        <div className='flex flex-wrap flex-col justify-center items-center'>
          <div>Admin Blogs</div>
          <div className='flex flex-wrap gap-x-2'>
            <button className='p-3 border' onClick={() => { SetPreviewBlogs(false) }}>Create Blog</button>
            <button className='p-3 border' onClick={() => {
              SetPreviewBlogs(true)
              var today = new Date(),
                date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
              SetBlog({ ...blog, date: date });
            }}>Preview Blogs</button>
          </div>
        </div>
        <div className='pt-10 w-[90%] mx-auto'>
          {!previewblog ? <CreateBlog blog={blog} SetBlog={SetBlog} /> : <PreviewBlog blog={blog} />}
          <button type='Submit' onClick={HandleBlogPost} className="my-2 p-2 w-full rounded-[5px] hover:bg-blue-500 hover:text-white border-[2px] font-semibold border-blue-500 text-blue-500">Submit</button>
        </div>
      </div>
    )
  }

  export default AdminBlogs