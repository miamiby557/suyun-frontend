import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import FormEditor from '../../components/FormEditor';
import {hideEdit, modify, query} from "./actions";
import moment from 'moment';
import {formatVolume, formatWeight, getSingleDistrictLabel, parserVolume, parserWeight} from "../../lib/func";

class ModifyModal extends PureComponent {
    handleModify = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, model} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if ("零担" === values.transportType) {
                        if (values.volume.length === 0 || values.weight.length === 0) {
                            notification.error({
                                message: '运输方式为零担,总体积总重量必填'
                            });
                            return;
                        }
                    }
                    if ("零担" === values.transportType) {
                        if (values.calculateType.length === 0) {
                            notification.error({
                                message: '运输方式为零担,计费方式必填'
                            });
                            return;
                        }
                    }
                    const updateModel = {...model, ...values};
                    if (updateModel.deliveryDate instanceof moment)
                        updateModel.deliveryDate = updateModel.deliveryDate.format("YYYY-MM-DD HH:mm:ss");
                    if (updateModel.from.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(updateModel.from.district);
                        if(updateModel.from.district instanceof Array){
                            updateModel.from.district = updateModel.from.district[updateModel.from.district.length - 1];
                        }
                        updateModel.from.province = province;
                        updateModel.from.city = city;
                        updateModel.from.area = area;
                    }
                    if (updateModel.to.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(updateModel.to.district);
                        if(updateModel.to.district instanceof Array){
                            updateModel.to.district = updateModel.to.district[updateModel.to.district.length - 1];
                        }
                        updateModel.to.province = province;
                        updateModel.to.city = city;
                        updateModel.to.area = area;
                    }
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
        const {loading, transportType, clientList, carrierList, packageType, vehicleType, calculateType, visible, model} = this.props;
        console.info(model);
        const schema = [
            {
                title: '订单信息',
                fields: [
                    {
                        field: 'clientName',
                        title: '客户',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: clientList
                        },
                        fieldOptions: {
                            rules: [{required: true, message: '请选择客户'}]
                        }
                    }, {
                        field: 'deliveryDate',
                        title: '发货日期',
                        type: 'datetime',
                        fieldOptions: {
                            rules: [{required: true, message: '请选择发货日期'}],
                        }
                    }, {
                        field: 'cindaNo',
                        title: '先达单号',
                        type: 'text'
                    }, {
                        field: 'consignNo',
                        title: '托运单号',
                        type: 'text'
                    }, {
                        field: 'saleNo',
                        title: '销售订单号',
                        type: 'text'
                    }, {
                        field: 'deliveryNo',
                        title: '发货单号',
                        type: 'text'
                    }, {
                        field: 'transportType',
                        title: '运输模式',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: transportType
                        }
                    }, {
                        field: 'vehicleType',
                        title: '车型',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: vehicleType
                        }
                    }
                ]
            },
            {
                title: '订单明细',
                fields: [
                    {
                        field: 'productCode',
                        title: '品号',
                        type: 'text'
                    }, {
                        field: 'productName',
                        title: '品名',
                        type: 'text'
                    }, {
                        field: 'packageType',
                        title: '包装方式',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: packageType
                        }
                    }, {
                        field: 'calculateType',
                        title: '计费方式',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: calculateType
                        }
                    }, {
                        field: 'itemCount',
                        title: '件数',
                        type: 'number'
                    }, {
                        field: 'volume',
                        title: '总体积',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatVolume,
                            parser: parserVolume,
                            min: 0
                        }
                    }, {
                        field: 'weight',
                        title: '总重量',
                        type: 'formatNumber',
                        controlProps: {
                            formatter: formatWeight,
                            parser: parserWeight,
                            min: 0
                        }
                    }
                ]
            }, {
                title: '运输信息',
                fields: [
                    {
                        field: 'transportChannel',
                        title: '走货渠道',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: carrierList
                        }
                    }, {
                        field: 'transportNo',
                        title: '走货单号',
                        type: 'text'
                    }
                ]
            }, {
                title: '始发地址信息',
                fields: [
                    {
                        field: 'from.district',
                        type: 'districtSelector',
                        title: '行政区域',
                        fieldOptions: {
                            rules: [{required: true, message: '请选择行政区域'}]
                        },
                    },
                    {
                        field: 'from.company',
                        title: '发货单位',
                        type: 'text'
                    },
                    {
                        field: 'from.contactMan',
                        title: '联系人',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系人'}]
                        }
                    },
                    {
                        field: 'from.contactPhone',
                        title: '联系电话',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系电话'}]
                        }
                    }, {
                        field: 'from.fullAddress',
                        title: '详细地址',
                        type: 'textArea',
                        fieldOptions: {
                            rules: [{required: true, message: '详细地址'}]
                        }
                    }
                ]
            },
            {
                title: '收货地址信息',
                fields: [
                    {
                        field: 'to.district',
                        type: 'districtSelector',
                        title: '行政区域',
                        fieldOptions: {
                            rules: [{required: true, message: '请选择行政区域'}]
                        },
                    },
                    {
                        field: 'to.company',
                        title: '收货单位',
                        type: 'text'
                    },
                    {
                        field: 'to.contactMan',
                        title: '联系人',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系人'}]
                        }
                    },
                    {
                        field: 'to.contactPhone',
                        title: '联系电话',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入联系电话'}]
                        }
                    },
                    {
                        field: 'to.fullAddress',
                        title: '详细地址',
                        type: 'textArea',
                        fieldOptions: {
                            rules: [{required: true, message: '详细地址'}]
                        }
                    }
                ]
            },
            {
                title: '其他信息',
                fields: [
                    {
                        field: 'remark',
                        title: '订单备注',
                        type: 'textArea'
                    }
                ]
            }];
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
        ...state.transportOrder.modify,
        ...state.common,
        clientList: state.transportOrder.list.clientList,
        carrierList: state.transportOrder.list.carrierList
    };
};


export default connect(mapStateToProps)(ModifyModal);
