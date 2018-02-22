import React,{Component} from 'react'
import {select as d3Select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
// eslint-disable-next-line
import {transition} from 'd3-transition'
import {line,curveBasis as curveType,area} from 'd3-shape'
import {mean,max} from 'd3-array'

function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, mean(V, function(v) { return kernel(x - v); })];
    });
  };
}

function kernelEpanechnikov(k) {
  return function(v) {
    // eslint-disable-next-line
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}



export default class DensityPlot extends Component {
  constructor(props){
    super(props)
    const {xStart,xEnd,yBottom,yTop} = props
    this.y_scale = scaleLinear()
                    .domain([0,0])
                    .range([yBottom,yTop])
    this.x_scale = scaleLinear()
                    .domain([0,100])
                    .range([xStart,xEnd])
    this.lineGen =  line()
                       .x((d,i) => this.x_scale(d[0]))
                       .y((d,i) => this.y_scale(d[1]))
                       .curve(curveType)
   this.areaGen =  area()
                      .x0(xStart)
                      .x1((d,i) => this.x_scale(d[0]))
                      .y((d,i) => this.y_scale(d[1]))
                      .curve(curveType)
    this.you_scale = scaleLinear()
                    .domain([0,100])
                    .range([xStart+15,xEnd-15])

  }

  shouldComponentUpdate(nextProps){
    const density = this.getDensity(nextProps.drawn)
    const ceiling = max(density.map((d)=>d[1]))
    this.x_scale.domain([0,ceiling])
    d3Select(this.lineNode).transition()
                       .attr('d',this.lineGen(density))
   d3Select(this.areaNode).transition()
                      .attr('d',this.areaGen(density))
    return false
  }

  getDensity(data){

     return data.length === 0? this.y_scale.ticks(100).map((d,i)=>[d,0]) : kernelDensityEstimator(kernelEpanechnikov(10), this.x_scale.ticks(100))(data)

  }
  render(){
    const density = this.getDensity(this.props.drawn)
    const ceiling = max(density.map((d)=>d[1]))
    this.y_scale.domain([0,ceiling])
    const you = this.you_scale(this.props.you)
    return (<g>
      {/* <path ref={node => this.lineNode = node }
                  d = {this.lineGen(density)}
                  fill = "none"
                  stroke = "#1361B1"
                  strokeOpacity = ".5"
                  strokeWidth = "5"
            /> */}
    <path ref={node => this.areaNode = node }
                d = {this.areaGen(density)}
                fill = "#60879677"
                stroke = "none"
                strokeOpacity = ".5"
                strokeWidth = "5"

          />
          <line x1={you} x2={you} y1={this.props.yBottom} y2={this.props.yTop+30} style={{
            stroke: '#11111199',
            strokeWidth:3
          }}/>
          <text x={you} y={this.props.yTop+20} style={{
            fontSize:12,
            textAnchor:"middle"
          }}>You</text>
          <text x={this.props.xEnd/2} y={this.props.yBottom-5} style={{
            fontSize:12,
            textAnchor:"middle",
            fill:"grey"
          }}>Everyone</text>
          </g>)
  }
}
