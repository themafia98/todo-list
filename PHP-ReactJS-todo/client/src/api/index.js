
import Request from '../Request';
import _ from 'lodash';
import moment from 'moment';

export const getRecordsList = async (payload) => {
    try {

        const { uid = "" } = payload;

        const body = JSON.stringify({
            "ACTION": "list", 
            "TYPE": "all",
            "DATA": { uid }
        });

        if (!uid){
            throw new Error("User not found");
        }

        const request = new Request();
        const res = await request.sendRequest(body);
            
        if (!res || !res.ok) {
            throw new Error("Invalid loading data");
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Invalid response body");
        }

        const resJson = await res.json();

        if (!resJson) throw new Error("Invalid parse json.");

        const list = resJson.response ? resJson.response : [];

        return list;

    } catch (err){
        console.error(err);
        return err;
    }
};

export const onUpdateItems = async payload => {
    const { 
        item = [], 
        uid 
    } = payload;

    
    if (!item || !Array.isArray(item) || !item.length){
        throw new TypeError("Item list invalid");
    }


    for (let i = 0; i < item.length; i++){

         const { 
            num, 
            id, 
            recordName, 
            time, 
            additionalNote = "", 
            position 
        } = item[i] || {};

        if (!num || !time || !id || !recordName || !additionalNote || _.isUndefined(position)){
            throw new Error("Not invalid item values");
        }

    }

    if (!uid){
        throw new Error("User not found");
    }

    const body = JSON.stringify({
        "ACTION": "edit",
        "TYPE": "update_list" ,
        "DATA": { item, uid }
    });

    const request = new Request();
    const res = await request.sendRequest(body, "POST");

    if (!res || !res.ok){
        throw new Error("Invalid request.");
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Invalid response body");
    }

    const resJson = await res.json();

    if (!resJson || !resJson.response){
         throw new Error("Invalid parse json.");
    }

    const list = resJson.response ? resJson.response : [];

    return list;

};

export const addRecord = async payload => {
        const { 
            listItem: { isValid = false, date = null, value = "", position } = {},
            uid
        } = payload;

        const dateParse = moment(date);
  
        if (!isValid || !dateParse.isValid() || !value || _.isUndefined(position)){
            throw new Error("Date / record name / position is not valid");
        }

        if (!uid){
            throw new Error("User not found");
        }

        const dateFormat = dateParse.format("DD-M-YYYY");

        const body = JSON.stringify({
            "ACTION": "add",
            "TYPE": "single_record" ,
            "DATA": { time: dateFormat, recordName: value, position, uid }
        });

        const request = new Request();
        const res = await request.sendRequest(body, "PUT");

        if (!res || !res.ok){
            throw new Error("Invalid request.");
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Invalid response body");
        }

        const resJson = await res.json();

        if (!resJson || !resJson.response){
             throw new Error("Invalid parse json.");
        }

        const list = resJson.response ? resJson.response : [];

        return list;
};

export const onEditRecord = async payload => {

        const { additionalNote = "", id = "", uid = "" } = payload || {};

        if (!id || !uid){
            throw new Error("Invalid popup data");
        }

        const body = JSON.stringify({
            "ACTION": "edit",
            "TYPE": "single_record__additionalNote" ,
            "DATA": { additionalNote, id, uid }
        });

        const request = new Request();
        const res = await request.sendRequest(body);

        if (!res || !res.ok) {
            throw new Error("Update error.");
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Invalid response body");
        }

        const resJson = await res.json();

        if (!resJson || !resJson.response){
             throw new Error("Invalid parse json.");
        }
        return resJson.response;
};

export const deleteRecord = async payload => {
        const { id = "", uid = "" } = payload || {};

        if (!id || !uid){
             throw new Error("Invalid delete id");
        }

        const body = JSON.stringify({
            "ACTION": "delete",
            "TYPE": "single_record" ,
            "DATA": { id, uid }
        });

        const request = new Request();
        const res = await request.sendRequest(body, "DELETE");

        if (!res || !res.ok) {
            throw new Error("Delete record failed, request fail.");
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Invalid response body");
        }

        const resJson = await res.json();

        if (!resJson || !resJson.response){
             throw new Error("Invalid parse json.");
        }

        return resJson.response;
};

export const fetchRegistration = async payload => {

    const { username = "", name = "", password = "" } = payload || {};

    if (!username || !name || !password){
        throw new Error("Bad data for registration");
    }

    const body = JSON.stringify({
        "ACTION": "reg",
        "TYPE": "default",
        "DATA": { username, password, name }
    });

    const request = new Request()

    const res = await request.sendRequest(body, "PUT");

    if (!res || !res.ok) {
        throw new Error("Registration failed, maybe the same account exist.");
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Invalid response body");
    }
    ;
    const resJson = await res.json();

    if (!resJson || !resJson.response){
         throw new Error("Invalid parse json.");
    }

    const resp = typeof resJson.response === 'string' ? 
                    JSON.parse(resJson.response) : resJson.response;
   
    if (resp && resp.status === "done")
    return resp;
    else throw new Error("bad response reg status");
 
};

export const fetchLogin = async payload => {

    const { username = "", password = "" } = payload || {};
    
    if (!username || !password){
        throw new Error("Bad data for registration");
    }

    const body = JSON.stringify({
        "ACTION": "login",
        "TYPE": "default",
        "DATA": { username, password }
    });

    const request = new Request()

    const res = await request.sendRequest(body);

    if (!res || !res.ok){
        throw new Error("Invalid username or password");
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Invalid response body");
    }

    const resJson = await res.json();

    if (!resJson || !resJson.response){
         throw new Error("Invalid parse json.");
    }

    return resJson.response;
};

export const fetchUserSession = async () => {

    const body = JSON.stringify({
        "ACTION": "get_session",
        "TYPE": "session",
        "DATA": {}
    });

    const request = new Request()

    const res = await request.sendRequest(body);

    if (!res || !res.ok){
        throw new Error("Invalid session");
    }
    
    const { uid = "", name = "" } = await res.json();

    return { uid, name };
};