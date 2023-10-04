import React, { useEffect, useState } from "react";
import "./OtherReview.scss";
import * as ReviewService from "../../../Service/ReviewService";
import ReviewItem from "../ReviewTab/ReviewItem/ReviewItem";
const OtherReview = (props) => {
  const [reviews, setReviews] = useState([]);

  const getAllCustomerReview = async (productCode) => {
    try {
      const res = await ReviewService.getAllCustomerRating(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setReviews(res.data.reviews);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCustomerReview(props.productCode);
  }, [props.productCode]);
  return (
    <div className="review-container">
      {reviews &&
        reviews.length > 0 &&
        reviews.map((item) => {
          return (
            <ReviewItem
              data={item}
              key={item._id}
              productCode={props.productCode}
              openNotification={props.openNotification}
              fetchReviewData={getAllCustomerReview}
            />
          );
        })}
    </div>
  );
};

export default OtherReview;
