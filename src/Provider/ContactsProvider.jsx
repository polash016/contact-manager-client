/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const ContactContext = createContext(null);

const ContactsProvider = ({children}) => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = true; // Track whether the component is mounted
  
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://contact-manager-server-seven.vercel.app/api/contacts"
          );
  
          if (isMounted) {
            setContacts(response.data);
            console.log(response.data)
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
  
      if (!contacts.length) {
        fetchData();
      }
  
      return () => {
        isMounted = false;
      };
    }); 


    const authInfo = {
        contacts,
        setContacts,
        loading
    }
    return (
        <ContactContext.Provider value={authInfo}>
            {children}
        </ContactContext.Provider>
    );
}
export default ContactsProvider