const { useEffect, useState } = React;

function Timer(){
    const[seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []); 

      return(
        <div>
            Пройшло секунд: {seconds}
        </div>
      )
}

const domContainer = document.querySelector('#timer');
const root = ReactDOM.createRoot(domContainer);

root.render(<Timer/>);