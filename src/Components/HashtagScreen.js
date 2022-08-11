import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

export default function HashtagScreen() {
    return(
    
    <Container>
        <Header>
            <span>linkr</span>
            <div>
                <IoIosArrowDown color="#FFFFFF" fontSize="35"/>
                <img src='https://st.depositphotos.com/1010338/2099/i/600/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg' alt="User image" width="53" height="53" />
            </div>
        </Header>
        <Content>
            <span># react</span>
            <Post />
        </Content>
    </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const Header = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    span {
        display: inline-block;
        margin-left: 28px;
        color: #FFFFFF;
        font-size: 49px;
        font-weight: bold;
        font-family: "Passion One"
    }
    div {
        margin-right: 18px;
        display: flex;
        align-items: center;
        img {
            width: 53px;
            height: 53px;
            border-radius: 26.5px;
            margin-left: 10px;
        }
    }

    
`
const Content = styled.div`
`;
