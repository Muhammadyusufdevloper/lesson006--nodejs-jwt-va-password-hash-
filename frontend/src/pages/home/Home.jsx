import { useState } from "react";
import CreateUser from "../../components/modal/CreateUser"
import Users from "../../components/users/Users"

const Home = () => {
    const [isOpen, setIsOpen] = useState(null);
    return (
        <>
            <Users setIsOpen={setIsOpen} isOpen={isOpen} />
            <CreateUser setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}

export default Home