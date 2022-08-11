import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import {
  ContainerModal,
  Container,
  LeftContainer,
  RightContainer,
  Form,
  Input,
  Button,
  TextLink,
  TextContainer
} from "./LoginScreen";

export default function SignUpScreen() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const URL = "http://localhost:4000/sign-up";
  const navigate = useNavigate();

  const body = {
    email,
    password,
    username,
    profilePhoto,
  };
  function signUp(event) {
    event.preventDefault();
    setDisabled(true);
    setLoading(true);
    signUpSchema();
  }
  function signUpSchema() {
    if (username.length < 1) {
      setDisabled(false);
      setLoading(false);
      setErrorText("the field 'username' must be filled");
      setError(true);
      return;
    }
    if (email.length < 1) {
      setDisabled(false);
      setLoading(false);
      setErrorText("the field 'e-mail' must be filled");
      setError(true);
      return;
    } 
    if (password.length < 1) {
      setDisabled(false);
      setLoading(false);
      setErrorText("the field 'password' must be filled");
      setError(true);
      return;
    } 
    if (profilePhoto.length < 1) {
      setDisabled(false);
      setLoading(false);
      setErrorText("the field 'picture url' must be filled");
      setError(true);
      return;
    } 
    else {
      axios
        .post(URL, body)
        .then(() => {
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          setDisabled(false);
          setErrorText(
            `Account could not be created, there was an error in the server: ${err}`
          );
          setError(true);
        });
    }
  }
  function openModal() {
    if (error) {
      return (
        <ContainerModal onClick={() => setError(false)}>
          <h5>There was an error: {errorText}</h5>
          <h5>Click anywhere on this box to close it</h5>
        </ContainerModal>
      );
    }
  }

  const openError = openModal();

  return (
    <>
      {error ? openError : null}
      <Container error={error}>
        <LeftContainer>
          <TextContainer>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
          </TextContainer>
        </LeftContainer>
        <RightContainer>
          <Form onSubmit={signUp}>
            <Input
              placeholder="e-mail"
              type="email"
              autoComplete="email"
              disabled={disabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              autoComplete="new-password"
              disabled={disabled}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="username"
              type="text"
              autoComplete="off"
              disabled={disabled}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="picture url"
              type="text"
              autoComplete="off"
              disabled={disabled}
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
            <Button disabled={disabled} type="submit">
              {loading ? (
                <ThreeDots color="#fff" height={80} width={80} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
          <Link to={"/"}>
            <TextLink>Switch back to log in</TextLink>
          </Link>
        </RightContainer>
      </Container>
    </>
  );
}
