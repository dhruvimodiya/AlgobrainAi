import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import custom nodes (make sure these exist)
import FlowStartNode from './FlowStartNode';
import TriangleNode from './TriangleNode'; 
import HexagonNode from './HexagonNode';   
import InteractiveNode from './InteractiveNode';     
import TextNode from './TextNode';
import MapNode from './MapNode';
import LinkNode from './LinkNode';
import VideoNode from './VideoNode';
import PdfNode from './PdfNode';
import ImageNode from './ImageNode';
import ListNode from './ListNode';
import CustomEdge from './CustomEdge';
import poneNumber from './poneNumber';

// Define custom node types
const nodeTypes = {
  FlowStart: FlowStartNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  Interactive: InteractiveNode,
  Text: TextNode,
  MapNode: MapNode,
  LinkNode: LinkNode,
  VideoNode: VideoNode,
  PdfNode: PdfNode,
  ImageNode: ImageNode,
  ListNode: ListNode,
  poneNumber:poneNumber
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [];
const initialEdges = [];

const DropZone = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [droppedItems, setDroppedItems] = useState([]); // State to store dropped item names
  
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    if (!type) {
      console.error("No type found in dataTransfer.");
      return;
    }

    // Create a new node with an index
    const newNode = {
      id: `${nodes.length + 1}`, // Unique ID for the node
      type: type,
      position,
      data: { 
        label: `${nodes.length + 1}: ${type}`, 
        content: `Content for ${type}`,
        uniqueId: `${nodes.length + 1}` // Pass the unique ID to the node
      }, // Display index first then the type
    };

    // Update the nodes and dropped items state
    setNodes((nds) => [...nds, newNode]);
    setDroppedItems((prev) => [...prev, { name: newNode.data.label, content: newNode.data.content }]); // Store dropped item name

  }, [nodes, setNodes, droppedItems]); // Add droppedItems to dependencies to access the latest value

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'; // Indicate that the drop will move the element
  }, []);

  // const onConnect = useCallback((params) => {
  //   const newParams = { 
  //     ...params, 
  //     type: 'custom',
  //     animated: true,
  //     style: { stroke: 'green', strokeWidth: 2 },
  //   };
  
  //   // Get the source and target nodes
  //   const sourceNode = nodes.find(node => node.id === params.source);
  //   const targetNode = nodes.find(node => node.id === params.target);
  
  //   // if (!sourceNode || !targetNode) {
  //   //   console.error('Source or target node not found!');
  //   //   return;
  //   // }
  
  //   // Function to retrieve all data from a node by ID
  //   // const getNodeDataById = (nodeId) => {
  //   //   const node = nodes.find(node => node.id === nodeId);
  //   //   return node ? node.data : null; // Return the data if found, otherwise return null
  //   // };
  
  //   // Get data for the source and target nodes
  //   // const sourceNodeData = getNodeDataById(sourceNode.id);
  //   // const targetNodeData = getNodeDataById(targetNode.id);
  
  //   // console.log("Source Node Data:", sourceNodeData);
  //   // console.log("Target Node Data:", targetNodeData);
  
  //   // Create a new target connection object
  //   // const newTargetData = {
  //   //   id: targetNode.id,
  //   //   type: targetNode.type,
  //   //   data: {
  //   //     header: targetNodeData.header || null,
  //   //     body: targetNodeData.body || null,
  //   //     footer: targetNodeData.footer || null,
  //   //   },
  //   // };
  
  //   // Maintain a grouped connection object in the state
  //   setNodes((prevNodes) => {
  //     const updatedNodes = prevNodes.map((node) => {
  //       if (node.id === sourceNode.id) {
  //         // If the source node has previous connections, append the new one
  //         const updatedConnections = [
  //           {
  //             id: newTargetData.id,
  //             type: newTargetData.type,
  //             data: newTargetData.data,
  //           },
  //         ];
  
  //         // Update source node with new connections
  //         return {
  //           ...node,
  //           data: {
  //             // targetConnections: updatedConnections,
  //             id: sourceNode.id,
  //             type: sourceNode.type,
  //             data: so.data,
  //           },
  //         };
  //       }
  //       return node;
  //     });
  
  //     // Format output to include only id, type, and data
  //     const formattedOutput = updatedNodes.map(({ id, type, data }) => ({ id, type, data }));
  
  //     // Print the updated nodes in the desired JSON format
  //     console.log("Updated Nodes JSON:", JSON.stringify(formattedOutput, null, 2));
  //     return updatedNodes;
  //   });
  
  //   setEdges((prevEdges) => addEdge(newParams, prevEdges));
  // }, [nodes, setEdges, setNodes]);
  
  const connectionsRef = useRef({}); // Use useRef to maintain persistence across renders

  const onConnect = useCallback((params) => {
    const newParams = { 
      ...params, 
      type: 'custom',
      animated: true,
      style: { stroke: 'green', strokeWidth: 2 },
    };

    // Find the source and target nodes
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (sourceNode && targetNode) {
      // Access the connections object from the ref
      const connections = connectionsRef.current;

      // Add connection for the source node
      if (!connections[sourceNode.id]) {
        connections[sourceNode.id] = {
          label: sourceNode.data.label,
          connectedTo: []
        };
      }
      // Ensure the target is only added once
      if (!connections[sourceNode.id].connectedTo.includes(targetNode.data.label)) {
        connections[sourceNode.id].connectedTo.push(targetNode.data.label);
      }

      // Add connection for the target node
      if (!connections[targetNode.id]) {
        connections[targetNode.id] = {
          label: targetNode.data.label,
          connectedTo: []
        };
      }
      // Ensure the source is only added once
      if (!connections[targetNode.id].connectedTo.includes(sourceNode.data.label)) {
        connections[targetNode.id].connectedTo.push(sourceNode.data.label);
      }

      // Log the updated connections
      console.log('Updated connections:', connections);
    } else {
      console.warn('Source or target node not found.');
    }

    setEdges((eds) => addEdge(newParams, eds));
  }, [nodes, setEdges]);

  

  const onEdgeClick = useCallback((event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

// ----------------------------------------------------------------------------------------------------------------------------

// Define a global object to store node data
const allNodeData = {};

const handlePrintDroppedItems = (id) => {
    console.log(`Button clicked to print dropped item with id: ${id}`);

    const selectedNode = nodes.find((node) => node.id === id);
    
    if (!selectedNode) {
        console.warn(`No item found with id: ${id}`);
        return;
    }

    let nodeEl = {
        type: selectedNode.type,
    };

    if (selectedNode.type === "Text" || selectedNode.type === "FlowStart" || selectedNode.type === "ImageNode" || selectedNode.type === "VideoNode" || selectedNode.type === "PdfNode" || selectedNode.type === "MapNode"||selectedNode.type === "poneNumber") {
        const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
        nodeEl.body = nodeBodyElement ? nodeBodyElement.value || null : null;

        if (selectedNode.type === "MapNode") {
          const nodeheaderElement = document.getElementById(`node${selectedNode.id}_header`);
          nodeEl.header = nodeheaderElement ? nodeheaderElement.value || null : null;
        
          const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
          nodeEl.body = nodeBodyElement ? nodeBodyElement.value || null : null;
        
          const nodesubBodyElement = document.getElementById(`node${selectedNode.id}_subbody`);
          nodeEl.subbody = nodesubBodyElement ? nodesubBodyElement.value || null : null;  
        
          const nodeFooterElement = document.getElementById(`node${selectedNode.id}_footer`);
          nodeEl.footer = nodeFooterElement ? nodeFooterElement.value || null : null;
        }
        if (selectedNode.type === "poneNumber") {
          const nodeHeaderElement = document.getElementById(`node${selectedNode.id}_header`);
          nodeEl.header = nodeHeaderElement ? nodeHeaderElement.value || null : null;
        
          const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
          nodeEl.body = nodeBodyElement ? nodeBodyElement.value || null : null;
        
          const nodeSubBodyElement = document.getElementById(`node${selectedNode.id}_subbody`);
          nodeEl.subbody = nodeSubBodyElement ? nodeSubBodyElement.value || null : null;
        
          const nodeFooterElement = document.getElementById(`node${selectedNode.id}_footer`);
          nodeEl.footer = nodeFooterElement ? nodeFooterElement.value || null : null;
        }        
        

        if (selectedNode.type === "ImageNode") {
            const nodeHeaderImg = document.getElementById(`node${selectedNode.id}_header`);
            nodeEl.header = nodeHeaderImg ? nodeHeaderImg.value || null : null;
        }
    } else if (selectedNode.type === "ListNode" || selectedNode.type === "Interactive") {
        console.log("selectedNode.id", selectedNode.id);
        
        const fileInput = document.getElementById(`node${selectedNode.id}_header`);
        nodeEl.head = fileInput.files.length > 0 ? fileInput.files[0].name : null;

        const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
        nodeEl.body = nodeBodyElement ? nodeBodyElement.value || null : null;

        const nodeFooterElement = document.getElementById(`node${selectedNode.id}_footer`);
        nodeEl.footer = nodeFooterElement ? nodeFooterElement.value || null : null;

        // Initialize an array to store button objects
        const buttons = []; 

        // Assuming a maximum of 3 buttons
        for (let i = 0; i < 10; i++) {
            const buttonElement = document.getElementById(`node${selectedNode.id}_button${i}`);
            if (buttonElement) {
                let buttonVal = {};

                const subHeaderElement = document.getElementById(`node${selectedNode.id}_button${i}_subheader`);
                if (subHeaderElement) {
                    buttonVal.head = subHeaderElement.value || null;
                }

                const subBodyElement = document.getElementById(`node${selectedNode.id}_button${i}_subbody`);
                if (subBodyElement) {
                    buttonVal.body = subBodyElement.value || null;
                }

                const subFooterElement = document.getElementById(`node${selectedNode.id}_button${i}_subfooter`);
                if (subFooterElement) {
                    buttonVal.footer = subFooterElement.value || null;
                }

                // Push the button object into the buttons array
                buttons.push(buttonVal);
            }
        }
        nodeEl.button = buttons; // Now each entry has value, subHeader, subFooter, and subBody
    }

    // Add the nodeEl data to the allNodeData object
    allNodeData[selectedNode.id] = nodeEl;

    console.log("Current node data:", nodeEl);
    console.log("All node data so far:", allNodeData);
      
     // Log current node data in JSON format
    //  console.log("Current node data:", JSON.stringify(nodeEl, null, 2));
    
     // Log all node data so far in JSON format
    //  console.log("All node data so far:", JSON.stringify(allNodeData, null, 2));

    // -----------------------------------------------------------------------------------------------------------------------------

    // If edges exist, print connections related to this node
    const relatedEdges = edges.filter(
        (edge) => edge.source === id || edge.target === id
    );

    if (relatedEdges.length > 0) {
        const connections = relatedEdges.map((edge) => {
            const sourceNode = nodes.find((node) => node.id === edge.source);
            const targetNode = nodes.find((node) => node.id === edge.target);
            return `${sourceNode?.data.label} -> ${targetNode?.data.label}`;
        });
        
        console.log("Connections:", connections.join(' | '));
    } else {
        console.log("No connections found for this node.");
    }
};


  // Print all dropped items
  const handlePrintAllDroppedItems = () => {
    nodes.forEach((node,index) => {
      handlePrintDroppedItems(node.id); // Print each node based on its id
    });

    let stepCounter = 1; // Initialize step counter for all dropped items

    // Initialize an empty object to hold the final merged data
    const mergedData = {};

    nodes.forEach((node) => {
        // Get the node-specific data from allNodeData
        const nodeData = allNodeData[node.id] || {};
      console.log("node Data ----------------:",nodeData)
        // Get the connections for the current node from connectionsRef
        // const connections = connectionsRef.current[node.id]?.connectedTo || [];

        // Create a dynamic output structure based on node type
        const dynamicOutput = {
            types: node.type, // node type (interactive, text, etc.)
            data: {}
        };

        // Populate data based on node type
        switch (node.type) {
          case 'Interactive':
            let buttons = [];
            for (let i = 0; i < 3; i++) {
              if (nodeData.button[i]) {//
                buttons.push({
                  type: nodeData.button[i].head || "Default subheader",
                  label: nodeData.button[i].body || "Default subbody",
                  action: nodeData.button[i].footer || "Default subfooter",
                });
              }
            }
        
            dynamicOutput.data = {
              body: {
                header: nodeData.url || "default-image-url.png",
                body: nodeData.body || "Default body text", // Example default text
                footer: nodeData.footer || "Default footer text" // Example default text
              },
              action: {
                button: buttons
              }
            };
        
                break;
            case 'Text':
                dynamicOutput.data = {
                    body: {
                        text: nodeData.body || "Default text content"
                    }
                };
                break;
            case 'ImageNode':
                dynamicOutput.data = {
                    url: nodeData.url || "default-image-url.png", // Example default URL
                    alt: nodeData.alt || "Default Alt Text"
                };
                break;
            case 'FlowStart':
              dynamicOutput.data = {
                body: {
                    text: nodeData.body || "Default text content"
                }
            };
                break;
            case 'VideoNode':
                dynamicOutput.data = {
                    url: nodeData.url || "default-video-url.mp4", // Example default URL
                    description: nodeData.description || "Default Video Description"
                };
                break;
            case 'PdfNode':
                dynamicOutput.data = {
                    pdf: nodeData.url || "default-video-url.mp4", // Example default URL
                };
                break;
            case 'MapNode':
                  dynamicOutput.data = {
                    body: {
                      latitude: nodeData.header || "Default header text",
                      longitude: nodeData.body || "Default body text", // Example default text
                      name: nodeData.subbody || "Default body text", // Example default text
                      address: nodeData.footer || "Default footer text" // Example default text
                    },
                  };
              
                      break;
                      case 'poneNumber':
                        dynamicOutput.data = {
                          body: {
                            formatted_name: nodeData.header || "Default formatted name",
                            first_name: nodeData.body || "Default first name",
                            last_name: nodeData.subbody || "Default last name",
                            phone: nodeData.footer || "Default phone number"
                          }
                        };
                        break;
                
            case 'ListNode':
            let Listbutton = [];
            for (let i = 0; i < 3; i++) {
              if (nodeData.button[i]) {//
                Listbutton.push({
                  label: nodeData.button[i].body || "Default subbody",
                  action: nodeData.button[i].footer || "Default subfooter",
                });
              }
            }
        
            dynamicOutput.data = {
              body: {
                header: nodeData.url || "default-image-url.png",
                body: nodeData.body || "Default body text", // Example default text
                footer: nodeData.footer || "Default footer text" // Example default text
              },
              action: {
                button: Listbutton
              }
            };
        
                break;
            // Add more cases as needed for different node types
            default:
                dynamicOutput.data = {
                    message: "Unknown node type"
                };
                break;
        }

        // Include step and connections
        // dynamicOutput.data.connections = connections;

        // Add the dynamic output to mergedData using node label as key
        mergedData[node.data.label] = dynamicOutput;

        // Increment stepCounter for the next node
        stepCounter++;
    });

    // Print the final merged JSON object
    console.log("kb -", JSON.stringify(mergedData, null, 2));
  
  };

  return (
    <div  style={{ height: '95vh', width: '80vw', position: 'relative' }}>
 <button
  onClick={handlePrintAllDroppedItems}
  style={{
    padding: '1vw', // Padding based on viewport width
    backgroundColor: 'lightblue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'fixed',
    left: '2%', // Fixed position from the left
    bottom: '2%', // Fixed position from the bottom
    fontSize: '1vw', // Font size based on viewport width
    boxSizing: 'border-box', // Include padding and border in total width
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = 'deepskyblue'; // Change color on hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'lightblue'; // Revert color
  }}
>
  Print All Dropped Items
</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DropZone;
