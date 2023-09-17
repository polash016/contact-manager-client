import { useContext } from "react";
import AddContact from "./AddContact";
import axios from "axios";
import { ContactContext } from "../../Provider/ContactsProvider";

const NavBar = () => {
  const { setContacts } = useContext(ContactContext);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    console.log(event.target.value);
    axios
      .get(`https://contact-manager-server-seven.vercel.app/api/contacts/sort/${selectedOption}`)
      .then((data) => {
        setContacts(data.data);
        console.log(data.data)
      });
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    axios.get(`https://contact-manager-server-seven.vercel.app/api/contacts/${search}`).then((data) => {
      console.log(data.data);
      setContacts(data.data);
    });
  };

  return (
    <div className="relative navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Contacts</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="flex gap-6 items-center">
          <select
            className="select select-primary w-full max-w-xs"
            onChange={handleSelectChange}
          >
            <option value="" selected disabled hidden>
              Sort
            </option>
            <option value="asc">Ascend</option>
            <option value="desc">Descend</option>
          </select>
          <AddContact />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
