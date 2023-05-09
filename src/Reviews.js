import React, { useState, useEffect } from 'react';
import ReviewRow from './ReviewRow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewsListView = () => {
    const [reviews, setReviews] = useState([]); // initialize state with reviews data
    const navigate = useNavigate();

    // Fetch reviews on component mount
    useEffect(() => {
        axios
            .get('http://localhost:8080/reviews')
            .then((res) => {
                console.log('Data received from server:', res.data);
                setReviews(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        console.log(id);
        axios
            .delete(`http://localhost:8080/reviews/${id}`)
            .then(() => {
                // Remove deleted review from state
                setReviews((prevState) =>
                    prevState.filter((r) => r._id !== id)
                );
            })
            .catch((err) => console.error(err));
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
    };

    const handleUpdate = async (idToUpdate, updatedData) => {
        console.log(idToUpdate, updatedData);
        try {
            const res = await axios.put(
                `http://localhost:8080/reviews/${idToUpdate}`,
                updatedData
            );
            console.log('Review updated:', res.data);
            // Update the review in the state
            setReviews((prevState) =>
                prevState.map((r) =>
                    r._id === idToUpdate ? { ...r, ...updatedData } : r
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddReview = (newReview) => {
        setReviews([...reviews, newReview]);
        navigate('/');
    };

    const handleAddReviewClick = () => {
        navigate('/form');
    };

    return (
        <div>
            <h1>Reviews List View</h1>
            <button onClick={handleAddReviewClick}>Add review</button>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date-time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <ReviewRow
                            key={review._id}
                            review={review}
                            index={index}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewsListView;
