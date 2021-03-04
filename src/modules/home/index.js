import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd';
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
import DataSet from "@antv/data-set";
import {Pie} from 'ant-design-pro/lib/Charts';

import {getPrincipal} from "../../lib/identity";
import {carrierList, clientList, dashboard, generateDayFee, monthOrderCount} from "./actions";

class Home extends PureComponent {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(dashboard());
        dispatch(generateDayFee());
        dispatch(monthOrderCount());
        dispatch(carrierList());
        dispatch(clientList());
    }

    render() {
        const principal = getPrincipal();
        const {
            dashboardDto,
            orderItems,
            feeItems,
            monthClientOrderCount,
            monthCarrierOrderCount
        } = this.props;
        //客户单量占比
        const clientOrderCount = [];
        let clientOrderNumber = 0;
        monthClientOrderCount.forEach(orderItem => {
            const item = {};
            item.x = orderItem.name;
            item.y = orderItem.count;
            clientOrderNumber = clientOrderNumber + orderItem.count;
            clientOrderCount.push(item);
        });
        const carrierOrderCount = [];
        let carrierOrderNumber = 0;
        monthCarrierOrderCount.forEach(orderItem => {
            const item = {};
            item.x = orderItem.name;
            item.y = orderItem.count;
            carrierOrderNumber = carrierOrderNumber + orderItem.count;
            carrierOrderCount.push(item);
        });
        //单量
        const data = [];
        const cols = {
            value: {
                min: 0
            },
            day: {
                range: [0, 1]
            }
        };
        orderItems.forEach(orderItem => {
            const item = {};
            item.day = orderItem.day;
            item.value = orderItem.orderCount;
            data.push(item);
        });
        //毛利
        const dayFields = [];
        const fee = [];
        const receivable = {name: '应收'};
        const payable = {name: '应付'};
        const profit = {name: '毛利'};
        feeItems.forEach(feeItem => {
            const day = feeItem.day;
            dayFields.push(day);
            receivable[day] = feeItem.income;
            payable[day] = feeItem.payment;
            profit[day] = feeItem.profit;
            fee.push(receivable);
            fee.push(payable);
            fee.push(profit);
        });
        const ds = new DataSet();
        const dv = ds.createView().source(fee);
        dv.transform({
            type: "fold",
            fields: dayFields,
            key: "月天",
            value: "营收"
        });

        return (
            <div>
                <div>
                    <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="今日单量" bordered={false} style={{width: 300}}>
                            <p>{dashboardDto.todayOrderCount || 0} 单</p>
                        </Card>
                    </div>
                    {principal.role === "BOSS" && <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="今日应收" bordered={false} style={{width: 300}}>
                            <p>$ {dashboardDto.todayIncome || 0.00} RMB</p>
                        </Card>
                    </div>}
                    {principal.role === "BOSS" && <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="今日应付" bordered={false} style={{width: 300}}>
                            <p>$ {dashboardDto.todayPayment || 0.00} RMB</p>
                        </Card>
                    </div>}

                    <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="出港预警" bordered={false} style={{width: 300, color: 'red'}}>
                            <p>{dashboardDto.departureWarningCount || 0} 单</p>
                        </Card>
                    </div>
                    <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="配送预警" bordered={false} style={{width: 300, color: 'red'}}>
                            <p>{dashboardDto.deliveryWarningCount || 0} 单</p>
                        </Card>
                    </div>
                    <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="超时预警" bordered={false} style={{width: 300, color: 'red'}}>
                            <p>{dashboardDto.timeoutWarningCount || 0} 单</p>
                        </Card>
                    </div>
                    <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                        <Card title="未审批费用" bordered={false} style={{width: 300}}>
                            <p>{dashboardDto.submitFeeCount || 0} 单</p>
                        </Card>
                    </div>
                </div>
                {principal.role === "BOSS" && <div>
                    <div>
                        <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                            <Card title="当月客户单量占比" bordered={false} style={{width: 650}}>
                                <Pie
                                    total={() => (
                                        <span>{clientOrderNumber}单</span>
                                    )}
                                    data={clientOrderCount}
                                    height={294}
                                />
                            </Card>
                        </div>
                    </div>
                    <div>
                        <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                            <Card title="当月承运商单量占比" bordered={false} style={{width: 650}}>
                                <Pie
                                    total={() => (
                                        <span>{carrierOrderNumber}单</span>
                                    )}
                                    data={carrierOrderCount}
                                    height={294}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                }
                {principal.role === "BOSS" && <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                    <Card title="当月单量变化" bordered={false} style={{width: 1400}}>
                        <Chart height={400} data={data} scale={cols} forceFit>
                            <Axis name="day"/>
                            <Axis name="value"/>
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="line" position="day*value" size={2}/>
                            <Geom
                                type="point"
                                position="day*value"
                                size={4}
                                shape={"circle"}
                                style={{
                                    stroke: "#fff",
                                    lineWidth: 1
                                }}
                            />
                        </Chart>
                    </Card>
                </div>
                }
                {principal.role === "BOSS" && <div style={{background: '#ECECEC', padding: '30px', float: 'left'}}>
                    <Card title="当月营收变化" bordered={false} style={{width: 1400}}>
                        <Chart height={400} data={dv} forceFit>
                            <Axis name="月天"/>
                            <Axis name="营收"/>
                            <Legend/>
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom
                                type="interval"
                                position="月天*营收"
                                color={"name"}
                                adjust={[
                                    {
                                        type: "dodge",
                                        marginRatio: 1 / 32
                                    }
                                ]}
                            />
                        </Chart>
                    </Card>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.home
    };
};

export default connect(mapStateToProps)(Home);
