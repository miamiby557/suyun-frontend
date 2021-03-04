import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import {create, hideCreate, query} from "./actions";
import FormEditor from '../../components/FormEditor';

class CreateModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideCreate());
                            dispatch(query({}));
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
                        title: '客户名称',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入用户名'}]
                        },
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
        ...state.client.create,
    };
};

export default connect(mapStateToProps)(CreateModal);
