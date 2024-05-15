import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useContext } from 'react';
import { IsOpenned } from '../../App';
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { addEmployee, editEmployee } from '../service/service.js';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployees, getRoles } from '../service/service.js';

const schema = yup.object({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    DateStartJob: yup.date().required(),
    Identity: yup.string().matches(/^[0-9]{9}$/, 'Identity must be exactly 9 digits').required(),
    BirthDate: yup.date().required(),
    Sex: yup.number().required(),
})
export default function AddWorker(data) {
    const roles = useSelector(s => s.role.roles)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [rolesEmployee, setRolesEmployee] = useState([{ RoleId: '', IsAdministrative: false, StartDate: '' }]); const [errorMessageEarlyDate, setErrorMessageEarlyDate] = React.useState('');
    const [errorMessageEndRoles, setErrorMessageEndRoles] = React.useState('');
    const setIsOpened = useContext(IsOpenned).setIsOpened;
    const [availableRoles, setAvailableRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            if (data && data.employee) {
                const mappedRoles = data.employee.roles.map((role) => {
                    return {
                        RoleId: role.role.id,
                        IsAdministrative: role.isAdministrative,
                        StartDate: role.startDate,
                    };
                });
                setRolesEmployee(mappedRoles);
            }
        };
        fetchRoles();
    }, []);
    useEffect(() => {
        const fetchRoles = async () => {
            console.log(roles)
            if (data && data.employee) {
                const available = roles.filter(
                    (role) => !rolesEmployee?.some((selectedRole) => selectedRole.RoleId === role.id)
                );
                setAvailableRoles(available)
            }
            else {
                console.log(roles)
                setAvailableRoles(roles);
            }
        };
        fetchRoles();
    }, [roles]);
    const handleClose = () => {
        setIsOpened(false);
        setOpen(false);
    };
    const { register, control, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) });
    const { errors } = formState;
    const { fields: Rolesfields, append: appendRole, remove: removeRole
    } = useFieldArray({ control, name: "Role" });

    const handleEdit = (employeeId, employee) => {
        dispatch(editEmployee(employeeId, employee));
        dispatch(getEmployees());
    };
    const handleAdding = (employee) => {
        dispatch(addEmployee(employee));
        dispatch(getEmployees());
    };
    const onSubmit = (dataToSend) => {
        const { ...rest } = dataToSend;
        const rolesArray = rolesEmployee.map(({ RoleId, IsAdministrative, StartDate }) => ({
            RoleId: RoleId,
            IsAdministrative: IsAdministrative,
            StartDate: StartDate
        }));
        const formJson = {
            ...rest,
            Roles: rolesArray,
            IsActive: true
        };
        if (data && data.employee) {

            handleEdit(data.employee.id, formJson);
        }
        else {
            handleAdding(formJson);
        }
        navigate("/All Employees")
        handleClose();
    }
    const handleAddRole = () => {
        const available = roles.filter(
            (role) => !rolesEmployee?.some((selectedRole) => selectedRole.RoleId === role.id)
        ); setAvailableRoles(available)
        setRolesEmployee([...rolesEmployee, { RoleId: 0, IsAdministrative: '', StartDate: '' }]);

        if (availableRoles.length == 0) {
            setErrorMessageEndRoles('You cant check twice the same role, delete it!');
        }
        else {
            setErrorMessageEndRoles('');
        }
    };
    const handleDeleteRole = (index) => {
        if (rolesEmployee[index]?.RoleId !== 0) {
            const roleToDelete = rolesEmployee[index];
            const newAvailable = [...availableRoles, roles.find(role => role.id === roleToDelete.RoleId)];
            setAvailableRoles(newAvailable);
        }
        const updatedRoles = rolesEmployee.filter((role, i) => i !== index);
        setRolesEmployee(updatedRoles);
        if (roles.length + 1 == rolesEmployee.length) {
            setErrorMessageEndRoles('');
        }
    };


    const handleRoleChange = (index, field, value) => {
        setRolesEmployee(prevRoles => {
            const updatedRoles = prevRoles.map((role, i) => {
                if (i === index) {
                    let updatedRole = { ...role, [field]: value };
                    if (field === "RoleId") {
                        let available = roles.filter(role => !prevRoles.some(selectedRole => selectedRole.RoleId === role.id));
                        updatedRole = { ...updatedRole, [field]: value, IsAdministrative: false, StartDate: '' };
                        setAvailableRoles(available);
                    }
                    return updatedRole;
                }

                return role;
            });

            return updatedRoles;
        });
    };


    return (<form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Worker</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To add worker to this system, please enter the worker's details here.
            </DialogContentText>
            <TextField required id="outlined-required" label="First Name"{...register("FirstName")} type="text" placeholder="first Name" fullWidth defaultValue={data?.employee ? data.employee.firstName : ""} />
            <p>{errors.FirstName?.message}</p>
            <TextField required id="outlined-required" label="Last Name" {...register("LastName")} placeholder="Last Name" type='text' fullWidth defaultValue={data?.employee ? data.employee.lastName : ""} />
            <p>{errors.LastName?.message}</p>
            <TextField required id="outlined-required" label="Identity" {...register("Identity")} placeholder="Identity" type='text' fullWidth defaultValue={data?.employee ? data?.employee.identity : ""} />
            <p>{errors.Identity?.message}</p>
            <TextField required id="outlined-required" defaultValue={dayjs(data?.employee ? data.employee.birthDate : "").format('YYYY-MM-DD')} label="Birth Date" type="date" {...register("BirthDate")} placeholder="Birth Date" fullWidth />
            <p>{errors.BirthDate?.message}</p>
            <TextField
                required
                defaultValue={dayjs(data?.employee ? data.employee.DateStartJob : "").format('YYYY-MM-DD')}
                id="outlined-required"
                label="Date Start Job"
                type="date"
                {...register("DateStartJob")}
                placeholder="Date Start Job"
                fullWidth
            />
            <p>{errors.DateStartJob?.message}</p>
            <div>Sex *</div>

            <Select value={data?.employee?.sex}
                id="outlined-required" label="Sex" {...register("Sex")} fullWidth required >
                <MenuItem key={1} value={1}>Male</MenuItem >
                <MenuItem key={2} value={2}>Female</MenuItem >
            </Select>
            <p>{errors.Sex?.message}</p>
            <h4>Roles</h4>
            <div>
                {rolesEmployee.map((role, index) => (
                    <div key={index}>
                        <div>Role *</div>
                        <Select
                            id="outlined-required"
                            label="Role"
                            value={role?.RoleId}
                            onChange={(e) => handleRoleChange(index, 'RoleId', e.target.value)}
                            fullWidth
                            required
                        >
                            {availableRoles.map(r => (
                                <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                            ))}
                        </Select>
                        <div>Is Administrative *</div>
                        <Select fullWidth
                            id="outlined-required"
                            label="Is Administrative"
                            value={role?.IsAdministrative}
                            onChange={(e) => handleRoleChange(index, 'IsAdministrative', e.target.value)}
                            required
                        >
                            <MenuItem key={1} value={true}>True</MenuItem>
                            <MenuItem key={2} value={false}>False</MenuItem>
                        </Select>
                        <TextField
                            id="outlined-required"
                            label="Start Date"
                            fullWidth
                            type="date"
                            value={dayjs(role?.StartDate).format('YYYY-MM-DD')}
                            onChange={(e) => {
                                const selectedDate = e.target.value;
                                if (selectedDate && dayjs(selectedDate).format('YYYY-MM-DD') < dayjs(schema.DateStartJob).format('YYYY-MM-DD')) {
                                    setErrorMessageEarlyDate('Selected date must be after the DateStartJob');
                                } else {
                                    setErrorMessageEarlyDate('');
                                    handleRoleChange(index, 'StartDate', selectedDate);
                                }
                            }}
                            required
                        />{errorMessageEarlyDate && errorMessageEarlyDate != '' && <div style={{ color: 'red' }}>{errorMessageEarlyDate}</div>}
                        <Button variant="contained" onClick={() => handleDeleteRole(index)}>Delete Role</Button>
                    </div>
                ))}
                {errorMessageEndRoles && errorMessageEndRoles != '' && <div style={{ color: 'red' }}>{errorMessageEndRoles}</div>}
                <Button variant="contained" onClick={handleAddRole}>Add Role</Button>
            </div>
        </DialogContent>

        <DialogActions>
            <Button type="submit">Save</Button>
        </DialogActions>
    </form >);
}