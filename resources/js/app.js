require('./bootstrap');
import ReactDOM from "react-dom/client";
import App from './react/App';

const listRoot = document.getElementById('list-root');
if (listRoot) {
    let characterId = null;
    let query = "";
    const { attributes } = listRoot;
    if (attributes) {
        characterId = attributes.getNamedItem('data-id').value;
        query = attributes.getNamedItem('data-query').value;
    }

    const root = ReactDOM.createRoot(listRoot);
    root.render(
        <App
            id={characterId}
            query={query}
        />
    );
}