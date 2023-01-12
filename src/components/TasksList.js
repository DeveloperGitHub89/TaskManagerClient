import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { getTasksFromServer, markTaskAsCompleted } from "../services/TaskService";
import { Header } from "./Header";

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    const getTasks = async (url) => {
        const response = await getTasksFromServer(url);
        setTasks(response.data);
        console.log(response.data);
    }
    useEffect(() => {
        getTasks('all');
    }, []);

    return (
        <>
            <Header alertText='List of all the tasks'></Header>

            <Container>
                <Dropdown onSelect={(k, e) => {
                    console.log(e.target.innerHTML);
                    getTasks(e.target.innerHTML)
                }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select tasks
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item>Pending</Dropdown.Item>
                        <Dropdown.Item>Completed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Container className="mt-5">
                <Row>
                    {
                        tasks.map((t) => {
                            return (
                                <Col lg={4}>
                                    <Card>
                                        <Card.Body>
                                            <Alert variant={t.isCompleted ? "success" : "danger"}>
                                                {t.isCompleted ? "Completed" : "Pending"}
                                            </Alert>
                                            <Card.Title>{t.name}</Card.Title>
                                            <Card.Text>
                                                {t.description}
                                                <p>{t.createdOn}</p>
                                            </Card.Text>
                                            {
                                                !t.isCompleted ?
                                                    <Button variant="primary" className="btn-sm" onClick={async () => {
                                                        await markTaskAsCompleted(t._id)
                                                        getTasks();
                                                    }}>Complete</Button>
                                                    : null
                                            }
                                            &nbsp;&nbsp;&nbsp;
                                            <Button variant='danger' className="btn-sm">Remove</Button>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>

            </Container>
        </>
    );
}