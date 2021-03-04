import districts from "../lib/pca.js";

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const TIME_FORMAT = 'HH:mm';

export function convertDistrictToArray(district) {
    if (!district) {
        return null;
    } else if (district.length > 6) {
        return [
            district.substring(0, 2),
            district.substring(0, 4),
            district.substring(0, 6),
            district
        ];
    } else if (district.length > 4) {
        return [
            district.substring(0, 2),
            district.substring(0, 4),
            district.substring(0, 6)
        ];
    } else if (district.length > 2) {
        return [district.substring(0, 2), district.substring(0, 4)];
    } else return [district];
}


export function getDistrictLabel(code) {
    const codes = convertDistrictToArray(code);
    let children = districts;
    let label = "";
    codes.forEach((item, i) => {
        const found = children.find(district => district.value === item);
        if (found) {
            label += found.label;
            children = found.children;
        }
    });
    return label;
}

export function getSingleDistrictLabel(codes) {
    const labels = [];
    let children = districts;
    let label = '';
    if (typeof codes == "string") {
        codes = convertDistrictToArray(codes);
    }
    codes && codes instanceof Array &&
    codes.forEach((item) => {
        const found = children.find(district => district.value === item);
        if (found) {
            label = found.label;
            children = found.children || [];
            labels.push(label)
        }
    });
    return labels;
}

export function formatDate(date) {
    return date ? date.format(DATE_FORMAT) : null;
}

export function formatDateTime(datetime) {
    return datetime ? datetime.format(DATETIME_FORMAT) : null;
}

export function getStatusIndex(value, list = []) {
    let index = -1;
    list.forEach((item, i) => {
        if (item.value === value) {
            index = i;
        }
    });
    return index;
}

export function getStatusText(value, list = []) {
    const found = list.find(item => item.value === value);
    return found ? found.label : value;
}

export function getTextOfField(value, field, text, list = []) {
    let found = list.find(item => item[field] === value);
    return found ? found[text] : value;
}

export function formatMi(value) {
    return `${value}m`;
}

export function parserMi(value) {
    return value.replace('m', '');
}

export function formatItemCount(value) {
    return `${value}件`;
}

export function parserItemCount(value) {
    return value.replace('件', '');
}

export function formatDay(value) {
    return `${value}天`;
}

export function parserDay(value) {
    return value.replace('天', '');
}

export function formatVolume(value) {
    return `${value}m³`;
}

export function parserVolume(value) {
    return value.replace('m', '').replace('³', '');
}

export function formatWeight(value) {
    return `${value}kg`;
}

export function parserWeight(value) {
    return value.replace('k', '').replace('g', '');
}


export function formatPercent(value) {
    return `${value}%`;
}

export function parserPercent(value) {
    return value.replace('%', '');
}

export function formatMoney(value) {
    return `${value}元`;
}

export function parserMoney(value) {
    return value.replace('元', '');
}
