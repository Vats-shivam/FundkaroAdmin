import { useState } from "react"
import { useRef } from "react";
import axios from "axios";

function CreateBlog(props) {
    const [bold, SetBold] = useState(false);
    const [h1, SetH1] = useState(false);
    const [h2, SetH2] = useState(false);
    const contentRef = useRef();

    function HandleBold() {
        SetBold(!bold);
        if (bold) {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::' })
        } else {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::[BOLD]' })
        }
        contentRef.current.focus();
    }
    function HandleH1() {
        SetH1(!h1);
        if (h1) {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::' })
        } else {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::[H1]' })
        }
        contentRef.current.focus();
    }
    function HandleH2() {
        SetH2(!h2);
        if (h2) {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::' })
        } else {
            props.SetBlog({ ...props.blog, content: props.blog.content + '::[H2]' })
        }
        contentRef.current.focus();
    }

    function HandleBR() {
        props.SetBlog({ ...props.blog, content: props.blog.content + '::[BR]::' + "\n" })
        contentRef.current.focus();
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleCoverIMG = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const img = URL.createObjectURL(file);
        const data = new FormData();
        data.append('file', file);
        axios.post("/upload", data)
            .then(res => {
                console.log(res.statusText)
            })
        props.SetBlog({ ...props.blog, coverPhoto: {preview:img,name:file.name} })
        contentRef.current.focus();
    }
    const handleIMG = async (event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append('file', file);
        axios.post("/upload", data)
            .then(res => {
                console.log(res.statusText)
            })
        const img = URL.createObjectURL(file);
        const photos = [...props.blog.blogPhotos];
        photos.push({preview:img,name:file.name});
        console.log(photos);
        props.SetBlog({ ...props.blog, blogPhotos: photos, content: props.blog.content + `::[IMG <src>${img}<src> <height>500px<height> <width>500px<width>]::` + "\n" });
    }
    return (
        <div className="flex flex-wrap flex-col justify-center items-center max-w-full">
            <div className="flex flex-wrap flex-col items-center w-[100%]">
                <div className="flex flex-wrap gap-x-5">
                    <div className="inputWrapper hover:bg-blue-500 hover:text-white font-semibold my-2 p-3 border-[2px] border-blue-500 rounded-[5px] font-semibold text-blue-500">
                        Select Front Cover Image
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleCoverIMG}
                            className="fileInput my-2 p-1 border-[2px] rounded-xl border-blue-500"
                        />
                    </div>
                    <div className="max-w-[275px] mt-[8px]">
                        <label className="text-blue-500 font-semibold">Front Cover Height (px)</label>
                        <input className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="number" value={props.blog.ph} onChange={(e) => {
                            props.SetBlog((prev) => {
                                return { ...prev, ph: e.target.value }
                            })
                        }}></input>
                    </div>
                    <div className="max-w-[275px] mt-[8px]">
                        <label className="text-blue-500 font-semibold">Front Cover Width (px)</label>
                        <input className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="number" value={props.blog.pw} onChange={(e) => {
                            props.SetBlog((prev) => {
                                return { ...prev, pw: e.target.value }
                            })
                        }}></input>
                    </div>
                </div>
                {/* <div>
                    {props.blog.photo}
                </div> */}
                <label className="text-blue-500 font-semibold">Title</label>
                <input required className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="text" value={props.blog.title} onChange={(e) => {
                    props.SetBlog((prev) => {
                        return { ...prev, title: e.target.value }
                    })
                }}></input>
                <label className="text-blue-500 font-semibold">Author</label>
                <input required className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="text" value={props.blog.author} onChange={(e) => {
                    props.SetBlog((prev) => {
                        return { ...prev, author: e.target.value }
                    })
                }}></input>
                <label className="text-blue-500 font-semibold">Profession</label>
                <input required className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="text" value={props.blog.profession} onChange={(e) => {
                    props.SetBlog((prev) => {
                        return { ...prev, profession: e.target.value }
                    })
                }}></input>
                <label className="text-blue-500 font-semibold">Description</label>
                <input required className="px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full" type="text" value={props.blog.description} onChange={(e) => {
                    props.SetBlog((prev) => {
                        return { ...prev, description: e.target.value }
                    })
                }}></input>
                <label className="text-blue-500 font-semibold">Content</label>
                <div className="flex flex-wrap gap-x-5">
                    <button className="my-2 p-1 hover:bg-blue-500 hover:text-white border-[2px] font-semibold rounded-xl border-blue-500 text-blue-500" onClick={HandleBold}>{!bold ? 'Start Bold' : 'Stop Bold'}</button>
                    <button className="my-2 p-1 hover:bg-blue-500 hover:text-white border-[2px] font-semibold rounded-xl border-blue-500 text-blue-500" onClick={HandleH1}>{!h1 ? 'Start H1' : 'Stop H1'}</button>
                    <button className="my-2 p-1 hover:bg-blue-500 hover:text-white border-[2px] font-semibold rounded-xl border-blue-500 text-blue-500" onClick={HandleH2}>{!h2 ? 'Start H2' : 'Stop H2'}</button>
                    <div className="hover:bg-blue-500 hover:text-white inputWrapper font-semibold my-2 p-1 border-[2px] rounded-xl border-blue-500 text-blue-500">
                        IMG
                        <input type="file" accept="image/*" className="fileInput my-2 p-1 border-[2px] rounded-xl" onChange={handleIMG}></input>
                    </div>
                    <button className="my-2 p-1 hover:bg-blue-500 hover:text-white font-semibold border-[2px] rounded-xl border-blue-500 text-blue-500" onClick={HandleBR}>Break Line</button>
                </div>
                <textarea required ref={contentRef} className=" px-1 border-[2px] border-blue-500 rounded-[5px] font-semibold w-full h-[350px] overflow-y-scroll align-flex-start" type="textbox" value={props.blog.content} onChange={(e) => {
                    props.SetBlog((prev) => {
                        return { ...prev, content: e.target.value }
                    })
                }} />
            </div>
        </div>
    )
}

export default CreateBlog;