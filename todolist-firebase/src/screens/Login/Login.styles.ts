import styled from "styled-components";

export const DivLogin = styled.div`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282c34;
`;

export const LoginContainer = styled.div`
    width: 80%;
    height: 80vh;
    display: flex;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.212);

    @media (max-width: 1330px) {
        width: 50%;
    }

    @media (max-width: 1064px) {
        width: 90%;
        height: auto;
    }
`;

export const LoginLeft = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #BF8373;
    padding: 1rem;

    & img {
        width: 31rem;
    }

    @media (max-width: 1330px) {
        display: none;
    }
`;

export const LoginForm = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #bf9d9d;
    padding: 3rem;

    @media (max-width: 1330px) {
        width: 100%;
    }
`;

export const LoginFormHeader = styled.div`
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const DivLoginFormTitle = styled.div`
    & h1::after{
        content: '';
        display: block;
        width: 5rem;
        height: 0.3rem;
        background-color: #BF8373;
        margin: 0 auto;
        position: absolute;
        border-radius: 10px;
    }
`;

export const DivLoginLinkRegisterButton = styled.div`
    display: flex;
    align-items: center;
`;

export const LoginLinkRegisterButton = styled.a`
    border: none;
    background-color: #BF8373;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: white;
`;

export const LoginInputGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1rem 0;
    width: 100%;
`;

export const LoginInputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const LoginLabel = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #000000c0;
`;

export const LoginInput = styled.input`
    margin: 0.6rem 0;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 10px;
    box-shadow: 1px 1px 6px #0000001c;
    font-size: 0.8rem;
    width: 100%;
`;

export const DivLoginConfirmButton = styled.div`
    width: 100%;
`;

export const LoginConfirmButton = styled.button`
    width: 100%;
    margin-top: 1rem;
    border: none;
    background-color: #BF8373;
    padding: 0.62rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
`;

