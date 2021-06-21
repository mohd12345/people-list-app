import React, { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from "@material-ui/core";

export default function PeopleModal(props) {
    const { setOpenModal, fetchData, setSelectedData, data = {} } = props;
    const [content, setContent] = useState({ ...data });
    const keys = [
        { name: "First name", value: 'firstName' },
        { name: "Last name", value: 'lastName' },
        { name: "Email", value: 'email' },
        { name: "Phone", value: 'phone' },
        { name: "Address", value: 'address' },
    ];

    const handleSubmit = async () => {
        const isUpdate = content._id
        const path = isUpdate ? `${content._id}` : '';
        setSelectedData({});
        setOpenModal(false);
        fetchData({
            method: isUpdate ? "PUT" : "POST",
            id: path,
            body: content,
            refetch: true
        })
    };

    const handleChange = (event, field) => {
        setContent({
            ...content,
            [field]: event.target.value
        })
    }

    const handleClose = () => {
        setSelectedData({});
        setOpenModal(false);
    }

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{content._id ? 'Update people' : 'Add people'}</DialogTitle>
            <DialogContent>
                {keys.map((key) => (
                    <TextField
                        disabled={key.value === "email" && data[key.value]}
                        // required
                        margin="dense"
                        id={key.value}
                        label={key.name}
                        fullWidth
                        value={content && content[key.value]}
                        onChange={(event) => handleChange(event, key.value)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button isDisabled onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    {content._id ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
