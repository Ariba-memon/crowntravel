import React from 'react'

function Paragraph({title}:{title:string}) {
  return (
    <div className='text-gray-600 text-center font-bold'>
      {title}
    </div>
  )
}

export default Paragraph
