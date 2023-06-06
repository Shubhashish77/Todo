import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyContext } from '../../context';

const Container = styled.div`
    width: 100%;
`;

const Wrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 50px auto ;
`;
const NoteContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
`;

const Input = styled.input`
    outline: 0;
    background: #fff;
    width: 80%;
    border: 2px dotted #925EE5;
    border-radius: 50px;
    padding: ${(props => props.padding ? props.padding : "18px")};
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Comfortaa', cursive;
    &:focus {
        ${'' /* background: #dbdbdb; */}
        box-shadow: 0px 0px 2px gray;
    }
`;

const Button = styled.button`
    width: 20%;
    padding: ${(props => props.padding ? props.padding : "20px")};
    border: none;
    border-radius: 50px;
    ${'' /* display: absolute; */}
    margin-left: 10px;
    ${'' /* transform: translate(-105%); */}
    background-color: #925EE5;
    color: white;
`;

const ListContainer = styled.div`
    padding: 10px; 
    width: 100%;
    margin-top: 10px; 
    background-color: #fff;
    border-radius: 20px;
    min-height: 400px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    ${'' /* justify-content: center; */}
    align-items: center;
    flex-direction: column;
`;

const ListWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;
`;

const ListItem = styled.div`
    width: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    background-color: #f5f6fa;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Comfortaa', cursive;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SubtaskContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${'' /* justify-content: center; */}
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    ${'' /* padding: 10px; */}
`;

const SubTask = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    ${'' /* justify-content: center; */}
    ${'' /* border-bottom: 1px solid gray; */}
    ${'' /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */}
`;

const Task = styled.span`
    padding: 10px;
`;
// #f6eee3
const Todolist = () => {
    const [task, setTask] = useState("");
    const [subTask, setSubtask] = useState("");
    const [open, setOpen] = useState(-1);
    const context = useContext(MyContext);
    console.log(context.state);

    // console.log(task);
    const handleTaskSubmit = (e) =>{
        e.preventDefault();
        context.handleSubmit(task);
        setTask("");
    }
    const handleSubtaskSubmit = (e, item) =>{
        e.preventDefault();
        context.handleSubtask(item, subTask);
        setSubtask("");
    }
    const handleTaskDeletion = (task) => {
        console.log("delete");
        context.handleTaskDel(task);
    }
    return (
        <Container>
            <Wrapper>
                <NoteContainer onSubmit={handleTaskSubmit}>
                    <Input
                        type="text"
                        name="task"
                        value={task}
                        onChange={(e)=>setTask(e.target.value) }
                        placeholder="Type hear to add note"
                        id="task"
                    />
                    <Button type='submit'>ADD</Button>
                </NoteContainer> 
                <ListContainer>
                    
                        {context.state.todo && context.state.todo.length > 0 ? ( context.state.todo.map((item, idx)=>(
                            <ListWrapper key={idx}>
                                <ListItem >    
                                   {item.task}
                                   <div>
                                        <DeleteIcon onClick={()=>handleTaskDeletion(item.task)}/>
                                        {open === idx ? <KeyboardArrowDownIcon onClick={() => setOpen(-1)} /> : <KeyboardArrowUpIcon onClick={() => setOpen(idx)} />}
                                   </div>
                                </ListItem>
                                {open===idx && item.subTask ? (
                                    <SubtaskContainer>
                                        {item.subTask.map((subtask,idx) => (
                                            <SubTask key={idx}>
                                                <SubdirectoryArrowRightIcon />
                                                <Task>{subtask}</Task>
                                            </SubTask>
                                        ))}
                                        <NoteContainer onSubmit={(e) => handleSubtaskSubmit(e, item)}>
                                            <Input
                                                type="text"
                                                name="task"
                                                onChange={(e) => setSubtask(e.target.value)}
                                                placeholder="Type hear to add note"
                                                id="task"
                                                value={subTask}
                                                padding="10px"
                                            />
                                            <Button type='submit' padding="10px"> Add Points</Button>
                                        </NoteContainer>
                                    </SubtaskContainer>    
                                ): ""}
                            </ListWrapper>
                        ))): "" }               
                    

                </ListContainer>
            </Wrapper>
        </Container>
  )
}

export default Todolist