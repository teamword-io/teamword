import React from "react";
const Avatar = (props) => {
    return (
        <div className="avatar">
            <div className={`head h${props.avatar.h}`}></div>
            <div className={`eyes e${props.avatar.e}`}></div>
            <div className={`mouth m${props.avatar.m}`}></div>
        </div>
    );
};
export default Avatar;