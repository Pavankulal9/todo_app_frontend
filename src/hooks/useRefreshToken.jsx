import {axiosPrivate} from '../utils/apiCalls';

const useRefreshToken = () => {

    const refresh  = async()=>{
        try {
            const response = await axiosPrivate.get('/api/v1/users/update-token');
            const data = await response.data;
            return data.data.accessToken
        } catch (error) {
            console.log(error.message);
        }
    }

    return refresh;
}

export default useRefreshToken;
