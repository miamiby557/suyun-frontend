import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import {createTrack, hideCreateTrack} from "./actions";
import FormEditor from '../../components/FormEditor';
import moment from 'moment';

class CreateTrackModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, selectedRowKeys} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if(values.operateTime instanceof moment)
                        values.operateTime = values.operateTime.format("YYYY-MM-DD HH:mm:ss");
                    dispatch(createTrack({...values, orderId: selectedRowKeys[0]})).then(action => {
                        if (action.error !== true) {
                            dispatch(hideCreateTrack());
                            notification.success({
                                message: '创建成功'
                            });
                        }else{
                            notification.error({
                                message: '创建失败:'+action.message
                            });
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideCreateTrack());
    };

    render() {
        const {loading, trackType, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'operation',
                        title: '操作',
                        type: 'listSelector',
                        fieldOptions: {
                            rules: [{required: true, message: '请选择操作'}]
                        },
                        controlProps: {
                            dataSource: trackType
                        }
                    }, {
                        field: 'operateAddress',
                        title: '操作网点'
                    }, {
                        field: 'terminalAddress',
                        title: '目的网点',
                        type: 'text'
                    }, {
                        field: 'operator',
                        title: '操作人',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入操作人'}]
                        }
                    }, {
                        field: 'operateTime',
                        title: '操作时间',
                        type: 'datetime',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入操作时间'}]
                        },
                    }, {
                        field: 'remark',
                        title: '备注',
                        type: 'textArea'
                    }
                ]
            }
        ];
        return (
            <Modal
                title="新增"
                visible={visible}
                onOk={this.handleCreate}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
                width="80%"
            >
                <FormEditor
                    schema={schema}
                    column={3}
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
        ...state.transportOrder.createTrack,
        selectedRowKeys: state.transportOrder.list.selectedRowKeys,
        ...state.common
    };
};

export default connect(mapStateToProps)(CreateTrackModal);
