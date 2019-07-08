var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/JLH_Languages';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/JLH_Languages_Test';
}

console.log('env :', env);
console.log('PORT :', process.env.PORT);
console.log('MONGODB_URI :', process.env.MONGODB_URI);
