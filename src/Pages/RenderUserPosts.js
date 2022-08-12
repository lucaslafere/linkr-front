import styled from "styled-components"; 
import { useState } from "react";

export default function RenderUserPosts({index,likes}) {
    const [liked, setLiked] = useState(false); 
    let [amountLikes, setAmountLikes] = useState(likes);

    async function likeDeslike(event) { 
        try {
            if(event==="like") { 
                setLiked(true);
                setAmountLikes(() => ++amountLikes);
            } else { 
                setLiked(false);
                setAmountLikes(() => --amountLikes);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Post value={index}>
            <PictureAndLike>
                <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" alt="cr7"/>
                {liked ? (
                <ion-icon name="heart" id="heart" onClick={() => likeDeslike("dislike")}></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline" onClick={() => likeDeslike("like")}></ion-icon>
                )}
                <p>{amountLikes} likes</p>
            </PictureAndLike>
            <PostInfo>
                <p>Juvenal Juvêncio</p> 
                <a>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</a>
                <MainInfo>
                    <MainInfoDescription>
                        <h3>Como aplicar o Material UI em um projeto React</h3>
                        <h4>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h4>
                        <h5>https://medium.com/@pshrmn/a-simple-react-router</h5>
                    </MainInfoDescription>
                        <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" alt="cr7"/>
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

 