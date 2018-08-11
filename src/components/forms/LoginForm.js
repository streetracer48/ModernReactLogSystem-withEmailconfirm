import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Form, Button, Message} from 'semantic-ui-react'
import Validator from 'validator'
import InlineErrors from '../messages/InlineError'

class LoginForm extends Component {
    state= {
        data:{
        email:"",
        password:"",
        },
        loading:false,
        error:{}

    }

    onChange = (e) => {
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        })
    }


onSubmit = () => {
     const error = this.validate(this.state.data);
     this.setState({ error });

if(Object.keys(error).length === 0) {
 this.setState({ loading:true})
 this.props.submit(this.state.data)
 .catch(err =>this.setState({

  error:err.response.data.error,loader:false
 }))
}

};

validate = data => {
    const error = {};
    if (!Validator.isEmail(data.email)) error.email = "Invalid email";
    if (!data.password) error.password = "Can't be blank";
    return error;
  };



  render() {
    const { data, error} = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={this.state.loading}>
{error.global && <Message negative>
<Message.Header>
Something Went Wrong
</Message.Header>
<p>
{error.global}
</p>

</Message>}
        <Form.Field  error={error.email} >
        <label htmlfor="email"> Email</label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="example@gmail.com"
        value={data.email}
        onChange={this.onChange}/>
{error.email && <InlineErrors text={error.email} />}
        </Form.Field>

        <Form.Field error={error.password}>
        <label htmlFor="Password"> Password</label>
        <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        value={data.password}
        onChange={this.onChange}
        />
        {error.password && <InlineErrors text={error.password} />}

        </Form.Field>
          <Button className="primary">Login</Button>
        </Form>

      </div>
    )
  }

}
LoginForm.PropTypes = {
    submit:PropTypes.func.isRequired
  }

export default LoginForm;

