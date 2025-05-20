import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);
    return null;

};

export default ScrollToTop ;


//this file is use to animationly and as fully scroll the pages 