import React, {PureComponent} from "react";
import {Modal, notification} from "antd";
import {hideInsertFee, insertFee, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {connect} from "react-redux";
import {formatMoney, parserMoney} from "../../lib/func";

class CreateModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, model} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(insertFee({...values, consignNo: model.consignNo})).then(action => {
                        if (action.error !== true) {
                            dispatch(hideInsertFee());
                            dispatch(query({}));
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
        dispatch(hideInsertFee());
    };

    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'consignNo',
                        title: '托运单号',
                        type: 'text',
                        readonly: true
                    },{
                        field: 'transportChannel',
                        title: '运输渠道',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入运输渠道'}]
                        }
                    }, {
                        field: 'upstairsFee',
                        title: '上楼费',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        }
                    }, {
                        field: 'daofuProcedureFee',
                        title: '倒付手续费',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        }
                    }, {
                        field: 'terminalFee',
                        title: '末端费用',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
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
                title="应付录入"
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

const
    mapStateToProps = state => {
        return {
            ...state.transportOrder.insertFee
        };
    };

export default connect(mapStateToProps)(CreateModal);
