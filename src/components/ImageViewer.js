const IMAGE_PATH = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImageViewer ({ $target, initialState, onClick }) {
    this.$element =  document.createElement('div');
    this.$element.className = 'Modal ImageViewer';
    this.state = initialState;
    $target.appendChild(this.$element);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$element.innerHTML = `
            <div class="content">
               ${this.state ? `<img src="${IMAGE_PATH}${this.state}">` : ''} 
            </div>
        `
        this.$element.style.display = this.state ? 'block' : 'none';
        this.$element.addEventListener('click', (e) => onClick(e));
    }
    this.render();
}