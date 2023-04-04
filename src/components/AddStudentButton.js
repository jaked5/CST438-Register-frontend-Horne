import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function AddStudentButton() {


    return (
        <div>
            <Link to="/addStudent">
                <Button id="addStudentButton" sx={{m:2}} variant="outlined">
                    Add Student
                </Button>
            </Link>
        </div>
    )
}

export default AddStudentButton