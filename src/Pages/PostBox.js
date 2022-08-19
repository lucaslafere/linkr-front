import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useState, useContext } from "react";
import UserContext from "../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RenderComments from "./RenderComments";


export default function PostBox({ 
  id,
  profilePhoto, 
  username, 
  description, 
  url, 
  urlDescription, 
  urlTitle, 
  urlImage, 
  setIdDeleting, 
  setDeleting, 
  updatePosts, 
  setUpdatePosts, 
  likes, 
  userId, 
  setOpenModal, 
  setRepostId, 
  reposts,
  comments
}) {

    const [liked, setLiked] = useState(false); 
    const [ editing, setEditing ] = useState(false);
    let [amountLikes, setAmountLikes] = useState(likes);
    const [ descriptionInput, setDescriptionInput ] = useState(description);
    const { userData } = useContext(UserContext);
    const [openComments, setOpenComments] = useState(false); 
    const [commentsPost, setCommentsPost] = useState([]);
    const [sendMessage,setSendMessage] = useState("");
    const token = localStorage.getItem('MY_TOKEN');
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      async function likeDeslike(event) { 
        const postLiked = { postLiked: event};

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            if(event==="like") {
                await axios.put(`https://projeto17-linkrback.herokuapp.com/like/${id}`,postLiked,config)
                            .then(() => {
                                setLiked(true);
                                setAmountLikes(() => ++amountLikes);
                            })
                            .catch(() => alert("Não foi possível curtir esse post!"));                           
            } else {
                await axios.put(`https://projeto17-linkrback.herokuapp.com/like/${id}`,postLiked,config)
                            .then(() => {
                                setLiked(false);
                                setAmountLikes(() => --amountLikes);
                            })
                            .catch(() => alert("Não foi possível descurtir esse post!"));
            
    }
}
function navigateHashtagPage (tag) {
    const newTag = tag?.replace("#", "");
    if (newTag === undefined) {
      return
    }
    navigate(`/hashtag/${newTag}`)
}
    
function editPost() {
    setDescriptionInput(description);
    setEditing(!editing);
}

function inputKeybord(e) {
    console.log(e);
    if(e.key === "Escape") {
        return editPost();
    }
    if(e.key === "Enter") {
        axios.put(`localhost:4000/posts/${id}`, descriptionInput, config)
        .then(() => {

            editPost();
            setUpdatePosts(!updatePosts)})
        .catch(erro => alert("Não foi possível editar esse post"))
        }
    }


    function deletingPost() {
        setIdDeleting(id)
        setDeleting(true);
    }

    function openModal(id) { 
      setOpenModal(true); 
      setRepostId(id);
  } 

  async function postComment(id) { 
    const text = { comment: sendMessage }
    console.log(id);

    try {
        await axios.post(`https://projeto17-linkrback.herokuapp.com/comments/${id}`,text,config);
        setSendMessage("");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
    
    return(
        <>
        <Post openComments={openComments}>
            <PictureAndLike>

                <img src={profilePhoto} alt="User" onClick={() => navigate(`/timeline/${userId}`)}/>
                { liked ? 
                  <ion-icon name="heart" id="heart" onClick={() => likeDeslike("dislike")}></ion-icon> 
                : <ion-icon name="heart-outline" id="heart-outline" onClick={() => likeDeslike("like")}></ion-icon>
                }
                <p>{amountLikes} likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments" onClick={() => setOpenComments(!openComments)}></ion-icon>
                <p>{comments}comments</p>
                <ion-icon name="repeat-sharp" id="repost" onClick={() => openModal(id)}></ion-icon>
                <p>{reposts} re-posts</p>
            </PictureAndLike>
            <PostInfo>
                <div>
                    <p onClick={() => navigate(`/timeline/${userId}`)}>{username}</p>
                     
                      {data.id === userId ? 
                        <div>
                            <ion-icon name="pencil-outline" onClick={editPost}></ion-icon>
                            <ion-icon name="trash-outline" onClick={deletingPost}></ion-icon>
                        </div>
                        : <></>}
                    
        </div>
        {editing ? (
          <input
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="http://"
            onKeyPress={inputKeybord}
          ></input>
        ) : (
          <ReactTagify
            colors={"#ffffff"}
            tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
          >
            <span>{description}</span>
          </ReactTagify>
        )}

        <MainInfo href={url} target="_blank">
          <MainInfoDescription>
            <h3>{urlTitle}</h3>
            <h4>{urlDescription}</h4>
            <h5>{url}</h5>
          </MainInfoDescription>
          <img src={urlImage} />
        </MainInfo>
      </PostInfo>
    </Post>
    {openComments ? (
      <Comments>
          <UsersComentaries>
              <ul>
                  {commentsPost.map((commt,index) => (
                      <RenderComments 
                          index={index}
                          coment={commt.coment}
                          profilePhoto={commt.profilePhoto}
                          username={commt.username}
                          userId={commt.userId}
                          ownerUsername={username}
                      />
                  ))}
              </ul>
          </UsersComentaries>
          <SendComment>
              <img src={profilePhoto} alt={username} />
              <form onSubmit={() => postComment(id)}>
                  <input
                      type="text"
                      placeholder="write a comment..."
                      value={sendMessage}
                      onChange={(event) => setSendMessage(event.target.value)}
                      required
                  />
                  <ion-icon name="paper-plane-outline" onClick={() => postComment(id)}></ion-icon>
              </form>
          </SendComment>
      </Comments>
      ) : ""}
      </>
  );
} 

const Post = styled.li`
  width: 611px;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 22px 10px 20px;
  border-radius: ${props => props.openComments ? ("16px 16px 0px 0px"): "16px"};
  margin-bottom: ${props => props.openComments ? ("0px") : ("18px")};
  @media (max-width:612px){
    width: 100vw;
  } 
`;
const PictureAndLike = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 20px;

    &:hover { 
        cursor: pointer;
    }
  }
  ion-icon {
    width: 25px;
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }
  ion-icon#heart {
    color: rgba(172, 0, 0, 1);
  }
  ion-icon#heart-outline {
    color: #ffffff;
  }
  p {
    margin-top: 4px;
    margin-bottom: 15px;
    font-size: 11px; 
    color: white;
  } 

  ion-icon#comments {
      color: white;
  }

  ion-icon#repost {
      color: white;
  }
