import styled  from "styled-components";


const MainLayoutWrapper = styled.main`

  display: flex;
  margin-top: 20vh;
  justify-content: flex-start;
  align-items: center;
  // margin-bottom: 2vh;

  flex-direction: column;
  box-sizing: border-box;

  h4 {
    text-align: left;
    margin-bottom: -4px;
    display: flex;
    justify-content: space-between;
  }

  textarea {
    width: 40%;
    border-radius: 5px;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: -30px;


  }

  button {
    width: 40%;
    background: #2f3542;
    color: #eee;
    padding: 10px;
    margin-top: 5vh;
    margin-bottom: 5vh;
    font-size: 24px;
    cursor: pointer;
    border-radius: 5px;
    opacity: 0.8;
    box-sizing: border-box;
    transition: 0.4s;
    &:hover {
      opacity: 0.9
    }
    
  }
  
`
const StatusWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1e824c;

`

const WaveWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 40%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background: #86e2d5;
  margin-top: 1vh ;
  padding: 20px;
  border-radius: 5px;

  color: #1e824c;

  &:hover {
    transform: scale(1.01);
    transition: 0.5s;
  }

  span {
    text-align: right;
  }

`


export { MainLayoutWrapper, WaveWrapper, StatusWrapper }