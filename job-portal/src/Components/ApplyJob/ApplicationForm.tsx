import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationServices";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user=useSelector((state:any)=>state.user)
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const handlePreview = () =>{ 
        form.validate();
        window.scrollTo({top: 0, behavior: 'smooth'})
        if(!form.validate) return;
        setPreview(!preview);
    }
    const handleSubmit = async() =>{
        setSubmit(true);
        let resume:any=await getBase64(form.getValues().resume);
        let applicant={...form.getValues(), applicantId:user.id, resume:resume.split(',')[1]};
        applyJob(id, applicant).then((res)=>{
            setSubmit(false);
            successNotification("Success", "Application Submitted Successfully");
            navigate("/job-history")
        }).catch((err)=>{
            setSubmit(false);
            errorNotification("Error", err.response.data.errorMessage);
        })
    }
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
        name: '',
        email: '',
        phone: '',
        cgpa: '',
        resume: '',
        Introduction: ''
    },
    validate:{
        name: isNotEmpty('Name is required'),
        email: isNotEmpty('Email is required'),
        phone: isNotEmpty('Phone Number is required'),
        cgpa: isNotEmpty('CGPA is required'),
        resume: isNotEmpty('Resume is required'),
        Introduction: isNotEmpty('Introduction is required'),
    }
    });
  return <div>
    <LoadingOverlay className="!fixed"
    visible={submit}
    zIndex={1000}
    overlayProps={{ radius: 'sm', blur: 2 }}
    loaderProps={{ color: 'pink', type: 'bars'}}
    />
    <div className="text-xl font-semibold mb-5">Submit Your Application</div>
    <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]w-1/2">
        <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Full Name" placeholder="Enter Name" />
        <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Email" placeholder="Enter Email" />
        </div>
        <div className="flex gap-10 [&>*]w-1/2">
        <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Phone Number" placeholder="Enter Phone Number" hideControls min={0} max={9999999999} clampBehavior="strict"/>
        <TextInput {...form.getInputProps("cgpa")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="CGPA" placeholder="Enter CGPA" />
        </div>
        <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk
        leftSection={<IconPaperclip stroke={1.5} />}
        label="Attach Your CV" placeholder="Your CV..." leftSectionPointerEvents="none" />
        <Textarea {...form.getInputProps("Introduction")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk placeholder="Type something About Yourself" label="Introduce Yourself" autosize minRows={4} />
        {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>}
        {
            preview && <div className="flex gap-10 [&>*]:w-1/2">
                <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
                <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
            </div>
        }
    </div>
  </div>
}

export default ApplicationForm;