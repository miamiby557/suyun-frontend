import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal, notification} from "antd";
import {create, findByName, hideCreate, query, updateModel} from "./actions";
import FormEditor from '../../components/FormEditor';
import {formatVolume, formatWeight, getSingleDistrictLabel, parserVolume, parserWeight} from "../../lib/func";
import moment from 'moment';

class CreateModal extends PureComponent {
    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if ("整车" === values.transportType) {
                        if (values.vehicleType === undefined || values.vehicleType.length === 0) {
                            notification.error({
                                message: '运输方式为整车,车型必填'
                            });
                            return;
                        }
                    }
                    if ("零担" === values.transportType) {
                        if (values.calculateType === undefined || values.calculateType.length === 0) {
                            notification.error({
                                message: '运输方式为零担,计费方式必填'
                            });
                            return;
                        }
                    }
                    if ("体积" === values.calculateType) {
                        if (values.volume === undefined || values.volume.length === 0) {
                            notification.error({
                                message: '计费方式为体积,总体积必填'
                            });
                            return;
                        }
                    }
                    if ("重量" === values.calculateType) {
                        if (values.weight === undefined || values.weight.length === 0) {
                            notification.error({
                                message: '计费方式为重量,总重量必填'
                            });
                            return;
                        }
                    }
                    if (values.from.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(values.from.district);
                        if(values.from.district instanceof Array){
                            values.from.district = values.from.district[values.from.district - 1];
                        }
                        values.from.province = province;
                        values.from.city = city;
                        values.from.area = area;
                    }
                    if (values.to.district) {
                        const [province = '', city = '', area = ''] = getSingleDistrictLabel(values.to.district);
                        if(values.to.district instanceof Array){
                            values.to.district = values.to.district[values.to.district - 1];
                        }
                        values.to.province = province;
                        values.to.city = city;
                        values.to.area = area;
                    }
                    if (values.deliveryDate instanceof moment)
                        values.deliveryDate = values.deliveryDate.format("YYYY-MM-DD HH:mm:ss");
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            dispatch(hideCreate());
                            dispatch(query({}));
                            notification.success({
                                message: '创建成功'
                            });
                        } else {
                            notification.error({
                                message: '创建失败:' + action.message
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

    changeModel = model =>{
        const {dispatch} = this.props;
        dispatch(updateModel(model));
    };

    receiveManChange = (e)=>{
        console.info(e.target.value);
        const {dispatch, model} = this.props;
        dispatch(findByName({"name": e.target.value})).then(action => {
            if (action.error !== true) {
                console.info(action.payload);
                const profileList = action.payload;
                if (profileList !== undefined && profileList !== null) {
                    const profile = profileList[0];
                    if (profile !== undefined && profile !== null){
                        model.to = {};
                        model.to.district = profile.district;
                        model.to.province = profile.province;
                        model.to.city = profile.city;
                        model.to.street = profile.street;
                        model.to.fullAddress = profile.fullAddress;
                        model.to.contactMan = profile.contactMan;
                        model.to.contactPhone = profile.contactPhone;
                        model.to.company = profile.company;
                        console.info('update',model);
                        dispatch(updateModel(model));
                    }
                }
            }
        });
    };

    handleChange = (value, option) => {
        const {dispatch, model} = this.props;
        dispatch(findByName({"name": value})).then(action => {
            if (action.error !== true) {
                console.info(action.payload);
                const profileList = action.payload;
                if (profileList !== undefined && profileList !== null) {
                    const profile = profileList[0];
                    if (profile !== undefined && profile !== null){
                        model.from = {};
                        model.clientName = value;
                        model.from.district = profile.district;
                        model.from.province = profile.province;
                        model.from.city = profile.city;
                        model.from.street = profile.street;
                        model.from.fullAddress = profile.fullAddress;
                        model.from.contactMan = profile.contactMan;
                        model.from.contactPhone = profile.contactPhone;
                        model.from.company = profile.company;
                        console.info('update',model);
                        dispatch(updateModel(model));
                    }
                }
            }
        });
    };

    render() {
        const {loading, transportType, clientList, carrierList, vehicleType, calculateType, visible, model} = this.props;
        const clients = [];
        clientList && clientList.forEach(client => {
            clients.push({value: client, label: client});
        });
        const carriers = [];
        carrierList && carrierList.forEach(carrier => {
            carriers.push({value: carrier, label: carrier});
        });
        const schema = [
            {
                title: '订单信息',
                fields: [
                    {
                        field: 'clientName',
                        title: '客户',
                        type: 'listSelector',
                        controlProps: {
                            dataSource: clients,
                            onChange: this.handleChange
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
                        defaultValue: "SY" + moment().format('YYYYMMDDHHmmss'),
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入托运单号'}]
                        }
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
                        },
                        fieldOptions: {
                            rules: [{required: true, message: '请选择运输模式'}]
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
                        type: 'text'
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
                            dataSource: carriers
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
                        controlProps:{
                            onPressEnter:this.receiveManChange
                        },
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
                    onChange={this.changeModel}
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.transportOrder.create,
        ...state.common,
        clientList: state.transportOrder.list.clientList,
        carrierList: state.transportOrder.list.carrierList
    };
};

export default connect(mapStateToProps)(CreateModal);
