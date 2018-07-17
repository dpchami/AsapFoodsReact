import {GET_KITCHENS_API} from '../constants/api'
import {GET_KITCHENS_LIST, GET_KITCHENS_LIST_FAILED } from '../constants'
import axios from "axios";
const getKitchens = (auth_token,callback, dispatch) =>{
    var formData = new FormData();
    formData.append("token", auth_token);

    axios.get(`${GET_KITCHENS_API}?token=${auth_token}`)
      .then(response => {
        console.log(response)
        return response
      })
      .then(json => {
        if (json.data.success)
        {
            
            let myObj = json.data.data
                
            let array = $.map(myObj, function(value, index) {
                return [value];
            });
            dispatch({
                type:GET_KITCHENS_LIST,
                kitchens: array
            })
            callback(array);
        }
        else
        {
            dispatch({
                type: GET_KITCHENS_LIST_FAILED
            })
        }
      })
      .catch((error) => {
          console.log(` ${error}`)
      });

}
module.exports = getKitchens;