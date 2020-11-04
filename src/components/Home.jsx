import React from 'react';
import PropTypes from "prop-types";
import Modal from "./Modal";
import Posts from "./Posts";
import PostForm from "./PostForm";

class Home extends React.Component {
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
                            <h2>Post</h2>
                            <Posts posts={[1, 2, 3]}/>
                        </div>
                        <div className="col">
                            <h2>Post</h2>
                            <Posts posts={[]}/>
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

Home.propTypes = {

}

export default Home;