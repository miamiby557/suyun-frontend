import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import {modify, hideModify, query} from "./actions";
import FormEditor from '../../components/FormEditor';

class ModifyModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch,model} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const updateModel = {...model, ...values,id:model.id};
                    dispatch(modify(updateModel)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideModify());
                            dispatch(query({}));
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
                        title: '客户名称',
                        type: 'text',
                        readonly: true
                    },{
                        field: 'nickName',
                        title: '客户简称',
                        type: 'text'
                    }, {
                        field: 'email',
                        title: '邮箱',
                        type: 'text',
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
        ...state.client.modify,
    };
};

export default connect(mapStateToProps)(ModifyModal);
