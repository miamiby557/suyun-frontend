import React, { PureComponent } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { DATE_FORMAT, DATETIME_FORMAT } from "../lib/func";

class DateTimePicker extends PureComponent {
  render() {
    const {
      placeholder = "日期",
      showTime = false,
      value,
      ...rest
    } = this.props;
    const format = showTime ? DATETIME_FORMAT : DATE_FORMAT;
    const selected = value && typeof value === "string" ? moment(value) : value;

    return (
      <DatePicker
        {...rest}
        showTime={showTime}
        placeholder={placeholder}
        format={format}
        value={selected}
      />
    );
  }
}

export default DateTimePicker;
