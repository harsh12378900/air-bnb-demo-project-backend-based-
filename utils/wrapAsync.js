 module.exports=(fn)=>{
    return function( req,res,next){
     fn(req,res,next).catch(function(err){
       next(err);
     })
    }

}