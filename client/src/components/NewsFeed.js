import { useEffect, useState } from 'react'
import axios from 'axios'
import { RippleLoader } from 'load-animations-react'
const baseUrl = "https://crypto0dash.herokuapp.com"
// const baseUrl = "http://localhost:5000"


const NewsFeed = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {

        const options = {
            method: 'GET',
            url: `${baseUrl}/news`,

        }

        axios.request(options).then((response) => {
            //console.log(response.data)
            setArticles(response.data)

        }).catch((error) => {
            console.error(error)
        })
    }, [])

    //console.log(articles)

    // const first7Articles = articles?.slice(0, 7)

    return (
        <div className="news-feed ">
            <h2 style={{ textAlign: "center" }}>News Feed</h2>
            {articles ?
                articles.map((article, _index) => (
                    <div key={_index}>
                        <a href={article.url} target="_blank" rel="noreferrer"><p>{article.title}</p></a>
                    </div>))
                : (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50%",
                        // width: "300px",
                    }}>
                        <RippleLoader />
                    </div>
                )
            }
        </div>
    )
}

export default NewsFeed