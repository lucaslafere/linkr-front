import styled from "styled-components";

export default function NewPosts({ num, display, update, setUpdate, setDisplay }) {
  return (
    <Container $display={display} display={""} onClick={() => {setUpdate(!update); setDisplay(!display) }}>
      You have {num} new posts
    </Container>
  );
}

const Container = styled.div`
  color: lightgray;
  background-color: #324a51;
  text-align: center;
  padding: 40px;
  font-family: "Oswald";
  font-size: 30px;
  border-radius: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: ${(props) => (props.$display || "none")};
  :hover{
    cursor: pointer;
  }
`;
