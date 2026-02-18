import { Button, TextInput } from "@mantine/core";
import fields from "../../Data/Profile"
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationServices";

const CertiInput = (props:any) => {
    const dispatch=useDispatch();
    const form=useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
        name: '',
        issuer: '',
        issueDate: new Date(),
        certificateId: '',
    },
    validate:{
        name:isNotEmpty("Name is Required"),
        issuer:isNotEmpty("Issuer is Required"),
        issueDate:isNotEmpty("Issue Date is Required"),
        certificateId:isNotEmpty("Certificate ID is Required"),
    }
})
    const handleSave=()=>{
      form.validate();
      if(!form.isValid()) return;
      let certi=[...profile.certifications];
      certi.push(form.getValues());
      const last = certi[certi.length - 1];
      last.issueDate = last.issueDate ? new Date(last.issueDate).toISOString() : null;
      let updatedProfile={...profile, certifications:certi};
      props.setEdit(false);
      dispatch(changeProfile(updatedProfile));
      successNotification("Success", "Experience Added Successfully");
    }
    const select = fields;
    const profile=useSelector((state:any)=>state.profile)
  return <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold">Add Certificate</div>
    <div className="flex gap-10 [&>*]:w-1/2">
    <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter Title..." />
    <SelectInput form={form} name="issuer" {...select[1]} />
    </div>
    <div className="flex gap-10 [&>*]:w-1/2">
    <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issue Date" placeholder="Pick Date"/>
    <TextInput {...form.getInputProps("certificateId")} withAsterisk label="Certificate ID" placeholder="Enter ID" />
    </div>
    <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
        <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
    </div>
  </div>
}

export default CertiInput