`;
const PostInfo = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  p {
    font-size: 19px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 8px;

    &:hover { 
        cursor: pointer;
    }
  }
  span {
    font-size: 17px;
    color: #b7b7b7;
    font-family: "Lato";
    margin-bottom: 10px;
    line-height: 20px;
  }
  > div:nth-child(1) {
    display: flex;

    width: 100%;
    justify-content: space-between;
  }
  ion-icon {
    font-size: 20px;
    color: #ffffff;
    margin-left: 10px;
  }
  input {
    padding-left: 5px;
    height: 30px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    height: auto;
    color: #4c4c4c;
    font-family: "Lato";
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
const MainInfo = styled.a`
  display: inline-block;
  width: 100%;
  height: 155px;
  border: 1px solid rgba(77, 77, 77, 1);
  border-radius: 12px;
  display: flex;
  img {
    width: 30%;
    height: 100%;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
  }
`;
const MainInfoDescription = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 28px 15px 20px;
  h3 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 11px;
    color: rgba(155, 149, 149, 1);
    text-align: left;
    margin-bottom: 8px;
  }
  h5 {
    font-size: 11px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
    @media (max-width:612px){
      width: 40px;
      word-break:break-all;
    }
  }
`
const Comments = styled.div`
  width: 100%;
  display: flex; 
  flex-direction: column;
  border-radius: 0px 0px 16px 16px; 
  background-color: rgba(30, 30, 30, 1);
  margin-bottom: 18px;
  padding: 0px 23px 0px 24px;
` 
const UsersComentaries = styled.div`
  width: 100%; 

  ul { 
    width: 100%;
  }
`
const SendComment = styled.div`
  width: 100%; 
  height: 83px; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 

  form { 
    width: 90%;
    height: 39px;
    display: flex; 
    align-items: center;
    border-radius: 8px; 
    background-color: rgba(37, 37, 37, 1); 
    color: rgba(87, 87, 87, 1);
    padding: 0px 13px 0px 15px;
    margin-left: 14px;
    border: none;

    input { 
        width: 95%; 
        height: 100%;
        background-color: rgba(37, 37, 37, 1);
        color: rgba(243, 243, 243, 1);
        font-style: italic;
        border: none;
    }

    ion-icon { 
        width: 19px; 
        height: 19px; 
        color: rgba(243, 243, 243, 1);

        &:hover { 
            cursor: pointer;
        }
    }
  }

  img { 
    height: 39px; 
    width: 39px; 
    border-radius: 50%;
    object-fit: cover;
  }
`
