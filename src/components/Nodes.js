
export default function Nodes ({ $target, initialState, onClick, onPrevClick }) {
    this.$element = document.createElement('div');
    this.$element.className = 'Nodes';
    this.state = initialState;
    $target.appendChild(this.$element);

    this.onPrevClick = onPrevClick;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.$element.addEventListener('click', (e) => {
        const { nodeId } =  e.target.closest(".Node").dataset;
        if(!nodeId){
            onPrevClick();
        }else {
            const selectNode = this.state.nodes.filter(node => node.id === nodeId)[0];
            onClick(selectNode);
        }
    })
      
    this.render = () => {
        if(this.state?.nodes) {
            const template = `
                ${this.state?.nodes?.map( node => `
                        <div class="Node" key="${node.id}" data-node-id="${node.id}">
                            ${node.type === 'DIRECTORY' ? `<img src="./assets/directory.png" />` : `<img src="./assets/file.png" />`}
                            ${node.name}
                        </div>
                    `
                ).join('')}
            `

        this.$element.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="./assets/prev.png" /></div>${template}` : template;
        }
    }
 
    this.render();

}