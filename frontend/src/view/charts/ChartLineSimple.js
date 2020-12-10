import React from 'react'
import PropTypes from 'prop-types'
import { getColor, deepObjectsMerge } from '@coreui/utils/src'
import { CChartLine } from '@coreui/react-chartjs'
import {formatNumber} from "../pages/Procurement";

const ChartLineSimple = props => {

  const {
    borderColor,
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    labels,
    pointed,
    ...attributes
  } = props

  const pointHoverColor = (()=>{
    if (pointHoverBackgroundColor) {
      return pointHoverBackgroundColor
    } else if (backgroundColor !== 'transparent') {
      return backgroundColor
    }
    return borderColor
  })()

  const defaultDatasets = (()=>{
    return [
      {
        data: dataPoints,
        borderColor: getColor(borderColor),
        backgroundColor: getColor(backgroundColor),
        pointBackgroundColor: getColor(pointHoverColor),
        pointHoverBackgroundColor: getColor(pointHoverColor),
        labels
      }
    ]
  })()


  const defaultOptions = (()=>{
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem, data) {
            return "$ " + formatNumber(tooltipItem.yLabel);
          },
        },
      },
      scales: {
        xAxes: [
          {
            offset: true,
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }
        ],
          yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              beginAtZero: true,
              max: Math.max.apply(Math, dataPoints) + 5
            }
          }
        ]
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
            hitRadius: 10,
            hoverRadius: 4
        }
      }
    }
  })()

  const computedDatasets = (() => {
    return deepObjectsMerge(defaultDatasets, attributes.datasets || {})
  })()

  // render

  return (
    <CChartLine
      {...attributes}
      type="line"
      datasets={computedDatasets}
      options={defaultOptions}
      labels={labels}
    />
  )
}

ChartLineSimple.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  //
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  dataPoints: PropTypes.array,
  label: PropTypes.string,
  pointed: PropTypes.bool
};

ChartLineSimple.defaultProps = {
  borderColor: 'rgba(255,255,255,.55)',
  backgroundColor: 'transparent',
  dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
  label: 'Sales'
};

export default ChartLineSimple
