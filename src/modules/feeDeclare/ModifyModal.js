import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import FormEditor from '../../components/FormEditor';
import {hideEdit, modify, query} from "./actions";
import {formatMoney, parserMoney} from "../../lib/func";
import {getPrincipal} from "../../lib/identity";

class ModifyModal extends PureComponent {
    handleModify = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const principal = getPrincipal();
            const account = principal.account;
            const {dispatch, model} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const updateModel = {...model, ...values};
                    updateModel.person = account;
                    dispatch(modify(updateModel)).then(action => {
                        if (action.error !== true) {
                            dispatch(hideEdit());
                            dispatch(query({}));
                            notification.success({
                                message: '修改成功'
                            });
                        } else {
                            notification.error({
                                message: '修改失败:' + action.message
                            });
                        }
                    });
                }
            })
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideEdit());
    };

    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '应收信息',
                fields: [
                    {
                        key: 'clientName',
                        field: 'clientName',
                        title: '客户',
                        type: 'text',
                        expandable: true,
                        width: 200,
                        readonly: true
                    }, {
                        field: 'deliveryNo',
                        title: '发货单号',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'from',
                        title: '始发地',
                        type: 'address',
                        readonly: true
                    }, {
                        field: 'to',
                        title: '目的地',
                        type: 'address',
                        readonly: true
                    }, {
                        field: 'vehicleType',
                        title: '车型',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'inCome',
                        title: '应收运费',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        }
                    }
                ]
            },
            {
                title: '应付信息',
                fields: [
                    {
                        key: 'transportChannel',
                        field: 'transportChannel',
                        title: '走货渠道',
                        type: 'text',
                        expandable: true,
                        readonly: true
                    }, {
                        field: 'cindaNo',
                        title: '先达单号',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'feeItem',
                        title: '费用项目',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入费用项目'}]
                        }
                    }, {
                        field: 'money',
                        title: '金额',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        },
                        fieldOptions: {
                            rules: [{required: true, message: '请输入费用项目金额'}]
                        }
                    }, {
                        field: 'remark',
                        title: '备注',
                        type: 'textArea'
                    }
                ]
            }];
        if ("REJECTED" === model.status) {
            const reason = {
                title: '驳回',
                fields: [
                    {
                        field: 'rejectReason',
                        title: '驳回原因',
                        type: 'textArea'
                    }
                ]
            };
            schema.push(reason);
        }
        return (
            <Modal
                title="修改"
                visible={visible}
                onOk={this.handleModify}
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
        ...state.feeDeclare.modify
    };
};


export default connect(mapStateToProps)(ModifyModal);
