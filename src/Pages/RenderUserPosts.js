import styled from "styled-components";  
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import TokenContext from "../Contexts/TokenContext";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import RenderComments from "./RenderComments";

export default function RenderUserPosts({index,likes,url,description,username,profilePhoto,urlDescription,urlImage,ulrTitle,id, setOpenModal, setRepostId,reposts, filterPosts, comments}) {
    const [liked, setLiked] = useState(false); 
    let [amountLikes, setAmountLikes] = useState(likes);
    const [openComments, setOpenComments] = useState(false); 
    const [commentsPost, setCommentsPost] = useState([]);
    const [sendMessage,setSendMessage] = useState("");
    const { token } = useContext(TokenContext);
    const { userData } = useContext(UserContext); 
    const data =  JSON.parse(userData);
    const likeState = [];
    const navigate = useNavigate(); 
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    for(let i=0; i<filterPosts.length; i++) { 
      let compare = filterPosts[i].usersLiked.find(u => u.userId===data.id); 
      likeState.push(compare);
    } 
    //console.log(likeState); 

    useEffect(() => { 
        const promise = axios.get(`https://projeto17-linkrback.herokuapp.com/comments/${id}`,config);

        promise.then(response => { 
            if(response.data.length===0) { 
                setCommentsPost(response.data); 
            } else { 
                console.log(response.data[0].allComments);
                setCommentsPost(response.data[0].allComments);
            }
        })
    },[]);

    
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
        <Post openComments={openComments} >
            <PictureAndLike>
                <img src={profilePhoto} alt={username}/>
                {(liked || likeState[index]) ? (
                <ion-icon name="heart" id="heart" onClick={() => likeDeslike("dislike")}></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline" onClick={() => likeDeslike("like")}></ion-icon>
                )}
                <p>{amountLikes} likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments" onClick={() => setOpenComments(!openComments)}></ion-icon>
                <p>{comments} comments</p>
                <ion-icon name="repeat-sharp" id="repost" onClick={() => openModal(id)}></ion-icon>
                <p>{reposts} re-posts</p>
            </PictureAndLike>
            <PostInfo>
                <p>{username}</p> 
                <a>{description}</a>
                <MainInfo onClick={() => window.open(url)}>
                    <MainInfoDescription>
                        <h3>{ulrTitle}</h3>
                        <h4>{urlDescription}</h4>
                        <h5>{url}</h5>
                    </MainInfoDescription>
                        <img src={urlImage} alt={ulrTitle}/>
                </MainInfo>
            </PostInfo>
        </Post>
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
        </>
    )
} 

const Post = styled.li`
  width: 100%;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: ${props => props.openComments ? ("16px 16px 0px 0px"): "16px"};
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
    object-fit: cover;
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
        color: white;
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
 `
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
    } 

    a { 
        font-size: 19px; 
        color: rgba(183, 183, 183, 1); 
        margin-bottom: 10px;
        line-height: 20px;
    }
 `
const MainInfo = styled.div`
    width: 100%; 
    height: 90%; 
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 12px; 
    display: flex;

    img { 
        width: 30%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
    }

    &:hover { 
        cursor: pointer;
    }
 `
const MainInfoDescription = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 28px 23px 20px;

  h3 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 16px;
    color: rgba(155, 149, 149, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h5 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }
`;
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