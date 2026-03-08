import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
   articles=[
]
  constructor (){
    super();
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  }
async componentDidMount(){
 let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=1a711e82df044f3cbeef15727f294eb1";
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults})
}
handleNextClick=async ()=>{
  if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)){

  

   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${this.state.page + 1}&pageSize=20`;
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  this.setState({articles: parsedData.articles})
  this.setState({
    page:this.state.page+1
  })
}
  

    }
handlePrevClick=async()=>{
   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${this.state.page - 1}&pageSize=20`;
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  this.setState({articles: parsedData.articles})
  this.setState({
    page:this.state.page-1
  })
  

    }

  render() {
   
    return (
   
      <div  className="container my-3">
        <h1  className="text-center">NewsMonkey - Top Headlines</h1>
        
        <div className="row">
          {this.state.articles && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                      <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description ? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
       
          
        })}
        </div>
        <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-outline-success" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" className="btn btn-outline-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}
export default News


















