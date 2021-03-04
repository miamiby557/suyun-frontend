import React from 'react';
import {Card} from "antd";
import Filter from "./Filter";
import Toolbar from "./Toolbar";
import CreateModal from "./CreateModal";
import ModifyModal from "./ModifyModal";
import List from "./List";

const User = () => {
    return (
        <Card>
            <Filter/>
            <Toolbar/>
            <List/>
            <CreateModal/>
            <ModifyModal/>
        </Card>
    );
};

export default User;