import { useEffect, useState } from "react"
import Button from "./Button/Button"
import Modal from "./Modal/Modal"
import useInput from "../hooks/useinput"

export default function EffectSection() {
    const input = useInput()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true)
            const response =  await fetch('https://jsonplaceholder.typicode.com/users')
            const users = await response.json()
            setUsers(users)
            setLoading(false)
        }

        fetchUsers()
    }, [])

    return (
        <section>
            <h3>Effects</h3>

            <Button style={{marginBottom: '1rem'}} onClick={() => setModal(true)}>Открыть информацию</Button>
            <Modal open={modal}>
                <h3>Hello from modal</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                   Cum rerum temporibus consequatur, eligendi deleniti, id laborum officia minus incidunt sequi aperiam dolor, asperiores exercitationem nihil?
                   Perspiciatis tenetur reprehenderit cupiditate necessitatibus.
                </p>
                <Button onClick={() => setModal(false)}>Close modal</Button>
            </Modal>

            {loading && <p>Loading ...</p>}

            {!loading && (
            <>
            <input type="text" className="control" {...input} />
             <ul>
                {users.filter(user => user.name.toLowerCase().includes(input.value.toLowerCase()))
                .map((user) => (
                <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </>   
            )}  
        </section>
    )
}