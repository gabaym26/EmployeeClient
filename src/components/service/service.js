import axios from "axios";
import Swal from 'sweetalert2';
const apiBaseUrlEmployee = 'https://localhost:7247/api/Employees';
const apiBaseUrlRole = 'https://localhost:7247/api/Roles';

const getEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiBaseUrlEmployee);
      dispatch({ type: 'SET_EMPLOYEES', payload: response.data });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching employees.',
        icon: 'error'
      });
    }
  };
};

const getRoles = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(apiBaseUrlRole);
      dispatch({ type: 'SET_ROLE', payload: response.data });
    }
    catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching roles.',
        icon: 'error'
      });
    }
  };
};

const addEmployee = (employee) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(apiBaseUrlEmployee, employee);
      dispatch({ type: 'ADD_EMPLOYEE', payload: response.data });
      Swal.fire({
        title: 'Success!',
        text: 'Employee added successfully.',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while adding employee.',
        icon: 'error'
      });
    }
  };
};

const editEmployee = (userId, updatedEmployee) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${apiBaseUrlEmployee}/${userId}`, updatedEmployee, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: 'EDIT_EMPLOYEE', payload: response.data });
      Swal.fire({
        title: 'Success!',
        text: 'Employee edited successfully.',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while editing employee.',
        icon: 'error'
      });
    }
  };
};

const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${apiBaseUrlEmployee}/${employeeId}`);
      dispatch({ type: 'DELETE_EMPLOYEE', payload: employeeId });
      Swal.fire({
        title: 'Success!',
        text: 'Employee deleted successfully.',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting employee.',
        icon: 'error'
      });
    }
  };
};

const addRole = (role) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(apiBaseUrlRole, role);
      dispatch({ type: 'ADD_ROLR', payload: response.data });
      Swal.fire({
        title: 'Success!',
        text: 'Role added successfully.',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while adding role.',
        icon: 'error'
      });
    }
  };
};

const deleteRole = (role) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${apiBaseUrlRole}/${role}`);
      dispatch({ type: 'DELETE_ROLR', payload: role });
      Swal.fire({
        title: 'Success!',
        text: 'Role deleted successfully.',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There are workers that use this role,you cant delete it',
        icon: 'error'
      });
    }
  };
};
export { getEmployees, addEmployee, editEmployee, deleteEmployee, getRoles, addRole, deleteRole };