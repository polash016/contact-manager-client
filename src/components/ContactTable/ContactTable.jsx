import axios from "axios";
import EditContact from "./EditContact";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FcEmptyTrash } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { ContactContext } from "../../Provider/ContactsProvider";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ContactTable = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const pdfRef = useRef();

  const handleToggleSelect = (id) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        return prevSelectedContacts.filter((contactId) => contactId !== id);
      } else {
        return [...prevSelectedContacts, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    selectedContacts.forEach((id) => {
      axios
        .delete(`https://contact-manager-server-seven.vercel.app/api/contacts/${id}`)
        .then(() => {
          toast(`Contact deleted.`);
          setSelectedContacts((prevSelectedContacts) =>
            prevSelectedContacts.filter((contactId) => contactId !== id)
          );
        })
        .catch((error) => {
          console.error(`Error deleting contact with ID ${id}:`, error);
        });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`https://contact-manager-server-seven.vercel.app/api/contacts/${id}`)
    .then((data) => {
      console.log(data.data)
     if(data.data.deletedCount > 0){
      setContacts(data.data);
      toast.success("Contact Deleted Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
     }
    });
  };

  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Contacts.pdf");
    });
  };

  return (
    <div>
      {/* <button onClick={handleDownloadPdf} title="Download As PDF" className="block mx-auto m-4 text-2xl"><BsDownload /></button> */}
      <button
        onClick={handleDownloadPdf}
        title="Download As PDF"
        className="btn btn-outline btn-success btn-sm block mx-auto m-4"
      >
        Download Pdf
      </button>
      <div ref={pdfRef} className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                {selectedContacts.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex text-3xl text-red-500"
                    title={`Delete ${selectedContacts.length} Items`}
                  >
                    <FaTrash />
                    <div className="badge absolute left-8 top-0">{selectedContacts.length}</div>
                  </button>
                )}
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contacts.length > 0 ? (
              contacts.map((contact) => {
                return (
                  <tr key={contact._id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact._id)}
                          onChange={() => handleToggleSelect(contact._id)}
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <EditContact contact={contact} />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="text-2xl"
                        title="Delete"
                      >
                        <FcEmptyTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>No Data!!</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
