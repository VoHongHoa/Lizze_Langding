import React, { useEffect, useState } from "react";
import "./ReviewTab.scss";
import { Button, Input, Progress, Rate } from "antd";
import * as ReviewService from "../../../Service/ReviewService";
import * as RatingService from "../../../Service/RatingService";
import ReviewItem from "./ReviewItem/ReviewItem";
import { useSelector } from "react-redux";
import { formatRatingValue } from "../../../Helper/helper";
const rating = [
  { label: "5 sao", value: 5 },
  { label: "4 sao", value: 4 },
  { label: "3 sao", value: 3 },
  { label: "2 sao", value: 2 },
  { label: "1 sao", value: 1 },
];
const ReviewTab = (props) => {
  const [ratingValue, setRatingValue] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [customerReviews, setCustomerReview] = useState([]);
  const [productRatingValue, setProductRatingValue] = useState();
  const [productRatingReport, setProductRatingReport] = useState([]);

  const { user } = useSelector((state) => state);

  const handleOnchangeRatingValue = (value) => {
    setRatingValue(value);
  };
  const handleOnChangeReview = (e) => {
    setNewReview(e.target.value);
  };

  const getCustomerReviews = async (productCode) => {
    try {
      const res = await ReviewService.getCustomerReview(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setCustomerReview(res.data.reviews);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomerRating = async (productCode) => {
    try {
      const res = await RatingService.getCustomerRating(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        console.log(res.data);
        setRatingValue(res.data.rating.rating);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProductRatingValue = async (productCode) => {
    try {
      const res = await RatingService.getProductRatingValue(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setProductRatingValue(res.data.rating[0].ratingValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProductRatingReport = async (productCode) => {
    try {
      const res = await RatingService.getProductRatingReport(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setProductRatingReport(res.data.ratingReport);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateReview = async () => {
    try {
      if (!user.isLogin) {
        props.openNotification(
          "warning",
          "topRight",
          "Vui lòng đăng nhập để sử dụng chức năng này"
        );
        return;
      }
      const reviewData = {
        review: newReview,
        productCode: props.productCode,
      };
      const ratingData = {
        rating: ratingValue,
        productCode: props.productCode,
      };
      const res = await Promise.all([
        ReviewService.createReview(reviewData),
        RatingService.createRating(ratingData),
      ]);
      if (
        res[0] &&
        res[0].status === 200 &&
        res[0].data.success === true &&
        res[1] &&
        res[1].status === 200 &&
        res[1].data.success === true
      ) {
        props.openNotification(
          "success",
          "topRight",
          "Thêm bình luận thành công"
        );
        setNewReview("");
        getCustomerReviews(props.productCode);
      } else {
        props.openNotification(
          "error",
          "topRight",
          "Thêm bình luận không thành công"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCustomerReviews(props.productCode);
    getCustomerRating(props.productCode);
    getProductRatingValue(props.productCode);
    getProductRatingReport(props.productCode);
  }, [props.productCode]);

  return (
    <div className="review-tab-component">
      <div className="rating-product-conatiner">
        <span className="rating-result">
          {formatRatingValue(productRatingValue)}
        </span>
        <Rate
          disabled
          allowHalf
          style={{ fontSize: "14px" }}
          value={productRatingValue}
        />
        <span className="text">1 bình luận </span>
        <div className="detail-rating-result">
          {productRatingReport.length > 0 &&
            productRatingReport.map((item) => {
              return (
                <div className="progress-star" key={item.ratingValue}>
                  <span className="tag-star">{item.ratingValue} sao</span>
                  <span className="star-result">
                    <Progress percent={item.percentage} />
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="add-review-rating-componnet">
        <div className="add-rating">
          <span> Đánh giá sản phẩm của bạn </span>
          <Rate
            style={{ fontSize: "14px" }}
            value={ratingValue}
            onChange={handleOnchangeRatingValue}
          />
        </div>
        <div className="add-review">
          <Input.TextArea
            value={newReview}
            onChange={(e) => handleOnChangeReview(e)}
            allowClear
          ></Input.TextArea>

          <Button size="large" onClick={handleCreateReview}>
            Thêm bình luận
          </Button>
        </div>

        {user.isLogin && (
          <div className="review-container">
            <p className="title">Các bình luận của bạn</p>
            {customerReviews &&
              customerReviews.length > 0 &&
              customerReviews.map((item) => {
                return (
                  <ReviewItem
                    data={item}
                    key={item._id}
                    productCode={props.productCode}
                    openNotification={props.openNotification}
                    fetchReviewData={getCustomerReviews}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTab;
