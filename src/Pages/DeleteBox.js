import styled from 'styled-components';
import axios from 'axios';

export default function DeleteBox({ id, setDeleting, setUpdatePosts, updatePosts }) {
    
    function cancel() {
        setDeleting(false);
    }

    function deletePost() {
        axios.delete(`localhost:4000/posts/${id}`)
        .then(() => {
            alert("Post excluido com sucesso!");
            setDeleting(false);
            setUpdatePosts(!updatePosts);
        })
        .catch(error => {
            alert("Não foi possível excluir o post");
            setDeleting(false);
            setUpdatePosts(!updatePosts);
        });
    }
    
    return(
    <DeleteDiv>
        <h1>Are you sure you want</h1><h1> to delete this post?</h1>
        <div>
          <button onClick={cancel}>No, go back</button>
          <button onClick={deletePost}>Yes, delete it</button>
        </div>
    </DeleteDiv>
        )
        
} 

const DeleteDiv = styled.div`
  z-index: 2;
  width: 597px;
  height: 262px;
  background-color: #333333;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid;
  position: fixed;
  left: 30%;
  top: 20%;
  
  

  h1 {
    display: inline-block;
    font-size: 34px;
    font-weight: bold;
    font-family: "Lato";
    margin-bottom: 10px;
    color: #FFFFFF;
  }
  div {
    margin-top: 10px;
  }
  button {
    margin-right: 15px;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    font-family: "Lato";
  }
  button:nth-child(1) {
    background-color: #FFFFFF;
    color: #1877F2;
  }
  button:nth-child(2) {
    background-color: #1877F2;
    color: #FFFFFF;
  }

`;