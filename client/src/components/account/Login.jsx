import React from 'react'
import { useState ,useContext} from 'react'
import {Box,Button,TextField,styled,Typography} from '@mui/material'

import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'
const Component  = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})
const Wrapper = styled(Box)`
    padding : 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, & > p, & > button{
        margin-top : 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform:none;
    background:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
    font-size:15px;
`
const SignupButton = styled(Button)`
    text-transform:none;
    background-color:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0 / 20%);
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
`
const Text = styled(Typography)`
    color:#878787;
    font-size:16px;

`
const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;

`
const loginIntialValues = {
    username : '',
    password : '',
    role:'aspirant'
}
const signupInitialValues  = {
    username : '',
    password : '',
    role:'aspirant'
}
const Login = ()=>{
    const imageUrl = "https://pbs.twimg.com/profile_images/1235105025069912064/9yAfb_Rg_400x400.jpg";
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginIntialValues);
    const [error, setError] = useState('');
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    const toggleSignup = () =>{
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
        
    }
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value});
        
    }
    const toAspirant = (e) => {
        setSignup({...signup, role : 'aspirant'});
            setLogin({...login, role : 'aspirant'});
            
            document.getElementById('aspirantB').style.backgroundColor = '#41ef1a';
            document.getElementById('aspirantB').style.color = 'black';
            document.getElementById('companyB').style.backgroundColor = 'black';
            document.getElementById('companyB').style.color = '#41ef1a';
           
    }
    const toCompany = (e) => {
        setSignup({...signup, role : 'company'});
            setLogin({...login, role : 'company'});
            
            document.getElementById('companyB').style.backgroundColor = '#41ef1a';
            document.getElementById('companyB').style.color = 'black';
            document.getElementById('aspirantB').style.backgroundColor = 'black';
            document.getElementById('aspirantB').style.color = '#41ef1a';
            
            
    }
    
    const signupUser = async() =>{
        
       const settings = {
        method: "POST",
        body: JSON.stringify(signup),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }
        try {
            console.log(settings.body)
            const fetchResponse = await fetch(`https://career-junction.vercel.app/signup`, settings);
            const response = await fetchResponse.json();
            setSignup(signupInitialValues);
            toggleAccount('login');
            
        } catch (e) {
            setError('Something went wrong, please try again later');
            return e;
        }    
    }
    const loginUser = async() => {
        const settings = {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }
            try {
                const fetchResponse = await fetch(`https://career-junction.vercel.app/login`, settings);
                const response = await fetchResponse.json();
                setError('');
                console.log(response)
                sessionStorage.setItem('accessToken', `Bearer ${response.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.refreshToken}`);
            
                setAccount({username : response.username, loggedIn:true, id:response.mongoId, role:response.role});
                
                navigate('/home');
                
                
                
            } catch (e) {
                
                setError('Something went wrong, please try again later');
                
            }
            
        
    }
    return (
        
        <Component>
        <Box display='flex' width='100%'>
        <SignupButton id='aspirantB'  onClick={toAspirant}>Aspirant</SignupButton>

        <SignupButton id='companyB' style={{marginRight:'0px', marginLeft:'auto'}} onClick={toCompany}>Company</SignupButton>


        </Box>
            <Image src = {imageUrl} />
            {
            account === 'login'?
            <Wrapper>
                <TextField variant = "standard" value = {login.username}label = "Enter Userame" onChange={(e) => onValueChange(e)} name='username'/>
                <TextField variant = "standard" value = {login.password}label = "Enter Password" onChange={(e) => onValueChange(e)} name='password'/>
                { error && <Error>{error}</Error> }
                
                <LoginButton onClick = {loginUser} variant = "contained">Login</LoginButton>
                <Typography style = {{textAlign : 'center'}}>OR</Typography>
                <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant = "standard" label = "Enter Userame" onChange={(e) => onInputChange(e)} name='username'/>
                <TextField variant = "standard" label = "Enter Password"onChange={(e) => onInputChange(e)} name='password'/>
                { error && <Error>{error}</Error> }
                <SignupButton onClick={signupUser}>Signup</SignupButton>
                <Typography style = {{textAlign : 'center'}}>OR</Typography>
                <LoginButton onClick={() => toggleSignup()} variant = "contained">Already have an account</LoginButton>
            </Wrapper>
}
        </Component>
    )
};
export default Login