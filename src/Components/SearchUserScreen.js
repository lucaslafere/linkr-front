import styled from "styled-components"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import UserContext from "../Contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import RenderSearchUser from "../Pages/RenderSearchUser";
import RenderUserPosts from "../Pages/RenderUserPosts";
import RenderHashtags from "../Pages/RenderHashtags";

export default function SerchUserScreen() {
    const [search, setSearch] = useState(""); 
    //const [searchUsers, setSearchUsers] = useState([]); 
    //const [userPosts, setUserPosts] = useState([]);
    //const [hashtags,setHashtags] = useState([]);
    const [clickedLogout, setClickedLogout] = useState(false);
    const navigate = useNavigate();

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

    const hashtags = [
        { 
            name: "javascript" 
        }, 
        { 
            name: "javascript" 
        }
    ];

    async function logout() { 
        navigate("/");
    }

    return( 
        <>
        <Header>
            <a>linkr</a>
            <Container>
                <InputText>
                    <input
                        type="text"
                        placeholder="Search for people"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        required
                    />
                    <ion-icon name="search-sharp"></ion-icon>
                </InputText>
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
            </Container>
            <LoggedUser>
                {clickedLogout ? (
                <ion-icon name="chevron-up-outline" onClick={() => setClickedLogout(false)}></ion-icon>
                ) : ( 
                <ion-icon name="chevron-down-outline" onClick={() => setClickedLogout(true)}></ion-icon>
                )}
                <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" alt="cr7"/>
            </LoggedUser>
        </Header> 

        {clickedLogout ? (
        <Logout onClick={logout}> 
            <a>Logout</a>
        </Logout> ) : ("")}

        <UserTitle>
            <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" alt="cr7"/>
            <a>Juvenal Juvêncio's posts</a>
        </UserTitle> 

        <Main>
            <Posts>
                <ul>
                    <RenderUserPosts />
                    <RenderUserPosts /> 
                    <RenderUserPosts />
                    <RenderUserPosts />
                </ul>
            </Posts>
            <Treading>
                <span>trending</span>
                <div></div>
                <ul> 
                    {hashtags.map((hashtag,index) => (
                        <RenderHashtags 
                            index= {index}
                            name={hashtag.name}
                        /> 
                    ))}
                </ul>
            </Treading>
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
 const Container = styled.div`
    width: 30%;
    height: 100%; 
    display: flex; 
    flex-direction: column;
    justify-content: center;
    position: relative;
 `
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
 `
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
 const UserTitle = styled.div`
    width: 47%; 
    height: 100%;
    margin-top: 153px;
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
        font-family: 'Oswald', sans-serif;
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
        font-family: 'Oswald', sans-serif;
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
 `
 