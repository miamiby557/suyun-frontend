import React from "react";
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";
import Toolbar from "./Toolbar";
import ModifyModal from "./ModifyModal";

const FeeDeclare = () => {
    return (
        <Card bordered={false}>
            <Filter/>
            <Toolbar/>
            <List/>
            <ModifyModal/>
        </Card>
    );
};

export default FeeDeclare;