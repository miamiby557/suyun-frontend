import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {merge} from 'lodash';
import {DatePicker, Form, Input, InputNumber, Select, Slider, Switch} from 'antd';
import DistrictSelector from '.././DistrictSelector';
import ListSelector from '.././ListSelector';
import DateTimePicker from '.././DateTimePicker';
import {getDistrictLabel} from '../.././lib/func';
import CheckBoxSelector from "../CheckBoxSelector";
import RadioSelector from "../RadioSelector";

const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const DateRangePicker = DatePicker.RangePicker;

const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

const getFieldControl = ({
                             field,
                             type,
                             title,
                             controlProps = {},
                             readonly,
                             getFieldValue
                         }) => {
    switch (type) {
        case 'number':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <InputNumber {...controlProps} placeholder={title}/>;
        case 'formatNumber':
            if (readonly === true) {
                const text = getFieldValue(field);
                const showText = parseFloat(text).toFixed(2);
                return <span color={text<0?'red':''} className="ant-form-text">{showText}</span>;
            }
            const {
                formatter,parser
            } = controlProps;
            return <InputNumber formatter={formatter} parser={parser} {...controlProps} placeholder={title}/>;
        case 'date':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = moment.isMoment(value)
                    ? value.format(DATETIME_FORMAT)
                    : value;
                return <span className="ant-form-text">{text}</span>;
            }
            return (
                <DatePicker showTime={false} {...controlProps} placeholder={title}/>
            );

        case 'datetime':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = moment.isMoment(value)
                    ? value.format(DATETIME_FORMAT)
                    : value;
                return <span className="ant-form-text">{text}</span>;
            }
            return (
                <DateTimePicker showTime={true} {...controlProps} placeholder={title}/>
            );

        case 'select':
            const {options = [], rest} = controlProps;
            return (
                <Select {...rest} placeholder={title}>
                    {options.map((item, index) => (
                        <Option key={index} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            );

        case 'listSelector':
            if (readonly === true) {
                const value = getFieldValue(field);
                const {
                    dataSource = [],
                    labelField = 'label',
                    valueField = 'value'
                } = controlProps;

                const selectedItem = dataSource.find(
                    item => item[valueField] === value
                );
                const text = selectedItem ? selectedItem[labelField] : value;

                return <span className="ant-form-text">{text}</span>;
            }

            return <ListSelector {...controlProps} placeholder={title}/>;

        case 'districtSelector':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = value ? getDistrictLabel(value) : value;
                return <span className="ant-form-text">{text}</span>;
            }

            return <DistrictSelector {...controlProps} placeholder={title}/>;

        case 'dateRangePicker':
            if (readonly === true) {
                const values = getFieldValue(field) || [];
                const text = values.map(item => item.format(DATE_FORMAT)).join(' - ');
                return <span className="ant-form-text">{text}</span>;
            }

            return <DateRangePicker {...controlProps} />;
        case 'checkBoxSelector':
            if (readonly === true) {
                const values = getFieldValue(field) || [];
                const {
                    dataSource = [],
                    labelField = 'label',
                    valueField = 'value'
                } = controlProps;

                const selectedItems = dataSource.find(
                    item => values.indexOf(item[valueField]) >= 0
                );
                const text = selectedItems.map(item => item[labelField]).join(', ');

                return <span className="ant-form-text">{text}</span>;
            }
            return <CheckBoxSelector {...controlProps} />;
        case 'radioSelector':
            return <RadioSelector {...controlProps} />;
        case 'textArea':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <TextArea placeholder={title} {...controlProps}/>;

        case 'slider':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <Slider {...controlProps} placeholder={title}/>;
        case 'switch':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <Switch {...controlProps} placeholder={title}/>;

        default:
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <Input {...controlProps} placeholder={title}/>;
    }
};

class FormField extends Component {
    render() {
        const {
            field,
            title,
            type,
            fieldOptions = {},
            controlProps,
            defaultValue,
            readonly,
            formItemLayout = {},
            form: {getFieldDecorator, getFieldValue}
        } = this.props;

        const fieldDecoratorOptions = merge(fieldOptions, {
            initialValue: defaultValue
        });

        return (
            <FormItem {...formItemLayout} label={title || field}>
                {getFieldDecorator(field, fieldDecoratorOptions)(
                    getFieldControl({
                        field,
                        title,
                        type,
                        controlProps,
                        getFieldValue,
                        readonly
                    })
                )}
            </FormItem>
        );
    }
}

FormField.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'number',
        'formatNumber',
        'date',
        'datetime',
        'select',
        'listSelector',
        'districtSelector',
        'dateRangePicker',
        'organizationSelector',
        'checkBoxSelector',
        'textArea',
        'switch',
        'slider'
    ])
};
export default FormField;
