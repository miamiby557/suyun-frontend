import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Form} from "antd";
import {query, updateCarrierName, updateClientName, updateFilter, updateTime} from "./actions";
import FilterForm from "../../components/FilterForm";
import {DATE_FORMAT} from "../../lib/func";

class Filter extends PureComponent {
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.createTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.createTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        dispatch(updateFilter(values));
        dispatch(query({...fields, page: 1, pageSize}));
    };

    createTimeChange = (dates, dateStrings) => {
        const {dispatch, filter} = this.props;
        filter.createTimeRange = [dates[0], dates[1]];
        dispatch(updateTime({createTimeStart: dateStrings[0], createTimeEnd: dateStrings[1]}));
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
                    initialValue: clientName
                }
            }, {
                key: 'createTimeRange',
                field: 'createTimeRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '创建日期',
                fieldOptions: {
                    initialValue: filter.createTimeRange
                },
                controlProps: {
                    onChange: this.createTimeChange
                }
            }, {
                key: 'consignNo',
                field: 'consignNo',
                type: 'text',
                expandable: true,
                width: 200,
                title: '托运单号',
                fieldOptions: {
                    initialValue: filter.consignNo
                }
            }, {
                key: 'transportChannel',
                field: 'transportChannel',
                type: 'text',
                expandable: true,
                width: 200,
                title: '走货渠道',
                fieldOptions: {
                    initialValue: carrierName
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
