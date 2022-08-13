import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
export default function RenderHashtags({ index, name }) {
  const navigate = useNavigate();
  const hashtag = "#" + name;
  return (
    <Hashtag value={index}>
      <ReactTagify
        colors={"#ffffff"}
        tagClicked={(tag) => navigate(`/hashtag/${tag}`)}
      >
        <a>{hashtag}</a>
      </ReactTagify>
    </Hashtag>
  );
}

const Hashtag = styled.li`
  width: 100%;
  height: 31px;

  a {
    font-size: 19px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);

    &:hover {
      cursor: pointer;
    }
  }
`;
