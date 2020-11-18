const Movies=require('../model/movieList')


exports.rootPage=(req,res)=>{
    res.redirect('/admin/add-movie')
}

exports.getAddMovie=(req,res,next)=>{
    res.render('add-movie')
}
exports.postAddMovie=(req,res,next) =>{
    let link    =   req.body.link
    let name    =   req.body.name
    let price   =   req.body.price
    let details =   req.body.details
    console.log(link)
    console.log(name)
    console.log(price)
    console.log(details)
    Movies.create({
        poster_link:link,
        movie_name:name,
        movie_details:details,
        price:price,
        UserId:req.user.id
    })
    .then(result =>{
        console.log('Created movie details');
        res.redirect('/')
    })
    .catch(err =>{
        console.log(err)
    })
}
exports.showMovie=(req,res,next)=>{
    Movies.findAll({where:{
        UserId:req.user.id
    }})
        .then(result =>{
            res.render('show-movie',{
                movieList:result
            })
        })
        .catch(err => console.log(err))
} 
exports.showDetails=(req,res,next)=>{
    movieId=req.params.movieId
    console.log(movieId)
    Movies.findAll({where:{
        id:movieId
    }})
        .then(result =>{
            res.render('eachMovieDetail',{
                movieDetail:result
        })
    })
        .catch(err => console.log(err))
}
exports.DeleteMovie=(req,res,next)=>{
    movieId=req.params.movieId;
    Movies.findByPk(movieId)
    .then(movie =>{
        return movie.destroy();
    })
    .then(result =>{
        console.log(`Product with id ${movieId} deleted`);
        res.redirect('/')
    })
    .catch(err =>{
        console.log(err);
    })
}
exports.getEditMovie=(req,res,next)=>{
    movieId=req.params.movieId;
    console.log(movieId)
    Movies.findByPk(movieId)
    .then(movie =>{
        // console.log(movie.poster_link)
        res.render('editMovieDetails',{
            movie:movie
        })
    })
    .catch(err => console.log(err));
}

exports.postEditMovie=(req,res,next)=>{
    movieId=req.params.movieId;
    let link=req.body.link
    let name=req.body.name
    let price=req.body.price
    let details=req.body.details;
    let userId=req.user.id;
    Movies.findByPk(movieId)
    .then(movie =>{
        movie.poster_link=link;
        movie.movie_name=name;
        movie.price=price;
        movie.movie_details=details;
        movie.UserId=userId;
        return movie.save()
    })
    .then(result =>{
        console.log('Movie updated');
        res.redirect('/');
    })
}

exports.getCart=(req,res,next)=>{
    Movies.findAll({where:{
        id:req.user.id
    }})
    .then(movies =>{
        res.render('cart.ejs',{
            movies:movies
        })
    })
    .catch(err => console.log(err));
}