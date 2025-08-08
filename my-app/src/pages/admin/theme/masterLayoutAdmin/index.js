import { memo } from "react";
import HeaderAdmin from "../headerAdmin";
import FooterAdmin from "../footerAdmin";

const masterLayoutAdmin = ({ children, ...props }) => {
    return (
        <div {...props}>
            <HeaderAdmin />
            {children}
            <FooterAdmin />
        </div>
    );
};

export default memo(masterLayoutAdmin);