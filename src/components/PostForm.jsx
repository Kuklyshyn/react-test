import React from 'react';
import {connect} from 'react-redux';
import {createPost} from "../redux/actions";
import cn from 'classnames';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isEmpty: false
        }
    }
    submitHandler(event) {
        event.preventDefault();

        const {title} = this.state;

        const  newPost = {
            title, id: Date.now().toString()
        }
        if (newPost.title.trim()) {
            this.props.createPost(newPost);
            this.setState({
                title: '',
                isEmpty: false
            });
        }
        else {
            this.setState({isEmpty: true});
        }


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
                <p className={cn({"d-none": !this.state.isEmpty})}>Field is empty</p>
            </form>
        )
    }
}

const mapDispatchToProps = {
    createPost
}
export default connect(null, {createPost})(PostForm);