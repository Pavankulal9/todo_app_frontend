// import { refreshAccessToken } from '../utils/apiCalls';
import useAtuhContext from './useAuth';
import { axiosPrivate } from '../utils/apiCalls';

const useRefreshToken = () => {
    const {setAuth} = useAtuhContext();

    const refresh  = async()=>{
        const {data} = await axiosPrivate.get('/api/v1/users/update-token/');

        setAuth((prev)=>{
            return {...prev,accessToken:data.data.accessToken}
        });

        return data.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;
