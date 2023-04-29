import {useState, useEffect} from 'react'
import firebase from '../firebase'


const useGetBookingById = (id) => {
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("booking").doc(id).onSnapshot((doc)=>{
            
          setdocs({...doc.data(), id: doc.id})
         })
    }, [id])
    return {docs}
}

export default useGetBookingById
