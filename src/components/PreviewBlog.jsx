function PreviewBlog(props) {
    var ph, pw;
    { props.blog.ph > 0 ? ph = `[${props.blog.ph}px]` : ph = 'auto' }
    { props.blog.pw > 0 ? pw = `[${props.blog.pw}px]` : pw = 'auto' }
    return (
        <div className="ml-5">
            <div className="flex flex-wrap flex-col">
                <div className="text-[35px] font-bold"><h1>{props.blog.title}</h1></div>
                <div className="text-[15px] font-semibold">
                    <h4>{props.blog.author} - {props.blog.profession}</h4></div>
                <div className="text-[15px] font-semibold">
                    <h4>{props.blog.date}</h4>
                </div>
                <div className="font-medium">
                    Description: {props.blog.description}
                </div>
            </div>
            {props.blog.photo ? <img className={`h-${ph} w-${pw}`} src={props.blog.photo}></img> : ''}
            <div >
                {props.blog.content.split('::').map((text, index) => {
                    if (text.startsWith("[BOLD]")) {
                        return (<div className="font-bold inline-block">
                            {text.split('[BOLD]')[1]}
                        </div>)
                    } else if (text.startsWith("[H1]")) {
                        return (<div className="font-bold inline-block text-[30px]">
                            {text.split('[H1]')[1]}
                        </div>)
                    } else if (text.startsWith("[H2]")) {
                        return (<div className="inline-block text-[20px] font-semibold">
                            {text.split('[H2]')[1]}
                        </div>)
                    } else if (text.startsWith("[IMG")) {
                        //console.log(imgtag);
                        const src = text.split('<src>')[1];
                        var height = '100px';
                        var width = '100px';
                        if (text.includes('<height>')) {
                            height = text.split('<height>')[1];
                        }
                        if (text.includes('<width>')) {
                            width = text.split('<width>')[1];
                        }
                        return (<img className={`h-[${height}] w-[${width}]`} src={src}></img>)
                    } else if (text.startsWith("[BR]")) {
                        return (<div className="">
                            {"\n"}
                        </div>)
                    }
                    return (<div className="inline-block">{text.split('\n')}</div>)
                })}
            </div>
        </div>
    )
}

export default PreviewBlog;