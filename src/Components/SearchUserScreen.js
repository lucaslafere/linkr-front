import styled from "styled-components"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import UserContext from "../Contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import RenderSearchUser from "../Pages/RenderSearchUser";

export default function SerchUserScreen() {
    const [search, setSearch] = useState(""); 
    const [liked, setLiked] = useState(false);
    //const [searchUsers, setSearchUsers] = useState([]); 
    const [clickedLogout, setClickedLogout] = useState(false);
    const navigate = useNavigate();
    console.log(liked);

    const searchUsers = [ 
        {
            image: "https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg",
            username: "cr7"
        }, 
        {
            image: "https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg",
            username: "cr7"
        }
    ];

    async function logout() { 
        navigate("/");
    }

    return( 
        <>
        <Header>
            <a>linkr</a>
            <InputText>
                <input
                    type="text"
                    placeholder="Search for people"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    required
                />
            </InputText> 
            <LoggedUser>
                {clickedLogout ? (
                <ion-icon name="chevron-up-outline" onClick={() => setClickedLogout(false)}></ion-icon>
                ) : ( 
                <ion-icon name="chevron-down-outline" onClick={() => setClickedLogout(true)}></ion-icon>
                )}
                <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" />
            </LoggedUser>
        </Header> 

        {clickedLogout ? (
        <Logout onClick={logout}> 
            <a>Logout</a>
        </Logout> ) : ("")}

        <Search>
            <ul>
            {searchUsers.map((users,index) => (
                <RenderSearchUser 
                    index= {index}
                    image= {users.image}
                    username= {users.username}
                />
            ))}
            </ul>
        </Search> 

        <UserTitle>
            <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" />
            <a>Juvenal Juvêncio's posts</a>
        </UserTitle> 

        <Main>
            <Posts>
                <ul>
                    <Post>
                        <PictureAndLike>
                            <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" />
                            {liked ? (
                                <ion-icon name="heart" id="heart" onClick={() => setLiked(!liked)}></ion-icon> ) : (
                                <ion-icon name="heart-outline" id="heart-outline" onClick={() => setLiked(!liked)}></ion-icon>
                            )}
                            <p>13 likes</p>
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
                                    <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" />
                            </MainInfo>
                        </PostInfo>
                    </Post>
                </ul>
            </Posts>
        </Main>

        </>
    )
 }

 const Header = styled.div`
    width: 100%; 
    height: 72px; 
    background-color: rgba(21, 21, 21, 1);
    display: flex; 
    justify-content: space-between; 
    align-items:center;
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
 `
 const InputText = styled.div`
    width: 30%; 
    height: 45px;   

    input { 
        width: 95%; 
        height: 100%;
        display: flex;  
        font-weight: 100;
        color: rgba(198, 198, 198, 1); 
        background-color: white;
        border-radius: 8px; 
        border: none; 
        font-size: 19px; 
        padding: 0px 13px 0px 19px;
    }
 `
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
 `
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
 `
 const Search = styled.div`
    width: 28.4%;
    height: 100%; 
    display: flex; 
    flex-direction: column;
    position: relative;
    top: 58px;
    left: 665px;
    z-index: 1;
    
    ul { 
        width: 100%; 
        height: 100%;
        background-color: rgba(231, 231, 231, 1); 
        border-radius: 8px; 
    }
 `
 const UserTitle = styled.div`
    width: 50%; 
    height: 100%;
    margin-top: 53px;
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
    }
 `
 const Main = styled.div`
    width: 100%; 
    height: 100%; 
    display: flex; 
 `
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
 `
 const Post = styled.li`
    width: 100%; 
    height: 276px; 
    display: flex;
    background-color: rgba(23, 23, 23, 1);
    padding: 19px 23px 20px 20px;
    border-radius: 16px;
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

 