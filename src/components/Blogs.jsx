import { useNavigate } from 'react-router-dom';
import blogimg from '../assets/blog-null.png';
import blograte from '../assets/blograte.svg';


function Blogs() {
    const navigate = useNavigate();
    const blogitems = [
        { id:1,title: "Post 1",rating:3, date: "01-01-2020", content: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Odio tempor orci dapibus ultrices. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.", img: blogimg, author: "xyz", profession: "manager" },
        { id:2,title: "Post 2",rating:3, date: "01-01-2020", content: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Odio tempor orci dapibus ultrices. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.", img: blogimg, author: "xyz", profession: "manager" },
        { id:3,title: "Post 3",rating:3, date: "01-01-2020", content: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Odio tempor orci dapibus ultrices. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.", img: blogimg, author: "xyz", profession: "manager" },
        { id:4,title: "Post 4",rating:3, date: "01-01-2020", content: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Odio tempor orci dapibus ultrices. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.", img: blogimg, author: "xyz", profession: "manager" },
        { id:5,title: "Post 5",rating:3, date: "01-01-2020", content: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Odio tempor orci dapibus ultrices. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.", img: blogimg, author: "xyz", profession: "manager" },
    ];

    function HandleBlogPost(id) {
        navigate('/blogs/'+id);
    }

    return (<div>
        <h2 className="flex mt-4 mb-3 justify-center text-2xl bg-clip-text text-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Blogs- Know about more</h2>
        {blogitems.map((blog) => {
            return (
                <div id_no={blog.id} onClick={() => HandleBlogPost(blog.id)} className="mx-auto px-4 py-4 mt-2 mb-8 ml-4 rounded-xl bg-[#F7F7F7] shadow-blogshadow cursor-pointer hover:bg-[#EAEAEA]">
                    <div className='flex flex-wrap gap-x-5'>
                    <div className="mb-4 ">
                        <img
                            className="rounded-lg h-16 w-14"
                            src={blog.img}
                        />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-xl font-bold -mb-2">{blog.title}</h1>
                        <p className="text-gray-600 -mb-1">
                            {blog.author} - {blog.profession}
                        </p>
                        <p className="text-gray-600 -mb-1 inline-block">

                            {Array.apply(null, {length: blog.rating}).map(()=>{
                                return(<img className='inline-block mr-0.5' src={blograte}/>)
                            })}
                        </p>
                    </div>
                    </div>
                    <div className="prose text-gray-700">
                        {blog.content}
                    </div>
                </div>
            )
        })}
    </div>)
}

export default Blogs;