import {useState, useEffect} from 'react'
import firebase from '../firebase'

const useGetCar = (id) => {
   
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("renter_cars").doc(id).get().then((doc)=>{
          
            setdocs(doc.data())
         })
    }, [id])
    return {docs}
}

export default useGetCar
