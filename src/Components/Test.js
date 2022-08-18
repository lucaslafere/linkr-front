import styled from "styled-components";  
import axios from "axios";
import { useState, useContext } from "react";
import TokenContext from "../Contexts/TokenContext";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Test({setOpenModal,setRepostId}) { 
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const p ={
        id: 4,
        url: "https://www.google.com",
        description: "boa noite",
        urlDescription: "",
        urlImage: "/images/branding/googleg/1x/googleg_standard_color_128dp.png",
        urlTitle: "Google",
        likes: 0,
        userId: 2,
        username: "cr7",
        email: "cr7@gmail.com",
        profilePhoto: "https://conteudo.imguol.com.br/c/esporte/e3/2020/11/21/o-atacante-son-comemora-o-primeiro-gol-do-tottenham-contra-o-manchester-city-pelo-ingles-1605986406883_v2_1x1.png"
      }

    function openModal(id) { 
        setOpenModal(true); 
        setRepostId();
    } 

    return( 
        <>
        <Post>
            <Top>
                <a>Re-posted by <strong>{p.username}</strong></a>
            </Top>
            <PictureAndLike>
                <img src={p.profilePhoto} alt={p.username}/>
                {liked ? (
                <ion-icon name="heart" id="heart"></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline"></ion-icon>
                )}
                <p>{p.likes} likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments"></ion-icon>
                <p>13 comments</p>
                <ion-icon name="repeat-sharp" id="repost" onClick={() => openModal()}></ion-icon>
                <p>13 re-posts</p>
            </PictureAndLike>
            <PostInfo>
                <p>{p.username}</p> 
                <ReactTagify colors={"#ffffff"} tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}>
                <a>{p.description}</a>
                </ReactTagify>
                <MainInfo onClick={() => window.open(p.url)}>
                    <MainInfoDescription>
                        <h3>{p.urlTitle}</h3>
                        <h4>{p.urlDescription}</h4>
                        <h5>{p.url}</h5>
                    </MainInfoDescription>
                        <img src={p.urlImage} alt={p.urlTitle}/>
                </MainInfo>
            </PostInfo>
        </Post>
        </>
    )
}  

const Post = styled.li`
  width: 35%;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: 16px;
  margin-bottom: 18px;
  margin-top: 200px;
`;
const Top = styled.div`
    width: 100%; 
    height: 100%; 
    display: flex;
    align-items: center;
    padding-left: 13px;
    
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


