import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { saveTask } from "../services/TaskService";
import { Header } from "./Header";

export function TaskForm() {
    const [formData,setFormData]=useState({});
    const [isTaskCreated,setIsTaskCreated]=useState(false);
    const [isError,setIsError]=useState(false);
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response=await saveTask(formData);
        if (response.status==StatusCodes.CREATED) {
            setIsTaskCreated(true)
        }
        else{
            setIsError(true);
        }
        setTimeout(() => {
            setIsTaskCreated(false)
        }, 2000);
    }
    return (
        <>
            <Header alertText='Create a new task' />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' placeholder="Enter name" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name='description' placeholder="Enter description" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="date" name='deadline' onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" className="btn btn-success">Create Task</Button>
                </Form>
                {
                    isTaskCreated?<Header alertText='Task Created Successfully'></Header>:null
                }
                {
                    isError?<Container>
                        <Alert variant="danger">
                            Error in creating task.....please try again later
                        </Alert>
                    </Container>:null
                }
            </Container>

        </>

    )
}