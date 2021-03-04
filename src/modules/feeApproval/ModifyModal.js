import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Modal, notification} from "antd";
import FormEditor from '../../components/FormEditor';
import {hideEdit, reject, query,passed} from "./actions";
import {formatMoney, parserMoney} from "../../lib/func";

class ModifyModal extends PureComponent {
    handleReject = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, model} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const updateModel = {...model, ...values,declareId:model.id};
                    dispatch(reject(updateModel)).then(action => {
                        if (action.error !== true) {
                            dispatch(hideEdit());
                            dispatch(query({}));
                            notification.success({
                                message: '保存成功'
                            });
                        }else{
                            notification.error({
                                message: '保存失败:'+action.message
                            });
                        }
                    });
                }
            })
        }
    };
    handlePass = () =>{
        const {dispatch,model} = this.props;
        dispatch(passed([model.id])).then(()=>{
            dispatch(hideEdit());
            dispatch(query({}));
        });
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
                        readonly:true,
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        }
                    }
                ]
            },{
                title: '应付信息',
                fields: [
                    {
                        field: 'transportChannel',
                        title: '走货渠道',
                        type: 'text',
                        readonly:true
                    },{
                        field: 'cindaNo',
                        title: '先达单号',
                        type: 'text',
                        readonly:true
                    }, {
                        field: 'feeItem',
                        title: '费用项目',
                        type: 'text',
                        readonly:true
                    }, {
                        field: 'money',
                        title: '金额',
                        type: 'formatNumber',
                        readonly:true,
                        controlProps: {
                            formatter: formatMoney,
                            parser: parserMoney,
                            min: 0
                        }
                    }, {
                        field: 'remark',
                        title: '备注',
                        type: 'textArea',
                        readonly:true
                    }
                ]
            }, {
                title: '驳回栏目',
                fields: [
                    {
                        field: 'rejectReason',
                        title: '驳回原因',
                        type: 'textArea',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入驳回原因'}]
                        }
                    }
                ]
            }];
        return (
            <Modal
                title="修改"
                visible={visible}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
                footer={[
                    <Button key="back" onClick={this.handleReject}>
                        驳回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handlePass}>
                        通过
                    </Button>,
                ]}
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
        ...state.feeApproval.modify
    };
};


export default connect(mapStateToProps)(ModifyModal);
