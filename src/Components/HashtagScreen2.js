import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import UserContext from "../Contexts/UserContext";
import RenderSearchUser from "../Pages/RenderSearchUser";
import RenderUserPosts from "../Pages/RenderUserPosts";
import RenderHashtags from "../Pages/RenderHashtags";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import RepostBox from "../Pages/RepostBox";
import RenderReposts from "../Pages/RenderReposts";
import PostBox from "../Pages/PostBox";
import Trendings from "../Pages/Trending";


export default function HashtagScreen2() {
    const [deleting, setDeleting] = useState(false);
    const [updatePosts, setUpdatePosts] = useState(false);
    const [idDeleting, setIdDeleting] = useState(null);
    const trending = useParams();
    const { token, setToken } = useContext(TokenContext);
    const [search, setSearch] = useState([]); 
    const [post,setPost] = useState([]);
    const { userData } = useContext(UserContext); 
    const [clickedLogout, setClickedLogout] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false); 
    const navigate = useNavigate();
    const data =  JSON.parse(userData);
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

    useEffect(() => {
        const promise = axios.get(`https://projeto17-linkrback.herokuapp.com/hashtag/${trending.hashtag}`, config)
        .then(response => setPost(response.data))
        .catch(error => alert(error));

  
},[trending]);

function postIsLiked (usersArray) {
    console.log(usersArray)
  const userLiked = usersArray.find(object => object.userId === data.id);
   if(userLiked === undefined) {
     return false
   };

   if(userLiked.userId) {
     return true;
   }
}


  async function searchUser(event) {
    const username = { username: event };
    console.log(username);
    try {
      const promise = await axios.post(
        "https://projeto17-linkrback.herokuapp.com/other-users",
        username,
        config
      );
      console.log(promise.data);
      setSearch(promise.data);
    } catch (error) {
      setSearch([]);
      console.log(error);
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


  function changeUser(userClickedId) { 
    navigate(`/timeline/${userClickedId}`);
    window.location.reload();
  } 

    return( 
        <> 
        
        <Header>
            <a onClick={() => navigate("/timeline")}>linkr</a>
            <Container>
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
                    {search.map((users, index) => (
                     <>
                    <SearchBarUserContainer>
                      <RenderSearchUser
                        index={index}
                        image={users.profilePhoto}
                        username={users.username}
                        follows={users.followerId}
                        id={users.id}
                      />
                      <h6>
                        {users.followerId === null ? "" : "•" + "following"}
                      </h6>
                    </SearchBarUserContainer>
                  </>
                ))}
              </ul>
                </Search> 
                ) : ""}
            </Container>
            <LoggedUser>
                {clickedLogout ? (
                <ion-icon name="chevron-up-outline" onClick={() => setClickedLogout(false)}></ion-icon>
                ) : ( 
                <ion-icon name="chevron-down-outline" onClick={() => setClickedLogout(true)}></ion-icon>
                )}
                <img src={data.profilePhoto} alt="profile" onClick={() => changeUser(data.id)}/>
            </LoggedUser>
        </Header>  

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
                    {search.map((users, index) => (
                    <>
                    <SearchBarUserContainer>
                      <RenderSearchUser
                        index={index}
                        image={users.profilePhoto}
                        username={users.username}
                        follows={users.followerId}
                        id={users.id}
                      />
                      <h6>
                        {users.followerId === null ? "" : "•" + "following"}
                      </h6>
                    </SearchBarUserContainer>
                  </>
                ))}
              </ul>
                </Search2> 
                ) : "" }
            </Container2>

        {clickedLogout ? (
        <Logout onClick={logout}> 
            <a>Logout</a>
        </Logout> ) : ("")}

        <UserContainer isFollowed={isFollowed}>
        
      </UserContainer>

        <Main>
            <Posts>
                <ul> 
                    
                    {post.map((object,index) => (
                        <PostBox 
                        id={object.id}
                        key={index}
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
                        liked={() => postIsLiked(object.usersLiked)}  
                        />
                    ))}
                </ul>
            </Posts>
            <Trendings />
               
            
        </Main>

        </>
    )
 }

 export const SearchBarUserContainer = styled.div`
  display: flex;
  width: 80%;
  align-items: center;

  h6 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;

    color: #c5c5c5;
  }
  @media (max-width: 1000px) {
    width: 100%;
    justify-content: flex-start;
    gap: 30px;

    li {
      width: auto;
    }
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 150px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: space-between;
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
  cursor: pointer;
  
}

`;
const Container = styled.div`
width: 30%;
height: 45px;
display: flex;
flex-direction: column;
justify-content: center;
position: sticky;
`;
const Search = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
/* position: absolute;
top: 56px; */

ul {
  width: 100%;
  /* height: 100%; */
  background-color: rgba(231, 231, 231, 1);
  border-radius: 0px 0px 8px 8px;
  padding: 1rem;
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
    height: 45px;
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
    top: 30px;
  }
`;
const Search2 = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  display: none;

  ul {
    width: 100%;
    /* height: 100%; */
    background-color: rgba(231, 231, 231, 1);
    border-radius: 0px 0px 8px 8px;
    padding: 40px 17px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    object-fit: cover;

    &:hover { 
      cursor: pointer;
    }
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

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Posts = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 25px;
  ul {
    width: 65%;
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
