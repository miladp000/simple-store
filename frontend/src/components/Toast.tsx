import { toast } from "sonner"

const Toast = (type:string , message:string) => {
    switch(type){
        case'success':
            return toast.success(message , { 
                position: "top-center",
                style:{
                    backgroundColor:"#d9ffd6",
                    border: "1px solid green",
                    color:"black",
                    maxWidth: "90vw",     
                    width: "auto",
                    margin: "0 auto",
                    textAlign: "center",
                    wordBreak: "break-word",
                }
             });
        case 'warning':
            return toast.warning(message , { 
                position: "top-center",
                style:{
                    backgroundColor:"#ffd8d8",
                    border: "1px solid red",
                    color:"black",
                    maxWidth: "90vw",       
                    width: "auto",
                    margin: "0 auto",
                    textAlign: "center",
                    wordBreak: "break-word",
                }
             });
    }
}

export default Toast;
