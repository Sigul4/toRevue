import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeIcon from '@mui/icons-material/Mode';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import '../App.css';
import deletePost from "../helpers/deletePost";
import CreatePost from './ChangePost.js';
import PostWrapper from './PostWrapper';
import Drop from './DropZone'
import { Card, Hidden } from '@mui/material';
import uploadFile from '../helpers/uploadFile';


const UserPage = ({match: {params: {_id}}, props = {}, posts = [], aboutMe, onLoadUserInf, onLoadUserPosts, onProfileChange, postLike, postUnlike, onFollow, onUnfollow }) => {
    // console.log("!!!!!!!!!aboutMe", aboutMe)
    let   [SmthToView,    ChangeView         ]   = useState([])
    const [takingData,    SetTakingData      ]   = useState(false)
    const [follow,        SetFollow          ]   = useState()
    const [postsToDelete, changePostsToDelete]   = useState([]);
    const [avatarSrc,     changeAvatarSrc    ]   = useState('')
    const [popUpDropMenu, changePopUpDropMenu]   = useState(false)
    const [profileImage,   ChangeProfileImage]   = useState()

    
    const addPostToDelete = (id) =>{
        console.log('postData',id)
        changePostsToDelete(postsToDelete.push(id))
        console.log('postsToDelete',postsToDelete)
    }    

    const recoverPost = (id) =>{
        changePostsToDelete(postsToDelete.filter(posts !== id))
    }
    
    useEffect(() => {
        return () => console.log(postsToDelete,"Posts To Delete",postsToDelete.map(id => deletePost(id)))
    }, []);

    
    useEffect(()=>{
        console.log('Подгрузился, проверяй')
        onLoadUserInf(_id)
        onLoadUserPosts(_id)
        console.log('takingData',takingData)
    },[_id, takingData])
    
    
    useEffect(()=>{
        document.addEventListener('scroll', onScroll)

        return function(){
            document.removeEventListener('scroll', onScroll)
        }
    },[])

    useEffect(()=>{
        if(!!aboutMe)console.log('Меняю инфй о тебе, проверяй', props?.followers?.map((follower) => follower._id === aboutMe._id).includes(true))
        if(!!aboutMe)SetFollow(props?.followers?.map((follower) => follower._id === aboutMe._id).includes(true))
    },[props])
    
    useEffect(()=>{
        if(!!aboutMe)ChangeView(posts.map(post => <PostWrapper key={post._id} post={post} aboutMe={aboutMe} postLike={postLike} postUnlike={postUnlike} changePostsToDelete={addPostToDelete} recoverPost={recoverPost} className="post"/> ))
        console.log('SmthToView, posts',SmthToView, posts)
    },[posts])
    
    useEffect(()=>{
        console.log('i`m changed',props?.avatar?.url, `http://hipstagram.node.ed.asmer.org.ua/${props?.avatar?.url}`, avatarSrc)
        if(props?.avatar?.url)changeAvatarSrc(`http://hipstagram.node.ed.asmer.org.ua/${props?.avatar?.url}`)
    },[props])

    function onScroll(e) {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            console.log('Экшн ПОСЛЕ СКРОЛА ', takingData)
            SetTakingData(takingData => takingData = !takingData)
        }
    }

        return (
            
            <Box sx={{width: "100%",display: "flex", justifyContent: "center" }}>
                {popUpDropMenu? <>
                
                                    <Card sx={{position:"fixed",top: 200,margin:"auto",height:400, zIndex:4, overflow:"hidden", background:"rgb(231,231,231)"}}>
                                        <Drop style={{height:"100%"}}
                                        imageData={(image) => {
                                            ChangeProfileImage(image[0])}} onUpload={uploadFile}/>

                                        <Button sx={{position:"absolute", right: "0", zIndex: 5, top: 0,fontSize:20}} onClick={() => {changePopUpDropMenu(!popUpDropMenu)}}>X</Button>

                                        <div style={{display: "flex", justifyContent:"center"}}>
                                                <CardMedia
                                                    image={`http://hipstagram.node.ed.asmer.org.ua/${profileImage?.url}`}
                                                    component="img"
                                                    sx={{margin:"10px", width:"55%"}}
                                                />
                                        </div>
                                        <Button variant="contained" onClick={async() =>  {await onProfileChange(profileImage._id, "SobakaSutulaya"); onLoadUserInf(_id); changePopUpDropMenu(!popUpDropMenu)}}>Change Profile Page</Button>
                                    </Card>
                                </>: ''}
                <Box sx={{maxWidth: 1200}}>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://orname.ru/wp-content/uploads/2017/05/orname_ru_F009.png"
                            sx={{width: "100%"}}
                            alt="Background"
                        />
                    </Box>
                        
                    <Stack
                    sx={{padding: 1}}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                    >
                        <Box sx={{position: "relative", left:30, top:-70,width: 350, height: 100}}>                    
                            <CardHeader
                                avatar={
                                <div style={{width: 100, height: 100,}}>
                                    {/* "62fb815073ca650acb933a13" */}
                                    {/* "62fb7f9e73ca650acb933a11" */}
                                <ModeIcon sx={{fontSize: 50, color: 'white',zIndex: 3,position: "absolute",left:"42px", top:"42px", opacity: "0","&:hover": {opacity: "1"}}}/>
                                <Avatar onClick={() => changePopUpDropMenu(!popUpDropMenu)} sx={{ bgcolor: red[500], width: 100, height: 100,}} alt='' aria-label="recipe" src={avatarSrc}><h1>{props?.login? props?.login[0].toUpperCase(): '' }</h1></Avatar>
                                </div>
                                }/>
                                
                            <Typography component={'span'} variant={'body2'}  sx={{position: "absolute", left:180, top:50}}>
                                <h2>{props.nick}</h2>
                                {/* <p>{Object.values(props)[2]}</p> */}
                            </Typography>
                        </Box>
                        <Box sx={{width: 200}}>
                        {!!aboutMe && _id !== aboutMe._id? !follow ? <Button variant="contained" onClick={() => {SetFollow(!follow); onFollow(_id)}}>Subscribe</Button>: <Button variant="outlined" onClick={() => {SetFollow(!follow); onUnfollow(_id)}}>Unsubscribe</Button> :''}
                        </Box>
                        <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="baseline"
                        spacing={2}
                        >
                            {<Box><FavoriteIcon/>{props?.likesCount || 0}</Box> }
                            { <Box><SportsMartialArtsIcon/>{props?.followers?.length}</Box>}
                            {<Box><AccessibleForwardIcon/>{props?.following?.length || 0}</Box> }
                            { <Box><AccessibleForwardIcon/>{new Date(props.createdAt*1).toDateString()}</Box>}
                        </Stack>
                    </Stack>   
                            
                    <div className="PostList">
                        <CreatePost onChange={()=>{console.log('addPost')}}/>
                        {SmthToView}
                    </div>
                    
                </Box>
            </Box>
        )
}
export default UserPage;
