import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'us',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
   articles=[
]
  constructor (props){
    super(props);
    this.state={
      articles:[],
      loading: false,
      page:1,
      totalResults:0
    }
    document.title=`${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}-NewsMonkey`; 
  }
async updateNews(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})

}
async componentDidMount(){
 let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=1&pageSize=${this.props.pageSize}`;
 this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
}
handleNextClick=async ()=>{
  {/*if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)){
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();

        console.log(parsedData);

       
        this.setState({
          page:this.state.page+1,
          articles: parsedData.articles,
          loading:false

  })*/}
  this.setState({page:this.state.page+1});
    this.updateNews();


  

    }
handlePrevClick=async()=>{
  {/* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a711e82df044f3cbeef15727f294eb1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
   this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);

  
  this.setState({
    page:this.state.page-1,
    articles: parsedData.articles,
    loading:false


  })*/}
  this.setState({page:this.state.page-1});
    this.updateNews();
  

}

  render() {
   
    return (
   
      <div  className="container my-3">
        <h1  className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top   {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines </h1>
        {this.state.loading && <Spin/>}
        
        <div className="row">
          {!this.state.loading&&this.state.articles && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                      <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description ? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
                    </div>
       
          
        })}
        </div>
        <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-outline-success" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-outline-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}
export default News

// learn about componentDidMount(),componentWillUnmount() and componentDidUpdate() Lifecycle methods (video 34- code with harry)

