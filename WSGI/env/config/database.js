module.exports = {
    driverConf : {
        user: "postgres",
        database: "smartfarm",
        host: "localhost",
        password: "cyrildamm",
        port: 5432,
        max: 10,
        idleTimeoutMillis: 60000
    },
    mongo: {
        mongoDbUrl : 'mongodb://charles:cyrildamm@charlenet.life:27017/smartfarm'
        // mongoDbUrl : 'mongodb://localhost:27017/smartfarm'

    }
};