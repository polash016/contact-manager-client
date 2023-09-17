import axios from "axios";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";
import { ContactContext } from "../../Provider/ContactsProvider";

const AddContact = () => {
  const {setContacts} = useContext(ContactContext)
    const handleAddContact = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const data = {name, email, phone};
        console.log(data);
        axios.post('https://contact-manager-server-seven.vercel.app/api/contacts', data)
        .then(data => {
         if(data.data.insertedId){
          setContacts(data.data)
          form.reset()
          document.getElementById('my_modal_3').close();
          toast('Contact Added Successfully', {
            position: 'top-center',
            autoClose: 3000
          })
         }
        });
      }
    return (
        <div>
            <button className="text-4xl" onClick={()=>document.getElementById('my_modal_3').showModal()} title="Add Contacts"><IoIosAdd /></button>
<dialog id="my_modal_3" className="modal w-fit mx-auto">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center m-2">Add Contact</h3>
    <div>
      <form onSubmit={handleAddContact} className="mx-auto space-y-4">
        <div className="form-control">
          <input type="text" placeholder="Name" name="name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Email" name="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Phone Number" name="phone" className="input input-bordered" />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
    </div>
</dialog>
        </div>
    );
};

export default AddContact;