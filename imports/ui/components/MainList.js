import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const MainList = ({ adminsEmails, removeEmail }) => {
    return (
        <ul className="main-list">
            {adminsEmails.map((email, index) => (
                <li key={index}><p>{email}</p><span className="btn btn-danger btn-xs" onClick={() => { removeEmail(email) }}><i className="fa fa-times"></i></span></li>
            ))}
        </ul>
    )
}
export default MainList