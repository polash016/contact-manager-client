/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { ContactContext } from "../../Provider/ContactsProvider";

const EditContact = ({contact}) => {
  const {setContacts} = useContext(ContactContext)
  const handleEditContact = (event, id) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const data = { name, email, phone };
    axios
      .put(`https://contact-manager-server-seven.vercel.app/api/contacts/${id}`, data)
      .then((data) => {
        console.log(data.data)
        if(data.data.modifiedCount>0){
          setContacts(data.data)
          form.reset();
        document.getElementById(`${contact._id}`).close();
        toast('Contact updated successfully', {
          position: 'top-center',
          autoClose: 3000
        })
        }
        
        

      });
  };
  return (
    <div>
      <button
        className="text-2xl text-gray-600"
        onClick={() => document.getElementById(`${contact._id}`).showModal()}
        title="Edit Contact"
      >
        <CiEdit />
      </button>
      <dialog id={`${contact._id}`} className="modal w-fit h-full mx-auto">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center m-2">Edit Contact</h3>
          <div>
            <form onSubmit={()=>handleEditContact(event, contact._id)} className="mx-auto space-y-4">
              <div className="form-control">
                <input
                  type="text"
                  defaultValue={contact.name}
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  defaultValue={contact.email}
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Phone Number"
                  defaultValue={contact.phone}
                  name="phone"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Apply Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default EditContact;
