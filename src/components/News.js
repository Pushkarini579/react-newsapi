import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setpage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

 
const  updateNews=async ()=>{
  props.setProgress(10);
    const nextPage = page + 1;
  setpage(nextPage);

  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${nextPage}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)

  //setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
  props.setProgress(100);
}
useEffect(()=>{
  document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`
    // eslint-disable-next-line
    updateNews();
},[props.category])
{/*
const handleNextClick=async ()=>{
 
  setpage(page+1);
  updateNews();


  

    }
    
const handlePrevClick=async()=>{
   
  setpage(page-1);
  
    updateNews();
  

}*/}
const fetchMoreData = async () => {

  props.setProgress(30);

  

  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${page+1}&pageSize=${props.pageSize}`;
  setpage(page+1)
  let data = await fetch(url);

  props.setProgress(60);

  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)

  

  props.setProgress(100);
}


   
    return (
   
      <div  className="container my-3">
        <h1  className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top   {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines </h1>
       {loading && <Spin/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spin/>}
         
        >  
         
        <div className="container">
        <div className="row">
          {articles && articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                      <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description ? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                    </div>
       
       
          
        })}
        </div>
        </div>
         </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
              <button type="button" disabled={page<=1} className="btn btn-outline-success" onClick={handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={page+1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-outline-success" onClick=handleNextClick}>Next &rarr;</button>
        </div>*/}
        
      </div>
    )
  }

 News.defaultProps={
    country:'us',
    //pageSize:8,
    category:'general'
  }
  News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
export default News

// learn about componentDidMount(),componentWillUnmount() and componentDidUpdate() Lifecycle methods (video 34- code with harry)

