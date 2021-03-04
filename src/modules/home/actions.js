import {createThunkAction} from "../../lib/redux-utils";
import {get} from "../../lib/http";

const path = "/home";
const ACTION_PREFIX = "DASHBOARD.";

export const dashboard = createThunkAction(ACTION_PREFIX + "DASHBOARD", () =>
    get(path + "/dashboard")
);
export const carrierList = createThunkAction(ACTION_PREFIX + "CARRIER_LIST", () =>
    get(path + "/carrierList")
);
export const clientList = createThunkAction(ACTION_PREFIX + "CLIENT_LIST", () =>
    get(path + "/clientList")
);
export const generateDayFee = createThunkAction(ACTION_PREFIX + "GENERATE_DAY_FEE", () =>
    get(path + "/generateDayFee")
);
export const monthOrderCount = createThunkAction(ACTION_PREFIX + "MONTH_ORDER_COUNT", () =>
    get(path + "/monthOrderCount")
);






