import React, { } from "react";

export default function TwitterApiPage() {
    // const [query, setQuery] = useState("");
    let query = "";
    let v = 10;

    const fetch_tweets = () => {
        // api code goes here
        console.log(query);
    };

    return (
        <div>
            <input type="text" onChange={t => {
                query = t.target.value;
                console.log(v);
            }} />
            <button onClick={fetch_tweets}>Fetch</button>
            <ol>
                <li>tweet1</li>
                <li>tweet1</li>
                <li>...</li>
            </ol>
        </div>
    );
}
