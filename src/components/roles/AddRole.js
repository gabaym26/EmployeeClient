import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addRole } from '../service/service';
import { yupResolver } from "@hookform/resolvers/yup"
import { getRoles, deleteRole } from '../service/service.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import * as yup from "yup"
const schema = yup.object({
    Name: yup.string().required()
})
const AddRole = () => {
    const roles = useSelector(s => s.role.roles)
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) });
    const { errors } = formState;
    const dispatch = useDispatch();

    const columns = [
        { field: "name", headerName: "Name Role" },
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (params) => (
                <DeleteForeverIcon
                    color="primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    const rows = roles.map((r) => ({
        id: r.id,
        name: r.name,
    }));

    useEffect(() => {
        const fetchRoles = async () => {
            dispatch(getRoles());
        };
        fetchRoles();

    }, [roles]);
    const onSubmit = (data) => {
        dispatch(addRole(data));
    }

    const handleDelete = (id) => {
        dispatch(deleteRole(id));
        dispatch(getRoles());
    }
    return <>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className='spaceTop'>
            <TextField required id="outlined-required" label="Role Name"{...register("Name")} type="text" placeholder="Role Name" fullWidth />
            <p>{errors.Name?.message}</p>
            <Button type="submit">Save</Button>

        </form>

        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
        />
    </>
}
export default AddRole;