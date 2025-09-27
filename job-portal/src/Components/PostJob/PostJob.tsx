import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import Experience from "../Profile/Experience";
import { errorNotification, successNotification } from "../../Services/NotificationServices";
import { postJob } from "../../Services/JobService";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate=useNavigate();
  const select=fields;
  const form=useForm({
    mode:'controlled',
    validateInputOnChange:true,
    initialValues:{
      jobTitle:'',
      company:'',
      experience:'',
      jobType:'',
      location:'',
      packageOffered:'',
      skillsRequired:[],
      about:'',
      description:content
    },
    validate:{
      jobTitle: isNotEmpty('JobTitile is required '),
      company: isNotEmpty('company is required '),
      experience: isNotEmpty('experience is required '),
      jobType: isNotEmpty('JobType is required '),
      location: isNotEmpty('location is required '),
      packageOffered: isNotEmpty('packageOfferd is required '),
      skillsRequired: isNotEmpty('skillsRequired is required '),
      about: isNotEmpty('about is required '),
      description: isNotEmpty('description is required '),
    }
  })
  const handlePost=()=>{
    form.validate();
    if(!form.isValid())return;
    postJob(form.getValues()).then((res)=>{
      successNotification("Success","Job Posted Successfully");
      navigate("/jobs");
    }).catch((err)=>{
      console.log(err);
      errorNotification("error", err.response.data.errorMessage);
    })
  }
  return <div className="w-4/5 mx-auto">
    <div className="text-2xl font-semibold mb-5">Post A Job</div>
    <div className="flex flex-col gap-5">
     <div className="flex gap-10 [&>*]:w-1/2">
      <SelectInput form={form} name="jobTitle"  {...select[0]} />
      <SelectInput form={form} name="company" {...select[1]} />
     </div>
      <div className="flex gap-10 [&>*]:w-1/2">
      <SelectInput form={form} name="experience" {...select[2]} />
      <SelectInput form={form} name="jobType" {...select[3]} />
     </div>
      <div className="flex gap-10 [&>*]:w-1/2">
      <SelectInput form={form} name="location" {...select[4]} />
      <NumberInput {...form.getInputProps('packageOffered')} label="Salary" withAsterisk min={1} max={300} clampBehavior="strict" placeholder="Enter Salary" hideControls />
     </div>
     <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter skills" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />
      <Textarea {...form.getInputProps('about')} withAsterisk className="my-3" label="About Job" placeholder="Enter about..." autosize minRows={3}/>
     <div>
      <div className="text-sm font-medium">Job Description<span className="text-red-500">*</span>
      </div>
      <TextEditor form={form} />
     </div>
     <div className="flex gap-4">
      <Button color="brightSun.4" onClick={handlePost} variant="light">Publish Job</Button>
      <Button color="brightSun.4" variant="outline">Save as Draft</Button>
     </div>
    </div>
  </div>
  
} 

export default PostJob