import {useState, useEffect} from 'react'
import firebase from '../firebase'


const useGetBookingByCar = (id) => {
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("booking").where("car_id", "==", id).get().then((doc)=>{
            const quotes = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              quotes.push(nb)
            })
            let filtered = quotes.filter(item => item.status === "COMPLETE");
            setdocs(filtered)
         })
    }, [])
    return {docs}
}

export default useGetBookingByCar
