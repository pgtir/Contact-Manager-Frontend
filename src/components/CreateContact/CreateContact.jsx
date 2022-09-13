import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import  {useParams} from "react-router-dom"
import { getAllContacts, createContact, updateContact } from '../../redux/contactFeatures/contactSlice';
import ContactForm from './ContactForm';

const CreateContact = ({onClose, isNewContact}) => {
    const {pageType} = useParams();
    const [fileData, setFileData] = useState("")
    const dispatch = useDispatch();
    const {currentContact,currentGroup, currentTag, isSuccess, isError, message} = useSelector(
      (state) => state.contacts
    )

    const navigate = useNavigate();
    const INITIAL_FORM_STATE = {
        name: `${isNewContact? "": ((currentContact && currentContact.name) ? currentContact.name : "")}`,
        description: `${isNewContact? "": ((currentContact && currentContact.description)? currentContact.description : "")}`,
        phone: `${isNewContact? "": ((currentContact && currentContact.phone) ? currentContact.phone : "")}`,
        email: `${isNewContact? "": ((currentContact && currentContact.email) ? currentContact.email : "")}`,
        address: `${isNewContact? "": ((currentContact && currentContact.address)? currentContact.address : "")}`,
        company: `${isNewContact? "": ((currentContact && currentContact.company)? currentContact.company : "")}`,
        notes: `${isNewContact? "": ((currentContact && currentContact.notes)? currentContact.notes : "")}`,
        image: `${isNewContact? "": ((currentContact && currentContact.image)? currentContact.image : "")}`,
      };

      const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email.").required("Email is required"),
        phone: yup.string().matches(phoneRegExp, 'Invalid Phone no.').required("Phone no. is required"),
      });
      const formik = useFormik({
        initialValues: {
          ...INITIAL_FORM_STATE
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          // alert(JSON.stringify(values, null, 2));
          let contactData = new FormData();
          contactData.append("name", values.name);
          contactData.append("description", values.description);
          contactData.append("phone", values.phone);
          contactData.append("email", values.email);
          contactData.append("address", values.address);
          contactData.append("company", values.company);
          contactData.append("notes", values.notes);
          contactData.append("category", "General");
          contactData.append("image", fileData);
          
          if(isNewContact) {
            dispatch(createContact(contactData))
            navigate("/contacts/all")
            if(pageType === "all")
            dispatch(getAllContacts({searchText: "", category: "General"}))
            if(pageType === "starred")
            dispatch(getAllContacts({searchText: "", category: "Starred"}))
            if(pageType === "important")
            dispatch(getAllContacts({searchText: "", category: "Important"}))
            if(pageType === `${currentTag}`)
            dispatch(getAllContacts({searchText: "", tag: `${currentTag}`}))
              if(pageType.split("-").join(" ") === `${currentGroup}`){
                dispatch(getAllContacts({searchText: "", group: `${currentGroup}`}))
              }
                  } else {
            dispatch(updateContact({id : currentContact._id, contactData}))
            if(pageType === "all") dispatch(getAllContacts({}))
            if(pageType === "starred") dispatch(getAllContacts({category: "Starred"}))
            if(pageType === "important") dispatch(getAllContacts({category: "Important"}))
          }
          onClose()
         
        },
      });
    //   const navigate = useNavigate();
  return (
    <ContactForm formik={formik}  onClose={onClose}
    fileData={fileData}
    setFileData={setFileData}
    isNewContact={isNewContact}
    />
  )
}

export default CreateContact