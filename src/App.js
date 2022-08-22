import Nodes from "./components/Nodes.js";
import Breadcrumb from './components/Breadcrumb.js';
import { fetchPhoto } from './api.js';
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loading.js";

export default function App ({ $target }) {
    this.state = {
        nodes : [],
        isRoot: false,
        depth: [],
        selectedFilePath: null,
        isLoading: false,
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        });
        breadcrumb.setState(this.state.depth);
        imageViewer.setState(this.state.selectedFilePath);
        loading.setState(this.state.isLoading);
    }

    const breadcrumb = new Breadcrumb({
        $target,
        initialState: [],
    });

    
    const imageViewer = new ImageViewer({
        $target,
        initialState: this.state.selectedFilePath,
        onClick: async (e) => {
            if(e.target.nodeName !== 'IMG') {
                this.setState({ ...this.state, selectedFilePath: null});
            }
        }
    })

    const nodes = new Nodes({
        $target,
        initialState: [],
        onClick: async(node) => {
            try {
                if(node.type === 'DIRECTORY'){
                    this.setState({...this.state, isLoading: true});
                    const nodeInfo = await fetchPhoto(node.id);
                    this.setState({...this.state, isLoading: false});
                    this.setState({
                        ...this.state,
                        depth: [...this.state.depth, node],
                        nodes: nodeInfo,
                        isRoot: false
                    })
                }else if (node.type === 'FILE'){
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath,
                    })
                }
            }catch(e){

            }
        },
        onPrevClick: async () => {
            const nextState = { ...this.state };
            nextState.depth.pop();
            const prevNodeId = nextState.depth.length ? nextState.depth[nextState.depth.length - 1]?.id : null;

            if(prevNodeId === null) {
                this.setState({...this.state, isLoading: true});
                const root = await fetchPhoto();
                this.setState({...this.state, isLoading: false});
                this.setState({
                    ...nextState,
                    isRoot: true,
                    nodes: root,
                });
            }else {
                this.setState({...this.state, isLoading: true});
                const prevNode = await fetchPhoto(prevNodeId);
                this.setState({...this.state, isLoading: false});
                this.setState({
                    ...nextState,
                    isRoot: false,
                    nodes: prevNode,
                });
            }

            
        }
    });

    const loading = new Loading({
        $target,
        initialState:''
    })

    const init = async () => {
        const res = await fetchPhoto();
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: res,
        })
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape")
              this.setState({ ...this.state, selectedFilePath: null });
          });
    }

    init();

};