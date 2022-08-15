import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReactTagify } from "react-tagify";
import UserContext from "../Contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import RenderUserPosts from "../Pages/RenderUserPosts.js";

export default function FeedScreen() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("MY_TOKEN");
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedMessage, setFeedMessage] = useState("Loading");
  const URL = "https://projeto17-linkrback.herokuapp.com/posts";
  //const URL = "http://localhost:4100/posts";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(URL, config);
    promise
      .then((res) => {
        setPosts([...res.data]);
        if (res.data.length === 0) setFeedMessage("There are no posts yet");
        // console.log(res.data);
      })
      .catch((error) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
      );
  }, [posts]);

  function publishPost() {
    if (!url) {
      return window.alert("url não pode estar vazia!");
    }

    setLoading(true);
    const body = {
      url,
      description,
    };

    const promise = axios.post(URL, body, config);
    promise
      .then((res) => {
        setLoading(false);
        setDescription("");
        setUrl("");
      })
      .catch(() => {
        window.alert("Houve um erro ao publicar seu post, tente novamente.");
        setLoading(false);
      });
  }

  return (
    <Container>
      <TopBar>
        <h1>linkr</h1>
        <div>
          <ion-icon name="chevron-down-outline"></ion-icon>
          <img src={userData.profilePhoto} alt="profile" />
        </div>
      </TopBar>

      <Feed>
        <h3>timeline</h3>
        <NewPost>
          <img src={userData.profilePhoto} alt="profile" />
          <Box fontColor={"#9f9f9f"}>
            <p>What are you going to share today?</p>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://"
              disabled={loading}
            />
            <Input
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Awesome article about javascript"
            />
            <Button disabled={loading} onClick={publishPost}>
              {loading ? "Publishing..." : "Publish"}
            </Button>
          </Box>
        </NewPost>
        {posts.length === 0 ? (
          <span>{feedMessage}</span>
        ) : (
          <Post>
                <ul>
                    {posts.map(({url,description,username,profilePhoto,urlDescription,urlImage,urlTitle,id},index) => (
                        <RenderUserPosts 
                            index={index}
                            likes= {99}
                            url={url}
                            description={description}
                            username={username}
                            profilePhoto={profilePhoto}
                            urlDescription={urlDescription}
                            urlImage={urlImage}
                            urlTitle={urlTitle}
                            id={id}
                        />
                    ))}
                </ul>
            </Post>
        )}
      </Feed>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: 80px;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  width: 100vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  h1 {
    color: white;
    font-family: "Passion One";
    font-style: normal;
    font-size: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
  div {
    display: flex;
    align-items: center;
    width: 100px;
  }
  ion-icon {
    color: white;
    font-size: 36px;
  }
  img {
    height: 60px;
    width: auto;
    border-radius: 50%;
  }
`;

const Feed = styled.div`
  background-color: #333333;
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 90px;
  > h3 {
    width: 40vw;
    font-size: 50px;
    font-family: "Oswald";
    color: #ffffff;
    margin: 40px 0;
  }
  > span {
    font-size: 60px;
    font-family: "Oswald";
    color: #ffffff;
    margin-top: 50px;
    text-decoration: none;
  }
`;

const NewPost = styled.div`
  display: flex;
  height: 20vh;
  background-color: #ffffff;
  width: 40vw;
  border-radius: 14px;

  img {
    height: 50px;
    width: auto;
    border-radius: 50%;
    color: #ffffff;
    padding-left: 10px;
    margin-top: 10px;
  }
  @media (max-width:1000px) {
    width: 100vw;
  }
`;

const Box = styled.div`
  padding: 0 0 50px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100%;
  color: white;
  p {
    color: ${({ fontColor }) => fontColor};
  }
  input:nth-child(2) {
    height: 30px;
    width: 90%;
    ::placeholder {
      font-size: 14px;
    }
  }
  input:nth-child(3) {
    height: 70px;
    width: 90%;
    ::placeholder {
      font-size: 16px;
    }
  }
  h3 {
    font-size: 30px;
    width: 30vw;
    color: white;
    font-weight: 600;
    padding: 10px 0;
  }
  span {
    color: #b7b7b7;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 60px;

  border-radius: 6px;
  border: ${(props) =>
    props.disabled ? "1px solid #9f9f9f" : "1px solid #FFF"};
  padding: 1rem;

  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#9f9f9f" : "#EFEFEF")};

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 60px;
  color: #000000;

  ::placeholder {
    color: ${(props) => (props.disabled ? "#000" : "#9F9F9F")};
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 30px;
  position: absolute;
  right: 10%;
  bottom: 10px;

  border-radius: 6px;
  border: 1px solid #1877f2;
  background-color: #1877f2;
  padding: 1rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 60px;

  color: #ffffff;
  font-size: 16px;
`;
// ${({color})};
const Post = styled.div`
  width: 40vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;

    ul {
      width: 100%;
    }
  }
`;
