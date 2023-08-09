// RecoilStateProvider
import { RecoilRoot } from "recoil";

const RecoilStateProvider = ({children}) =>{
    return(
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
};
export default RecoilStateProvider;