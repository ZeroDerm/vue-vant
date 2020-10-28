import axios from 'axios'
import qs from 'qs'
export default {
  axiosPost: function (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'post',
        data: qs.stringify(params)
      })
        .then(res => {
          resolve(res.data)
        })
    })
  }
}
