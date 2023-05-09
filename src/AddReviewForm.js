import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddReviewForm = ({ handleAddReview }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [datetime, setDatetime] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newReview = {
            title: title,
            content: content,
            datetime: datetime,
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/reviews',
                newReview
            );
            setTitle('');
            setContent('');
            setDatetime('');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleForm = () => {
        navigate('/form');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Review</h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="datetime">Date and Time:</label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={datetime}
                    onChange={(event) => setDatetime(event.target.value)}
                />
            </div>
            <button type="submit" onClick={handleForm}>Add Review</button>
        </form >
    );
};

export default AddReviewForm;
