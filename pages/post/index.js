import React from 'react'

export default function Post(props) {
 return (
  <div>
   {JSON.stringify(props)}
  </div>
 )
}
Post.getInitialProps = async ({query}) => {
 return {
  mypram : query
 }
}
