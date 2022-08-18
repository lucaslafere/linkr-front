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

export default function SerchUserScreen() {
  const { id } = useParams();
  const { token, setToken } = useContext(TokenContext);
  const [search, setSearch] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [post, setPost] = useState([]);
  const { userData } = useContext(UserContext);
  const [hashtags, setHashtags] = useState([]);
  const [clickedLogout, setClickedLogout] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [repostId, setRepostId] = useState();
  const [userReposts, setUserReposts] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const data = JSON.parse(userData);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const promise = axios.get(
      `https://projeto17-linkrback.herokuapp.com/users/${id}`,
      config
    );
    const promises = axios.get(
      `https://projeto17-linkrback.herokuapp.com/ranking`
    );

    promise.then((response) => {
      console.log(response.data);
      setUserPosts(response.data[0]);
      setPost(response.data[0].posts);
      if (response.data[1].reposts) {
        setUserReposts(response.data[1].reposts);
      } else {
        setUserReposts([]);
      }

      promises.then((responses) => {
        setHashtags([...response.data]);
      });
    });

    promise.catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const body = {
      friendId: id,
    };
    setDisabled(true);
    axios
      .post(
        `https://projeto17-linkrback.herokuapp.com/check-follow`,
        body,
        config
      )
      .then((res) => {
        setIsFollowed(res.data.isFollower);
        console.log("caiu no then");
        console.log(res.data.isFollower);
        setDisabled(false);
      })
      .catch((err) => {
        console.log("caiu no erro");
      });
  }, []);

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

  async function followUser() {
    const body = {
      friendId: id,
    };
    setDisabled(true);
    try {
      axios.post(
        "https://projeto17-linkrback.herokuapp.com/follow",
        body,
        config
      );
      await console.log("seguiu / parou de seguir");
      setIsFollowed((value) => !value);
      setDisabled(false);
    } catch (error) {
      console.log("deu ruim na hora de seguir");
      alert("Houve um problema ao tentar seguir esse usuário");
    }
  }

  return (
    <>
      {openModal ? (
        <RepostBox setOpenModal={setOpenModal} repostId={repostId} />
      ) : (
        ""
      )}
      <Header>
        <a onClick={() => navigate("/timeline")}>linkr</a>
        <Container>
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
                      />
                      <h6>
                        {users.followerId === null ? "" : "•" + "following"}
                      </h6>
                    </SearchBarUserContainer>
                  </>
                ))}
              </ul>
            </Search>
          ) : (
            ""
          )}
        </Container>
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
          <img src={data.profilePhoto} alt="profile" />
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
                    />
                    <h6>
                      {users.followerId === null ? "" : "•" + "following"}
                    </h6>
                  </SearchBarUserContainer>
                </>
              ))}
            </ul>
          </Search2>
        ) : (
          ""
        )}
      </Container2>

      {clickedLogout ? (
        <Logout onClick={logout}>
          <a>Logout</a>
        </Logout>
      ) : (
        ""
      )}

      <UserContainer isFollowed={isFollowed}>
        <UserTitle>
          <img src={userPosts.profilePhoto} alt={userPosts.username} />
          <a>{userPosts.username}'s posts</a>
        </UserTitle>
        <FollowButton
          disabled={disabled}
          isFollowed={isFollowed}
          onClick={followUser}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </FollowButton>
      </UserContainer>

      <Main>
        <Posts>
          <ul>
            {userReposts.map((rep, index) => (
              <RenderReposts
                index={index}
                likes={rep.likes}
                url={rep.url}
                description={rep.description}
                ownerUsername={rep.ownerUsername}
                ownerProfilePhoto={rep.ownerProfilePhoto}
                urlDescription={rep.urlDescription}
                urlImage={rep.urlImage}
                urlTitle={rep.urlTitle}
                id={rep.id}
                reposts={rep.reposts}
                repostedUsername={rep.repostedUsername}
                repostedUserId={rep.repostedUserId}
              />
            ))}
            {post.map((post, index) => (
              <RenderUserPosts
                index={index}
                likes={post.likes}
                url={post.url}
                description={post.description}
                username={userPosts.username}
                profilePhoto={userPosts.profilePhoto}
                urlDescription={post.urlDescription}
                urlImage={post.urlImage}
                urlTitle={post.urlTitle}
                id={post.id}
                setOpenModal={setOpenModal}
                setRepostId={setRepostId}
                reposts={post.reposts}
              />
            ))}
          </ul>
        </Posts>
        <Treading>
          <span>trending</span>
          <div></div>
          <ul>
            {hashtags.map((hashtag, index) => (
              <RenderHashtags index={index} name={hashtag.name} />
            ))}
          </ul>
        </Treading>
      </Main>
    </>
  );
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

const FollowButton = styled.button`
  width: 120px;
  height: 35px;
  background: ${(props) => (props.isFollowed ? "#fff" : "#1877f2")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 300px;
  border: 0px solid #1877f2;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: ${(props) => (props.isFollowed ? "#1877f2" : "#fff")};
  :hover {
    cursor: pointer;
  }
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
    position: relative;
    left: 0;
    top: 85px;
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
  /* margin-top: 153px; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* margin-bottom: 43px; */

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
const Treading = styled.div`
  width: 301px;
  height: 406px;
  margin-left: 25px;
  background-color: rgba(23, 23, 23, 1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 12px 30px 6px 20px;

  span {
    color: white;
    font-size: 27px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
  }

  div {
    width: 100%;
    height: 1px;
    margin: 14px 0px 22px 0px;
    border: 1px solid rgba(72, 72, 72, 1);
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
