import React from 'react'
import {getAllContacts, reset} from "../redux/contactFeatures/contactSlice"
import Layout from '../components/Layout'
import ContactList from '../components/ContactList'
import { Box, Card, cardClasses, Stack } from "@mui/material"
import ContactAppBar from '../components/ContactAppBar'
import ContactDetails from '../components/ContactDetails'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../redux/userFeatures/userSlice'
const selectedIds = []

function Contacts() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const {pageType} = useParams()
  const [display, setDisplay] = useState("none")
  const [clicked, setClicked] = useState("")
  let {contacts, currentTag, currentGroup, isLoading, isError, message} = useSelector(
    (state) => state.contacts
    )
    useEffect(() => {
      dispatch(getMe())
      if(pageType === "all")
      dispatch(getAllContacts({searchText, category: "General"}))
      if(pageType === "starred")
      dispatch(getAllContacts({searchText, category: "Starred"}))
      if(pageType === "important")
      dispatch(getAllContacts({searchText, category: "Important"}))
      if(pageType === `${currentTag}`)
      dispatch(getAllContacts({searchText, tag: `${currentTag}`}))
        if(pageType.split("-").join(" ") === `${currentGroup}`){
          dispatch(getAllContacts({searchText, group: `${currentGroup}`}))
        }
      //       return () => {
      //   dispatch(reset())
      // }
      }, [pageType, searchText,  currentGroup, currentTag, dispatch])
  return (
    <div>
        <Layout
        searchText={searchText}
        setSearchText={setSearchText}
        dispatch={dispatch}
        >
        <Box height="100%">
        <ContactAppBar
                searchText={searchText}
        selectedIds={selectedIds}
        clicked={clicked}
        setClicked={setClicked}
        dispatch={dispatch}
        pageType={pageType}
        />  
         <Card  sx={{boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",borderRadius: "20px", height: "100%",maxWidth: `calc(100vw - 24px)` }}>
            <Stack sx={{height: "100%"}}  direction="row">
            <Box sx={{position: "relative", overflowY: "scroll", '&::-webkit-scrollbar': {
            width: '0rem'
            }}} flex={1}>
            <ContactList
            selectedIds={selectedIds}
            dispatch={dispatch}
            pageType={pageType}
            isLoading={isLoading}
            searchText={searchText}
            />
            </Box>
            <Box flex={2} display={{xs: "none", md: "block"}} height="100%">
             <ContactDetails
              dispatch={dispatch}
             pageType={pageType}
             searchText={searchText}
            >
            </ContactDetails>
             </Box>
            </Stack>
         </Card>
        </Box>
        </Layout>
    </div>
  )
}

export default Contacts