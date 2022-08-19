import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext.js";
import PostBox from "../Pages/PostBox.js";
import DeleteBox from "../Pages/DeleteBox.js";
import Trendings from "../Pages/Trending.js";
import { useNavigate } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext.js";
import RenderSearchUser from "../Pages/RenderSearchUser.js";
import { DebounceInput } from 'react-debounce-input';
import RepostBox from "../Pages/RepostBox.js";
import InfiniteScroll from "react-infinite-scroller";

export default function FeedScreen() {
  const { userData } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idDeleting, setIdDeleting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedMessage, setFeedMessage] = useState("Loading");
  const [updatePosts, setUpdatePosts] = useState(false);
  const [clickedLogout, setClickedLogout] = useState(false);
  const [search, setSearch] = useState([]);
  const { token, setToken } = useContext(TokenContext);
  const [openModal, setOpenModal] = useState(false);
  const [repostId, setRepostId] = useState();
  const itemsPerPage = 10;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);
  const [queryLimit, setQueryLimit] = useState(itemsPerPage);
  const navigate = useNavigate();
  const URL = "http://localhost:4000/posts/";
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const backendURL = "https://projeto17-linkrback.herokuapp.com/posts/";
  console.log(data);
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function getPosts(queryLimit) {
    
    return axios
      .get(backendURL + queryLimit, config)
      .then((response) => {
        if (response.data.length === 0)
          setFeedMessage("There are no posts yet");
        return response.data;
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

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
      .then(async (res) => {
        setLoading(false);
        setDescription("");
        setUrl("");
        const postsData = await getPosts(posts.length);
        setPosts(postsData);
      })
      .catch(() => {
        window.alert("Houve um erro ao publicar seu post, tente novamente.");
        setLoading(false);
      });
  }

  async function searchUser(event) {
    const username = { username: event };

    try {
      const promise = await axios.post(
        "https://projeto17-linkrback.herokuapp.com/other-users",
        username
      );
      
      setSearch(promise.data);
    } catch (error) {
      setSearch([]);
    
    }
  }

  async function logout() {
    axios.delete("https://projeto17-linkrback.herokuapp.com/logout", {
      data: {},
      headers: { Authorization: `Bearer ${token}` },
    });
    window.localStorage.setItem("MY_TOKEN", "");
    localStorage.setItem("userInfo", "");
    setToken("");

    navigate("/");
  }

  function postIsLiked (usersArray) {
    const userLiked = usersArray.find(object => object.userId === data.id);
    
     if(userLiked === undefined) {
       return false
     };

     if(userLiked.userId) {
       return true;
     }
  }

  const showItems = (posts) => {
    
    let items = [];
    let limit = records;
    if (records > posts.length) limit = posts.length;
    for (let i = 0; i < limit; i++) {

      const object = posts[i];
      items.push(
        <PostBox
          id={object.id}
          key={i}
          url={object.url}
          profilePhoto={object.profilePhoto}
          username={object.username}
          description={object.description ? object.description : ""}
          urlDescription={object.urlDescription}
          urlTitle={object.urlTitle}
          urlImage={object.urlImage}
          likes={object.likes}
          setIdDeleting={setIdDeleting}
          setDeleting={setDeleting}
          setUpdatePosts={setUpdatePosts}
          updatePosts={updatePosts}
          userId={object.userId}
        />
      );
    }
    return items;
  };

  const loadMore = async () => {
    if (queryLimit > posts.length + 10) {
      setHasMoreItems(false);
    } else {
      const postsData = await getPosts(queryLimit);
      if (!postsData) postsData = [];
    
      setPosts(postsData);
      setQueryLimit(queryLimit + itemsPerPage);
      setRecords(records + itemsPerPage);
    }
  };
  console.log(posts);
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

    {openModal ? (
            <RepostBox 
                setOpenModal={setOpenModal}
                repostId={repostId}
            />
      ) :  ""}
      
    <Container deleting={deleting}>
    <Header>
            <a onClick={() => navigate("/timeline")}>linkr</a>
            <Containerr>
                <InputText>
                    <DebounceInput
                        type="text"
                        placeholder="Search for people"
                        minLength={3}
                        debounceTimeout={400}
                        onChange={(event) => searchUser(event.target.value)} />
                    <ion-icon name="search-sharp"></ion-icon>
                </InputText> 
                {search.length !== 0 ? (
                <Search>
                    <ul>
                        {search.map((users,index) => (
                            <RenderSearchUser 
                                index= {index}
                                image= {users.profilePhoto}
                                username= {users.username}
                            />
                        ))}
                        </ul>
                </Search> 
                ) : ""}
            </Containerr>
            <LoggedUser>
                {clickedLogout ? (
                <ion-icon name="chevron-up-outline" onClick={() => setClickedLogout(false)}></ion-icon>
                ) : ( 
                <ion-icon name="chevron-down-outline" onClick={() => setClickedLogout(true)}></ion-icon>
                )}
                <img src={data.profilePhoto} alt="profile"/>
            </LoggedUser>
        </Header>  
      <Content>
      
      {clickedLogout ? (
        <Logout onClick={logout}> 
            <a>Logout</a>
        </Logout> ) : ("")} 

        <Container2>
                <InputText2>
                    <DebounceInput
                        type="text"
                        placeholder="Search for people"
                        minLength={3}
                        debounceTimeout={400}
                        onChange={(event) => searchUser(event.target.value)} />
                    <ion-icon name="search-sharp"></ion-icon>
                </InputText2>
                {search.length !== 0 ? (
                <Search2>
                    <ul>
                        {search.map((users,index) => (
                            <RenderSearchUser 
                                index= {index}
                                image= {users.profilePhoto}
                                username= {users.username}
                                id= {users.id}
                            />
                        ))}
                        </ul>
                </Search2> 
                ) : "" }
        </Container2>

          <Feed>
            <h3>timeline</h3>
            <NewPost>
              <div>
                <img src={data.profilePhoto} alt="profile" />
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
            {/* {posts.length === 0 ? (
              <span>{feedMessage}</span>
            ) : (
              posts.map((object, index) => (
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
                  likes={object.likes}
                  setIdDeleting={setIdDeleting}
                  setDeleting={setDeleting}
                  setUpdatePosts={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={object.userId}
                  liked={() => postIsLiked(object.usersLiked)}
                  setOpenModal={setOpenModal}
                  setRepostId={setRepostId}
                />
              ))
            )} */}
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMoreItems}
              loader={
              <div className="loader" key={0}>
                  {" "}
                  Loading...{" "}
              </div>
              }
              useWindow={true}
              >
              {showItems(posts)}
              </InfiniteScroll>
          </Feed>
          <TrendingsBox>
            <Trendings />
          </TrendingsBox>
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
  z-index: 1;

  a {
    color: white;
    font-family: Passion One;
    font-size: 49px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: left;
  }
`;
const Containerr = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const TrendingsBox =  styled.div`
  margin-top: 278px;

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
    position: relative;
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
    display: inline;
    position: absolute;
    top: 1;

    ul {
      width: 94%;
      height: 100%;
    }
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
    border-radius: 8px;
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
    margin-left: 0;
    width: 100%;
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
    width: 100%;
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

  @media (max-width: 1000px) {
    width: 100%;
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

    &:hover {
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
