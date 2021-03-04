import {combineReducers} from "redux";

import home from "../modules/home/reducer.js";
import common from "../app/commonReducer.js";
import transportOrder from "../modules/transportOrder/reducer.js";
import feeApproval from "../modules/feeApproval/reducer.js";
import feeDeclare from "../modules/feeDeclare/reducer.js";
import profile from "../modules/profile/reducer.js";
import nameProfile from "../modules/nameProfile/reducer.js";
import financialReport from "../modules/financialReport/reducer.js";
import user from "../modules/user/reducer.js";
import client from "../modules/client/reducer.js";
import carrier from "../modules/carrier/reducer.js";
import file from "../modules/file/reducer.js";

const rootReducer = combineReducers({
    home,
    common,
    feeDeclare,
    feeApproval,
    transportOrder,
    profile,
    nameProfile,
    financialReport,
    user,
    client,
    file,
    carrier
});

export default rootReducer;
