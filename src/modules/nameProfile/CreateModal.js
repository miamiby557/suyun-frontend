import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import {create, hideCreate, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {getSingleDistrictLabel} from "../../lib/func";

class CreateModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if (values.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(values.district);
                        values.district = values.district[values.district.length - 1];
                        values.province = province;
                        values.city = city;
                        values.area = area;
                    }
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideCreate());
                            dispatch(query({}));
                        } else {
                            notification.error({
                                message: '创建失败:' + action.message
                            });
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideCreate());
    };


    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'name',
                        title: '简称',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入名称'}]
                        }
                    }, {
                        field: 'district',
                        type: 'districtSelector',
                        title: '行政区域',
                        fieldOptions: {
                            rules: [{required: true, message: '请选择行政区域'}]
                        },
                    },
                    {
                        field: 'company',
                        title: '全称(公司)',
                        type: 'text'
                    },
                    {
                        field: 'contactMan',
                        title: '联系人',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系人'}]
                        }
                    },
                    {
                        field: 'contactPhone',
                        title: '联系电话',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系电话'}]
                        }
                    }, {
                        field: 'fullAddress',
                        title: '详细地址',
                        type: 'textArea',
                        fieldOptions: {
                            rules: [{required: true, message: '详细地址'}]
                        }
                    }
                ]
            }];

        return (
            <Modal
                title="新增"
                visible={visible}
                onOk={this.handleCreate}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
                width="40%"
            >
                <FormEditor
                    schema={schema}
                    column={1}
                    defaultReadonly={false}
                    showActionBar={false}
                    defaultValues={model}
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.nameProfile.create
    };
};

export default connect(mapStateToProps)(CreateModal);
