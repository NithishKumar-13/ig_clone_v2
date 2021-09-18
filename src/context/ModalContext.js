import React, { useState, createContext, useContext } from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <ModalContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => {
    const context = useContext(ModalContext)
    if(context === undefined) {
        throw new Error('Consumer must be wrapped inside Provider')
    }
    return context
}

export { ModalProvider, useModal }