import { Zoom, toast } from "react-toastify";


toast.configure();
const notify = (message, type) => { 

    const notifyObject = {
        info: ()=>toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            toastId: "01",
            transition: Zoom,
        }),
    
        success: ()=>toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            toastId: "02",
            transition: Zoom,
        }),
    
        warn: ()=>toast.warn(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            toastId: "03",
            transition: Zoom,
        }),
    
        error: ()=>toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            toastId: "04",
            transition: Zoom,
        })


    }[type]()


};


export default notify;