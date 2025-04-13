const el = React.createElement;

class LikeButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {liked: false}
    }

    render() {
        if(this.state.liked){
            alert(`You clicked button`)
        } 
        
        return (
            <span onClick={() => {this.setState( { liked: true } ) } } className="btn">Click me!</span>
        )
    }
}

const domContainer = document.querySelector('#like_button');
const root = ReactDOM.createRoot(domContainer);

root.render(<LikeButton/>);