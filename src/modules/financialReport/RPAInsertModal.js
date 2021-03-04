import React, {PureComponent} from "react";
import {Modal} from "antd";
import {hideRPAInsert, insertByRPA, query} from "./actions";
import FormEditor from '../../components/FormEditor';
import {connect} from "react-redux";

class RPAInsertModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, selectedRowKeys} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(insertByRPA({...values, financialReportId: selectedRowKeys[0]})).then(action => {
                        if (action.error !== true) {
                            dispatch(hideRPAInsert());
                            dispatch(query({}));
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideRPAInsert());
    };

    render() {
        const {loading, visible, model} = this.props;
        model.inFeeAmount = parseFloat(model.inFeeAmount).toFixed(2) + "元";
        model.outFeeAmount = parseFloat(model.outFeeAmount).toFixed(2) + "元";
        model.profit = parseFloat(model.profit).toFixed(2) + "元";
        model.profitPercent = model.profitPercent ? model.profitPercent : 0;
        model.profitPercent = parseFloat(model.profitPercent).toFixed(2) + "%";
        const schema = [
            {
                title: '应收费用信息',
                fields: [{
                    field: 'inShippingFee',
                    title: '运费/元',
                    type: 'number',
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }, {
                    field: 'inDeliveryFee',
                    title: '送货费/元',
                    type: 'number',
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }, {
                    field: 'inUnloadFee',
                    title: '卸货费/元',
                    type: 'number',
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }, {
                    field: 'inPickupFee',
                    title: '提货费/元',
                    type: 'number',
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }, {
                    field: 'inSpecialFee',
                    title: '特殊费用/元',
                    type: 'number',
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }, {
                    field: 'inFeeAmount',
                    title: '运费合计/元',
                    type: 'number',
                    readonly: true,
                    controlProps: {
                        precision: 2,
                        min: 0
                    }
                }
                ]
            }, {
                title: '应付费用信息',
                fields: [
                    {
                        field: 'outPickupFee',
                        title: '提货费/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'outTransportFee',
                        title: '运费/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'outShippingFee',
                        title: '配送费/元',
                        type: 'number',
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'specialFee1',
                        title: '特殊费用1',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'specialFee2',
                        title: '特殊费用2',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'specialFee3',
                        title: '特殊费用3',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'specialFee4',
                        title: '特殊费用4',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'specialFee5',
                        title: '特殊费用5',
                        type: 'text',
                        readonly: true
                    }, {
                        field: 'outFeeAmount',
                        title: '应付金额/元',
                        type: 'number',
                        readonly: true
                    }
                ]
            }, {
                title: '毛利信息',
                fields: [
                    {
                        field: 'profit',
                        title: '毛利润',
                        type: 'number',
                        readonly: true,
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }, {
                        field: 'profitPercent',
                        title: '毛利率',
                        type: 'number',
                        readonly: true,
                        controlProps: {
                            precision: 2,
                            min: 0
                        }
                    }
                ]
            }];
        return (
            <Modal
                title="费用更新"
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
        ...state.financialReport.insertByRPA,
        selectedRowKeys: state.financialReport.list.selectedRowKeys
    };
};

export default connect(mapStateToProps)(RPAInsertModal);
