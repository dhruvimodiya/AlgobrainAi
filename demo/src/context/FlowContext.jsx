import { createContext, useContext,useCallback} from "react";
import {useNodesState,useEdgesState,addEdge, Position} from 'reactflow';

const FlowContext = createContext({});

// export function useFlow
export function useFlowContext(){
    return useContext(FlowContext);
}

const initialNodes = [
    {id:'3',position:{x:200,y:200},type:'Position',data:{id:'3',label:'2'}},
    {id:'4',position:{x:500,y:200},type:'Scale',data:{id:'4',label:'2'}},
    {id:'5',position:{x:700,y:200},type:'Rotation',data:{id:'5',label:'2'}},
    {id:'6',position:{x:500,y:50},type:'Output',data:{id:'8',label:'2'}},
]

const initialEdges =[]


export function FlowProvider({children}){
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params)=>setEdges((eds)=>addEdge(params,eds)),[setEdges]);
    const values = {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect
    }
    return(
        <FlowContext.Provider value={values}>
            {children}
        </FlowContext.Provider>
    )
}