const { useState } = React;

function LikeButton() {
    const [liked, setLiked] = useState(false);

    if(liked) {
        alert('You clicked this!'); 
    }

    return (
        <span onClick = {() => {setLiked(true)}} className='btn'>Click me</span>
    )
}

const domContainer = document.querySelector('#like_button');
const root = ReactDOM.createRoot(domContainer);

root.render(<LikeButton/>)