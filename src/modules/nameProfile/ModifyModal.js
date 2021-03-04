import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import {hideModify, modify, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {getSingleDistrictLabel} from "../../lib/func";

class ModifyModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const {dispatch, model} = this.props;
                    const updateModel = {...model, ...values};
                    if (updateModel.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(updateModel.district);
                        if (updateModel.district instanceof Array) {
                            updateModel.district = updateModel.district[updateModel.district.length - 1];
                        }
                        updateModel.province = province;
                        updateModel.city = city;
                        updateModel.area = area;
                    }
                    dispatch(modify(updateModel)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideModify());
                            dispatch(query({}));
                        } else {
                            notification.error({
                                message: '修改失败:' + action.message
                            });
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideModify());
    };


    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'name',
                        title: '名称',
                        type: 'text',
                        readonly: true
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
                        title: '发货单位',
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
                title="修改"
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
        ...state.nameProfile.modify
    };
};

export default connect(mapStateToProps)(ModifyModal);
