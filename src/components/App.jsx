import React from 'react';
import PropTypes from "prop-types";
import Modal from "./Modal";
import Posts from "./Posts";
import PostForm from "./PostForm";
import FetchedPost from "./FetchedPost";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Sync Post</h2>
                            <Posts/>
                        </div>
                        <div className="col">
                            <h2>Fetch Posts</h2>
                            <FetchedPost/>
                        </div>
                        <div className="col">
                            <h2>New Post</h2>
                            <PostForm/>
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}

export default App;