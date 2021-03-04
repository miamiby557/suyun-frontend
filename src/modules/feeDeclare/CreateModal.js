import React, {PureComponent} from "react";
import {Modal, notification} from "antd";
import {create, hideCreate, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {connect} from "react-redux";
import {formatMoney, parserMoney} from "../../lib/func";
import {getPrincipal} from "../../lib/identity";

class CreateModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch} = this.props;
            const principal = getPrincipal();
            const account = principal.account;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.person = account;
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            dispatch(hideCreate());
                            dispatch(query({}));
                            notification.success({
                                message: '申报成功'
                            });
                        } else {
                            notification.error({
                                message: '申报失败:' + action.message
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
                        type: 'text',
                        expandable: true,
                        width: 200,
                        title: '走货渠道',
                        readonly: true
                    }, {
                        field: 'cindaNo',
                        title: '先达单号',
                        type: 'text',
                        readonly: true,
                        fieldOptions: {
                            rules: [{required: true, message: '请输入托运单号'}]
                        }
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

const
    mapStateToProps = state => {
        return {
            ...state.feeDeclare.create,
            carrierList: state.carrier.list.dataSource
        };
    };

export default connect(mapStateToProps)(CreateModal);
