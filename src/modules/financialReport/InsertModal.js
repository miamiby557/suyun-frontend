import React, {PureComponent} from "react";
import {Modal} from "antd";
import {hideInsert, insertFeeDeclare, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {connect} from "react-redux";

class InsertModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, selectedRowKeys} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(insertFeeDeclare({...values, financialReportId: selectedRowKeys[0]})).then(action => {
                        if (action.error !== true) {
                            dispatch(hideInsert());
                            dispatch(query({}));
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideInsert());
    };

    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'transportChannel',
                        title: '走货渠道',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入走货渠道'}]
                        }
                    },
                    {
                        field: 'upstairsFee',
                        title: '上楼费/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'daofuProcedureFee',
                        title: '倒付手续费/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'terminalFee',
                        title: '末端费用/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'remark',
                        title: '备注',
                        type: 'textArea'
                    }
                ]
            }];
        return (
            <Modal
                title="录入审批费用"
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
        ...state.financialReport.insertFeeDeclare,
        selectedRowKeys: state.financialReport.list.selectedRowKeys
    };
};

export default connect(mapStateToProps)(InsertModal);
