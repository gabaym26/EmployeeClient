import * as React from 'react';
import AddWorker from './addWorkers.js'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useEffect, useContext } from 'react';
import { IsOpenned } from '../../App';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRoles } from '../service/service.js';

export default function DialogAdding(data) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const setIsOpened = useContext(IsOpenned).setIsOpened;
    const navigate = useNavigate();
    useEffect(() => {
        setOpen(true);
        //dispatch(getRoles());
    }, [data,]);
    useEffect(() => {
        dispatch(getRoles());
    }, []);
    const handleClose = () => {
        setIsOpened(false);
        setOpen(false);
       navigate("/All Employees")
    };

    return (
        <React.Fragment>
            <Dialog disableBackdropClick
                open={open}
                onClose={handleClose}
                onClick={(e) => e.stopPropagation()}
            >
                <AddWorker employee={data.employee}></AddWorker>
                <Button onClick={handleClose}>Cancel</Button>
            </Dialog>
        </React.Fragment>
    );
}


