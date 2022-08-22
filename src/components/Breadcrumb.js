
export default function Breadcrumb ({ $target, initialState }) {
    this.$element =  document.createElement('nav');
    this.$element.className = 'Breadcrumb';
    this.state = initialState;
    $target.appendChild(this.$element);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {// map 형태
        this.$element.innerHTML = `
            <div class="nav-item">root</div>
            ${this.state?.map(node => `<div class="nav-item">${node.name}</div>`).join('')} 
        `
    }
    this.render();
}