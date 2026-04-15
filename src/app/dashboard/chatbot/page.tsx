"use client"

import { useCallback, useState } from "react"
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Connection, 
  Edge, 
  Panel,
  Handle,
  Position
} from "reactflow"
import "reactflow/dist/style.css"
import { Bot, Link as LinkIcon, MessageSquare, ShieldAlert, Code2 } from "lucide-react"

// Custom Node Component for "Message"
const MessageNode = ({ data }: any) => {
  return (
    <div className="bg-white border border-emerald-500/50 rounded-xl shadow-xl w-64 text-sm mt-4">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-emerald-500" />
      <div className="bg-gray-100 p-3 rounded-t-xl border-b border-gray-200 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-emerald-600" />
        <span className="font-bold text-gray-900">Send Message</span>
      </div>
      <div className="p-4 text-gray-700 min-h-16">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-emerald-500" />
    </div>
  )
}

const ConditionNode = ({ data }: any) => {
  return (
    <div className="bg-white border border-orange-500/50 rounded-xl shadow-xl w-64 text-sm mt-4">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-500" />
      <div className="bg-gray-100 p-3 rounded-t-xl border-b border-gray-200 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-orange-400" />
        <span className="font-bold text-gray-900">Condition</span>
      </div>
      <div className="p-4 text-gray-700 min-h-16 flex flex-col gap-2">
        <div className="text-xs text-gray-400">IF</div>
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="true" className="w-3 h-3 bg-green-500 -ml-8" />
      <Handle type="source" position={Position.Bottom} id="false" className="w-3 h-3 bg-red-500 ml-8" />
    </div>
  )
}

const nodeTypes = {
  messageNode: MessageNode,
  conditionNode: ConditionNode,
}

const initialNodes = [
  { id: "1", type: 'input', position: { x: 250, y: 25 }, data: { label: "Trigger: Keyword 'Start'" }, className: "bg-emerald-600 text-white font-bold border-none" },
  { id: "2", type: "messageNode", position: { x: 250, y: 125 }, data: { label: "Hi there! Welcome to GrowFlow. How can I help you today?" } },
  { id: "3", type: "conditionNode", position: { x: 250, y: 300 }, data: { label: "User replies with 'Pricing'" } },
  { id: "4", type: "messageNode", position: { x: 100, y: 500 }, data: { label: "Here is our pricing link: /pricing" } },
  { id: "5", type: "messageNode", position: { x: 400, y: 500 }, data: { label: "Let me connect you to a human agent..." } },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", sourceHandle: "true", label: "Yes" },
  { id: "e3-5", source: "3", target: "5", sourceHandle: "false", label: "No / Other" },
]

export default function ChatbotBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const addNode = (type: string) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: type,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { label: `New ${type.replace('Node', '')}` }
    }
    setNodes((nds) => nds.concat(newNode))
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-500" /> Chatbot Flow Builder
          </h1>
          <p className="text-gray-500 mt-1">Design automated WhatsApp conversations visually.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-gray-100 hover:bg-slate-700 text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors">
              Save Draft
           </button>
           <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Publish Flow
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden relative shadow-xl focus-within:ring-2 focus-within:ring-emerald-500/50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#F0F2F5]"
        >
          <Background color="#334155" gap={16} size={1} />
          <Panel position="top-left" className="bg-white p-2 rounded-xl border border-gray-200 flex flex-col gap-2 shadow-2xl m-4 z-10">
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider">Drag & Drop</div>
            <button onClick={()=>addNode('messageNode')} className="flex items-center gap-2 text-sm text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors w-full text-left">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> Message
            </button>
            <button onClick={()=>addNode('conditionNode')} className="flex items-center gap-2 text-sm text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors w-full text-left">
              <ShieldAlert className="w-4 h-4 text-orange-400" /> Condition
            </button>
            <button onClick={()=>addNode('apiNode')} className="flex items-center gap-2 text-sm text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors w-full text-left">
              <Code2 className="w-4 h-4 text-green-400" /> API Call
            </button>
          </Panel>
          <MiniMap 
            nodeColor={(n)=> n.type === 'input' ? '#4f46e5' : n.type==='conditionNode' ? '#f97316' : '#1e293b'}
            maskColor="rgba(15, 23, 42, 0.8)"
            style={{ backgroundColor: '#0f172a' }}
          />
          <Controls 
             className="bg-white border-gray-200 fill-white [&>button]:border-gray-200 [&>button]:bg-white hover:[&>button]:bg-gray-100"
          />
        </ReactFlow>
      </div>
    </div>
  )
}
