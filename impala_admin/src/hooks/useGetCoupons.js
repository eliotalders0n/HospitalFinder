import {useState, useEffect} from 'react'
import firebase from '../firebase'


const useGetCoupons = () => {
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("coupons").onSnapshot((doc)=>{
            const quotes = [];
            doc.docs.forEach(document => {
              const nb = {
                id: document.id,
                ...document.data()
              }
              quotes.push(nb)
            })
            setdocs(quotes)
         })
    }, [])
    return {docs}
}

export default useGetCoupons
