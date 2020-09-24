const environment = 'sbx';

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    SVNYT_SERVICES_URL:
        process.env.ADMIN_SERVICES_URL ||'ssmv6-alcor.saviyntfedcloud.com',
    LOGIN_ENDPOINT: '/ECM/api/v5/getRoles',
    MORGAN_LOGGING_FORMAT: process.env.MORGAN_LOGGING_FORMAT || 'dev',
    DEFAULT_LOGGING_LEVEL: process.env.DEFAULT_LOGGING_LEVEL || 'info',
    EC2_INSTANCE_URL:'ec2-3-236-143-69.compute-1.amazonaws.com',
    EC2_INSTANCE_PORT:'3001',
    EC2_ENDPOINT:'/users',    
   };
