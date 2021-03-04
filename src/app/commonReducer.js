const initialState = {
    roleList: [
        {value: "BOSS", label: "老板"},
        {value: "CUSTOMER", label: "客服"}
    ],
    transportType: [
        {value: '零担', label: '零担'},
        {value: '整车', label: '整车'},
        {value: '空运', label: '空运'}
    ],
    serviceType: [
        {value: '送货上门', label: '送货上门'},
        {value: '送货上楼', label: '送货上楼'},
        {value: '免费自提', label: '免费自提'}
    ],
    packageType: [
        {value: '木箱', label: '木箱'},
        {value: '托盘', label: '托盘'},
        {value: '纸箱', label: '纸箱'}
    ],
    calculateType: [
        {value: '体积', label: '体积'},
        {value: '重量', label: '重量'}
    ],
    vehicleType: [
        {value: '4.2', label: '4米2'},
        {value: '7.6', label: '7米6'},
        {value: '9.6', label: '9米6'},
        {value: '13.5', label: '13米5'},
        {value: '16.5', label: '16米5'},
        {value: '17.5', label: '17米5'}
    ],
    paymentType: [
        {value: '日结', label: '日结'},
        {value: '月结', label: '月结'}
    ],
    receiptStatusList: [
        {value: '未回', label: '未回'},
        {value: '已回', label: '已回'}
    ],
    departureWarning: [
        {value: '正常', label: '正常'},
        {value: '异常', label: '异常'}
    ],
    deliveryWarning: [
        {value: '正常', label: '正常'},
        {value: '异常', label: '异常'}
    ],
    timeoutWarning: [
        {value: '正常', label: '正常'},
        {value: '异常', label: '异常'}
    ],

    exceptionList: [
        {value: '破损', label: '破损'},
        {value: '丢失', label: '丢失'},
        {value: '受潮', label: '受潮'},
        {value: '服务', label: '服务'},
        {value: '操作', label: '操作'},
    ],
    feeDeclareStatus: [
        {value: 'SUBMITED', label: '已提交'},
        {value: 'PASSED', label: '已通过'},
        {value: 'DONE', label: '已通过'},
        {value: 'REJECTED', label: '已驳回'}
    ],
    trackType: [
        {value: '揽件', label: '揽件'},
        {value: '发往', label: '发往'},
        {value: '到达', label: '到达'},
        {value: '签收', label: '签收'},
        {value: '派送', label: '派送'},
        {value: '其他', label: '其他'}
    ],
    financialReportColumns: [
        {value: 'cindaNo', label: '先达单号',clickable:true},
        {value: 'clientName', label: '客户名称'},
        {value: 'createTime', label: '录单日期', type: 'dateTime'},
        {value: 'deliveryDate', label: '发货日期', type: 'dateTime'},
        {value: 'from.province', label: '始发地(省)'},
        {value: 'from.city', label: '始发地(市)'},
        {value: 'to.province', label: '目的地(省)'},
        {value: 'to.city', label: '目的地(市)'},
        {value: 'itemCount', label: '件数'},
        {value: 'volume', label: '总体积/m³', type: 'number'},
        {value: 'weight', label: '总重量/kg', type: 'number'},
        {value: 'inShippingFee', label: '运费', type: 'money'},
        {value: 'inDeliveryFee', label: '送货费', type: 'money'},
        {value: 'inUnloadFee', label: '卸货费', type: 'money'},
        {value: 'inPickupFee', label: '提货费', type: 'money'},
        {value: 'inSpecialFee', label: '特殊费用', type: 'money'},
        {value: 'inFeeAmount', label: '运费合计', type: 'money'},
        {value: 'transportType', label: '运输模式'},
        {value: 'vehicleType', label: '车型'},
        {value: 'transportChannel', label: '走货渠道'},
        {value: 'transportNo', label: '走货单号'},
        {value: 'outPickupFee', label: '提货费', type: 'money'},
        {value: 'outTransportFee', label: '运费', type: 'money'},
        {value: 'outShippingFee', label: '配送费', type: 'money'},
        {value: 'specialFee1', label: '特殊费用1'},
        {value: 'specialFee2', label: '特殊费用2'},
        {value: 'specialFee3', label: '特殊费用3'},
        {value: 'specialFee4', label: '特殊费用4'},
        {value: 'specialFee5', label: '特殊费用5'},
        {value: 'outFeeAmount', label: '应付金额', type: 'money'},
        {value: 'profit', label: '毛利润', type: 'money'},
        {value: 'profitPercent', label: '毛利率', type: 'percent'}
    ],
    orderColumns: [
        {value: 'cindaNo', label: '先达单号',clickable:true},
        {value: 'clientName', label: '客户名称'},
        {value: 'createTime', label: '录单日期', type: 'dateTime'},
        {value: 'deliveryDate', label: '发货日期', type: 'dateTime'},
        {value: 'consignNo', label: '托运单号'},
        {value: 'saleNo', label: '销售订单号'},
        {value: 'deliveryNo', label: '发货单号'},
        {value: 'from.province', label: '始发地(省)'},
        {value: 'from.city', label: '始发地(市)'},
        {value: 'to.province', label: '目的地(省)'},
        {value: 'to.city', label: '目的地(市)'},
        {value: 'to.contactMan', label: '收货人'},
        {value: 'to.contactPhone', label: '收货人电话'},
        {value: 'to.fullAddress', label: '收货地址'},
        {value: 'productCode', label: '品号'},
        {value: 'productName', label: '品名'},
        {value: 'packageType', label: '包装方式'},
        {value: 'itemCount', label: '件数'},
        {value: 'volume', label: '总体积/m³', type: 'number'},
        {value: 'weight', label: '总重量/kg', type: 'number'},
        {value: 'transportType', label: '运输模式'},
        {value: 'vehicleType', label: '车型'},
        {value: 'transportChannel', label: '走货渠道'},
        {value: 'transportNo', label: '走货单号'}
    ],
    feeDeclareColumns: [
        {value: 'cindaNo', label: '先达单号', clickable: true},
        {value: 'clientName', label: '客户'},
        {value: 'deliveryNo', label: '发货单号'},
        {value: 'province', label: '收货省'},
        {value: 'city', label: '收货市'},
        {value: 'receiveMan', label: '发货人'},
        {value: 'inCome', label: '应收运费', type: 'money'},
        {value: 'transportChannel', label: '走货渠道'},
        {value: 'createTime', label: '创建时间', type: 'dateTime'},
        {value: 'status', label: '状态', type: 'feeDeclareEnum'},
        {value: 'feeItem', label: '费用项目'},
        {value: 'money', label: '金额', type: 'money'},
        {value: 'person', label: '申请人'},
        {value: 'remark', label: '备注'}
    ],
    profileColumns:[
        {value: 'name', label: '名称', clickable: true},
        {value: 'province', label: '省'},
        {value: 'city', label: '市'},
        // {value: 'street', label: '区'},
        {value: 'fullAddress', label: '详细地址'},
        {value: 'contactMan', label: '联系人'},
        {value: 'contactPhone', label: '联系人电话'},
        {value: 'company', label: '公司'}
    ]
};

export default function modify(state = initialState, action) {
    if (action.error === true) {
        return state;
    }
    switch (action.type) {
        default:
            return state;
    }
}