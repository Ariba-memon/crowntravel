import React from 'react'

function Title({title}:{title:string}) {
  return (
    <p className='text-lg text-stone-500  text-center font-bold'>
      {title}
    </p>
  )
}

export default Title
