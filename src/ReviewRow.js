import React, { useState } from 'react';

const ReviewRow = ({ review, index, handleDelete, handleUpdate }) => {
    const { _id, title, content, datetime } = review;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({ title, content });

    const onDeleteClick = () => {
        handleDelete(_id);
    };

    const onEditClick = () => {
        setIsEditing(true);
    };

    const onCancelClick = () => {
        setIsEditing(false);
        setUpdatedData({ title, content });
    };

    const onSaveClick = async () => {
        await handleUpdate(_id, updatedData);
        setIsEditing(false);
    };

    const onInputChange = e => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{isEditing ? <input type="text" name="title" value={updatedData.title} onChange={onInputChange} /> : title}</td>
            <td>{isEditing ? <textarea name="content" value={updatedData.content} onChange={onInputChange} /> : content}</td>
            <td>{datetime}</td>
            <td>
                <button onClick={onEditClick}>{isEditing ? 'Cancel' : 'Edit'}</button>
            </td>
            <td>
                <button onClick={onDeleteClick}>Delete</button>
            </td>
            {isEditing && (
                <td>
                    <button onClick={onSaveClick}>Save</button>
                    <button onClick={onCancelClick}>Cancel</button>
                </td>
            )}
        </tr>
    );
};

export default ReviewRow;
