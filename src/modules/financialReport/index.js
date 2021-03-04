import React from "react";
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";
import Toolbar from "./Toolbar";
import InsertModal from "./InsertModal";
import RPAInsertModal from "./RPAInsertModal";
import ExportReceivableModal from "./ExportReceivableModal";

const FinancialReport = () => {
    return (
        <Card bordered={false}>
            <Filter/>
            <Toolbar/>
            <InsertModal/>
            <RPAInsertModal/>
            <ExportReceivableModal/>
            <List/>
        </Card>
    );
};

export default FinancialReport;