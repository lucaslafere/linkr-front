import styled from "styled-components";  
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import TokenContext from "../Contexts/TokenContext";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

export default function RenderUserPosts({index,likes,url,description,username,profilePhoto,urlDescription,urlImage,ulrTitle,id, setOpenModal, setRepostId,reposts, filterPosts}) {
    const [liked, setLiked] = useState(false); 
    let [amountLikes, setAmountLikes] = useState(likes);
    const { token } = useContext(TokenContext);
    const { userData } = useContext(UserContext); 
    const data =  JSON.parse(userData);
    const likeState = [];
    const navigate = useNavigate(); 

    for(let i=0; i<filterPosts.length; i++) { 
      let compare = filterPosts[i].usersLiked.find(u => u.userId===data.id); 
      likeState.push(compare);
    } 

    
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
    
    return(
        <>
        <Post value={index} >
            <PictureAndLike>
                <img src={profilePhoto} alt={username}/>
                {(liked || likeState[index]) ? (
                <ion-icon name="heart" id="heart" onClick={() => likeDeslike("dislike")}></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline" onClick={() => likeDeslike("like")}></ion-icon>
                )}
                <p>{amountLikes} likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments"></ion-icon>
                <p>13 comments</p>
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
        </>
    )
} 

const Post = styled.li`
  width: 100%;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: 16px;
  margin-bottom: 18px;
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
