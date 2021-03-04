const AUTHENTICATED_KEY = "IS_AUTHENTICATED";
const PRINCIPAL_KEY = "PRINCIPAL";

function getIsAuthenticated() {
    return JSON.parse(sessionStorage.getItem(AUTHENTICATED_KEY)) || false;
}

export function getPrincipal() {
    return JSON.parse(sessionStorage.getItem(PRINCIPAL_KEY)) || {};
}

function createIdentity(principal) {
    const {id,account, organization, token, role, permissions} = principal;
    const isAuthenticated = getIsAuthenticated();
    return {
        isAuthenticated,
        id,
        account,
        organization,
        token,
        role,
        permissions
    };
}

export const identity = createIdentity(getPrincipal());
export default identity;

export function login({id,account, organization, token, role, permissions}) {
    sessionStorage.setItem(AUTHENTICATED_KEY, JSON.stringify(true));
    sessionStorage.setItem(
        PRINCIPAL_KEY,
        JSON.stringify({id,account, organization, token, role, permissions})
    );
    Object.assign(identity, {
        id,
        account,
        organization,
        token,
        role,
        permissions,
        isAuthenticated: true
    });
}

export function logout() {
    sessionStorage.removeItem(AUTHENTICATED_KEY);
    sessionStorage.removeItem(PRINCIPAL_KEY);

    Object.assign(identity, {
        isAuthenticated: false,
        id:null,
        account: null,
        organization: null,
        token: null,
        role: null,
        permissions: []
    });

}

export function hasPermission(permission){
    return identity.permissions.indexOf(permission)>=0;
}
