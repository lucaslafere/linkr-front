import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext.js";
import RenderUserPosts from "../Pages/RenderUserPosts.js";
import DeleteBox from "../Pages/DeleteBox.js";
import Trendings from "../Pages/Trending.js";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import RenderSearchUser from "../Pages/RenderSearchUser.js";

export default function FeedScreen() {
  const { userData, setUserData } = useContext(UserContext);
  const token = localStorage.getItem("MY_TOKEN");
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [search, setSearch] = useState([]);
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idDeleting, setIdDeleting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedMessage, setFeedMessage] = useState("Loading");

  const [updatePosts, setUpdatePosts] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [clickedLogout, setClickedLogout] = useState(false);
  const navigate = useNavigate();


  const backendURL = "https://projeto17-linkrback.herokuapp.com/posts";
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  function searchUser(event) {
    const username = { username: event };
    console.log(username);
    try {
      const promise = axios.post(
        "https://projeto17-linkrback.herokuapp.com/other-users",
        username
      );
      promise.then((res) => {
        console.log(res.data);
        setSearch(res.data);
      });
    } catch (error) {
      console.log(error);
      setSearch([]);
    }
  }

  function logout() {
    axios.delete("https://projeto17-linkrback.herokuapp.com/logout", {
      data: {},
      headers: { Authorization: `Bearer ${token}` },
    });
    window.localStorage.setItem("MY_TOKEN", "");
    window.localStorage.setItem("userInfo", "");

    navigate("/");
  }

  useEffect(() => {
    const promise = axios.get(backendURL, config);
    promise
      .then((res) => {
        setPosts([...res.data]);
        if (res.data.length === 0) setFeedMessage("There are no posts yet");
      })
      .catch((error) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
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
    const promise = axios.post(backendURL, body, config);
    promise
      .then((res) => {
        setLoading(false);
        setDescription("");
        setUrl("");
        setUpdatePosts(!updatePosts);
      })
      .catch(() => {
        window.alert("Houve um erro ao publicar seu post, tente novamente.");
        setLoading(false);
      });
  }

  console.log(posts);

  return (
    <>
      {deleting ? (
        <DeleteBox
          id={idDeleting}
          setDeleting={setDeleting}
          setUpdatePosts={setUpdatePosts}
          updatePosts={updatePosts}
        />
      ) : (
        <> </>
      )}
      <Container deleting={deleting}>
        <Header>
          <a>linkr</a>
          <ContainerTop>
            <InputText>
              <DebounceInput
                type="text"
                placeholder="Search for people"
                minLength={3}
                debounceTimeout={400}
                onChange={(event) => searchUser(event.target.value)}
              />
              <ion-icon name="search-sharp"></ion-icon>
            </InputText>
            <Search>
              <ul>
                {search.map((users, index) => (
                  <RenderSearchUser
                    index={index}
                    image={users.profilePhoto}
                    username={users.username}
                  />
                ))}
              </ul>
            </Search>
          </ContainerTop>
          <LoggedUser>
            {clickedLogout ? (
              <ion-icon
                name="chevron-up-outline"
                onClick={() => setClickedLogout(false)}
              ></ion-icon>
            ) : (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => setClickedLogout(true)}
              ></ion-icon>
            )}
            <img src={userData.profilePhoto} alt="profile" />
          </LoggedUser>
        </Header>
        <Container2>
          <InputText2>
            <DebounceInput
              type="text"
              placeholder="Search for people"
              minLength={3}
              debounceTimeout={400}
              onChange={(event) => searchUser(event.target.value)}
            />


            <ion-icon name="search-sharp"></ion-icon>
          </InputText2>
          <Search2>
            <ul>
              {search.map((users, index) => (
                <RenderSearchUser
                  index={index}
                  image={users.profilePhoto}
                  username={users.username}
                />
              ))}
            </ul>
          </Search2>
        </Container2>

        {clickedLogout ? (
          <Logout onClick={logout}>
            <a>Logout</a>
          </Logout>
        ) : (
          ""
        )}

        <Content>
          <Feed>
            <h3>timeline</h3>
            <NewPost>
              <div>
                <img src={userData.profilePhoto} alt="profile" />
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

            {posts.length === 0 ? (
              <span>{feedMessage}</span>
            ) : (
              <Post>
                <ul>
                  {posts.map(
                    (
                      {
                        url,
                        description,
                        username,
                        profilePhoto,
                        urlDescription,
                        urlImage,
                        urlTitle,
                        id,
                      },
                      index
                    ) => (
                      <RenderUserPosts
                        index={index}
                        likes={99}
                        url={url}
                        description={description}
                        username={username}
                        profilePhoto={profilePhoto}
                        urlDescription={urlDescription}
                        urlImage={urlImage}
                        urlTitle={urlTitle}
                        id={id}
                      />
                    )
                  )}
                </ul>
              </Post>
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
  opacity: ${(props) => (props.deleting ? 0.2 : 1)};
`;

const TopBar = styled.div`
  height: 72px;
  background-color: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: flex;
  justify-content: space-between;

  /* position: fixed;
  left: 0;
  top: 0; */

  align-items: center;
  position: fixed;
  left: 0;
  top: 0;

  z-index: 1;
  h1 {
    display: inline-block;
    margin-left: 28px;
    color: #ffffff;
    font-size: 49px;
    font-weight: bold;
    font-family: "Passion One";
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
  @media (max-width: 1000px) {
    margin-right: 0;
    width: 100vw;
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
  @media (max-width: 1000px) {
    width: 100vw;
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

    &:hover {
      cursor: pointer;
    }
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

const Post = styled.div`
  width: 611px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;


  img {
    height: 50px;
    width: auto;
    border-radius: 50%;
    color: #ffffff;
    padding-left: 10px;
    margin-top: 10px;

    &:hover{ 
      cursor: pointer;

    }
  }

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
const Content = styled.div`
  display: flex;
`;

const Header = styled.div`
  width: 100%;
  height: 72px;
  background-color: rgba(21, 21, 21, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0px 12px 0px 20px;

  a {
    color: white;
    font-family: Passion One;
    font-size: 49px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: left;
  }
`;
const ContainerTop = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const Search = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;

  ul {
    width: 100%;
    height: 100%;
    background-color: rgba(231, 231, 231, 1);
    border-radius: 0px 0px 8px 8px;
    padding: 40px 17px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const InputText = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 8px 8px 0px 0px;
  border: none;
  padding: 0px 13px 0px 19px;
  color: rgba(198, 198, 198, 1);

  input {
    width: 95%;
    height: 100%;
    font-weight: 100;
    font-size: 19px;
    border: none;
  }

  ion-icon {
    width: 21px;
    height: 21px;
    color: rgba(198, 198, 198, 1);
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const Container2 = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: inline;
    width: 100%;
    height: 100%;
    padding: 0px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    align-itens: center;
    position: fixed;
    left: 0;
    top: 85px;
  }
`;
const Search2 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  display: none;

  ul {
    width: 100%;
    height: 100%;
    background-color: rgba(231, 231, 231, 1);
    border-radius: 0px 0px 8px 8px;
    padding: 40px 17px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const InputText2 = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 8px 8px 0px 0px;
  border: none;
  padding: 0px 13px 0px 19px;
  color: rgba(198, 198, 198, 1);
  display: none;

  input {
    width: 95%;
    height: 100%;
    font-weight: 100;
    font-size: 19px;
    border: none;
  }

  ion-icon {
    width: 21px;
    height: 21px;
    color: rgba(198, 198, 198, 1);
  }

  @media (max-width: 1000px) {
    display: inline;
  }
`;
const LoggedUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  ion-icon {
    width: 27px;
    height: 27px;

    &:hover {
      cursor: pointer;
    }
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-left: 17px;
  }
`;
const Logout = styled.div`
  width: 150px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(23, 23, 23, 1);
  color: white;
  border-radius: 0px 0px 0px 20px;
  position: fixed;
  right: 0;
  top: 72px;

  a {
    font-size: 17px;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
  }
`;

const UserTitle = styled.div`
  width: 47%;
  height: 100%;
  margin-top: 153px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 43px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  a {
    margin-left: 18px;
    color: white;
    font-size: 43px;
    font-weight: bold;
    font-family: "Oswald", sans-serif;
  }
`;
