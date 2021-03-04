import React from "react";
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";
import Toolbar from "./Toolbar";
import CreateModal from "./CreateModal";
import CreateTrackModal from "./CreateTrackModal";
import TrackingModal from "./TrackingModal";
import InsertFeeModal from "./InsertFeeModal";
import CreateFeeModal from "../feeDeclare/CreateModal";
import ModifyModal from "./ModifyModal";
import "../../index.css";

const TransportOrder = () => {
    return (
        <Card bordered={false}>
            <Filter/>
            <Toolbar/>
            <CreateModal/>
            <TrackingModal/>
            <CreateTrackModal/>
            <ModifyModal/>
            <InsertFeeModal/>
            <CreateFeeModal/>
            <List/>
        </Card>
    );
};

export default TransportOrder;