import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Form} from "antd";
import {query} from "./actions";
import {DATE_FORMAT} from "../../lib/func";
import FilterForm from "../../components/FilterForm";

class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        if (fields.deliveryDateRange && fields.deliveryDateRange.length > 1) {
            fields.deliveryDateStart = fields.deliveryDateRange[0].format(DATE_FORMAT);
            fields.deliveryDateEnd = fields.deliveryDateRange[1].format(DATE_FORMAT);
        }
        if (fields.departureWarning === '正常')
            delete fields.departureWarning;
        if (fields.deliveryWarning === '正常')
            delete fields.deliveryWarning;
        if (fields.timeoutWarning === '正常')
            delete fields.timeoutWarning;
        delete fields.deliveryDateRange;
        dispatch(query({...fields, page: 1, pageSize}));
    };

    render() {
        const {loading} = this.props;
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
                key: 'transportChannel',
                field: 'transportChannel',
                type: 'text',
                expandable: true,
                width: 200,
                title: '走货渠道',
                fieldOptions: {
                    initialValue: this.state.transportChannel
                }
            }, {
                key: '2',
                field: 'deliveryDateRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '发货日期',
                fieldOptions: {
                    initialValue: this.state.deliveryDateRange
                }
            }, {
                key: '3',
                field: 'consignNo',
                type: 'text',
                expandable: true,
                title: '托运单号',
                fieldOptions: {
                    initialValue: this.state.consignNo
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
        ...state.transportOrder.list,
        ...state.common,
        clientList: state.client.list.dataSource,
        carrierList: state.carrier.list.dataSource
    };
};

export default connect(mapStateToProps)(Form.create()(Filter));
