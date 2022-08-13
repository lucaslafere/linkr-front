import styled from "styled-components";  
import axios from "axios";
import { useState } from "react";

export default function RenderUserPosts({index,likes,url,description,username,profilePhoto,urlDescription,urlImage,ulrTitle,id}) {
    const [liked, setLiked] = useState(false); 
    let [amountLikes, setAmountLikes] = useState(likes);

    async function likeDeslike(event) { 
        const postLiked = { postLiked: event};
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            if(event==="like") { 
                setLiked(true);
                setAmountLikes(() => ++amountLikes);
                const promise = await axios.put(`https://projeto17-linkrback.herokuapp.com/like/${id}`,postLiked,config);
                console.log(promise.data);
            } else { 
                setLiked(false);
                setAmountLikes(() => --amountLikes);
                const promise = await axios.put(`https://projeto17-linkrback.herokuapp.com/like/${id}`,postLiked,config);
                console.log(promise.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Post value={index}>
            <PictureAndLike>
                <img src={profilePhoto} alt={username}/>
                {liked ? (
                <ion-icon name="heart" id="heart" onClick={() => likeDeslike("dislike")}></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline" onClick={() => likeDeslike("like")}></ion-icon>
                )}
                <p>{amountLikes} likes</p>
            </PictureAndLike>
            <PostInfo>
                <p>{username}</p> 
                <a>{description}</a>
                <MainInfo>
                    <MainInfoDescription>
                        <h3>{ulrTitle}</h3>
                        <h4>{urlDescription}</h4>
                        <h5>{url}</h5>
                    </MainInfoDescription>
                        <img src={urlImage} alt={ulrTitle}/>
                </MainInfo>
            </PostInfo>
        </Post>
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
 `
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
        font-size: 11px; 
        color: white;
    }
 `
 const PostInfo = styled.div`
    width: 90% 
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
 `

 