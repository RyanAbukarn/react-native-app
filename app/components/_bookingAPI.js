import axios from 'axios'

export default function _BookingAPI (url,token,startDate,endDate,bookID,registration_id) {
    return axios
    .post(`http://localhost:3000${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      registration: {
      check_in:startDate,
      check_out:endDate,
      },
      book_id: bookID,
      id:registration_id
    })
  
  }