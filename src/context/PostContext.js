import React, { useState, createContext, useContext } from 'react'

const PostContext = createContext()

const PostProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <PostContext.Provider value={{ isOpen , setIsOpen }}>
            {children}
        </PostContext.Provider>
    )
}

const usePost = () => {
    const context = useContext(PostContext)
    if(context === undefined) {
        throw Error('Context must be wrapped inside Provider')
    }
    return context
}

export { PostProvider, usePost }