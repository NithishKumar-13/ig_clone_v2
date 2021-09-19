import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useModal } from '../../context/ModalContext'
import './Modal.scss'

const Modal = ({ postInfo }) => {
    const { isOpen, setIsOpen } = useModal()
    const { user } = useAuth()
    const history = useHistory()

    if(!isOpen) return null

    const handleDeletePost = async(postId) => {
      await axios.delete(`http://localhost:8080/p/${postId}`)
      setIsOpen(false)
      history.push('/')
    }

    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__overlay" onClick={() => setIsOpen(false)} />
        <div className="modal__body">
          <ul className="modal__lists">
            {user.username === postInfo.author ? (
              <li className="modal__item">
                <button
                  className="modal__button modal__button--main"
                  tabIndex="0"
                  onClick={() => handleDeletePost(postInfo.post_id)}
                >
                  Delete
                </button>
              </li>
            ) : (
              <li className="modal__item">
                <button
                  className="modal__button modal__button--main"
                  tabIndex="0"
                >
                  Unfollow
                </button>
              </li>
            )}

            <li className="modal__item">
              <button className="modal__button" tabIndex="0">
                Go to post
              </button>
            </li>
            <li className="modal__item">
              <button className="modal__button" tabIndex="0">
                Share to
              </button>
            </li>
            <li className="modal__item">
              <button className="modal__button" tabIndex="0">
                Copy link
              </button>
            </li>
            <li className="modal__item">
              <button
                className="modal__button"
                onClick={() => setIsOpen(false)}
                tabIndex="0"
              >
                Cancel
              </button>
            </li>
          </ul>
        </div>
      </div>,
      document.querySelector("#modal")
    );
}

export default Modal