import React from 'react';

const ModalWindow = (mode = "") => {
    return (
        <div className = {["modalWindow", mode ? mode : null].join(" ")}>
            Modal
        </div>
    )
};

export default ModalWindow;