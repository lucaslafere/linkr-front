import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import UserContext from "../Contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function LoginScreen() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "localhost:4000/login";
  const navigate = useNavigate();

  const { setToken } = useContext(TokenContext);
  const { setUserData } = useContext(UserContext);

  const body = {
    email,
    password,
  };

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    setLoading(true);
    requestLogin();
  }

  function requestLogin() {
    axios
      .post(URL, body)
      .then((res) => {
        setToken(res.data.token);
        setUserData(res.data.user);
        setLoading(false);
        navigate("/timeline");
      })
      .catch(() => {
        setDisabled(false);
        setLoading(false);
        setErrorText(
          "Não foi possível logar. Verifique seus dados e tente novamente, ou crie uma nova conta"
        );
        setError(true);
      });
  }

  function openModal() {
    if (error) {
      return (
        <ContainerModal onClick={() => setError(false)}>
          <h5>Houve um erro: {errorText}</h5>
          <h5>Clique em qualquer lugar da caixa para fechar esse pop-up</h5>
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
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </LeftContainer>
        <RightContainer>
          <Form onSubmit={login}>
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
              autoComplete="current-password"
              disabled={disabled}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={disabled} type="submit">
              {loading ? (
                <ThreeDots color="#fff" height={80} width={80} />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
          <Link to={"/sign-up"}>
            <TextLink>First time? Create an account!</TextLink>
          </Link>
        </RightContainer>
      </Container>
    </>
  );
}

const ContainerModal = styled.div``;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  padding: 8rem;

  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    color: #ffffff;
    font-size: 43px;
    width: 80%;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  background: #333333;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;
const Input = styled.input`
  width: 80%;
  height: 60px;

  border-radius: 6px;
  border: ${(props) =>
    props.disabled ? "1px solid #9f9f9f" : "1px solid #FFF"};
  padding: 1rem;

  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#9f9f9f" : "#fff")};

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 60px;
  /* vertical-align: middle; */
  color: #000000;

  ::placeholder {
    color: ${(props) => (props.disabled ? "#000" : "#9F9F9F")};
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    /* vertical-align: middle; */
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60px;
  border-radius: 6px;
  border: 1px solid #1877f2;
  background-color: #1877f2;
  padding: 1rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;

  color: #ffffff;
`;
const TextLink = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  text-decoration-line: underline;

  color: #ffffff;
`;
