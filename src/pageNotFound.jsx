import React from 'react'

const PageNotFound = () => {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <button onClick={()=>(window.location.href='/signin')}>Login</button>
    </div>
  )
}

export default PageNotFound
