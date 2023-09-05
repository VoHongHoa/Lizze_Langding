import { Col, Select } from "antd";
import React from "react";

const SelectStatusControl = (props) => {
  const options = [
    {
      label: "Kích hoạt",
      value: "Active",
    },
    {
      label: "Ngững kích hoạt",
      value: "Inactive",
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
      <span>Trạng thái</span>
      <Select
        mode={props.mode ? props.mode : ""}
        allowClear
        size={"large"}
        style={{ width: "100%" }}
        placeholder="Chọn trạng thái"
        onChange={handleChangeSelect}
        options={options}
        value={props.value}
      />
    </Col>
  );
};

export default SelectStatusControl;
