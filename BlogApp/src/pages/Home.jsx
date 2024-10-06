import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import appService from "../appwrite/auth"
import { Container, Postcard } from '../components'


function Home() {
    const [posts, setPosts] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fetchPostsAndUser = async () => {
        const currentUser = await appService.getCurrentUser(); // Await the current user
        setIsLoggedIn(!!currentUser); // Update login status based on the user presence

        const postsResponse = await appwriteService.getAllPosts();
        if (postsResponse) {
            setPosts(postsResponse.documents);
        }
    };

    useEffect(() => {
        fetchPostsAndUser(); // Call the function to fetch posts and user on component mount
    }, []);


    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            {isLoggedIn ? 'Add new Posts' : 'Login to read posts'}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (

            <div className='w-full py-8 '>
                <Container>
                    <div className='flex flex-wrap'>
                        {
                            posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <Postcard {...post} />
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home