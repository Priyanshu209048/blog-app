//isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data == null)
        return false;
    else 
        return true;
}

//doLogin => data set to local storage
export const doLogin = (data, next) => {
    localStorage.setItem('data', JSON.stringify(data));
    next();
}

//dologout => remove data from local storage
export const doLogout = (next) => {
    localStorage.removeItem('data');
    next();
}

//Get the current user
export const getCurrentUser = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem('data')).user;
    } else {
        return undefined;
    }
}

export const getToken = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem('data')).accessToken;
    } else {
        return null;
    }
}