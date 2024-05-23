import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';

import ItemCard from "./components/ItemCard";
import Loader from "./components/Loader";
import SingleItemView from "./components/SingleItemView";

const trulyInfinite = false;
const itemsPerPage = 20;
const apiBaseUrl = "/api/v1/characters";

const changeUrl = (url, title) => {
    window.history.pushState({}, title, url);
}

const App = (props) => {
    const query = props.query;
    const characterId = props.id;
    const initPage = characterId ? Math.ceil(characterId / itemsPerPage) : 1;
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(initPage);
    const [singleItemOpen, setSingleItemOpen] = useState(characterId ? true : false);
    const [singleItemData, setSingleItemData] = useState({});

    const changeSingleItemOpenState = (open, data = null) => {
        setSingleItemOpen(open);
        changeUrl(open ? "/" + data.id : "/", data ? data.name : "Rick and Morty");
        if (data) {
            setSingleItemData(data);
        }
        document.body.style.overflow = open ? 'hidden' : 'auto';
    };

    const addNewItems = (data) => {
        let results = _.get(data, "results", []);
        results = items.concat(results);
        setItems(results);

        let next = _.get(data, "info.next", null);
        if (next) {
            let url = new URL(next);
            let page = url.searchParams.get("page");
            setPage(page);
        } else if(trulyInfinite) { // if it stops, it's not truly infinite?
            setPage(1);
        } else {
            setHasMore(false);
        }
    };
    
    useEffect(() => {
        if (characterId) {
            axios.get(`${apiBaseUrl}/${characterId}`)
                .then((res) => {
                    const data = _.get(res, "data", {});
                    setSingleItemData(data);
                })
                .catch((err) => console.log(err));
        }
        fetchMoreData();
    }, []);
  
    const fetchMoreData = () => {
        let url = apiBaseUrl + "?page=" + page;
        if (query) {
            url += "&" + query;
        }
        axios
            .get(url)
            .then((res) => addNewItems(res.data))
            .catch((err) => console.log(err));
    };
  
    return (
        <div>
            <div className="mt-4 p-5">
                <h1 className="display-4 text-center">Rick and Morty</h1>
                <p className="lead text-center">Characters</p>
            </div>

            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={items.length > 0 ? "" : <Loader />}
            >
                <div className='container mt-5'>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {items && items.map((item) => <ItemCard onClickItem={changeSingleItemOpenState} data={item} key={item.id} />)}
                    </div>
                </div>
            </InfiniteScroll>
            <SingleItemView
                isOpen={singleItemOpen}
                onChangeSingleItemOpenState={changeSingleItemOpenState}
                data={singleItemData}
            />
        </div>
    );
};

export default App;