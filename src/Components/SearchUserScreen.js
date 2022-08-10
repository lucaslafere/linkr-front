import styled from "styled-components"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../Contexts/TokenContext";
import UserContext from "../Contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import { FaBeer } from 'react-icons/fa';
import RenderSearchUser from "../Pages/RenderSearchUser";

export default function SerchUserScreen() {
    const [search, setSearch] = useState(""); 
    //const [searchUsers, setSearchUsers] = useState([]);

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
                <FaBeer />
                <img src="https://tntsports.com.br/__export/1650121510074/sites/esporteinterativo/img/2022/04/16/cristiano_ronaldo_vibrando_-_premier_league.jpg_1359985831.jpg" />
            </LoggedUser>
        </Header> 

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

    img { 
        width: 53px;
        height: 53px;
        border-radius: 50%; 
        margin-left: 17px;
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