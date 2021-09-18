import React from 'react'
import ReactDOM from 'react-dom'
import { useModal } from '../../context/ModalContext'
import './Modal.scss'

const Modal = () => {
    const { isOpen } = useModal()

    if(!isOpen) return null

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal__overlay' />
            <div className='modal__body'>
                <ul className='modal__lists'>
                    <li className='modal__item'><button className='modal__button modal__button--main' tabIndex='0'>Unfollow</button></li>
                    <li className='modal__item'><button className='modal__button' tabIndex='0'>Go to post</button></li>
                    <li className='modal__item'><button className='modal__button' tabIndex='0'>Share to</button></li>
                    <li className='modal__item'><button className='modal__button' tabIndex='0'>Copy link</button></li>
                    <li className='modal__item'><button className='modal__button' tabIndex='0'>Cancel</button></li>
                </ul>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal