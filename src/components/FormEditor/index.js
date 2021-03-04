import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Collapse, Form, Icon, Row} from 'antd';
import lodash from 'lodash';
import {mapModelToFields} from '../../lib/redux-utils';
import {formButtonLayout, formItemLayout} from '../../lib/ui';
import FormField from './FormField';
import './index.less';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

export const groupStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 12,
    border: 0,
    overflow: 'hidden'
};

const getFormCol = column => {
    const md = Math.round(24 / column);
    return {
        sm: 24,
        md: md
    };
};

const FieldWrapper = ({column = 1, children}) => {
    return column > 1 ? <Col {...getFormCol(column)}>{children}</Col> : children;
};

const ActionWrapper = ({column = 1, children}) => {
    return column > 1 ? (
        <Row>
            <Col {...getFormCol(column)}>{children}</Col>
        </Row>
    ) : (
        children
    );
};

class FormEditor extends Component {
    state = {readonly: this.props.defaultReadonly === true};

    validate = () => {
        const {
            form: {validateFieldsAndScroll}
        } = this.props;

        return new Promise((resolve, reject) => {
            validateFieldsAndScroll((errors, values) => {
                if (!errors) {
                    resolve(values);
                } else {
                    reject(errors);
                }
            });
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {onSubmit} = this.props;
        this.validate().then(onSubmit);
    };

    getGroups = () => {
        const {schema} = this.props;
        const keys = schema.map((item, index) => index.toString());
        return (
            <Collapse defaultActiveKey={keys} bordered={false}
                      expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}>
                {schema.map(({title, fields}, index) => (
                    <Panel key={`${index}`} header={title} style={groupStyle} disabled>
                        {this.getFields(fields)}
                    </Panel>
                ))}
            </Collapse>
        );
    };

    getFields = fields => {
        const {form, defaultValues = {}, column = 1} = this.props;
        const {readonly} = this.state;
        return fields.map((item, index) => {
            const defaultValue = lodash.get(defaultValues, item.field);
            const fieldReadonly = readonly || item.readonly;
            return (
                <FieldWrapper column={column} key={index}>
                    <FormField
                        form={form}
                        defaultValue={defaultValue}
                        {...item}
                        readonly={fieldReadonly}
                        formItemLayout={formItemLayout}
                    />
                </FieldWrapper>
            );
        });
    };

    getActions = () => {
        const {readonly} = this.state;
        const {showActionBar, column, buttonName = " 提交"} = this.props;
        if (readonly || !showActionBar) return null;

        return (
            <ActionWrapper column={column}>
                <FormItem {...formButtonLayout}>
                    <Button icon="save" type="primary" htmlType="submit">
                        {buttonName}
                    </Button>
                </FormItem>
            </ActionWrapper>
        );
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.getGroups()}
                {this.getActions()}
            </Form>
        );
    }
}

FormEditor.propTypes = {
    schema: PropTypes.array,
    column: PropTypes.number,
    showActionBar: PropTypes.bool
};

FormEditor.defaultProps = {
    schema: [],
    column: 1,
    showActionBar: true
};

const mapPropsToFields = ({values}) => mapModelToFields(values);

const handleValuesChange = ({onChange}, changedValues, values) => {
    onChange && onChange(values);
};

const handleOnFieldsChange = (props, fields) => {
    // console.info('field change', fields);
};

export default Form.create({
    mapPropsToFields,
    onValuesChange: handleValuesChange,
    onFieldsChange: handleOnFieldsChange
})(FormEditor);
