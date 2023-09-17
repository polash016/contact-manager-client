/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const ContactContext = createContext(null);

const ContactsProvider = ({children}) => {
    const [contacts, setContacts] = useState([])

        useEffect(() => {
            async function fetchData() {
              try {
                const response = await axios.get("https://contact-manager-server-seven.vercel.app/api/contacts");
                setContacts(response.data);
              } catch (error) {
                console.error(error);
              }
            }
        
           return () => fetchData();
          });


    const authInfo = {
        contacts,
        setContacts
    }
    return (
        <ContactContext.Provider value={authInfo}>
            {children}
        </ContactContext.Provider>
    );
}
export default ContactsProvider