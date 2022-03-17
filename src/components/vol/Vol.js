import React from 'react'
import { connect } from 'react-redux'

function Vol(props) {
  const { chosenAller } = props.data
  return (
    <div>Vol</div>
  )
}


const mapStateToProps = (state) => ({
  data: state.mainBranch,
})

export default connect(mapStateToProps)(Vol)