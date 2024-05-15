import { Route, Routes } from "react-router-dom"
import HomePage from '../homePage';
import WorkersList from "../workers/workersList";
import DialogAdding from "../workers/dialogAdding"
import AddRole from '../roles/AddRole'
const Body = () => {
    return <Routes>
        <Route path="/Add Employee" element={<DialogAdding />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Home Page" element={<HomePage />} />
        <Route path="/Edit Employee" element={<DialogAdding />} />
        <Route path="/All Employees" element={<WorkersList />} />
        <Route path="/Add Role" element={<AddRole />} />

    </Routes>
}

export default Body