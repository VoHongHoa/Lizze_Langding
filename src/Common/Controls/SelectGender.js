import { Col, Select } from "antd";
import React from "react";

const SelectGender = (props) => {
  const options = [
    {
      label: "Nam",
      value: "1",
    },
    {
      label: "Nữ",
      value: "0",
    },
  ];
  const handleChangeSelect = (value) => {
    props.onChange(value, props.keySelect);
  };
  return (
    <Col
      className={
        props.checkSearchFeildAvailble &&
        props.checkSearchFeildAvailble(props.keySelect) === false
          ? "gutter-row mt-2 input-container"
          : "gutter-row mt-2"
      }
      span={12}
    >
      <span>Giới tính</span>
      <Select
        mode={props.mode ? props.mode : ""}
        allowClear
        size={"large"}
        style={{ width: "100%" }}
        placeholder="Chọn giới tính"
        onChange={handleChangeSelect}
        options={options}
        value={props.value}
      />
    </Col>
  );
};

export default SelectGender;
