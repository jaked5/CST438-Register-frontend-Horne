import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import {SERVER_URL} from "../constants.js"
import Grid from "@mui/material/Grid";
import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false
            , student:{
                email: ""
                ,name: ""
                ,status: ""
                ,statusCode: 0
                ,student_id: 0
            }
            ,sname:"",semail:"",sstatus:"",sstatusCode:"",sstudent_id:0 };
    };

    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    handleClose = () => {
        this.setState( {open:false} );
    };

    setProp=(name,val)=>{
        switch(name){
            case "student_name":
                this.setState({student:{name: val}});
                this.setState({sname:val});
                break;
            case "student_email":
                this.setState({student:{email: val}});
                this.setState({semail:val});
                break;
            case "student_status":
                this.setState({student:{status: val}});
                this.setState({sstatus:val});
                break;
            case "student_statusCode":
                this.setState({student:{statusCode: val}});
                this.setState({sstatusCode:val});
                break;
        }
    };

    handleChange = (e) => {
        this .setProp(e.target.name,e.target.value);
    }

    handleAdd = () => {
        this.setState({student:{name:this.state.sname,email:this.state.semail,status:this.state.sstatus,statusCode:this.state.sstatusCode}},this.addStudent);
        this.handleClose();
    }

    render()  {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h7" color="inherit">
                            { "Student " + this.props.location.name + " " +this.props.location.email  + " " +JSON.stringify(this.props.location)+ " " +JSON.stringify(this.props.location.student) }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="App">
                    <div style={{width:"100%"}}>
                        {JSON.stringify(this.state)}
                    </div>

                    <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                        Add Student
                    </Button>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle>Add Student</DialogTitle>
                        <DialogContent  style={{paddingTop: 20}} >
                            <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChange}  />
                            <TextField fullWidth label="Student Email" name="student_email" onChange={this.handleChange}  />
                            <TextField fullWidth label="Student Status" name="student_status" onChange={this.handleChange}  />
                            <TextField fullWidth label="Student Status Code" name="student_statusCode" onChange={this.handleChange}  />
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    addStudent = () => {
        let student=this.state.student
        const token = Cookies.get("XSRF-TOKEN");
        console.log("line 103 of AddStudent.js says student is:",student);
        fetch(`${SERVER_URL}/student`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "X-XSRF-TOKEN": token  },
                body: JSON.stringify(student)
            })
            .then(res => {
                if (res.ok) {

                    toast.success("Student successfully added", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });


                } else {
                    toast.error("Error when adding", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error("Post http status =" + res.status);
                }return res;})


            .then(res =>res.json())
            .then(res => {
                this.setState({
                    student:{
                        email: res.email
                        ,name: res.name
                        ,status: res.status
                        ,statusCode: res.statusCode
                        ,student_id: res.student_id}
                    ,email: res.email
                    ,name: res.name
                    ,status: res.status
                    ,statusCode: res.statusCode
                    ,student_id: res.student_id
                });

            })



            .catch(err => {
                toast.error("Error when adding", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
            })
    }


    fetchStudent = () => {
        const token = Cookies.get("XSRF-TOKEN");

        fetch(`${SERVER_URL}/student?id=${this.props.student.id}`,
            {
                method: "GET",
                headers: { "X-XSRF-TOKEN": token }
            } )
            .then((response) => {
                console.log("FETCH RESP:"+response);
                return response.json();})
            .then((responseData) => {
                if (Array.isArray(responseData.student)) {
                    this.setState({
                        student: responseData.student,
                    });
                } else {
                    toast.error("Fetch failed.", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
            })
            .catch(err => {
                toast.error("Fetch failed.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
            })
    }
}

// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
    addStudent : PropTypes.func.isRequired
}

export default AddStudent;