import styled  from "styled-components";


const MainLayoutWrapper = styled.main`

  display: flex;
  margin-top: 20vh;
  justify-content: flex-start;
  align-items: center;

  flex-direction: column;

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