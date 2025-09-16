import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService"
import { signupValidation } from "../../Services/FormValidation"
import { notifications } from "@mantine/notifications"

const SignUp = (props:any) => {
  const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
  }
  const [data, setData] = useState<{[key:string]:string}>(form);
  const [formError, setFormError] =useState<{[key:string]:string}>(form);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange=(event:any)=>{
    if(typeof(event)=="string") {
      setData({...data, accountType:event});
      return ""
    }
    let name=event.target.name, value=event.target.value;
    setData({...data, [name]:value});
    setFormError({...formError, [name]:signupValidation(name, value)})
    if(name==="password" && data.confirmPassword!==""){
      let err="";
      if(data.confirmPassword!==value) err= "Passwords Do Not Match...";
      setFormError({...formError, [name]:signupValidation(name, value), confirmPassword:err});
    }
    if(name==="confirmPassword"){
      if(data.password!==value) setFormError({...formError, [name]:"Passwords Do Not Match..."});
      else setFormError({...formError, confirmPassword: "" })
    }
  }
  const handleSubmit = () => {
    let valid=true, newFormError:{[key:string]:string}={};
    for(let key in data) {
      if(key==="accountType")continue;
      if(key!=="confirmPassword")newFormError[key]=signupValidation(key, data[key]);
      else if(data[key]!==data["password"])newFormError[key]="Passwords Do Not Match...";
      if(newFormError[key])valid=false;
    }
    setFormError(newFormError);
    if(valid===true){
      setLoading(true);
      registerUser(data).then((res) => {
      console.log(res);
      setData(form);
      notifications.show({
        title: "Registered Successfully",
        message: "Redirecting to Login Page....",
        withCloseButton: true,
        autoClose: 3000,
        icon:<IconCheck style={{width: "90%", height: "90%" }}/>,
        color:"teal",
        withBorder:true,
        className:"!border-green-500"
      })
      setTimeout(()=>{
        setLoading(false);
        navigate("/login");
      }, 2000)
      }).catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        notifications.show({
        title: "Registeration Failed!",
        message: err.response.data.errorMessage,
        withCloseButton: true,
        autoClose: 3000,
        icon:<IconX style={{width: "90%", height: "90%" }}/>,
        color:"red",
        withBorder:true,
        className:"!border-red-500"
        })
      });
    }
}
  return <><LoadingOverlay
    visible={loading}
    zIndex={1000}
    className="translate-x-1/2"
    overlayProps={{ radius: 'sm', blur: 2 }}
    loaderProps={{ color: 'brightSun.4', type: 'bars' }} /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">Create Account</div>
    <TextInput value={data.name} name="name" error={formError.name} onChange={handleChange} withAsterisk label="Full Name" placeholder="Your Name" />
    <TextInput value={data.email} name="email" error={formError.email} onChange={handleChange} withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Your Email" />
    <PasswordInput value={data.password} name="password" error={formError.password} onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Password" placeholder="Enter Password" />
    <PasswordInput value={data.confirmPassword} name="confirmPassword" error={formError.confirmPassword} onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
    <Radio.Group value={data.accountType} onChange={handleChange} label="You Are?" withAsterisk>
      <Group mt="xs">
        <Radio className="py-4 px-6 border has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg" value="APPLICANT" label="Applicant" />
        <Radio className="py-4 px-6 border has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg" value="EMPLOYER" label="Employer" />
      </Group>
    </Radio.Group>
    <Checkbox autoContrast label={<>I accept{' '}<Anchor> Terms & Conditions</Anchor></>} />
    <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
    <div className="mx-auto">Have An Account? <span onClick={()=>{navigate("/login");setFormError(form); setData(form)}} className="text-bright-sun-400 cursor-pointer hover:underline">Login</span></div>
  </div>
  </>
}

export default SignUp