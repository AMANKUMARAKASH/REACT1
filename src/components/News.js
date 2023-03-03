import React, { Component } from 'react'
import Newitems from './Newitems'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:5,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
  
  constructor(){ 
    super();
    console.log("hello iam a constructor");
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
   async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country} &category=${this.props.category}&apiKey=9c9c7c728b8448c495c72b6b659e51b6&page=1&pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
    let parasedData=await data.json()
    this.setState({articles:parasedData.articles})
  }
  handlePreviousClick= async ()=>{
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country} &category=${this.props.category}&apiKey=9c9c7c728b8448c495c72b6b659e51b6&page=${this.state.page-1} &pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
    let parasedData=await data.json()
   
    this.setState({
      page:this.state.page -1,
      articles:parasedData.articles
    })
    

  }
  handleNextClick= async ()=>{
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country} &category=${this.props.category}&apiKey=9c9c7c728b8448c495c72b6b659e51b6&page=${this.state.page+1} &pageSize=${this.props.pageSize}`;
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    let data= await fetch(url);
    let parasedData=await data.json()
   
    this.setState({
      page:this.state.page +1,
      articles:parasedData.articles
    })
    

  }
  render() {
    return (
      <div className='container my-3'>
      <h3 className='text-center'>NewsMonkey-Top Headlines</h3>
      
      <div className='row'>
      {this.state.articles.map((element)=>{
        return  <div className='col-md-4' key={element.url} >
        <Newitems title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage}
          newsurl={element.url}
        />
        </div>

      })}
      
       
        
       
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-info mx-3" onClick={this.handlePreviousClick} > &larr; Previous</button>
        <button type="button" className="btn btn-info mx-3" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}
