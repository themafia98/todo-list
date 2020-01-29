import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

const ErrorShower = ({ message = "", cbClearError = null }) => {
    const [isShow, setShow] = useState(false);
    const [msg, setMsg] = useState(message);


    const clearError = useCallback(cbClearError, [msg]);

    useEffect(() => {
        let update = null;
        if (!isShow && message && !msg){
            setShow(true);
            setMsg(message);
            update = setTimeout(() => {
                setMsg("");
                setShow(false);
               if (clearError) clearError();
            },3000);
        }
        return () => {

          if (update) {
              clearTimeout(update);
              if (clearError) clearError();
          }
        };
    }, [message, cbClearError]);

    if (!isShow && !msg) return null;


    return (
        <div  
        className = {classnames({
            "error-shower": true,
            "visible": isShow,
            "hidden" : !isShow
        })}>
                {msg}
        </div>
    )
};

export default ErrorShower;