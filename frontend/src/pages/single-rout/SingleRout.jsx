import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation, useGetUserByIdQuery } from "../../context/api/usersApi";
import { useEffect, useState } from "react";
import DeleteUser from "../../components/modal/DeleteUser";
import EditUser from "../../components/modal/EditUser";

const SingleRout = () => {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(id);
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    scroll(0, 0);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      navigate("/");
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    if (userIdToDelete) {
      await deleteUser(userIdToDelete);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center bg-gray-200 rounded-lg border border-gray-300 p-4">
              {/* Additional content can be added here */}
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{data?.payload?.fname} {data?.payload?.lname}</h1>
              <p className="text-lg text-gray-700"><span className="font-semibold">Username:</span> {data?.payload?.username}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Password:</span> {data?.payload?.password}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Gender:</span> {data?.payload?.gender}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Budget:</span> ${data?.payload?.budget}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Age:</span> {data?.payload?.age}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setEditUser(data?.payload)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setUserIdToDelete(id);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteUser
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
      <EditUser editUser={editUser} setEditUser={setEditUser} />
    </>
  );
};

export default SingleRout;
