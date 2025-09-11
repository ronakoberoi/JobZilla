import { Button, PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../Services/UserService"
import { loginValidation } from "../../Services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"

const form={
  email:"",
  password:"",
}

const Login = () => {
    const [data, setData] = useState<{[key:string]:string}>(form);
    const [formError, setFormError] = useState<{[key:string]:string}>(form);
    const [opened, { open, close}] = useDisclosure(false);
    const navigate = useNavigate();
    
    const handleChange=(event:any)=>{
      setFormError({...formError, [event.target.name]:""});
      setData({...data, [event.target.name]:event.target.value})
    }

    const handleSubmit = () => {
    let valid=true, newFormError:{[key:string]:string}={};
    for(let key in data) {
      newFormError[key]=loginValidation(key, data[key]);
      if(newFormError[key])valid=false;
    }
    setFormError(newFormError);
    if(valid){
    loginUser(data).then((res) => {
      console.log(res);
      notifications.show({
        title: "Login Successfull",
        message: "Redirecting to Home Page....",
        withCloseButton: true,
        icon:<IconCheck style={{width: "90%", height: "90%" }}/>,
        color:"teal",
        withBorder:true,
        className:"!border-green-500"
      })
      setTimeout(()=>{
        navigate("/");
      }, 4000)
    }).catch((err) => {
      console.log(err.response.data);
      notifications.show({
        title: "Login Failed!",
        message: err.response.data.errorMessage,
        withCloseButton: true,
        icon:<IconX style={{width: "90%", height: "90%" }}/>,
        color:"red",
        withBorder:true,
        className:"!border-red-500"
      })
    });
    }
  };
  return<> <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">Create Account</div>
    <TextInput error={formError.email} value={data.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Your Email" />
    <PasswordInput error={formError.password} value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconAt style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Your Password" placeholder="Enter Password" />
    <Button onClick={handleSubmit} autoContrast variant="filled">Login</Button>
    <div className="mx-auto">Don't Have An Account? <span onClick={()=>{navigate("/signup");setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">SignUp</span></div>
    <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>
  </div>
  <ResetPassword opened={opened} close={close}/>
  </>
}

export default Login