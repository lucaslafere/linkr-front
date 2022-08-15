import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext.js";
import PostBox from "../Pages/PostBox.js";
import DeleteBox from "../Pages/DeleteBox.js";
import Trendings from "../Pages/Trending.js";


export default function FeedScreen() {
  const {userData, setUserData} = useContext(UserContext);
  
  const token = localStorage.getItem('MY_TOKEN');
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [ deleting, setDeleting ] = useState(false);
  const [idDeleting, setIdDeleting ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedMessage, setFeedMessage] = useState("Loading");
  const [ updatePosts, setUpdatePosts ] = useState(false);
  //const URL = "https://projeto17-linkrback.herokuapp.com/posts";
  const URL = "http://localhost:4000/posts"; 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(URL,config)
    .then((res) => {
      setPosts([...res.data]);
      if (res.data.length === 0) setFeedMessage("There are no posts yet");
      console.log(res.data);
      })
    .catch((error) =>
      alert
      ("An error occured while trying to fetch the posts, please refresh the page")
      );

  }, [updatePosts]);
  
  function publishPost() {
    if (!url) {
      return window.alert("url não pode estar vazia!");
    }
    
    setLoading(true);
    const body = {
      url,
      description,
    };
    console.log(config);
    const promise = axios.post(URL, body, config);
    promise
      .then((res) => {
        setLoading(false);
        setDescription("");
        setUrl("");
        setUpdatePosts(updatePosts);
      })
      .catch(() => {
        window.alert("Houve um erro ao publicar seu post, tente novamente.");
        setLoading(false);
      });
  }

  return (
  <>
    {
      deleting ? <DeleteBox 
      id={idDeleting} 
      setDeleting={setDeleting} 
      setUpdatePosts={setUpdatePosts} 
      updatePosts ={updatePosts} /> 
      : <> </>
    }
    <Container deleting={deleting}>
      <TopBar>
        <h1>linkr</h1>
        <div>
          <ion-icon name="chevron-down-outline"></ion-icon>
          <img
            src={userData.profilePhoto}
            alt="profile"
          />
        </div>
      </TopBar>
      <Content>
      <Feed>
        <h3>timeline</h3>
        <NewPost>
          <div>
            <img
              src={userData.profilePhoto}
              alt="profile"
            />
          </div>
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
        {
          posts.length === 0 ? (
            <span>{feedMessage}</span>
          ) : (
            posts.map((object, index) => 
              <PostBox
              id={object.id}
              key={index} 
              url={object.url} 
              profilePhoto={object.profilePhoto} 
              username={object.username} 
              description={object.description}
              urlDescription={object.urlDescription}
              urlTitle={object.urlTitle}
              urlImage={object.urlImage}
              setIdDeleting={setIdDeleting}
              setDeleting={setDeleting}
              setUpdatePosts={setUpdatePosts}
              updatePosts={updatePosts}
              />)
        )}
       
      </Feed>
      <div>
        <Trendings />
      </div>
        
      </Content>
    </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: ${props => props.deleting ? 0.2 : 1};
`;

const TopBar = styled.div`
  height: 72px;
  background-color: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:fixed;
  left:0;
  top:0;
  z-index: 1;
  h1 {
    display: inline-block;
    margin-left: 28px;
    color: #FFFFFF;
    font-size: 49px;
    font-weight: bold;
    font-family: "Passion One"
  }
  div {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 18px;
  }
  ion-icon {
    color: white;
    font-size: 36px;
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    margin-left: 10px;
  }
`;

const Feed = styled.div`
  margin-top: 150px;
  margin-right: 50px;
  > h3 {
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
  height: 209px;
  background-color: #ffffff;
  width: 611px;
  border-radius: 16px;
  margin-bottom: 18px;
  padding: 14px 22px 10px 0px;
  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
    color: #ffffff;
  }
  > div:nth-child(1) {
    width: 15%; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center;
    
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  height: 100%;
  color: white;
  p {
    color: ${({ fontColor }) => fontColor};
    display: inline-block;
    margin-bottom: 5px;
  }
  input:nth-child(2) {
    height: 30px;
    width: 100%;
    ::placeholder {
      font-size: 14px;
    }
  }
  input:nth-child(3) {
    height: 70px;
    width: 100%;
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
    color:#B7B7B7;
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
  right: 0px;
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
  display: flex;
  height: 20vh;
  background-color: #171717;
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
`;
const Content = styled.div`
    display: flex;
    > div:nth-child(2) {
      margin-top: 278px;
    }
`;


