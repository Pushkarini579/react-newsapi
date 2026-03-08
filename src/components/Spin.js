import React from 'react'
import loading from './loading.gif'

function Spin() {
  return (
    <div className="text-center">
       <img src={loading} alt="loading" />
    </div>
  )
}

export default Spin
