import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import "./MovieCard.css";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import posterImg from '../../images/poster_example.jpg';
import '../../icons/iconfont.css';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from "react-redux";
import { deleteMovie } from '../../actions';

export function MovieCard(props) {
    const { name, category, likes, dislikes, id } = props
    let isLike = null
    isLike = props.isLike

    var handleLike = action => e => {
        props.toggleLike(action);
    }

    var deleteMovie = () => {
        props.deleteMovie(id)
    }

    return (
        <Card className="movie_card">
            <CardActionArea>
                <CardMedia
                    title='photo'
                    className="movie_poster"
                    image={posterImg}
                />
                <CardContent>
                    <p className="movie_name">{name}</p>
                    <p className="category">{category}</p>
                    <div className="ratio_gauge">
                        <span>like</span>
                        <Tooltip title={(likes / (dislikes + likes) * 100).toFixed(2) + '%'}>
                            <LinearProgress
                                variant="determinate"
                                value={likes / (dislikes + likes) * 100}
                                className="progress_bar"
                            />
                        </Tooltip>
                        <span>dislike</span>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Tooltip title='like'>
                    <Button
                        className='iconfont like_icon'
                        name='like_btn'
                        onClick={handleLike('like')}
                        style={{ color: isLike === true ? 'red' : 'black' }}
                    >
                        &#xe73b;
                    </Button>
                </Tooltip>
                <Tooltip title='dislike'>
                    <Button
                        className='iconfont dislike_icon'
                        name='dislike_btn'
                        onClick={handleLike('dislike')}
                        style={{ color: isLike === false ? 'red' : 'black' }}
                    >
                        &#xe726;
                    </Button>
                </Tooltip>
                <Tooltip title='delete'>
                    <Button
                        className='iconfont delete_icon'
                        onClick={deleteMovie}
                    >
                        &#xe727;
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(
    mapStateToProps,
    { deleteMovie }
)(MovieCard)