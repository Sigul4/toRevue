import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import IconButton       from '@mui/material/IconButton';
import { styled }       from '@mui/material/styles';
import Typography       from '@mui/material/Typography';
import * as React       from 'react';
import { Link }         from 'react-router-dom';
import actionNewComment from "../actions/actionNewComment";
import Carusel          from './CaruselOfPictures';
import Comments         from './Comments.js';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({userId, postId, title, text, createdAt,comments, owner, images, likes, postLike, postUnlike, onChangePost, onDeletePost}) {
  const [myComments, changeComments] = React.useState(comments);
  const [expanded,      setExpanded] = React.useState(false);
  const [commentText,    ChangeText] = React.useState('');

  const date = new Date(createdAt*1).toDateString()

  // console.log('likes',likes)

  // console.log('owner', owner)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likesInf = likes ? Object.values(likes).map(like => {if(like.owner._id === userId) return like._id}).filter(element => element !== undefined) :() =>{}
  const [statusOfLike, setStatus] = React.useState(!!likesInf.length)

  if (images) console.log('images._id',Object.values(images))

  return (
    <Card sx={{ maxWidth: 500, width: "100%", marginBottom: "40px" }}  >
      <CardHeader
      
        avatar={
          <Link to={`profile/${owner._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
            <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src="http://pics.livejournal.com/ucmopucm/pic/000a610c"></Avatar>
            <strong><h3>{owner.login !== null ? owner.login : 'Анонимная парасятина!'}</h3></strong>
          </Link>
        }
        action={userId === owner._id
                  ?<>
                  <Button 
                    onClick={onChangePost}
                  >
                    Change
                  </Button>
                  <Button       
                    sx={{backgroundColor: 'red'}} 
                    variant="contained"
                    onClick={onDeletePost}
                  >
                    Delete
                  </Button>
                  
                  </>
                  :''
        }
        
        subheader={date.substr(0,30)}
        
      />
      <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {!!images ? <Carusel images={images} /> : ''} 
        <h3>
          {title === 'null' ? '': title}
        </h3>
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {/* {console.log(likesInf)} */}
        {statusOfLike ? <FavoriteIcon onClick={() => {postUnlike(likesInf[0]); setStatus(!statusOfLike)}} /> : <FavoriteBorderIcon onClick={() => {postLike(postId);setStatus(!statusOfLike)}} />  }        
        
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography textAlign="left" paragraph>
          {/* comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} */}
            <Box sx={{marginTop: 10}}>
                <TextField
                    sx={{width: '100%'}}
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    onChange = {(e) => {ChangeText(e.target.value)}}
                    value={commentText}
                    />
                <Button onClick={ async () => {
                  console.log(postId); 
                  const newComments = await actionNewComment(commentText, postId)
                  console.log('myComments',myComments, newComments)
                  changeComments(myComments => myComments = [...myComments, newComments])
                  console.log('myComments',myComments);
                  ChangeText('')
                }} >Add Comments</Button>
            </Box>
            {!!myComments ? <Comments comments={myComments} postId={postId}/> : ''}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
