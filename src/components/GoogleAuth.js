import React from 'react'

class GoogleAuth extends React.Component {
    state = { isSignedIn: null }

    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '870845567256-4l9udko428pdlauv0d7rpada7sdu7vce.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null ){
            return null
        }else if (this.state.isSignedIn === true){
            return (
                <button onClick={this.onSignOutClick}className="ui red google button">
                    <i className="google icon"/>
                    Sign out
                </button>
            )
        }else{
            return (
                <button onClick={this.onSignInClick} className="ui green google button">
                    <i className="google icon"/>
                    Sign in
                </button>
            )
        }
    }


    render() {
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleAuth