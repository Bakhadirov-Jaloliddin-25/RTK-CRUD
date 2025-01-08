import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetUsersQuery,
} from "../redux/api/users";
import { IUser } from "../types";
import { useState } from "react";
import { FiTrash2, FiEdit2, FiMenu } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

const Home = () => {
  const { data } = useGetUsersQuery("");
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();
  const [createUser] = useCreateUserMutation();
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState<string>("");
  const [profession, setProfession] = useState<string>("");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleDeleteUser = async (id: string) => {
    setDeletingUserId(id);
    await deleteUser(id);
    setDeletingUserId(null);
  };

  const handleEditUser = async () => {
    if (!name || !age || !gender || !profession) {
      toast.error("Please fill all fields");
      return;
    }

    const updatedUser: Partial<IUser> = {
      name,
      age: Number(age),
      gender,
      profession,
    };

    await editUser({ id: editingUserId!, updatedUser });
    setEditingUserId(null);
    setName("");
    setAge("");
    setGender("");
    setProfession("");
  };

  const handleCreateUser = async () => {
    if (!name || !age || !gender || !profession) {
      toast.error("Please fill all fields");
      return;
    }

    const newUser: IUser = {
      id: Date.now().toString(),
      name,
      age: Number(age),
      gender,
      profession,
    };

    await createUser(newUser);

    setName("");
    setAge("");
    setGender("");
    setProfession("");
    setIsSidebarOpen(false);
  };

  const startEditUser = (user: IUser) => {
    setEditingUserId(user.id);
    setName(user.name);
    setAge(user.age.toString());
    setGender(user.gender);
    setProfession(user.profession);
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex">
      <div
        className={`w-[300px] h-full bg-slate-300 dark:bg-slate-800 duration-300 fixed top-18 left-0 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl text-white p-4">
          {editingUserId ? "Edit User" : "Create User"}
        </h2>
        <div className="p-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 rounded text-white"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 mb-2 rounded text-white"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-2 rounded text-white"
          />
          <input
            type="text"
            placeholder="Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-2 mb-4 rounded text-white"
          />
          <button
            onClick={editingUserId ? handleEditUser : handleCreateUser}
            className="w-full btn btn-outline btn-success"
          >
            {editingUserId ? "Update User" : "Create User"}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 right-4 text-gray-500 hover:text-slate-300 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className={`min-h-screen flex-1 bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200 p-8 duration-300 ${
          isSidebarOpen ? "ml-[300px]" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">Users List</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-700 text-white flex items-center justify-center px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mb-6"
        >
          <FiMenu className="mr-2" />
          {editingUserId ? "Cancel Edit" : "Create User"}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 duration-300">
          {data?.map((user: IUser) => (
            <div
              key={user.id}
              className="bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg p-6 duration-300 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Age: {user.age}
                </p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Gender: {user.gender}
                </p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
                  Profession: {user.profession}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditUser(user)}
                    className="btn btn-outline btn-info"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn btn-outline btn-error"
                    disabled={deletingUserId === user.id}
                  >
                    <FiTrash2 className="mr-2" />
                    {deletingUserId === user.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
              <div className="size-48 flex justify-center items-center bg-slate-500 dark:bg-slate-700 rounded-xl duration-300">
                <RxAvatar className="size-28 text-slate-300 dark:text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
