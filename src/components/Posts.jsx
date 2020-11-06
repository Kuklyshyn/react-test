import React from 'react';
import {connect} from 'react-redux';
import Post from './Post';

const Posts = ({syncPost}) => {
    if (!syncPost.length) {
        return <p>No posts....</p>

    }
    return syncPost.map(
        post => <Post post={post} key={post.id}/>
    )
}

function mapStateToProps(state) {
    return {
        syncPost: state.posts.posts
    }

}
export default connect(mapStateToProps, null)(Posts);