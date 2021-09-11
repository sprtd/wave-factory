import styled  from "styled-components";


const MainLayoutWrapper = styled.main`

  display: flex;
  margin-top: 20vh;
  justify-content: flex-start;
  align-items: center;

  flex-direction: column;
  box-sizing: border-box;

  textarea {
    width: 20%;
    border-radius: 5px;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: -30px;


  }

  button {
    width: 20%;
    background: #2f3542;
    color: #eee;
    padding: 10px;
    margin-top: 5vh;
    font-size: 24px;
    cursor: pointer;
    border-radius: 5px;
    opacity: 0.8;
    transition: 0.4s;
    &:hover {
      opacity: 0.9
    }

  }

`



export { MainLayoutWrapper }