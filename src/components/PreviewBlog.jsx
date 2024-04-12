function PreviewBlog(props) {
    var ph, pw;
    { props.blog.ph > 0 ? ph = `${props.blog.ph.toString()}px` : ph = 'auto' }
    { props.blog.pw > 0 ? pw = `${props.blog.pw.toString()}px` : pw = 'auto' }
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
            {props.blog.coverPhoto.preview ? <img style={{ height: ph, width: pw }} src={props.blog.coverPhoto.preview}></img> : ''}

            <div className="pt-5">
                {props.blog.content.split('::').map((text, index) => {
                    if (text.startsWith("[BOLD]")) {
                        const bold = text.split('[BOLD]')[1];
                        return (<div className="font-bold inline-block">
                            {bold[0] == ' ' ? (<span>&nbsp;</span>) : ''}
                            {bold[0] == ' ' ? (bold.substring(1, bold.length)) : bold}
                        </div>)
                    } else if (text.startsWith("[H1]")) {
                        const h1 = text.split('[H1]')[1];
                        return (<div className="font-bold inline-block text-[30px]">
                            {h1[0] == ' ' ? (<span>&nbsp;</span>) : ''}
                            {h1[0] == ' ' ? (h1.substring(1, h1.length)) : h1}
                        </div>)
                    } else if (text.startsWith("[H2]")) {
                        const h2 = text.split('[H2]')[1];
                        return (<div className="font-semibold inline-block text-[20px]">
                            {h2[0] == ' ' ? (<span>&nbsp;</span>) : ''}
                            {h2[0] == ' ' ? (h2.substring(1, h2.length)) : h2}
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
                        return (<img className="max-h-screen max-w-screen" style={{ height: height, width: width }} src={src}></img>)
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