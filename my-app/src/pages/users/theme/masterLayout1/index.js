import React from "react";
import { memo } from "react"

const masterLayout1 = ({ children }) => {
    return (
        <div className="master-layout-1">
            {children}
        </div>
    );
};

export default memo(masterLayout1);