import { useEffect, useRef, useState } from "react"
import { addPost, deletePost, getAllPosts } from "../../../helpers/api"
import { IPost } from "../../../helpers/types"
import { BASE } from "../../../helpers/default"
import {Modal} from "@mui/material"
import { Box } from "@mui/material"

export const Photos = () => {
    const photo = useRef<HTMLInputElement | null>(null)
    const [text, setText] = useState<string>("")
    const [posts, setPosts] = useState<IPost[]>([])
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        getAllPosts()
            .then(response => {
                setPosts(response.payload as IPost[])
            })

    }, [])

    const handlePostAdd = () => {
        const file = photo.current?.files?.[0]
        if (file) {
            const form = new FormData()
            form.append("photo", file)
            form.append("content", text)
            addPost(form)
                .then(response => {
                    setPosts([...posts, response.payload as IPost])
                    setText("")
                })
        }
    }

    const handleDeletePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id))
        deletePost(id)
            .then(response => {
                if (response.status !== "success") {
                    getAllPosts().then(response => setPosts(response.payload as IPost[]))
                    setModal(false)
                }
            })
    }

    return (
        <>
            <h2>Add Photo</h2>

            <input
                type="file"
                ref={photo}
            />

            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Say something here"
            />
            <button
                onClick={handlePostAdd}
                className="btn btn-outline-primary">
                Upload
            </button>

            {
                posts.map(post => (
                    <div key={post.id}>
                        <img style={{ width: 100, height: 100 }} src={BASE + post.picture} alt={post.title} />

                        <button onClick={() => setModal(true)}
                            className="btn btn-outline-danger"
                            id="inputGroupFileAddon04"
                        >
                            Delete
                        </button>

                        <Modal open={modal} onClose={() => setModal(false)}>
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <p>Are you sure you want to delete this post?</p>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className='btn btn-outline-primary'>
                                    Delete
                                </button>

                            </Box>
                        </Modal>
                    </div>)
                )
            }

        </>
    )
}