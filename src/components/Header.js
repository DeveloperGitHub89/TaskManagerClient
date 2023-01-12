import { Alert, Container } from "react-bootstrap";

export function Header(props) {
    return (
        <Container className="mt-5 text-center">
            <Alert>{props.alertText}</Alert>
            <p>{props.description}</p>
        </Container>
    )
}