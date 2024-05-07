import { Blog } from "../hooks";
import { AppBar } from "./Appbar";
import PopupShow from "./PopupShow";
import axios from "axios";
import { BACKEND_URL } from "../config";
import {  useLocation,useNavigate,Link } from "react-router-dom";
import {    useEffect, useState } from "react";
import { AuthorTitle } from "./AuthorTilte";

interface FullBlogtype {
    blog: Blog,
}

export const FullBlog = ({ blog }: FullBlogtype) => {
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.pathname.split('/').pop();

    const [currentDate, setCurrentDate] = useState(new Date());
   

//     const [content, setContent] = useState(blog.content);

//   const handleImageUpload = (event: { target: { files: any[]; }; }) => {
//     const file = event.target.files[0];
//     // Upload the image file to the server and get the URL
//     const imageUrl = 'https://example.com/image-url'; // Replace with actual image URL
//     // Append the image URL to the content
//     setContent(content + `\n\n![Alt text](${imageUrl})`);
//   };

    //data
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    const formattedDate = currentDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    // Function to handle edit button click
    // const handleEditClick = () => {
    //     // Navigate to the edit page with the postId
    //     navigate(`/edit-blog/${postId}`);
    // };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on {formattedDate}
                        </div>
                        <div className="pt-4">
                            {/* Render each paragraph of the content */}
                            {blog.content.split('\n\n').map((paragraph, index) => (
                                <div key={index}>
                                {paragraph.startsWith('![Alt text]') ? (
                             // Render the image
                                <img src={paragraph.substring(11, paragraph.length - 1)} alt="Image" />
                                     ) : (
                                   // Render text paragraph
                              <p>{paragraph}</p>
                                 )}
                                    {index < blog.content.split('\n\n').length - 1 && <br />} {/* Add line break if not the last paragraph */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <AuthorTitle blog={blog}/>
                </div>
            </div>
            <div className="flex space-between grid grid-cols-2  w-full ml-40 mt-15 pt-200 max-w-screen-xl pt-12 ">
            <div className="">
                {/* Edit button */}
                <Link to={`/edit-blog/${postId}`}>
                    <button className="text-white bg-red-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Edit
                    </button>
                </Link>
            </div>
                <div className="">
                    <button onClick={async () => {
                        await axios.delete(
                            `${BACKEND_URL}/api/v1/blog/${postId}`,
                            {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            }
                        );
                        // Optionally, you can navigate to a different page after deletion
                        navigate('/blogs');
                    }}>
                        <PopupShow />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FullBlog;
