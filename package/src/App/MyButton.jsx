export default function MyButton({ count, setCount }) {

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Hazme click!
        </button>

    );
}