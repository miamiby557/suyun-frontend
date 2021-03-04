import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import FormEditor from '../../components/FormEditor';
import {createPath, fileList, pathHide} from "./actions";

class CreatePathModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch,path} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const createPathObj = {...values,path,type:"DIRECTORY"};
                    dispatch(createPath(createPathObj)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(pathHide());
                            dispatch(fileList({path}));
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(pathHide());
    };

    render() {
        const {loading, visible} = this.props;
        const schema = [
            {
                title: '文件信息',
                fields: [
                    {
                        field: 'name',
                        title: '文件夹名称',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入文件夹名称'}]
                        }
                    }
                ]
            }];

        return (
            <Modal
                title="新增文件夹"
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
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.file
    };
};

export default connect(mapStateToProps)(CreatePathModal);
