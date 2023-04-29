import {useState, useEffect} from 'react'
import firebase from '../firebase'

function useGetBookings() {
    const [docs, setdocs] = useState([])

    useEffect(() => {
        firebase.firestore().collection("booking").onSnapshot((doc)=>{
            const users = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              users.push(nb)
            })
            setdocs(users)
          })
    }, [])
    return  {docs}
}

export default useGetBookings