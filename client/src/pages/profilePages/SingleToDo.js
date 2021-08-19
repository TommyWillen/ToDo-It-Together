import { useQuery } from '@apollo/client'
import {useContext, useState} from 'react'
import CompleteButton from '../../components/CompleteButton'

import { EditButton, TodoDisplayCard, TodoHeadEl } from '../../components/TodoElements'
import DisplayTodoEl from '../../components/TodoElements/DisplayTodoEl'
import EditTodoForm from '../../components/TodoElements/EditTodoForm'
import { AuthContext } from '../../context/auth'
import { GET_SINGLE_TODO } from '../../utils/graphql/todoQueries'

const SingleToDo = (props) => {
    const [canEdit, setCanEdit] = useState(false)
    const toDoId = props.match.params.id
    const {user} = useContext(AuthContext)
    const {loading, data} = useQuery(GET_SINGLE_TODO, {
        variables: {
            toDoId,
        }
    })

    let todoMarkup;

    if (loading) {
        return (<p>...Loading</p>)
    } else {
        const {
          toDoName,
          username,
        } = data.getToDo

        todoMarkup = (
            <>
                {user.username === username && !canEdit ? (
                    <EditButton onClick={() => setCanEdit(true)} />
                ):null}
                <CompleteButton todo={data.getToDo} float={true} />
                <TodoHeadEl>{toDoName}</TodoHeadEl>
                <TodoDisplayCard>
                {canEdit ? <EditTodoForm /> : 
                <DisplayTodoEl todo={data.getToDo} />
                }
                </TodoDisplayCard>
            </>
        )
    }

    return todoMarkup
}

export default SingleToDo
