

/**
 *  Request methods to backend
 *  @default backend {string}: /api/
 */
 class Request {
    /**
     * @param {string} rest 
     */
    constructor(rest = "/api/"){
        this.rest = rest;
    }

    /**
     * @return {object} headers object
     */
    getHeaders(){
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }

    /**
     * @return {string} request method string
     */
    getMethod(){
        return "POST";
    }

    /**
     * @return {string} backend url
     */
    getRest(){
        return this.rest;
    }

    /**
     * Send request method
     * @param {Object} body obect 
     * @param {string} customMethod method string
     * @param {Object} customHeaders headers object
     */
    async sendRequest(body = {}, customMethod = null, customHeaders = null){
        try {
            return await fetch(this.getRest(), {
                method: customMethod ? customMethod : this.getMethod(),
                headers: customHeaders ? customHeaders : this.getHeaders(),
                body
            })
        } catch(err){
            console.error(err);
        }
    }
 }

 export default Request;