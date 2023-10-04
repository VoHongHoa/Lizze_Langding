import React, { useState } from "react";
import "./ReviewItem.scss";
import { Avatar, Input } from "antd";
import { useSelector } from "react-redux";
import {
  EllipsisOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { removeReview, updateReview } from "../../../../Service/ReviewService";

const ReviewItem = (props) => {
  const { user } = useSelector((state) => state);
  const [showAction, setShowAction] = useState(false);
  const [reviewData, setReviewData] = useState(props.data.review);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleShowAction = () => {
    setShowAction(true);
  };

  const handleCloseAction = () => {
    setShowAction(false);
  };

  const handleChangeEditMode = () => {
    setIsEditMode(true);
    setShowAction(false);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
  };

  const handleOnchangeReview = (e) => {
    setReviewData(e.target.value);
  };

  const handleRemoveReview = async () => {
    try {
      const res = await removeReview(props.data._id);
      if (res && res.status === 200 && res.data.success === true) {
        props.openNotification(
          "success",
          "topRight",
          "Xóa bình luận thành công"
        );

        props.fetchReviewData(props.productCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateReview = async () => {
    try {
      const dataUpdate = {
        reviewData,
      };
      const res = await updateReview(props.data._id, dataUpdate);
      if (res && res.status === 200 && res.data.success === true) {
        props.openNotification(
          "success",
          "topRight",
          "Chỉnh sửa bình luận thành công"
        );
        props.fetchReviewData(props.productCode);
        setIsEditMode(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="review-item-container">
      <div className="avatar-container">
        <Avatar
          className="pointer"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
        />
      </div>
      <div className="review-content-container">
        <span className="username">
          {props.data.CustomersObject?.customerName}
        </span>
        {isEditMode === false ? (
          <p>{reviewData}</p>
        ) : (
          <div className="edit-mode-container">
            <Input.TextArea
              value={reviewData}
              autoFocus
              onChange={(e) => handleOnchangeReview(e)}
            />
            <div className="edit-mode-action">
              <CloseOutlined
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleCancelEditMode}
              />

              <SendOutlined
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleUpdateReview}
              />
            </div>
          </div>
        )}
      </div>
      {user.isLogin &&
        user.currentUser.customerCode ===
          props.data.CustomersObject.customerCode && (
          <div className="review-other">
            {showAction ? (
              <CloseOutlined onClick={handleCloseAction} />
            ) : (
              <EllipsisOutlined onClick={handleShowAction} />
            )}
            <div
              className={showAction ? "review-action active" : "review-action"}
            >
              <p onClick={handleChangeEditMode}>Chỉnh sửa</p>
              <p onClick={handleRemoveReview}>Xóa</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default ReviewItem;
