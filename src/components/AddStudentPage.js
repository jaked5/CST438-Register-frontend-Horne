import {
    AppBar,
    Button,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import StudentCreatedSuccess from "./StudentCreatedSuccess";

function AddStudentPage() {
    const [studentAdded, setStudentAdded] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [returnedStudent, setReturnedStudent] = useState("");
    const [studentInfo, setStudentInfo] = useState({
        studentName: "",
        studentEmail: "",
    });

    const addStudent = async (studentInfo) => {
        const token = Cookies.get("XSRF-TOKEN");
        const response = await fetch(`${SERVER_URL}/student`, {
            method: "POST",
            headers: {
                "X-XSRF-TOKEN": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentInfo),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(
                `Student has been added: ${
                    studentInfo.studentName
                        ? studentInfo.studentName
                        : studentInfo.studentEmail
                }`,
                {
                    position: toast.POSITION.BOTTOM_LEFT,
                }
            );
            setReturnedStudent(data);
            setStudentAdded(true);

        } else {
            toast.error(`Error: ${data.message}`, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
            setReturnedStudent({});
            setStudentAdded(false);
        }
    };

    const handleAdd = () => {
        // addStudent(studentInfo);
        if (
            studentInfo.studentEmail === "" ||
            !isValidEmail(studentInfo.studentEmail)
        ) {
            setEmailError(true);
        } else {
            addStudent(studentInfo);
            handleClose();
        }
    };

    const handleClose = () => {
        setEmailError(false);
        setStudentInfo({
            studentName: "",
            studentEmail: "",
        });
    };

    const handleChange = (e) => {
        setStudentInfo({
            ...studentInfo,
            [e.target.name]: e.target.value,
        });
    };

    // regex from: https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
    const isValidEmail = (emailAddress) => {
        return /.+@.+\.[A-Za-z]+$/.test(emailAddress);
    };

    return (
        <div id="AddStudentPage">
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Add Student
                    </Typography>
                </Toolbar>
            </AppBar>
            {studentAdded && (
                <StudentCreatedSuccess returnedStudent={returnedStudent} />
            )}
            <TextField
                autoFocus
                margin="dense"
                value={studentInfo.studentName}
                onChange={handleChange}
                name="studentName"
                label="Name"
                sx={{"width": "70ch"}}
            />
            <TextField
                error={emailError}
                helperText={emailError && "Invalid email address format!"}
                autoFocus
                margin="dense"
                value={studentInfo.studentEmail}
                onChange={handleChange}
                name="studentEmail"
                label="Email(*)"
                sx={{"width": "70ch"}}
            />
            <Button id="submitStudentButton" onClick={handleAdd}>Submit</Button>
            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default AddStudentPage;