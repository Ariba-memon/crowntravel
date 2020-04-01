import React from 'react'

function Heading({heading}:{heading:string}) {
  return (
    <div className='text-2xl text-center font-bold'>
      {heading}
    </div>
  )
}

export default Heading
