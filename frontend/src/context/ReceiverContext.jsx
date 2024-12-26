import {createContext,useState} from 'react'

const ReceiverContext = createContext(null);

const ReceiverProvider = ({children})=>{
    const [receiverId ,setReceiverId] = useState("");
    return (
        <ReceiverContext.Provider value={{receiverId,setReceiverId}}>
            {children}
        </ReceiverContext.Provider>
    )
}

export {ReceiverProvider,ReceiverContext};