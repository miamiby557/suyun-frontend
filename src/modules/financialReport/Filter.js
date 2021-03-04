import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Form} from "antd";
import {query, updateCarrierName, updateClientName, updateTime} from "./actions";
import FilterForm from "../../components/FilterForm";
import {DATE_FORMAT} from "../../lib/func";

class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        if (fields.deliveryDateRange && fields.deliveryDateRange.length > 1) {
            fields.deliveryDateStart = fields.deliveryDateRange[0].format(DATE_FORMAT);
            fields.deliveryDateEnd = fields.deliveryDateRange[1].format(DATE_FORMAT);
            dispatch(updateTime({
                deliveryDateStart: fields.deliveryDateStart,
                deliveryDateEnd: fields.deliveryDateEnd
            }));
        }
        // dispatch(updateFilter(values));
        dispatch(query({...fields, page: 1, pageSize}));
    };

    deliveryDateChange = (dates, dateStrings) => {
        const {dispatch, filter} = this.props;
        filter.deliveryDateRange = [dates[0], dates[1]];
        this.setState({deliveryDateRange: filter.deliveryDateRange});
        dispatch(updateTime({deliveryDateStart: dateStrings[0], deliveryDateEnd: dateStrings[1]}));
    };

    clientChange = clientName => {
        const {dispatch} = this.props;
        dispatch(updateClientName(clientName));
    };
    carrierChange = carrierName => {
        const {dispatch} = this.props;
        dispatch(updateCarrierName(carrierName));
    };

    render() {
        const {loading, clientName, carrierName, clientList, carrierList, filter} = this.props;
        const clientObjList = [];
        clientList.forEach(client => {
            const item = {value: client.name, label: client.name};
            clientObjList.push(item);
        });
        const carrierObjList = [];
        carrierList.forEach(carrier => {
            const item = {value: carrier.name, label: carrier.name};
            carrierObjList.push(item);
        });
        const filterSchema = [
            {
                key: 'clientName',
                field: 'clientName',
                type: 'text',
                expandable: true,
                width: 200,
                title: '客户名称',
                fieldOptions: {
                    initialValue: this.state.clientName
                }
            }, {
                key: '2',
                field: 'deliveryDateRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '发货日期',
                fieldOptions: {
                    initialValue: this.state.deliveryDateRange
                },
                controlProps: {
                    onChange: this.deliveryDateChange
                }
            }, {
                key: 'cindaNo',
                field: 'cindaNo',
                type: 'text',
                expandable: true,
                width: 200,
                title: '先达单号',
                fieldOptions: {
                    initialValue: this.state.cindaNo
                }
            }, {
                key: 'transportChannel',
                field: 'transportChannel',
                type: 'text',
                expandable: true,
                width: 200,
                title: '走货渠道',
                fieldOptions: {
                    initialValue: this.state.carrierName
                }
            }
        ];
        return (
            <FilterForm schema={filterSchema} callback={this.handleSearch} loading={loading}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.financialReport.list,
        clientList: state.client.list.dataSource,
        carrierList: state.carrier.list.dataSource
    };
};

export default connect(mapStateToProps)(Form.create()(Filter));
