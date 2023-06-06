import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import todo_list from "../../images/to-do-list-apps.png"
import { MyContext } from '../../context';


const Container = styled.div`
    width: 360px;
    ${'' /* padding: 8% 0 0; */}
    margin: 5% auto;
    font-family: 'Comfortaa', cursive;
    background: linear - gradient(90deg, #4b6cb7 0 %, #182848 100 %);
`;

const Wrapper = styled.div`
    position: relative;
    z-index: 1;
    background: #f5f5f5;
    border-radius: 10px;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
`;

const Input = styled.input`
    outline: 0;
    background: #f6eee3;
    width: 100%;
    border: 0;
    border-radius: 5px;
    margin: 0 0 25px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Comfortaa', cursive;
    &:focus {
        background: #dbdbdb;
        box-shadow: 0px 0px 2px red;
    }
`;

const Button = styled.button`
    font-family: 'Comfortaa', cursive;
    text-transform: uppercase;
    outline: 0;
    background: #4b6cb7;
    width: 100 %;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    &:active {
        background: #395591;
    }
`;

const Desc = styled.span`
    font-size: 40px;
    color: #4b6cb7;
    margin-bottom: 25px;
    display: block;
`;

const Error = styled.p`
    margin: 0 0 0 10px;
    text-align: left;
    font-size: 10px;
    color: red;
    position: relative;
    top: -15px;
`;

// Creating schema
const schema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
    const context = useContext(MyContext);

    return (
        <>
            <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    context.handleLoginClick(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Container>
                        {/* <Left>
                            <Image src={todo_list}></Image>
                        </Left> */}
                        <Wrapper>
                            <form onSubmit={handleSubmit}>
                                <Desc>Login</Desc>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter email id / username"
                                    id="email"
                                />
                                <Error>
                                    {errors.email && touched.email && errors.email}
                                </Error>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter password"
                                />
                                <Error>
                                    {errors.password && touched.password && errors.password}
                                </Error>
                                <Button type="submit">Login</Button>
                            </form>
                            {/* {isAuthenticated ? <Navigate replace to="/product" /> : ""}   */}
                        </Wrapper>
                    </Container>
                )}
            </Formik>
        </>
    );
}

export default Login;