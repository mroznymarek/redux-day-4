import React from 'react'
import moment from 'moment'
import 'moment/locale/pl'

import { connect } from 'react-redux'
import { logOut } from './state/auth'

moment.locale('pl')

const App = (props) => (
  <div>
    <button
      onClick={props._logOut}
    >
      Log out
    </button>
    {Object.entries(props._userLoginsLog || {})
      .map(
        ([key, value]) => (
          <div
          key={key}
          >
          {moment(value.timestamp).format('LLL')}
          </div>
        ) 
      )
    }
  </div>
)

const mapStateToProps = state => ({
  _userLoginsLog: state.auth.userLoginsLog
})

const mapDispatchToProps = dispatch => ({
  _logOut: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
