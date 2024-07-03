
const notFound = (req , res , next) => {
    

    next();
}


const errorHandler = (error , req , res , next) => {
    

}

module.exports = { notFound, errorHandler };