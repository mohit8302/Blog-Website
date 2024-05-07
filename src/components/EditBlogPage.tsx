import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface BlogPost {
    id: string; // Assuming postId is a string
    title: string;
    content: string;
    // Add more properties as needed
}

export const EditBlogPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axios.get<BlogPost>(`${BACKEND_URL}/api/v1/blog/${postId}`);
                console.log('Response:', response.data);
                setBlogPost(response.data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                // Handle error
            }
        };
    
        fetchBlogPost();
    }, [postId]);
    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (blogPost) {
            setBlogPost({ ...blogPost, title: e.target.value });
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (blogPost) {
            setBlogPost({ ...blogPost, content: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (blogPost) {
            try {
                await axios.put(`${BACKEND_URL}/api/v1/blog/${postId}`, blogPost, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                navigate(`/blogs/${postId}`);
            } catch (error) {
                console.error('Error updating blog post:', error);
                // Handle error
            }
        }
    };

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={blogPost.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={blogPost.content} onChange={handleContentChange} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};