import React from 'react';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }
    submitHandler(event) {
        event.preventDefault();

        const {title} = this.state;

        const  newPost = {
            title, id: Date.now().toString()
        }
        this.setState({title: ''});

        console.log(newPost);

    }
    changeHandler(event) {
        event.persist();

        this.setState(prev => ({...prev, ...{
            [event.target.name]: event.target.value
        }}))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler.bind(this)}>
                <div className="form-group">
                    <label htmlFor="title">Posts Title</label>
                    <input type="text"
                           className="form-control"
                           id="title"
                           name="title"
                           value={this.state.title}
                           onChange={this.changeHandler.bind(this)}
                    />
                </div>
                <button className="btn btn-success" type="submit">Create</button>
            </form>
        )
    }
}