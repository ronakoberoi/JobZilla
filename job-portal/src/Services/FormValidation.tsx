const signupValidation=(name:string, value:string)=>{
    switch (name) {
        case "name":
            if(value.length===0) return "Name is Required.";
            return "";
        case "email":
            if(value.length===0) return "Email is Required.";
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Email is Invalid";
            return "";
        case "password":
            if(value.length===0) return "Password is Required.";
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) return "Password must contain 8 characters and one special character and digits...";
            return "";
        default:
            return "";
    }
}

const loginValidation=(name:string, value:string)=>{
    switch (name) {
        case "email":
            if(value.length===0) return "Email is Required.";
            return "";
        case "password":
            if(value.length===0) return "Password is Required.";
            return "";
        default:
            return "";
    }
}

export {signupValidation, loginValidation};