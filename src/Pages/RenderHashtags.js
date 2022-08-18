import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function RenderHashtags({ index, name }) {
  const navigate = useNavigate();
  const hastag = name.substring(1,name.length);

  return (
    <Hashtag value={index}>
        <a onClick={() => navigate(`/hashtag/${hastag}`)}>{name}</a>
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

  @media (max-width: 1000px) {
    display: none;
  }
`;
