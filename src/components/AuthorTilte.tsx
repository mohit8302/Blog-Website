
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

interface Blogtype {
    blog: Blog,
}

export const AuthorTitle=({blog}:Blogtype)=>{
return(
    <div className="col-span-4">
    <div className="text-slate-600 text-lg mb-4">Author</div>
    <div className="flex items-center">
        <div className="pr-4">
            <Avatar size="big" name={blog.author.name || "Anonymous"} />
        </div>
        <div>
            <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
            <div className="pt-1 text-slate-500 italic">"{ "Random catch phrase about the author's ability to grab the user's attention"}"</div>
        </div>
    </div>
</div>

)
}