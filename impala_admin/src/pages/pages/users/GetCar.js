
import useGetCar from 'src/hooks/useGetCar' 

function GetCar({data}) {

let user = useGetCar(data).docs
 
  return (
   user ? `${user.make} ${user.model}` : ""
  )
}

export default GetCar