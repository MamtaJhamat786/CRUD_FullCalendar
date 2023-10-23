import React from 'react'

const DetailView = () => {
  return (
    <div className="d-flex flex-column align-items-start p-2" 
        style={{
            backgroundColor: '#EEEEEE',
            height:'60px', 
            fontSize: '12px', 
            marginBottom:'10px'
        }}>
        <p style={{color: '#E98968', marginBottom: 0}}>Calendar</p>
        <p style={{marginBottom: 0, marginTop: '4px'}}>List view</p>
    </div>
  )
}

export default DetailView;
